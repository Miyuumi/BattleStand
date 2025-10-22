import { priorityBuffs } from "./Buff";
import { getDrop } from "./Drop";
import { getItems } from "./Items";
import { Rarity } from "./Rarity";
import { triggerChance } from "./Trigger";

export const getRecipes = () => {
    let Items = [
        {
            "name": "Armor",
            "image": "/Images/Items/Armor.png",
            "cost": 3,
            "description": "",
            "rarity": "Mythical",
            "cooldown": 0,
            "resource": "Metio",
            "abilityCooldown": 0,
            "requirements": ['Armguard','Boots','Helmet','Shield','Shoulderguard','Sword', 'Neckguard', 'Waistguard', 'Armor Pants'],
            "abilityDescription": "<b>Warrior Blessing</b>: Whenever crits, damages an Area dealing (100% Damage).<br>+10% Attackspeed<br>+40% Crit Chance<br>+25% Buff Duration<br>+15% Debuff Duration<br>+15% Damage<br>+0.25 Ability<br>+20% Trigger Chance",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.attackspeedGain = (unit.baseCooldown * 0.1);
                item.variable.damageGain = (unit.baseDamage * 0.1);
                item.variable.triggerChanceGain = (0.2);
                item.variable.critChanceGain = (0.4);
                item.variable.buffDurationGain = (0.25);
                item.variable.debuffDurationGain = (0.15);

                unit.cooldown -= item.variable.attackspeedGain;
                unit.damage += item.variable.damageGain;
                unit.triggerChance += item.variable.triggerChanceGain;
                unit.critChance += item.variable.critChanceGain;
                unit.buffDuration += item.variable.buffDurationGain;
                unit.debuffDuration -= item.variable.debuffDurationGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.cooldown += item.variable.attackspeedGain;
                unit.damage -= item.variable.damageGain;
                unit.triggerChance -= item.variable.triggerChanceGain;
                unit.critChance -= item.variable.critChanceGain;
                unit.buffDuration -= item.variable.buffDurationGain;
                unit.debuffDuration += item.variable.debuffDurationGain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
            onCrit: (item, unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, items, x, y)=>{
                
                const splashRadius = (60); // how close other enemies must be (in pixels)
                const splashDamage = unit.damage;

                hitEffects.value.push({
                    x: target.x + target.size / 2,
                    y: target.y + target.size / 2,
                    radius: 15,
                    alpha: 1,
                    color: "rgba(248, 50, 0, 1)", // yellowish glow
                    decay: 0.03, // how fast it fades
                    grow: 0.5, // how fast it expands
                });
                
                enemies.value.forEach((enemy) => {
                    const dx = (enemy.x + enemy.size / 2) - (target.x + target.size / 2);
                    const dy = (enemy.y + enemy.size / 2) - (target.y + target.size / 2);
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist <= splashRadius) {
                        enemy.onTakeDamage(splashDamage,null,damageTexts, hitEffects, areaFields, resource,units,enemies,unit,projectiles, items, x, y, false, false);
                    }
                });
            
            },
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onAttack: (item, unit, target, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onKill: (item, unit, target, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
        },
        {
            "name": "The Poor Man",
            "image": "/Images/Items/Poor_man.png",
            "cost": 1,
            "description": "",
            "rarity": "Mythical",
            "cooldown": 0,
            "resource": "Metio",
            "abilityCooldown": 300,
            "requirements": ['Pants','Shoes','TShirt', 'Hat', 'Shawl'],
            "abilityDescription": "<b>Frugal Life</b>: Guaranteed Drop on Kill. Cooldown: 300 turns.<br>+10% XP Gain<br>+10% Buff Duration<br>+10% Debuff Duration<br>+10% Drop Chance<br>+10% Drop Quality",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.xpGainGain = (0.10);
                item.variable.dropChanceGain = (0.10);
                item.variable.dropQualityGain = (0.10);
                item.variable.buffDurationGain = (0.10);
                item.variable.debuffDurationGain = (0.10);

                unit.xpGain += item.variable.xpGainGain;
                unit.dropChance += item.variable.dropChanceGain;
                unit.dropQuality += item.variable.dropQualityGain;
                unit.buffDuration += item.variable.buffDurationGain;
                unit.debuffDuration -= item.variable.debuffDurationGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.xpGain -= item.variable.xpGainGain;
                unit.dropChance -= item.variable.dropChanceGain;
                unit.dropQuality -= item.variable.dropQualityGain;
                unit.buffDuration -= item.variable.buffDurationGain;
                unit.debuffDuration += item.variable.debuffDurationGain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
            onCrit: (item, unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, items, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                if(item.abilityTimer >= item.abilityCooldown){
                    item.variable.active = true;
                }else{
                    item.abilityTimer += 0.1;
                    item.variable.cooldown = Math.max((item.abilityCooldown - item.abilityTimer), 0);
                    item.variable.active = false;
                }
            },
            onAttack: (item, unit, target, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onKill: (item, unit, target, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                
                if(item.variable.active){
                    let drops = getDrop(unit,target,1);
                    if(drops != null){
                        drops.forEach((element, index) => {
                            setTimeout(()=>{
                                damageTexts.value.push({
                                    x: target.x + target.size / 2,
                                    y: target.y, // start above the enemy
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
                    item.variable.active = false;
                    item.abilityTimer = 0;
                }
            },
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
        },
        {
            "name": "The Wizard",
            "image": "/Images/Items/The_Wizard.png",
            "cost": 2,
            "description": "",
            "rarity": "Mythical",
            "cooldown": 0,
            "resource": "Magika",
            "abilityCooldown": 0,
            "requirements": ['Wizard Cape','Wizard Boots','Wizard Hat','Wizard Necklace','Wizard Orb','Wizard Staff','Wizard Book'],
            "abilityDescription": "<b>Pure Sorcery</b>: When Casting, loses 100% Damage to gain (Damage / Attackspeed) Ability for 2 turns.<br>+100% Mana<br>+100% Manaregen<br>+2 Ability",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.manaRegenGain = (unit.baseManaRegen * 1);
                item.variable.manaGain = (unit.baseMaxmana * 1);
                item.variable.abilityGain = (2);
                unit.manaRegen += item.variable.manaRegenGain;
                unit.maxmana += item.variable.manaGain;
                unit.ability += item.variable.abilityGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.manaRegen -= item.variable.manaRegenGain;
                unit.maxmana -= item.variable.manaGain;
                unit.ability -= item.variable.abilityGain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
            onCrit: (item, unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, items, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onAttack: (item, unit, target, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onKill: (item, unit, target, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{
                unit.buffs.push({
                    name: "Pure Sorcery",
                    description: "Converts Damage to Ability",
                    duration: 10 * unit.buffDuration,
                    baseDuration: 10,
                    isApplied: false,
                    stacking: false,
                    source: unit,
                    owner: unit,
                    variable: {}, // stores internal state
                    onApply: (p, buff) => {
                        buff.variable.damageLost = parseFloat(buff.source.damage);
                        buff.variable.abilityGain = parseFloat(buff.source.damage / Math.max(buff.source.cooldown, 0.15));
                        p.damage -= buff.variable.damageLost;
                        p.ability += buff.variable.abilityGain;
                    },
                    onRefresh: (p, buff)=>{
                        p.damage += buff.variable.damageLost;
                        p.ability -= buff.variable.abilityGain;
                        buff.variable.damageLost = parseFloat(buff.source.damage);
                        buff.variable.abilityGain = parseFloat(buff.source.damage / Math.max(buff.source.cooldown, 0.15));
                        p.damage -= buff.variable.damageLost;
                        p.ability += buff.variable.abilityGain;
                    },
                    onRemove: (p, buff) => {
                       p.damage += buff.variable.damageLost;
                       p.ability -= buff.variable.abilityGain;
                    },
                });
            },
        },
        {
            "name": "Ultimate Orb",
            "image": "/Images/Items/Ultimate_Orb.png",
            "cost": 2,
            "description": "",
            "rarity": "Epic",
            "cooldown": 0,
            "resource": "Techno",
            "abilityCooldown": 0,
            "requirements": ['Wizard Orb','Magical Orb','Nature Orb','Clay Orb','Sky Orb','Ocean Orb','Sun Orb','Lava Orb'],
            "abilityDescription": "+15% Damage<br>+15% Attackspeed<br>+0.15 Ability<br>+15% Mana<br>+15% Mana Regen<br>+15% Drop Chance<br>+15% Drop Quality<br>+15% Bounty Gain<br>+15% Buff Duration<br>+15% Debuff Duration<br>",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.damageGain = (unit.baseDamage * 0.15);
                item.variable.attackspeedGain = (unit.baseCooldown * 0.15);
                item.variable.abilityGain = (0.15);
                item.variable.manaGain = (unit.baseMaxmana * 0.15);
                item.variable.manaRegenGain = (unit.baseManaRegen * 0.15);
                item.variable.dropChanceGain = (0.15);
                item.variable.dropQualityGain = (0.15);
                item.variable.bountyGainGain = (0.15);
                item.variable.buffDurationGain = (0.15);
                item.variable.debuffDurationGain = (0.15);

                unit.damage += item.variable.damageGain;
                unit.cooldown -= item.variable.attackspeedGain;
                unit.ability += item.variable.abilityGain;
                unit.maxmana += item.variable.manaGain;
                unit.manaRegen += item.variable.manaRegenGain;
                unit.dropChance += item.variable.dropChanceGain;
                unit.dropQuality += item.variable.dropQualityGain;
                unit.bountyGain += item.variable.bountyGainGain;
                unit.buffDuration += item.variable.buffDurationGain;
                unit.debuffDuration -= item.variable.debuffDurationGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.damage -= item.variable.damageGain;
                unit.cooldown += item.variable.attackspeedGain;
                unit.ability -= item.variable.abilityGain;
                unit.maxmana -= item.variable.manaGain;
                unit.manaRegen -= item.variable.manaRegenGain;
                unit.dropChance -= item.variable.dropChanceGain;
                unit.dropQuality -= item.variable.dropQualityGain;
                unit.bountyGain -= item.variable.bountyGainGain;
                unit.buffDuration -= item.variable.buffDurationGain;
                unit.debuffDuration += item.variable.debuffDurationGain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
            onCrit: (item, unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, items, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onAttack: (item, unit, target, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onKill: (item, unit, target, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
        },
    ]

    Items = Items.map((f)=>({
        ...f,
        timer: 0,
        abilityTimer: f.abilityCooldown,
        variable: {},
        type: "Artifact"
    }));

    return Items.sort((a, b) => a.name.localeCompare(b.name));
}