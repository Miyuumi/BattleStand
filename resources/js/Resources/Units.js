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
            "cooldown": 2.17,
            "abilityDescription": "<b>Speed Boost (Active)</b>: Grants +50% base attack speed for 5 turns. <div class='flex justify-between'><div><b>Casting</b>: On Attack</div><div><b>Manacost</b>: 20</div><div><b>Cooldown</b>: 3</div></div>",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) {
                    return;
                };
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    unit.abilityTimer += 0.1;
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
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
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

                if(unit.abilityTimer < unit.abilityCooldown){
                    return;
                }

                unit.abilityTimer -= unit.abilityCooldown;
                  // === Buff allies ===
                const manaCost = 20; // adjust as needed
                if (unit.mana < manaCost) return; // not enough mana

                const target = unit;

                unit.mana -= manaCost;
                unit.record.manaSpent += manaCost;
                if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                unit.record.abilityUses += 1;
                unit.onCast(unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y);

                target.buffs = target.buffs || [];
                target.buffs.push({
                    name: "Speed Boost",
                    description: "Gain increased attackspeed",
                    duration: 5 * unit.buffDuration,
                    baseDuration: 5,
                    isApplied: false,
                    stacking: false,
                    source: unit,
                    owner: target,
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
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            "abilityDescription": "<b>Quick Attack</b>: Whenever this unit crits, has 40% chance to attack again a random enemy",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.4 * unit.triggerChance)){
                    const randomIndex = Math.floor(Math.random() * enemies.value.length);
                    let nearest = { 
                        enemy: enemies.value[randomIndex], 
                        dist: 0 // dist doesn’t matter anymore
                    };

                    damageTexts.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 45,
                        text: "Quick!",
                        color: "purple",
                        size: 12,
                        alpha: 1,
                        vy: -0.8, // upward speed
                    });

                    unit.record.quickAttacks += 1;

                    if (nearest) {
                        unit.attacking = true;
                        unit.image.frame = 0;

                        projectiles.value.push({
                            x: (x * 45) + 40,
                            y: (y * 45) + 40,
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
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
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
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
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
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            "abilityDescription": "<b>Bloodline</b> : Gain (0.2 * Ability) Damage on Kills",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
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
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
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

                unit.record.damageGained += (0.2 * unit.ability);

                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "+"+(0.2 * unit.ability).toFixed(2),
                    color: "#610C04",
                    size: 12,
                    alpha: 1,
                    vy: -0.8, // upward speed
                });
            },
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            "abilityDescription": "<b>Mounted</b> : Attacks Random Enemies",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
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
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
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
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            "damage" : 2.65,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2.625,
            "abilityDescription": "<b>Explosion</b> : Attacks deals extra damage to all enemies in (60 * Ability) range of the target, dealing (25% * Ability) area damage.",
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
                        if(!unit.record.explosionTotalDamage) unit.record.explosionTotalDamage = 0;
                        unit.record.explosionTotalDamage += (splashDamage).toFixed(2);
                        enemy.onTakeDamage(splashDamage,null,damageTexts, hitEffects, resource,units,enemies,unit,projectiles,x, y, false);
                    }
                });
            },
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
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
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
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
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
            "abilityDescription": "<b>Upgrade!</b> : Gives an ally +10% damage for 6 turns",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
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
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
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
                    unit.record.manaSpent += manaCost;
                    if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                    unit.record.abilityUses += 1;

                    target.buffs = target.buffs || [];
                    target.buffs.push({
                        name: "Upgrade!",
                        description: "Gain "+parseFloat(unit.damage * 0.1)+" increased damage",
                        duration: 6 * unit.buffDuration,
                        baseDuration: 6,
                        isApplied: false,
                        stacking: false,
                        source: unit,
                        owner: target,
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
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Fairy",
            "image": {
                source: "/Images/Animations/Fairy.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
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
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                
            },
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Ranger",
            "image": {
                source: "/Images/Animations/Ranger.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Natura",
            "description": "A versatile marksman skilled at striking multiple foes from afar. Excels at attacking several enemies at once with piercing arrows.",
            "rarity": "Rare",
            "damageType": "Piercing",
            "damage" : 3,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2.82,
            "abilityDescription": "<b>Multishot</b> : Attacks (Ability) extra units at random. Has a very small chance to fail.",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
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

                    if(!unit.record.multishotFired) unit.record.multishotFired = 0;
                    unit.record.multishotFired += 1;

                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 15,
                        speed: 8,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Arrow.png",
                        color: "pink",
                        owner: unit,
                    });
                }

                for(let i = 0; i < Math.floor(unit.ability); i++){
                    let nearest_2;
                    if (enemies.value.length > 1) {
                        // Try to select a different enemy than 'nearest.enemy'
                        let tries = 0;
                        do {
                            const randomIndex = Math.floor(Math.random() * enemies.value.length);
                            nearest_2 = { 
                                enemy: enemies.value[randomIndex], 
                                dist: 0 // dist doesn’t matter anymore
                            };
                            tries++;
                        } while (nearest.enemy === nearest_2.enemy && tries < (20 * unit.triggerChance));
                    } else {
                        // Only one enemy, fallback to the same
                        nearest_2 = { 
                            enemy: enemies.value[0], 
                            dist: 0
                        };
                    }

                    if(nearest.enemy == nearest_2.enemy) continue;

                    if (nearest_2) {
                        projectiles.value.push({
                            x: (x * 45) + 40,
                            y: (y * 45) + 40,
                            size: 15,
                            speed: 8,
                            damage: unit.damage,
                            target: nearest_2.enemy,
                            location: {x:x,y:y},
                            image: "/Images/Projectiles/Arrow.png",
                            color: "purple",
                            owner: unit,
                        });
                    }
                }
            },
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Sniper",
            "image": {
                source: "/Images/Animations/Sniper.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Techno",
            "description": "A master marksman specializing in long-range precision shots. Excels at dealing massive damage with a chance for devastating headshots.",
            "rarity": "Rare",
            "damageType": "Pure",
            "damage" : 12,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 5,
            "abilityDescription": "<b>Headshot</b> : Has 10% Chance to deal bonus (Crit. Damage * Damage * Ability) damage on hit. Can also Crit.",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.1 * unit.triggerChance)){
                    //unit.damage * unit.ability * unit.critDamage
                    let dam = unit.damage * unit.ability * unit.critDamage;
                    target.onTakeDamage(dam, null,damageTexts, hitEffects, resource,units,enemies,unit,projectiles,x,y, false);

                    if(!unit.record.headshotFired) unit.record.headshotFired = 0;
                    unit.record.headshotFired += 1;
                    
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
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
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
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 15,
                        speed: 12,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Bullet.png",
                        color: "blue",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Soldier",
            "image": {
                source: "/Images/Animations/Soldier.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
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
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Sorceress",
            "image": {
                source: "/Images/Animations/Sorceress.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Magika",
            "description": "A master of elemental magic, unleashing powerful fire blasts on her enemies and those nearby.",
            "rarity": "Common",
            "damageType": "",
            "damage" : 2.85,
            "ability" : 1,
            "mana" : 10,
            "manaRegen": 1,
            "abilityCooldown": 1,
            "cooldown": 3.25,
            "abilityDescription": "<b>Fire Blast (Active)</b> : Fires a blast on the current target and nearby enemies (50) dealing 300% ability. <div class='flex justify-between'><div><b>Casting</b>: Has Enemy</div><div><b>Manacost</b>: 10</div><div><b>Cooldown</b>: 1</div></div>",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{

                if (enemies.value.length === 0) return;

                
                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.abilityTimer >= unit.abilityCooldown){
                    
                    
                    const manaCost = 10;
                    if (unit.mana >= manaCost) {
                        unit.abilityTimer -= unit.abilityCooldown;
                        const target = nearest.enemy;
                        unit.mana -= manaCost;
                        unit.record.manaSpent += manaCost;
                        
                        if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                        unit.record.abilityUses += 1;

                        unit.attacking = true;
                        unit.image.frame = 0;

                        unit.onCast(unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y);

                        const splashRadius = (50 * unit.ability); // how close other enemies must be (in pixels)
                        const splashDamage = unit.ability * 3;

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
                                enemy.onTakeDamage(splashDamage,null,damageTexts, hitEffects, resource,units,enemies,unit,projectiles,x,y, false);
                            }
                        });
                    }
                }else{
                    unit.abilityTimer += 0.1;
                }

                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;


                if (nearest) {
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 7,
                        speed: 5,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "red",
                        owner: unit,
                    });
                }

            },
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Spearman",
            "image": {
                source: "/Images/Animations/Spearman.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Metio",
            "description": "A disciplined fighter specializing in piercing attacks. Excels at hitting all enemies in a straight line, though with reduced damage.",
            "rarity": "Uncommon",
            "damageType": "",
            "damage" : 3.75,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 3.57,
            "abilityDescription": "<b>Pierce</b> : Hits all enemies in a straight line. Has (40% * Ability) damage penalty modifier.",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{
                if(!unit.record.pierceHit) unit.record.pierceHit = 0;
                unit.record.pierceHit += 1;
            },
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
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
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 18,
                        speed: 13,
                        damage: (unit.damage * (0.4 * unit.ability)),
                        target: nearest.enemy, // optional — might not be needed for straight-line shots
                        direction: nearest.enemy ? Math.atan2(nearest.enemy.y - (y * 45), nearest.enemy.x - (x * 45)) : 0,
                        location: { x: x, y: y },
                        image: "/Images/Projectiles/Cavalier.png",
                        color: "blue",
                        owner: unit,
                        piercing: true,        // ✅ pass-through capability
                        lifetime: 90,          // ✅ stays alive for 60 frames (~1s at 60fps)
                        hitEnemies: new Set(), // ✅ track already hit enemies
                    });
                }
            },
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Warrior",
            "image": {
                source: "/Images/Animations/Warrior.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Metio",
            "description": "A sturdy melee fighter with a chance to stun enemies and deal bonus damage after the stun ends.",
            "rarity": "Common",
            "damageType": "",
            "damage" : 1.12,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 3.58,
            "abilityDescription": "<b>Bash!</b> : Has 10% chance to stun target for 1s. Deals 300% ability at the end of stun.",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.1 * unit.triggerChance)){
                    if(!unit.record.bashHit) unit.record.bashHit = 0;
                    unit.record.bashHit += 1;

                    target.buffs.push({
                        name: "Bash!",
                        description: "Stunned.",
                        duration: (1 * unit.buffDuration) * target.debuffDuration,
                        baseDuration: 1,
                        isApplied: false,
                        stacking: false,
                        variable: {},
                        source: unit,
                        owner: target,
                        onApply: (p, buff) => {
                            buff.variable.lostSpeed = parseFloat(p.speed); // store original speed
                            p.speed -= buff.variable.lostSpeed; // stun = can't move
                        },
                        onRemove: (p, buff) => {
                            p.health -= (buff.source.ability * 3);
                            p.speed += buff.variable.lostSpeed; // restore
                        },
                    });
                }
                
            },
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
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
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 18,
                        speed: 7,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Crescent.png",
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Witch",
            "image": {
                source: "/Images/Animations/Witch.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Magika",
            "description": "A cunning spellcaster who curses enemies, slowing them and increasing their drop rate and quality.",
            "rarity": "Uncommon",
            "damageType": "Magic",
            "damage" : 3.4,
            "ability" : 1,
            "mana" : 11,
            "manaRegen": 1,
            "abilityCooldown": 3,
            "cooldown": 3,
            "abilityDescription": "<b>Witch Curse (Active)</b> : Curse the current target slowing them for 10% and increasing drop rate by 20% and quality by 10% for 6s. <div class='flex justify-between'><div><b>Casting</b>: Has Enemy</div><div><b>Manacost</b>: 10</div><div><b>Cooldown</b>: 3</div></div>",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                
                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.abilityTimer >= unit.abilityCooldown){
                    
                    const manaCost = 10;
                    if (unit.mana >= manaCost) {
                        unit.abilityTimer -= unit.abilityCooldown;
                        const target = nearest.enemy;
                        unit.mana -= manaCost;
                        unit.record.manaSpent += manaCost;
                        
                        if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                        unit.record.abilityUses += 1;

                        unit.attacking = true;
                        unit.image.frame = 0;

                        unit.onCast(unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y);

                        hitEffects.value.push({
                            x: target.x + target.size / 2,
                            y: target.y + target.size / 2,
                            radius: 2,
                            alpha: 1,
                            color: "green", // yellowish glow
                            decay: 0.03, // how fast it fades
                            grow: 0.25, // how fast it expands
                        });

                        target.buffs.push({
                            name: "Witched!",
                            description: "Slowed and drop chance / quality increased.",
                            duration: (6 * unit.buffDuration) * target.debuffDuration,
                            baseDuration: 6,
                            isApplied: false,
                            stacking: false,
                            variable: {},
                            source: unit,
                            owner: target,
                            onApply: (p, buff) => {
                                buff.variable.lostSpeed = parseFloat((p.speed * (0.1 * buff.source.ability) * p.slowEffectivity)); // store original speed
                                buff.variable.addedDropChance = parseFloat(0.2 * buff.source.ability);
                                buff.variable.addedDropQuality = parseFloat(0.1 * buff.source.ability);
                                p.speed -= buff.variable.lostSpeed; // stun = can't move
                            },
                            onRemove: (p, buff) => {
                                p.health -= (buff.source.ability * 1.5);
                                p.speed += buff.variable.lostSpeed; // restore
                            },
                        });
                    }
                }else{
                    unit.abilityTimer += 0.1;
                }

                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;


                if (nearest) {
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 7,
                        speed: 5,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "green",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Wizard",
            "image": {
                source: "/Images/Animations/Wizard.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "resource": "Magika",
            "description": "A master of arcane arts who conjures powerful magic storms, dealing massive area damage to enemies in the way.",
            "rarity": "Rare",
            "damageType": "Magic",
            "damage" : 2.3,
            "ability" : 1,
            "mana" : 20,
            "manaRegen": 1,
            "abilityCooldown": 6,
            "cooldown": 3.69,
            "abilityDescription": "<b>Magic Storm (Active) </b>: Fires 1 (+1 per 5 level) ball towards current target dealing 200% ability to all enemies in the way. <div class='flex justify-between'><div><b>Casting</b>: Has Enemies</div><div><b>Manacost</b>: 15</div><div><b>Cooldown</b>: 6</div></div>",
            onDamage: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.2);
                damageTexts.value.push({
                    x: (x * 45) + 45,
                    y: (y * 45) + 40,
                    text: "Level Up!",
                    color: "#000000ff",
                    size: 12,
                    alpha: 1,
                    vy: -0.4, // upward speed
                });
            },
            onTurn: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                
                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.abilityTimer >= unit.abilityCooldown){
                    
                   
                    const manaCost = 15;
                    if (unit.mana >= manaCost) {
                        unit.abilityTimer -= unit.abilityCooldown;
                        const target = nearest.enemy;
                        unit.mana -= manaCost;
                        unit.record.manaSpent += manaCost;
                        
                        if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                        unit.record.abilityUses += 1;

                        unit.attacking = true;
                        unit.image.frame = 0;

                        unit.onCast(unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y);

                        const shotCount = Math.floor(unit.level / 5) + 1;

                        if (nearest) {
                        const baseAngle = Math.atan2(
                            nearest.enemy.y - (y * 45),
                            nearest.enemy.x - (x * 45)
                        );

                        const spread = Math.PI / 30; 
                        const halfSpread = (shotCount - 1) / 2;

                        for (let j = 0; j < shotCount; j++) {
                            const offset = (j - halfSpread) * spread;

                            const finalAngle = baseAngle + offset;

                            projectiles.value.push({
                                x: (x * 45) + 40,
                                y: (y * 45) + 40,
                                size: 15,
                                speed: 10,
                                damage: 2 * unit.ability,
                                direction: finalAngle,     
                                location: { x: x, y: y },
                                color: "purple",
                                owner: unit,
                                piercing: true,                 
                                lifetime: 90,                  
                                hitEnemies: new Set(),         
                            });
                        }
                        }
                    }
                }else{
                    unit.abilityTimer += 0.1;
                }

                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;


                if (nearest) {
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 7,
                        speed: 5,
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, damageTexts, hitEffects, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects,  resource, units, enemies, projectiles, x, y)=>{},
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
        xpGain: 1,
        bountyGain: 1,
        dropChance: 1,
        dropQuality: 1,
        buffs: [],
        debuffs: [],
        items: [],
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
        upgrades: 0,

        record: {
            kills: 0,
            damageDealt: 0,
            manaSpent: 0,
            xpGained: 0,
            coinsGained: 0,
        },
        
        experience: 0,
        nextLevelExp: 10,
        attacking: false,
    }));
    return Units.sort((a, b) => a.name.localeCompare(b.name));
}