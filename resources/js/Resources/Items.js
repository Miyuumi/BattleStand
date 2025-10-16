import { priorityBuffs } from "./Buff";
import { triggerChance } from "./Trigger";


export const getItems = () => {
    let Items = [
        {
            "name": "Bow",
            "image": "/Images/Items/Bow.png",
            "cost": 15,
            "level": 3,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+10% Projectile Speed",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.1);
                unit.projectileSpeed += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.projectileSpeed -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Claws",
            "image": "/Images/Items/Claws.png",
            "cost": 65,
            "level": 15,
            "description": "",
            "rarity": "Rare",
            "cooldown": 0,
            "abilityDescription": "+25% Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseDamage * 0.25);
                unit.damage += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.damage -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Crossbow",
            "image": "/Images/Items/Crossbow.png",
            "cost": 22,
            "level": 6,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+5% Crit Chance",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.05);
                unit.critChance += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.critChance -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Necklace",
            "image": "/Images/Items/Necklace.png",
            "cost": 35,
            "level": 9,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+25% Manaregen",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseManaRegen * 0.25);
                unit.manaRegen += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.manaRegen -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Spear",
            "image": "/Images/Items/Spear.png",
            "cost": 35,
            "level": 9,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+15% Crit Chance <br>+0.5 Crit Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.15);
                item.variable.gain2 = (0.5);
                unit.critChance += item.variable.gain;
                unit.critDamage += item.variable.gain2;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.critChance -= item.variable.gain;
                unit.critDamage -= item.variable.gain2;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Gloves",
            "image": "/Images/Items/Gloves.png",
            "cost": 45,
            "level": 9,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+10% Attackspeed",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseCooldown * 0.1);
                unit.cooldown -= item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.cooldown += item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Flag",
            "image": "/Images/Items/Whiteflag.png",
            "cost": 38,
            "level": 6,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Trigger Chance",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.1);
                unit.triggerChance += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.triggerChance -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Magical Orb",
            "image": "/Images/Items/Magical_Orb.png",
            "cost": 17,
            "level": 3,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Mana<br>+10% Manaregen",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseMaxmana * 0.1);
                item.variable.gain2 = (unit.baseManaRegen * 0.1);
                unit.maxMana += item.variable.gain;
                unit.manaRegen += item.variable.gain2;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.maxMana -= item.variable.gain;
                unit.manaRegen -= item.variable.gain2;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        }, 
        {
            "name": "Book of Wisdom",
            "image": "/Images/Items/Book_of_Wisdom.png",
            "cost": 20,
            "level": 4,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Xp Gain",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.1);
                unit.xpGain += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.xpGain -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },       
        {
            "name": "Boxing Gloves",
            "image": "/Images/Items/Boxing_Gloves.png",
            "cost": 12,
            "level": 1,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+5% Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseDamage * 0.05);
                unit.damage += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.damage -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        }, 
        ////
        {
            "name": "Wizard Cape",
            "image": "/Images/Items/Wizard_Cape.png",
            "cost": 40,
            "level": 12,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+50% Mana",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseMaxmana * 0.5);
                unit.maxMana += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.maxMana -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Wizard Boots",
            "image": "/Images/Items/Wizard_Boots.png",
            "cost": 14,
            "level": 2,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Manaregen",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseManaRegen * 0.10);
                unit.manaRegen += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.manaRegen -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Wizard Hat",
            "image": "/Images/Items/Wizard_Hat.png",
            "cost": 80,
            "level": 20,
            "description": "",
            "rarity": "Rare",
            "cooldown": 0,
            "abilityDescription": "+1 Ability",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (1);
                unit.ability += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.ability -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Wizard Necklace",
            "image": "/Images/Items/Wizard_Necklace.png",
            "cost": 75,
            "level": 19,
            "description": "",
            "rarity": "Rare",
            "cooldown": 0,
            "abilityDescription": "+60% Manaregen",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseManaRegen * 0.6);
                unit.manaRegen += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.manaRegen -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Wizard Orb",
            "image": "/Images/Items/Wizard_Orb.png",
            "cost": 50,
            "level": 16,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+0.5 Ability",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseAbility * 0.5);
                unit.ability += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.ability -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Wizard Staff",
            "image": "/Images/Items/Wizard_Staff.png",
            "cost": 40,
            "level": 16,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+0.25 Ability<br>+15% Manaregen",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseAbility * 0.25);
                item.variable.gain2 = (unit.baseManaRegen * 0.15);
                unit.ability += item.variable.gain;
                unit.manaRegen += item.variable.gain2;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.ability -= item.variable.gain;
                unit.manaRegen -= item.variable.gain2;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Wizard Book",
            "image": "/Images/Items/Wizard_Book.png",
            "cost": 65,
            "level": 15,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+50% Manaregen",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseManaRegen * 0.5);
                unit.manaRegen += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.manaRegen -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        ////
        {
            "name": "Boots",
            "image": "/Images/Items/Boots.png",
            "cost": 10,
            "level": 1,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+3% Attackspeed",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.attackspeedGain = (unit.baseCooldown * 0.03);
                unit.cooldown -= item.variable.attackspeedGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.cooldown += item.variable.attackspeedGain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Helmet",
            "image": "/Images/Items/Helmet.png",
            "cost": 47,
            "level": 13,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+0.75x Crit. Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.critDamage += 0.75;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.critDamage -= 0.75;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Shield",
            "image": "/Images/Items/Shield.png",
            "cost": 18,
            "level": 4,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "-20% Debuff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.debuffDuration -= 0.2;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.debuffDuration += 0.2;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Shoulderguard",
            "image": "/Images/Items/Shoulderguard.png",
            "cost": 55,
            "level": 11,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+25 Buff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.buffDuration += 0.25;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.buffDuration -= 0.25;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Sword",
            "image": "/Images/Items/Sword.png",
            "cost": 20,
            "level": 2,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseDamage * 0.1);
                unit.damage += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.damage -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Neckguard",
            "image": "/Images/Items/Neckguard.png",
            "cost": 35,
            "level": 6,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+35% Ability",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.35);
                unit.ability += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.ability -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Waistguard",
            "image": "/Images/Items/Waistguard.png",
            "cost": 30,
            "level": 5,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+30% Mana",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseMaxmana * 0.3);
                unit.maxMana += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.maxMana -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Armor Pants",
            "image": "/Images/Items/Armor_Pants.png",
            "cost": 45,
            "level": 8,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+30% Debuff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.3);
                unit.debuffDuration += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.debuffDuration -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        ////

        {
            "name": "Pants",
            "image": "/Images/Items/Pants.png",
            "cost": 23,
            "level": 5,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+20% Mana",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (unit.baseMaxmana * 0.2);
                unit.maxMana += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.maxMana -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Shoes",
            "image": "/Images/Items/Shoes.png",
            "cost": 28,
            "level": 7,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Buff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.1);
                unit.buffDuration += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.buffDuration -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "TShirt",
            "image": "/Images/Items/TShirt.png",
            "cost": 23,
            "level": 5,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Debuff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.1);
                unit.debuffDuration += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.debuffDuration -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Hat",
            "image": "/Images/Items/Hat.png",
            "cost": 30,
            "level": 6,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Drop Chance",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.1);
                unit.dropChance += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.dropChance -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Shawl",
            "image": "/Images/Items/Shawl.png",
            "cost": 25,
            "level": 6,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Drop Quality",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                item.variable.gain = (0.1);
                unit.dropQuality += item.variable.gain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.dropQuality -= item.variable.gain;
            },
            onDamage: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onAttack: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        
    ]

    Items = Items.map((f)=>({
        ...f,
        timer: 0,
        abilityTimer: 0,
        variable: {},
    }));

    return Items;
}