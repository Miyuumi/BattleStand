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
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.projectileSpeedGain = (0.1);
                unit.projectileSpeed += item.variable.projectileSpeedGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.projectileSpeed -= item.variable.projectileSpeedGain;
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
        {
            "name": "Claws",
            "image": "/Images/Items/Claws.png",
            "cost": 67,
            "level": 15,
            "description": "",
            "rarity": "Rare",
            "cooldown": 0,
            "abilityDescription": "+25% Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.damageGain = (unit.baseDamage * 0.25);
                unit.damage += item.variable.damageGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.damage -= item.variable.damageGain;
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
        {
            "name": "Crossbow",
            "image": "/Images/Items/Crossbow.png",
            "cost": 22,
            "level": 6,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+5% Crit Chance",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.critChanceGain = (0.05);
                unit.critChance += item.variable.critChanceGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.critChance -= item.variable.critChanceGain;
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
        {
            "name": "Necklace",
            "image": "/Images/Items/Necklace.png",
            "cost": 35,
            "level": 9,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+25% Manaregen",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.manaRegenGain = (unit.baseManaRegen * 0.25);
                unit.manaRegen += item.variable.manaRegenGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.manaRegen -= item.variable.manaRegenGain;
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
        {
            "name": "Spear",
            "image": "/Images/Items/Spear.png",
            "cost": 52,
            "level": 9,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+15% Crit Chance <br>+0.5 Crit Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.critChanceGain = (0.15);
                item.variable.critDamageGain = (0.5);
                unit.critChance += item.variable.critChanceGain;
                unit.critDamage += item.variable.critDamageGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.critChance -= item.variable.critChanceGain;
                unit.critDamage -= item.variable.critDamageGain;
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
        {
            "name": "Gloves",
            "image": "/Images/Items/Gloves.png",
            "cost": 45,
            "level": 9,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+10% Attackspeed",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.attackspeedGain = (unit.baseCooldown * 0.1);
                unit.cooldown -= item.variable.attackspeedGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.cooldown += item.variable.attackspeedGain;
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
        {
            "name": "Flag",
            "image": "/Images/Items/Whiteflag.png",
            "cost": 38,
            "level": 6,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Trigger Chance",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.triggerChanceGain = (0.1);
                unit.triggerChance += item.variable.triggerChanceGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.triggerChance -= item.variable.triggerChanceGain;
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
        {
            "name": "Book of Wisdom",
            "image": "/Images/Items/Book_of_Wisdom.png",
            "cost": 20,
            "level": 4,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Xp Gain",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.xpGainGain = (0.1);
                unit.xpGain += item.variable.xpGainGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.xpGain -= item.variable.xpGainGain;
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
        {
            "name": "Boxing Gloves",
            "image": "/Images/Items/Boxing_Gloves.png",
            "cost": 12,
            "level": 1,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+5% Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.damageGain = (unit.baseDamage * 0.05);
                unit.damage += item.variable.damageGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.damage -= item.variable.damageGain;
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
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.manaGain = (unit.baseMaxmana * 0.5);
                unit.maxmana += item.variable.manaGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.maxmana -= item.variable.manaGain;
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
        {
            "name": "Wizard Boots",
            "image": "/Images/Items/Wizard_Boots.png",
            "cost": 14,
            "level": 2,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Manaregen",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.manaRegenGain = (unit.baseManaRegen * 0.10);
                unit.manaRegen += item.variable.manaRegenGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.manaRegen -= item.variable.manaRegenGain;
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
        {
            "name": "Wizard Hat",
            "image": "/Images/Items/Wizard_Hat.png",
            "cost": 80,
            "level": 20,
            "description": "",
            "rarity": "Rare",
            "cooldown": 0,
            "abilityDescription": "+1 Ability",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.abilityGain = (1);
                unit.ability += item.variable.abilityGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
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
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
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
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.manaRegenGain = (unit.baseManaRegen * 0.6);
                unit.manaRegen += item.variable.manaRegenGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.manaRegen -= item.variable.manaRegenGain;
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
        {
            "name": "Wizard Orb",
            "image": "/Images/Items/Wizard_Orb.png",
            "cost": 50,
            "level": 16,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+0.5 Ability",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.abilityGain = (unit.baseAbility * 0.5);
                unit.ability += item.variable.abilityGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
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
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
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
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.abilityGain = (unit.baseAbility * 0.25);
                item.variable.manaRegenGain = (unit.baseManaRegen * 0.15);
                unit.ability += item.variable.abilityGain;
                unit.manaRegen += item.variable.manaRegenGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.ability -= item.variable.abilityGain;
                unit.manaRegen -= item.variable.manaRegenGain;
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
        {
            "name": "Wizard Book",
            "image": "/Images/Items/Wizard_Book.png",
            "cost": 65,
            "level": 15,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+50% Max Mana<br>+15% Manaregen",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.manaRegenGain = (unit.baseManaRegen * 0.15);
                item.variable.manaGain = (unit.baseMaxmana * 0.15);
                unit.manaRegen += item.variable.manaRegenGain;
                unit.maxmana += item.variable.manaGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.manaRegen -= item.variable.manaRegenGain;
                unit.maxmana -= item.variable.manaGain;
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
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.attackspeedGain = (unit.baseCooldown * 0.03);
                unit.cooldown -= item.variable.attackspeedGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.cooldown += item.variable.attackspeedGain;
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
        {
            "name": "Helmet",
            "image": "/Images/Items/Helmet.png",
            "cost": 47,
            "level": 13,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+0.75x Crit. Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.critDamageGain = (0.75);
                unit.critDamage += item.variable.critDamageGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.critDamage -= item.variable.critDamageGain;
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
        {
            "name": "Shield",
            "image": "/Images/Items/Shield.png",
            "cost": 18,
            "level": 4,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "-20% Debuff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.debuffDurationGain = (0.2);
                unit.debuffDuration -= item.variable.debuffDurationGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
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
        {
            "name": "Shoulderguard",
            "image": "/Images/Items/Shoulderguard.png",
            "cost": 55,
            "level": 11,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+25% Buff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.buffDurationGain = (0.25);
                unit.buffDuration += item.variable.buffDurationGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.buffDuration -= item.variable.buffDurationGain;
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
        {
            "name": "Armguard",
            "image": "/Images/Items/Armguard.png",
            "cost": 18,
            "level": 2,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+5% Attackspeed",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.attackspeedGain = (unit.baseCooldown * 0.05);
                unit.cooldown -= item.variable.attackspeedGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.cooldown += item.variable.attackspeedGain;
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
        {
            "name": "Sword",
            "image": "/Images/Items/Sword.png",
            "cost": 20,
            "level": 2,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.damageGain = (unit.baseDamage * 0.1);
                unit.damage += item.variable.damageGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.damage -= item.variable.damageGain;
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
        {
            "name": "Neckguard",
            "image": "/Images/Items/Neckguard.png",
            "cost": 35,
            "level": 6,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+0.25 Ability",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.abilityGain = (0.25);
                unit.ability += item.variable.abilityGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
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
            onCast: (item, unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, items, x, y)=>{},
        },
        {
            "name": "Waistguard",
            "image": "/Images/Items/Waistguard.png",
            "cost": 53,
            "level": 7,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+15% Trigger Chance",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.triggerChance = (0.15);
                unit.triggerChance += item.variable.triggerChance;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.triggerChance -= item.variable.triggerChance;
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
        {
            "name": "Armor Pants",
            "image": "/Images/Items/Armor_Pants.png",
            "cost": 72,
            "level": 11,
            "description": "",
            "rarity": "Rare",
            "cooldown": 0,
            "abilityDescription": "+30% Crit Chance",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.critChanceGain = (0.3);
                unit.critChance += item.variable.critChanceGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.critChance -= item.variable.critChanceGain;
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
        ////

        {
            "name": "Pants",
            "image": "/Images/Items/Pants.png",
            "cost": 23,
            "level": 5,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+5% XP Gain",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.xpGainGain = (0.05);
                unit.xpGain += item.variable.xpGainGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.xpGain -= item.variable.xpGainGain;
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
        {
            "name": "Shoes",
            "image": "/Images/Items/Shoes.png",
            "cost": 28,
            "level": 7,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Buff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.buffDurationGain = (0.1);
                unit.buffDuration += item.variable.buffDurationGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.buffDuration -= item.variable.buffDurationGain;
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
        {
            "name": "TShirt",
            "image": "/Images/Items/TShirt.png",
            "cost": 23,
            "level": 5,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Debuff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.debuffDurationGain = (0.1);
                unit.debuffDuration += item.variable.debuffDurationGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.debuffDuration -= item.variable.debuffDurationGain;
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
        {
            "name": "Hat",
            "image": "/Images/Items/Hat.png",
            "cost": 30,
            "level": 6,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Drop Chance",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.dropChanceGain = (0.1);
                unit.dropChance += item.variable.dropChanceGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.dropChance -= item.variable.dropChanceGain;
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
        {
            "name": "Shawl",
            "image": "/Images/Items/Shawl.png",
            "cost": 25,
            "level": 6,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Drop Quality",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.dropQualityGain = (0.1);
                unit.dropQuality += item.variable.dropQualityGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.dropQuality -= item.variable.dropQualityGain;
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

        ////

        {
            "name": "Magical Orb",
            "image": "/Images/Items/Magical_Orb.png",
            "cost": 52,
            "level": 3,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Mana<br>+10% Manaregen",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.maxManaGain = (unit.baseMaxmana * 0.1);
                item.variable.manaRegenGain = (unit.baseManaRegen * 0.1);
                unit.maxmana += item.variable.maxManaGain;
                unit.manaRegen += item.variable.manaRegenGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.maxmana -= item.variable.maxManaGain;
                unit.manaRegen -= item.variable.manaRegenGain;
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
        {
            "name": "Nature Orb",
            "image": "/Images/Items/Nature_Orb.png",
            "cost": 40,
            "level": 10,
            "description": "",
            "rarity": "Uncommon",
            "cooldown": 0,
            "abilityDescription": "+10% Attackspeed",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.attackspeedGain = (unit.baseCooldown * 0.1);
                unit.cooldown -= item.variable.attackspeedGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.cooldown += item.variable.attackspeedGain;
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
        {
            "name": "Sky Orb",
            "image": "/Images/Items/Sky_Orb.png",
            "cost": 42,
            "level": 8,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+12.5% Drop Chance",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.dropChanceGain = (0.125);
                unit.dropChance += item.variable.dropChanceGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.dropChance -= item.variable.dropChanceGain;
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
        {
            "name": "Clay Orb",
            "image": "/Images/Items/Clay_Orb.png",
            "cost": 57,
            "level": 8,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+25% Bounty Gain",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.bountyGainGain = (0.25);
                unit.bountyGain += item.variable.bountyGainGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.bountyGain -= item.variable.bountyGainGain;
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
        {
            "name": "Ocean Orb",
            "image": "/Images/Items/Ocean_Orb.png",
            "cost": 46,
            "level": 10,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+20% Buff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.buffDurationGain = (0.2);
                unit.buffDuration += item.variable.buffDurationGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.buffDuration -= item.variable.buffDurationGain;
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
        {
            "name": "Sun Orb",
            "image": "/Images/Items/Sun_Orb.png",
            "cost": 39,
            "level": 6,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+20% Debuff Duration",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.debuffDurationGain = (0.20);
                unit.debuffDuration += item.variable.debuffDurationGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.debuffDuration -= item.variable.debuffDurationGain;
                
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
        {
            "name": "Lava Orb",
            "image": "/Images/Items/Lava_Orb.png",
            "cost": 38,
            "level": 6,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "+10% Damage",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                item.variable.damageGain = (0.1 * unit.baseDamage);
                unit.damage += item.variable.damageGain;
            },
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, items, x, y)=>{
                unit.damage -= item.variable.damageGain;
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
        abilityTimer: 0,
        variable: {},
        type: "Permanent"
    }));

    return Items;
}