import { priorityBuffs } from "./Buff";
import { triggerChance } from "./Trigger";


export const getItems = () => {
    let Items = [
        {
            "name": "Armguard",
            "image": "/Images/Items/Armguard.png",
            "cost": 0,
            "description": "",
            "rarity": "Common",
            "cooldown": 0,
            "abilityDescription": "<b>Title</b>: Description.",
            onEquip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onUnequip: (item, unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
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
    }));

    return Items.sort((a, b) => a.name.localeCompare(b.name));
}