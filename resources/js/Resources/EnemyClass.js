import { ref } from "vue";
import { critChance } from "./Critical";

export class Enemy {
  constructor({ name, x, y, health = 10, mana = 1, damage = 1, wave = 1, level = 1, speed = 1, size = 30, image = null }) {
    this.name = name;
    this.health = health;
    this.maxhealth = health;
    this.mana = mana;
    this.maxmana = mana;
    this.damage = 1;
    this.wave = 1;
    this.level = 1;
    this.value = 1;
    this.experience = 1;
    this.coins = 1;
    this.size = size;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.baseSpeed = speed;
    this.image = image;
    this.sprite = null;
    this.buffDuration = 1;
    this.debuffDuration = 1;
    this.dropChance = 1;
    this.dropQuality = 1;
    this.slowEffectivity = 1;
  }

  onTakeDamage(damage, projectile, damageTexts, hitEffects,  resources, plants, enemies, source, projectiles, x, y, recurse = true) {
    let dam = damage;
    let self = this;
    if(critChance(source.critChance)){
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

      source.onCrit(source, this, damageTexts, hitEffects,  resources, plants, enemies, projectiles, x, y);
    }
    this.health -= dam;
    source.record.damageDealt += parseFloat((dam).toFixed(2));
    if(recurse) {
      source.onDamage(source, this, damageTexts, hitEffects,  resources, plants, enemies, projectiles, x, y);
      if (this.health <= 0) {
        this.onDeath(source, damage, damageTexts, hitEffects,  resources, enemies, plants, projectiles, x, y);
      }
    }
  }

  onTurn(damage, damageTexts, hitEffects,  resources, plants, enemies, source, projectiles, x, y) {
    // custom AI per tick
  }

  onDeath(source, damage, damageTexts, hitEffects,  resources, enemies, plants, projectiles, x, y) {
    source.record.kills += 1;
    source.record.xpGained += (this.experience * source.xpGain);
    source.record.coinsGained += (this.coins * source.bountyGain);
    
    source.experience += (this.experience * source.xpGain);
    resources.value.Coins += (this.coins * source.bountyGain);

    if(source.experience >= source.nextLevelExp){
      source.onLevel(source, damageTexts, hitEffects, resources, plants, enemies, projectiles, x, y);
    }
    
    source.onKill(source, damageTexts, hitEffects,  resources, plants, enemies, projectiles, x, y)
    enemies.value = enemies.value.filter(e => e !== this);
  }
}