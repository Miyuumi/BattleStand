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
            "description": "A skilled ranged fighter who strikes from afar with precise, rapid shots. Excels at shooting rapid shots to lightly armored foes.",
            "rarity": "Common",
            "damageType": "Piercing",
            "damage" : 3.35,
            "ability" : 1,
            "mana" : 21,
            "manaRegen": 1,
            "abilityCooldown": 3,
            "cooldown": 2,
            "abilityDescription": "Active: Grants +50% base attack speed for 5 turns. Costs 20 Mana. Cooldown 3 turns.",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
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
                unit.timer -= unit.cooldown;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);

                if (nearest) {
                    projectiles.value.push({
                        x: (x * 40) + 30,
                        y: (y * 40) + 30,
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

                  // === Buff allies ===
                const manaCost = 20; // adjust as needed
                if (unit.mana < manaCost) return; // not enough mana

                const target = unit;

                unit.mana -= manaCost;

                target.buffs = target.buffs || [];
                target.buffs.push({
                    name: "Speed Boost",
                    description: "Gain increased attackspeed",
                    duration: 5 * unit.buffDuration,
                    baseDuration: 5,
                    isApplied: false,
                    stacking: false,
                    variable: {}, // stores internal state
                    onApply: (p, buff) => {
                        buff.variable.speedGained = parseFloat(p.baseCooldown) * 0.5; // store how much was added
                        p.cooldown -= parseFloat(buff?.variable?.speedGained || 0);
                    },
                    onRemove: (p, buff) => {
                        p.cooldown += parseFloat(buff?.variable?.speedGained || 0);
                    },
                });
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            "damage" : 5.65,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 3.8,
            "abilityDescription": "Whenever this unit crits, has 40% chance to attack again a random enemy",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{
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
                            x: (x * 40) + 45,
                            y: (y * 40) + 45,
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
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
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
                unit.timer -= unit.cooldown;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);

                if (nearest) {
                    projectiles.value.push({
                        x: (x * 40) + 30,
                        y: (y * 40) + 30,
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
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Axeman",
            "image": {
                source: "/Images/Animations/Axeman.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Metio",
            "description": "A strong fighter who wields axe with brute force. Excels at dealing heavy damage and grows stronger with each kill.",
            "rarity": "Uncommon",
            "damageType": "Normal",
            "damage" : 3.15,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2.875,
            "abilityDescription": "Gain (0.2 * Ability) Damage on Kills",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
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
                unit.timer -= unit.cooldown;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);

                if (nearest) {
                    projectiles.value.push({
                        x: (x * 40) + 30,
                        y: (y * 40) + 30,
                        size: 16,
                        speed: 10,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Axeman.png",
                        color: "#ff5349",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{
                unit.damage += (0.2 * unit.ability);

                damageTexts.value.push({
                    x: (x * 30) + 45,
                    y: (y * 30) + 40,
                    text: "+"+(0.2 * unit.ability).toFixed(2),
                    color: "#610C04",
                    size: 12,
                    alpha: 1,
                    vy: -0.8, // upward speed
                });
            },
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Cavalier",
            "image": {
                source: "/Images/Animations/Cavalier.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Metio",
            "description": "A swift fighter who fights by throwing spears at a lightning speed. Excels at dealing damage to many enemies.",
            "rarity": "Rare",
            "damageType": "",
            "damage" : 0.75,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0.5,
            "abilityDescription": "Attacks Random Enemies",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
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
                unit.timer -= unit.cooldown;

                const randomIndex = Math.floor(Math.random() * enemies.value.length);
                let nearest = { 
                    enemy: enemies.value[randomIndex], 
                    dist: 0 // dist doesn’t matter anymore
                };

                if (nearest) {
                    projectiles.value.push({
                        x: (x * 40) + 30,
                        y: (y * 40) + 30,
                        size: 12.5,
                        speed: 7.35,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Cavalier.png",
                        color: "red",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Bombadier",
            "image": {
                source: "/Images/Animations/Bombadier.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Metio",
            "description": "A skilled demolisher who bring damage and destruction to those nearby.",
            "rarity": "Uncommon",
            "damageType": "",
            "damage" : 2.45,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2.625,
            "abilityDescription": "Deals extra damage to all enemies in (60 * Ability) range of the target, dealing (25% * Ability) area damage.",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{
                const splashRadius = (60 * unit.ability); // how close other enemies must be (in pixels)
                const splashPercent = (0.25 * unit.ability); // nearby enemies take 50% damage
                const splashDamage = unit.damage * splashPercent;

                
                hitEffects.value.push({
                    x: target.x + target.size / 2,
                    y: target.y + target.size / 2,
                    radius: 10,
                    alpha: 1,
                    color: "rgba(255, 200, 0, 1)", // yellowish glow
                    decay: 0.03, // how fast it fades
                    grow: 0.5, // how fast it expands
                });
                
                enemies.value.forEach((enemy) => {
                    const dx = (enemy.x + enemy.size / 2) - (target.x + target.size / 2);
                    const dy = (enemy.y + enemy.size / 2) - (target.y + target.size / 2);
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist <= splashRadius) {
                        // Deal splash damage
                        enemy.onTakeDamage(splashDamage,null,damageTexts, hitEffects, resource,units,enemies,unit,projectiles,x,y, false);
                    }
                });
            },
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
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
                unit.timer -= unit.cooldown;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);

                if (nearest) {
                    projectiles.value.push({
                        x: (x * 40) + 30,
                        y: (y * 40) + 30,
                        size: 10,
                        speed: 7,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "black",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Blacksmith",
            "image": {
                source: "/Images/Animations/Blacksmith.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Metio",
            "description": "A skilled worker forging not only for himself but also for his allies.",
            "rarity": "Uncommon",
            "damageType": "",
            "damage" : 3.5,
            "ability" : 1,
            "mana" : 3,
            "manaRegen": 1,
            "abilityCooldown": 0,
            "cooldown": 2.4,
            "abilityDescription": "Gives an ally +10% damage for 6 turns",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
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
                unit.timer -= unit.cooldown;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);

                if (nearest) {
                    projectiles.value.push({
                        x: (x * 40) + 30,
                        y: (y * 40) + 30,
                        size: 12.65,
                        speed: 5.25,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Blacksmith.png",
                        color: "pink",
                        owner: unit,
                    });
                }
                
                  // === Buff allies ===
                const manaCost = 3; // adjust as needed
                if (unit.mana < manaCost) return; // not enough mana

                // Find allies without the "Astilbe Grace" buff
                const targets = priorityBuffs(units.value, [{ name: "Upgrade!" }]);

                if (targets.length > 0) {
                    const target = targets[Math.floor(Math.random() * targets.length)];

                    unit.mana -= manaCost;

                    target.buffs = target.buffs || [];
                    target.buffs.push({
                        name: "Upgrade!",
                        description: "Gain "+parseFloat(unit.damage * 0.1)+" increased damage",
                        duration: 6 * unit.buffDuration,
                        baseDuration: 6,
                        isApplied: false,
                        stacking: false,
                        variable: {}, // stores internal state
                        onApply: (p, buff) => {
                            buff.variable.damageGained = parseFloat(p.damage) * 0.1; // store how much was added
                            p.damage += parseFloat(buff?.variable?.damageGained || 0);
                        },
                        onRemove: (p, buff) => {
                            p.damage -= parseFloat(buff?.variable?.damageGained || 0);
                        },
                    });
                }
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Sniper",
            "resource": "Techno",
            "description": "",
            "rarity": "Rare",
            "damageType": "Pure",
            "damage" : 12,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 5,
            "abilityDescription": "Has 10% Chance to deal bonus (Crit. Damage * Damage * Ability) damage on hit",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.1 * unit.triggerChance)){
                    target.health -= (unit.damage * unit.ability * unit.critDamage);
                    unit.damageDealt += (unit.damage * unit.ability * unit.critDamage);
                    damageTexts.value.push({
                        x: target.x + target.size / 2,
                        y: target.y, // start above the enemy
                        text: "Headshot!",
                        color: "Red",
                        size: 12,
                        alpha: 1,
                        vy: -0.8, // upward speed
                    });
                }
            },
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
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
                        image: "/Images/Projectiles/Bullet.png",
                        color: "blue",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTurn: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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