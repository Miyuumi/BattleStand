import { ref } from "vue";
import { critChance } from "./Critical";
import { getDrop } from "./Drop";
import { Rarity } from "./Rarity";

export class Enemy {
  constructor({ name, x, y, health = 10, mana = 1, damage = 1, experience = 1, maxDrop = 2, bounty = 1, type = "Normal", wave = 1, level = 1, speed = 1, size = 30, image = null }) {
    this.name = name;
    this.health = health;
    this.maxhealth = health;
    this.mana = mana;
    this.maxmana = mana;
    this.damage = 1;
    this.wave = 1;
    this.type = type,
    this.level = 1;
    this.value = 1;
    this.experience = experience;
    this.bounty = bounty;
    this.size = size;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.maxDrop = maxDrop;
    this.baseSpeed = speed;
    this.image = image;
    this.sprite = null;
    this.buffDuration = 1;
    this.debuffDuration = 1;
    this.dropChance = 1;
    this.dropQuality = 1;
    this.slowEffectivity = 1;
    this.isDead = false;
  }

  onTakeDamage(damage, projectile, damageTexts, hitEffects, areaFields,  resources, plants, enemies, source, projectiles, items, x, y, recurse = true, canCrit = true) {
    let dam = parseFloat(damage);
    let self = this;

    if(critChance(source.critChance) && canCrit){
      dam *= source.critDamage;

      damageTexts.value.push({
        x: this.x + this.size / 2,
        y: this.y, // start above the enemy
        text: dam.toFixed(2),
        color: "red",
        size: 16,
        alpha: 1,
        vy: -0.8, // upward speed
      });

      source.onCrit(source, this, projectile, damageTexts, hitEffects, areaFields,  resources, plants, enemies, projectiles, items, x, y);
    }
    this.health -= dam;
    source.record.damageDealt += parseFloat((dam).toFixed(2));
    if(recurse) {
      source.onDamage(source, this, projectile, damageTexts, hitEffects, areaFields,  resources, plants, enemies, projectiles, items, x, y);
      source.items.forEach(item => {
        item.onDamage(source, this, projectile, damageTexts, hitEffects, areaFields,  resources, plants, enemies, projectiles, items, x, y);
      });
      source.buffs.forEach(buff => {
        if(buff.onDamage){
          buff.onDamage(buff, source, this, projectile, damageTexts, hitEffects, areaFields,  resources, plants, enemies, projectiles, items, x, y);
        }
      })
    }

    if (isNaN(this.health) || this.health <= 0) {
      this.onDeath(source, damage, damageTexts, hitEffects, areaFields,  resources, enemies, plants, projectiles, items, x, y);
    }
  }

  onTurn(damage, damageTexts, hitEffects, areaFields,  resources, plants, enemies, source, projectiles, items, x, y) {
    // custom AI per tick
  }

  onDeath(source, damage, damageTexts, hitEffects, areaFields,  resources, enemies, plants, projectiles, items, x, y) {
    if(this.isDead) return;
    this.isDead = true;
    source.record.kills += 1;
    source.record.xpGained += parseFloat(this.experience * source.xpGain);
    source.record.coinsGained += parseFloat(this.bounty * source.bountyGain);
    
    source.onKill(source, this, damageTexts, hitEffects, areaFields,  resources, plants, enemies, projectiles, items, x, y);
    source.items.forEach(item => {
      item.onKill(item, source, this, damageTexts, hitEffects,  resources, plants, enemies, projectiles, items, x, y);
    });

    this.buffs.forEach((buff)=>{
      if(buff.onDeath){
        buff.onDeath(this, buff);
      }
    });

    source.experience += parseFloat(this.experience * source.xpGain);
    resources.value.Coins += parseFloat(this.bounty * source.bountyGain);

    if(source.experience >= source.nextLevelExp){
      source.onLevel(source, damageTexts, hitEffects, areaFields, resources, plants, enemies, projectiles, items, x, y);
    }
    
    let drops = getDrop(source, this);
    if(drops != null){
      drops.forEach((element, index) => {
        
        setTimeout(()=>{
          damageTexts.value.push({
            x: this.x + this.size / 2,
            y: this.y, // start above the enemy
            text: element.name + " drops",
            color: Rarity[element.rarity].color,
            size: 16,
            alpha: 1,
            vy: -0.8, // upward speed
          });
          items.value.push(element);
        },200 * index)
        
      });
    }

    enemies.value = enemies.value.filter(e => e !== this);
  }
}