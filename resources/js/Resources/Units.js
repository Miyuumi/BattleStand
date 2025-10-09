import { priorityBuffs } from "./Buff";
import { triggerChance } from "./Trigger";


export const getUnits = () => {
    let Units = [
        {
            "name": "Archer",
            "image": {
                source: "/Images/Animations/Archer.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Natura",
            "description": "A skilled ranged fighter who strikes from afar with precise, rapid shots. Excels at dealing piercing damage to lightly armored foes.",
            "rarity": "Common",
            "damageType": "Piercing",
            "damage" : 4,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2,
            "abilityDescription": "Has 10% Chance to deal bonus (Damage * Ability) damage on hit",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.1 * unit.triggerChance)){
                    target.health -= (unit.damage * unit.ability);
                    unit.damageDealt += (unit.damage * unit.ability);
                    damageTexts.value.push({
                        x: target.x + target.size / 2,
                        y: target.y, // start above the enemy
                        text: "Strong!",
                        color: "Red",
                        size: 12,
                        alpha: 1,
                        vy: -0.8, // upward speed
                    });
                }
            },
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
            },
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) {
                    return;
                };
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;

                unit.timer = 0;
                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);

                if (nearest) {
                    projectiles.value.push({
                        x: (y * 40) + 45,
                        y: (x * 40) + 45,
                        size: 15,
                        speed: 7,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Arrow.png",
                        color: "blue",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Assassin",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Assassin.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "A highly skilled individual trained in precision, and tactical execution. Excels at dealing critical strikes and quick attacks.",
            "rarity": "Rare",
            "damageType": "Pure",
            "damage" : 6,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 3.8,
            "abilityDescription": "Whenever this unit crits, has 40% chance to attack again a random enemy",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.4 * unit.triggerChance)){
                    const randomIndex = Math.floor(Math.random() * enemies.value.length);
                    let nearest = { 
                        enemy: enemies.value[randomIndex], 
                        dist: 0 // dist doesn’t matter anymore
                    };

                    damageTexts.value.push({
                        x: (x * 30) + 45,
                        y: (y * 30) + 40,
                        text: "Quick!",
                        color: "purple",
                        size: 12,
                        alpha: 1,
                        vy: -0.8, // upward speed
                    });

                    if (nearest) {
                        unit.attacking = true;
                        unit.image.frame = 0;

                        projectiles.value.push({
                            x: (y * 40) + 45,
                            y: (x * 40) + 45,
                            size: 15,
                            speed: 8,
                            damage: unit.damage,
                            target: nearest.enemy,
                            location: {x:x,y:y},
                            image: "/Images/Projectiles/Crescent.png",
                            color: "purple",
                            owner: unit,
                        });
                    }
                }
            },
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
            },
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;

                unit.timer = 0;
                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);

                if (nearest) {
                    projectiles.value.push({
                        x: (y * 40) + 45,
                        y: (x * 40) + 45,
                        size: 15,
                        speed: 8,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Crescent.png",
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Axeman",
            "resource": "Metio",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 6,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 3,
            "abilityDescription": "Gain 0.5 Damage on Kills",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
            },
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.timer = 0;
                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);

                if (nearest) {
                    projectiles.value.push({
                        x: (y * 40) + 45,
                        y: (x * 40) + 45,
                        size: 6,
                        speed: 2,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "#ff5349",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.damage += 0.05;
            },
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Cavalier",
            "resource": "Metio",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 0.75,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0.5,
            "abilityDescription": "Attacks Random Enemies",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
            },
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.timer = 0;
                const randomIndex = Math.floor(Math.random() * enemies.value.length);
                let nearest = { 
                    enemy: enemies.value[randomIndex], 
                    dist: 0 // dist doesn’t matter anymore
                };

                if (nearest) {
                    projectiles.value.push({
                        x: (y * 40) + 45,
                        y: (x * 40) + 45,
                        size: 2.5,
                        speed: 6.5,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "red",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Bombadier",
            "resource": "Metio",
            "description": "Star-shaped Units in purple, blue, and pink, blooming late into the season.",
            "rarity": "Common",
            "damageType": "",
            "damage" : 2,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2.1,
            "abilityDescription": "Has 10% chance to deal 3 extra damage on hit",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.1 * unit.triggerChance)){
                    target.health -= (3 * unit.ability);
                    unit.damageDealt += (3 * unit.ability);
                    damageTexts.value.push({
                        x: target.x + target.size / 2,
                        y: target.y, // start above the enemy
                        text: "Aster!",
                        color: "purple",
                        size: 12,
                        alpha: 1,
                        vy: -0.8, // upward speed
                    });
                }
            },
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
            },
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.timer = 0;
                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);

                if (nearest) {
                    projectiles.value.push({
                        x: (y * 40) + 45,
                        y: (x * 40) + 45,
                        size: 4,
                        speed: 7,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Blacksmith",
            "resource": "Metio",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 3.5,
            "ability" : 1,
            "mana" : 3,
            "manaRegen": 1,
            "abilityCooldown": 0,
            "cooldown": 2.4,
            "abilityDescription": "Gives an ally +20% damage for 6 turns",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
            },
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.timer = 0;
                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);

                if (nearest) {
                    projectiles.value.push({
                        x: (y * 40) + 45,
                        y: (x * 40) + 45,
                        size: 4.65,
                        speed: 5.25,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "pink",
                        owner: unit,
                    });
                }
                
                  // === Buff allies ===
                const manaCost = 3; // adjust as needed
                if (unit.mana < manaCost) return; // not enough mana

                // Find allies without the "Astilbe Grace" buff
                const targets = priorityBuffs(units.value, [{ name: "Astilbe" }]);

                if (targets.length > 0) {
                    const target = targets[Math.floor(Math.random() * targets.length)];

                    unit.mana -= manaCost;

                    target.buffs = target.buffs || [];
                    target.buffs.push({
                        name: "Astilbe",
                        description: "Gain "+parseFloat(unit.damage * 0.2)+" increased damage",
                        duration: 6 * unit.buffDuration,
                        baseDuration: 6,
                        isApplied: false,
                        stacking: false,
                        variable: {}, // stores internal state
                        onApply: (p, buff) => {
                            buff.variable.damageGained = parseFloat(p.damage) * 0.2; // store how much was added
                            p.damage += parseFloat(buff?.variable?.damageGained || 0);
                        },
                        onRemove: (p, buff) => {
                            p.damage -= parseFloat(buff?.variable?.damageGained || 0);
                        },
                    });
                }
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Fairy",
            "resource": "Natura",
            "description": "",
            "rarity": "Rare",
            "damageType": "",
            "damage" : 0,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0,
            "abilityDescription": "",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Ranger",
            "resource": "Natura",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 0,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0,
            "abilityDescription": "",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Sniper",
            "resource": "Techno",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 0,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0,
            "abilityDescription": "",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Soldier",
            "resource": "Techno",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 0,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0,
            "abilityDescription": "",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Sorceress",
            "resource": "Magika",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 0,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0,
            "abilityDescription": "",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Spearman",
            "resource": "Metio",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 0,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0,
            "abilityDescription": "",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Warrior",
            "resource": "Metio",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 0,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0,
            "abilityDescription": "",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Witch",
            "resource": "Magika",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 0,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0,
            "abilityDescription": "",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Wizard",
            "resource": "Magika",
            "description": "",
            "rarity": "Common",
            "damageType": "",
            "damage" : 0,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0,
            "abilityDescription": "",
            onDamage: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, resource, units, enemies, projectiles, x, y)=>{},
        },
    ]

    Units = Units.map((f)=>({
        ...f,
        level: 0,
        livingTime: 0,
        growth: 0,

        maxmana: f.mana,
        baseDamage: f.damage,
        baseAbility: f.ability,
        baseManaRegen: f.manaRegen,
        baseMaxmana: f.mana,
        baseCooldown: f.cooldown,
        baseBuffDuration: 1,
        baseDebuffDuration: 1,
        baseTriggerChance: 0.1,
        baseCritChance: 0.05,
        baseCritDamage: 1.5,

        critChance: 0.05,
        critDamage: 1.5,

        buffDuration: 1,
        debuffDuration: 1,
        triggerChance: 1,
        buffs: [],
        debuffs: [],
        variable: {},

        originalSellValue: f.sellValue,
        
        timer: 0,
        abilityTimer: 0,
        location: [-1,-1],
        water: 0,
        output: 1,
        sellValue: 0,
        sprite: null,
        count: 1,
        kills: 0,
        damageDealt: 0,
        manaSpent: 0,
        abilityUses: 0,
        experience: 0,
        nextLevelExp: 10,
        attacking: false,
    }));
    return Units.sort((a, b) => a.name.localeCompare(b.name));
}