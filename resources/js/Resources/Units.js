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
            "cost" : 25,
            "damage" : 2.35,
            "ability" : 1,
            "mana" : 21,
            "manaRegen": 1,
            "abilityCooldown": 3,
            "cooldown": 2.17,
            "abilityDescription": "<b>Speed Boost (Active)</b>: Grants +50% base attack and projectile speed for 5 turns. <div class='flex justify-between'><div><b>Casting</b>: On Attack</div><div><b>Manacost</b>: 20</div><div><b>Cooldown</b>: 3</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 7 * (unit?.projectileSpeed),
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
                unit.onCast(unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y);

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
                        buff.variable.projectileSpeedGained = 0.5; // store how much was added
                        p.cooldown -= parseFloat(buff?.variable?.speedGained || 0);
                        p.projectileSpeed += buff.variable.projectileSpeedGained;
                    },
                    onRemove: (p, buff) => {
                        p.cooldown += parseFloat(buff?.variable?.speedGained || 0);
                        p.projectileSpeed -= buff.variable.projectileSpeedGained;
                    },
                });
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "cost" : 200,
            "damage" : 5.65,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 3.8,
            "abilityDescription": "<b>Quick Attack</b>: Whenever this unit crits, has 40% chance to attack again a random enemy",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
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
                            speed: 8 * (unit?.projectileSpeed),
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
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 8 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Crescent.png",
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "cost" : 155,
            "damage" : 3.15,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2.875,
            "abilityDescription": "<b>Bloodline</b> : Gain (0.2 * Ability) Damage on Kills",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 10 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Axeman.png",
                        color: "#ff5349",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
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
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "damageType": "Normal",
            "cost" : 250,
            "damage" : 0.75,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 0.5,
            "abilityDescription": "<b>Mounted</b> : Attacks Random Enemies",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 7.35 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Cavalier.png",
                        color: "red",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "rarity": "Common",
            "damageType": "Normal",
            "cost" : 100,
            "damage" : 2.65,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2.625,
            "abilityDescription": "<b>Explosion</b> : Attacks deals extra damage to all enemies in (60 * Ability) range of the target, dealing (25% * Ability) area damage.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
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
                        unit.record.explosionTotalDamage += parseFloat((splashDamage).toFixed(2));
                        enemy.onTakeDamage(splashDamage,null,damageTexts, hitEffects, areaFields, resource,units,enemies,unit,projectiles,x, y, false);
                    }
                });
            },
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 7 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "black",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "damageType": "Normal",
            "cost" : 85,
            "damage" : 3.5,
            "ability" : 1,
            "mana" : 4,
            "manaRegen": 1,
            "abilityCooldown": 0,
            "cooldown": 2.4,
            "abilityDescription": "<b>Upgrade!</b> : Gives an ally +10% (+1% per Ability) damage for 6 turns. <div class='flex justify-between'><div><b>Casting</b>: On Attack</div><div><b>Manacost</b>: 3</div><div><b>Cooldown</b>: 0</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 5.25 * (unit?.projectileSpeed),
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
                            buff.variable.damageGained = parseFloat(p.damage * 0.1) + (0.01 * buff.source.ability); // store how much was added
                            p.damage += parseFloat(buff?.variable?.damageGained || 0);
                        },
                        onRemove: (p, buff) => {
                            p.damage -= parseFloat(buff?.variable?.damageGained || 0);
                        },
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "description": "A mystical creature that supports allies with magical blessings. Excels at boosting attack speed for nearby units.",
            "rarity": "Uncommon",
            "damageType": "Light",
            "cost" : 135,
            "damage" : 2.18,
            "ability" : 1,
            "mana" : 11,
            "manaRegen": 1,
            "abilityCooldown": 0,
            "cooldown": 2.73,
            "abilityDescription": "<b>Blessing!</b> : Gives an ally +20% (+1% per Ability) attackspeed for 6 turns. <div class='flex justify-between'><div><b>Casting</b>: On Attack</div><div><b>Manacost</b>: 10</div><div><b>Cooldown</b>: 0</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 5.25 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "lightgreen",
                        owner: unit,
                    });
                }
                
                  // === Buff allies ===
                const manaCost = 10; // adjust as needed
                if (unit.mana < manaCost) return; // not enough mana

                // Find allies without the "Astilbe Grace" buff
                const targets = priorityBuffs(units.value, [{ name: "Blessing!" }]);

                if (targets.length > 0) {
                    const target = targets[Math.floor(Math.random() * targets.length)];

                    unit.mana -= manaCost;
                    unit.record.manaSpent += manaCost;
                    if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                    unit.record.abilityUses += 1;

                    target.buffs = target.buffs || [];
                    target.buffs.push({
                        name: "Blessing!",
                        description: "Gain "+parseFloat(unit.baseCooldown * 0.1)+" increased damage",
                        duration: 7 * unit.buffDuration,
                        baseDuration: 7,
                        isApplied: false,
                        stacking: false,
                        source: unit,
                        owner: target,
                        variable: {}, // stores internal state
                        onApply: (p, buff) => {
                            buff.variable.cooldownGained = parseFloat(p.baseCooldown * 0.2) + (0.01 * buff.source.ability); // store how much was added
                            p.cooldown -= parseFloat(buff?.variable?.cooldownGained || 0);
                        },
                        onRemove: (p, buff) => {
                            p.cooldown += parseFloat(buff?.variable?.cooldownGained || 0);
                        },
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "cost" : 275,
            "damage" : 3,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2.82,
            "abilityDescription": "<b>Multishot</b> : Attacks (Ability) extra units at random. Has a very small chance to fail.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 8 * (unit?.projectileSpeed),
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
                            speed: 8 * (unit?.projectileSpeed),
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
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "cost" : 240,
            "damage" : 12,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 5,
            "abilityDescription": "<b>Headshot</b> : Has 10% Chance to deal bonus (Crit. Damage * Damage * Ability) damage on hit. Can also Crit.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.1 * unit.triggerChance)){
                    //unit.damage * unit.ability * unit.critDamage
                    let dam = unit.damage * unit.ability * unit.critDamage;
                    target.onTakeDamage(dam, null,damageTexts, hitEffects, areaFields, resource,units,enemies,unit,projectiles,x,y, false);

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
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 12 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Bullet.png",
                        color: "blue",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "description": "A disciplined combatant trained in modern warfare. Excels at using grenades to damage multiple enemies in close proximity.",
            "rarity": "Common",
            "damageType": "Normal",
            "cost" : 35,
            "damage" : 1.94,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2.34,
            "abilityDescription": "<b>Grenade! </b>: Has 25% chance to use a grenade, dealing 125% ability to enemies nearby.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.25 * unit.triggerChance)){
                    const splashRadius = (75); // how close other enemies must be (in pixels)
                    const splashDamage = parseFloat(unit.ability * 1.25);
                    
                    hitEffects.value.push({
                        x: target.x + target.size / 2,
                        y: target.y + target.size / 2,
                        radius: 20,
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
                            unit.record.explosionTotalDamage += parseFloat((splashDamage).toFixed(2));
                            enemy.onTakeDamage(splashDamage,null,damageTexts, hitEffects, areaFields, resource,units,enemies,unit,projectiles,x, y, false);
                        }
                    });
                }
                
            },
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        size: 12,
                        speed: 12 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Bullet.png",
                        color: "blue",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "damageType": "Magic",
            "cost" : 45,
            "damage" : 2.85,
            "ability" : 1,
            "mana" : 10,
            "manaRegen": 1,
            "abilityCooldown": 1,
            "cooldown": 3.25,
            "abilityDescription": "<b>Fire Blast (Active)</b> : Fires a blast on the current target and nearby enemies (50) dealing 300% ability. <div class='flex justify-between'><div><b>Casting</b>: Has Enemy</div><div><b>Manacost</b>: 10</div><div><b>Cooldown</b>: 1</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{

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

                        unit.onCast(unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y);

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
                                if(!unit.record.abilityTotalDamage) unit.record.abilityTotalDamage = 0;
                                unit.record.abilityTotalDamage += parseFloat((splashDamage).toFixed(2));
                                enemy.onTakeDamage(splashDamage,null,damageTexts, hitEffects, areaFields, resource,units,enemies,unit,projectiles,x,y, false);
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
                        speed: 5 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "red",
                        owner: unit,
                    });
                }

            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "damageType": "Piercing",
            "cost" : 170,
            "damage" : 3.75,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 3.57,
            "abilityDescription": "<b>Pierce</b> : Hits all enemies in a straight line. Has (40% * Ability) damage penalty modifier.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
                if(!unit.record.pierceHit) unit.record.pierceHit = 0;
                unit.record.pierceHit += 1;
            },
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 13 * (unit?.projectileSpeed),
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
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "damageType": "Normal",
            "cost" : 50,
            "damage" : 1.12,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 3.58,
            "abilityDescription": "<b>Bash!</b> : Has 10% chance to stun target for 1s. Deals 300% ability at the end of stun.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
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
                            p.onTakeDamage((buff.source.ability * 3),p,damageTexts, hitEffects, areaFields, resource,units,enemies,unit,projectiles,x, y, false);
                            p.speed += buff.variable.lostSpeed; // restore
                        },
                    });
                }
                
            },
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 7 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Crescent.png",
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "cost" : 105,
            "damage" : 3.4,
            "ability" : 1,
            "mana" : 11,
            "manaRegen": 1,
            "abilityCooldown": 3,
            "cooldown": 3,
            "abilityDescription": "<b>Witch Curse (Active)</b> : Curse the current target slowing them for 10% and increasing drop rate by 20% and quality by 10% for 6s. <div class='flex justify-between'><div><b>Casting</b>: Has Enemy</div><div><b>Manacost</b>: 10</div><div><b>Cooldown</b>: 3</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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

                        unit.onCast(unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y);

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
                        speed: 5 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "green",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
            "cost" : 300,
            "damage" : 2.3,
            "ability" : 1,
            "mana" : 20,
            "manaRegen": 1,
            "abilityCooldown": 6,
            "cooldown": 3.69,
            "abilityDescription": "<b>Magic Storm (Active) </b>: Fires 1 (+1 per 5 level) ball towards current target dealing 200% ability to all enemies in the way. <div class='flex justify-between'><div><b>Casting</b>: Has Enemies</div><div><b>Manacost</b>: 15</div><div><b>Cooldown</b>: 6</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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

                        unit.onCast(unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y);

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
                                speed: 10 * (unit?.projectileSpeed),
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
                        speed: 5 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Bard",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Bard.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "A musical support unit who inspires allies with magical songs. Excels at boosting XP gain for all friendly units.",
            "rarity": "Common",
            "damageType": "Light",
            "cost" : 60,
            "damage" : 2.65,
            "ability" : 1,
            "mana" : 6,
            "manaRegen": 1,
            "abilityCooldown": 5,
            "cooldown": 3.35,
            "abilityDescription": "<b>Battle Song</b>: Gives 10% (+1% per ability) XP Gain. <div class='flex justify-between'><div><b>Casting</b>: Has Enemies</div><div><b>Manacost</b>: 5</div><div><b>Cooldown</b>: 5</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.abilityTimer >= unit.abilityCooldown){
                    
                    const manaCost = 5;
                    if (unit.mana >= manaCost) {
                        unit.abilityTimer -= unit.abilityCooldown;
                        const target = nearest.enemy;
                        unit.mana -= manaCost;
                        unit.record.manaSpent += manaCost;
                        
                        if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                        unit.record.abilityUses += 1;

                        unit.onCast(unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y);

                        units.value.forEach(row => {
                            row.forEach(unit => {
                                unit.buffs.push({
                                    name: "Battle Song",
                                    description: "Gain 10% XP Gain",
                                    duration: 4 * unit.buffDuration,
                                    baseDuration: 4,
                                    isApplied: false,
                                    stacking: false,
                                    source: unit,
                                    owner: target,
                                    variable: {}, // stores internal state
                                    onApply: (p, buff) => {
                                        buff.variable.gain = 0.1 + parseFloat(0.01 * buff.source.ability); // store how much was added
                                        p.xpGain += buff.variable.gain;
                                    },
                                    onRemove: (p, buff) => {
                                        p.xpGain -= buff.variable.gain;
                                    },
                                });
                            })
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
                        size: 17,
                        speed: 5 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Sound.png",
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Bowman",
            "resource": "Natura",
            "image": {
                source: "/Images/Animations/Bowman.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "A master archer who unleashes powerful ascended shots. Every fifth attack deals double damage plus a bonus based on ability.",
            "rarity": "Rare",
            "damageType": "Piercing",
            "cost" : 325,
            "damage" : 2.55,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 5,
            "cooldown": 2.65,
            "abilityDescription": "<b>Ascended Shot</b>: Deals 2x (+0.25x ability) damage every 5 hits.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;

                if(!unit.variable.attackCounter && unit.variable.attackCounter != 0){
                    unit.variable.attackCounter = 0;
                }else{
                    unit.variable.attackCounter += 1;
                }

                if (nearest) {
                    if(unit.variable.attackCounter == 5){
                        if(!unit.record.ascendedShots) unit.record.ascendedShots = 0;
                        unit.record.ascendedShots += (1);

                        if(!unit.record.ascendedShotsDamage) unit.record.ascendedShotsDamage = 0;
                        unit.record.ascendedShotsDamage += parseFloat(((unit.damage) + ((unit.damage) * (0.25 * unit.ability))).toFixed(2));

                        unit.variable.attackCounter = 0;
                        projectiles.value.push({
                            x: (x * 45) + 40,
                            y: (y * 45) + 40,
                            size: 22,
                            speed: 10 * (unit?.projectileSpeed),
                            damage: (unit.damage) + ((unit.damage) * (0.25 * unit.ability)),
                            target: nearest.enemy,
                            location: {x:x,y:y},
                            image: "/Images/Projectiles/Arrow.png",
                            color: "purple",
                            owner: unit,
                        });
                    }else{
                        projectiles.value.push({
                            x: (x * 45) + 40,
                            y: (y * 45) + 40,
                            size: 13,
                            speed: 8 * (unit?.projectileSpeed),
                            damage: unit.damage,
                            target: nearest.enemy,
                            location: {x:x,y:y},
                            image: "/Images/Projectiles/Arrow.png",
                            color: "purple",
                            owner: unit,
                        });
                    }
                    
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Chariot",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Chariot.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "A fast-moving unit whose attacks bounce between multiple enemies, dealing reduced damage with each bounce. Excels at hitting several targets in succession.",
            "rarity": "Uncommon",
            "damageType": "Normal",
            "cost" : 100,
            "damage" : 2.82,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 5,
            "cooldown": 3.65,
            "abilityDescription": "<b>Bouncing Shot</b>: Attacks bounces 2 (+1 per ability) times dealing 50% (-1% per level) damage",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;
                if (projectile.targets.length >= (2 + Math.floor(unit.ability))) return;

                let nearest = enemies.value
                    .filter((e) => !projectile.targets.includes(e))
                    .reduce((closest, enemy) => {
                        const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                        const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                        const dist = Math.sqrt(dx*dx + dy*dy);
                        return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                    }, null);

                if (nearest) {
                    projectile.targets.push(nearest.enemy);

                    projectiles.value.push({
                        x: target.x + 15,
                        y: target.y + 15,
                        size: 20,
                        speed: 10 * (unit?.projectileSpeed),
                        damage: (projectile.damage * (0.5 + Math.min(0.01 * unit.level, 0.5))),
                        targets: projectile.targets,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Cavalier.png",
                        color: "purple",
                        owner: unit,
                    });
                }
                
            },
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;

                if (nearest) {
                    unit.variable.targets = [nearest.enemy];
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 20,
                        speed: 10 * (unit?.projectileSpeed),
                        targets: [nearest.enemy],
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Cavalier.png",
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Executioner",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Executioner.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "A ruthless warrior who specializes in executing weakened enemies. Has a small chance to instantly kill non-boss enemies. Also receives bonus coins on every kill.",
            "rarity": "Rare",
            "damageType": "Normal",
            "cost" : 295,
            "damage" : 4.82,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 5,
            "cooldown": 4.65,
            "abilityDescription": "<b>Execute</b>: Has 1% chance to kill non-boss Enemy. Gains 2x (xp, coins...) rewards from executing.<br><hr><b>Bounty Rewards</b>: Gains bonus 1 (+0.1 per ability) coins on kill.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.01 * unit.triggerChance)){
                    
                    if(target.type == 'Boss') return;

                    if(!unit.record.executedUnits) unit.record.executedUnits = 0;
                    unit.record.executedUnits += (1);
                
                    damageTexts.value.push({
                        x: target.x + 15,
                        y: target.y,
                        text: "Execute!",
                        color: "red",
                        size: 12,
                        alpha: 1,
                        vy: -0.8, // upward speed
                    });

                    target.onDeath(unit, null, damageTexts, hitEffects, areaFields,  resource, enemies, units, projectiles, x, y);
                }
            },
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;

                if (nearest) {
                    unit.variable.targets = [nearest.enemy];
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 23,
                        speed: 12 * (unit?.projectileSpeed),
                        targets: [nearest.enemy],
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Axeman.png",
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                damageTexts.value.push({
                    x: target.x + 15,
                    y: target.y,
                    text: "+"+(1 + (0.1 * unit.ability)).toFixed(0),
                    color: "gold",
                    size: 12,
                    alpha: 1,
                    vy: -0.8, // upward speed
                });
                if(!unit.record.bountyRewardsGained) unit.record.bountyRewardsGained = 0;
                unit.record.bountyRewardsGained += parseFloat((1 + (0.1 * unit.ability)).toFixed(2));
                resource.value.Coins += (1 + (0.1 * unit.ability));
            },
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Flagman",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Flagman.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Rare",
            "damageType": "Normal",
            "cost" : 300,
            "damage" : 2.52,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 5,
            "cooldown": 2.65,
            "abilityDescription": "<b>Morale Boost</b>: Has 10% chance when damaging an enemy to give 10% (+1% per ability) attackspeed buff to all allies.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.1 * unit.triggerChance)){

                    if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                    unit.record.abilityUses += 1;
                    
                    units.value.forEach(row => {
                        row.forEach(target => {
                            if(target){
                            target.buffs = target.buffs || [];
                            target.buffs.push({
                                name: "Morale!",
                                description: "Gain increased attackspeed",
                                duration: 3 * unit.buffDuration,
                                baseDuration: 3,
                                isApplied: false,
                                stacking: false,
                                source: unit,
                                owner: target,
                                variable: {}, // stores internal state
                                onApply: (p, buff) => {
                                    buff.variable.cooldownGained = parseFloat(p.baseCooldown * 0.1) + (0.01 * buff.source.ability); // store how much was added
                                    p.cooldown -= parseFloat(buff?.variable?.cooldownGained || 0);
                                },
                                onRemove: (p, buff) => {
                                    p.cooldown += parseFloat(buff?.variable?.cooldownGained || 0);
                                },
                            });
                        }
                        })
                    })
                };
            },
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;

                if (nearest) {
                    unit.variable.targets = [nearest.enemy];
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 23,
                        speed: 12 * (unit?.projectileSpeed),
                        targets: [nearest.enemy],
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Axeman.png",
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Golem",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Golem.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Uncommon",
            "damageType": "Normal",
            "cost" : 135,
            "damage" : 4.22,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 5,
            "cooldown": 4.75,
            "abilityDescription": "<b>Smash!</b>: Has 10% chance when damaging an enemy to stun enemies by 1s on 60 (+1 per ability) area.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
                if(triggerChance(0.1 * unit.triggerChance)){
                    if(!unit.record.smashHit) unit.record.smashHit = 0;
                    unit.record.smashHit += 1;
                    // Only stun enemies within a certain radius (AOE)
                    const smashRadius = 60 * unit.ability; // adjust radius as needed
                    hitEffects.value.push({
                        x: target.x + target.size / 2,
                        y: target.y + target.size / 2,
                        radius: smashRadius / 3,
                        alpha: 1,
                        color: "rgba(128,128,128,0.7)", // grayish smash effect
                        decay: 0.03,
                        grow: 0.5,
                    });
                    enemies.value.forEach(e => {
                        const dx = (e.x + e.size / 2) - (target.x + target.size / 2);
                        const dy = (e.y + e.size / 2) - (target.y + target.size / 2);
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist <= smashRadius) {
                            e.buffs = e.buffs || [];
                            e.buffs.push({
                                name: "Smashed!",
                                description: "Stunned",
                                duration: (1 * unit.buffDuration) * e.debuffDuration,
                                baseDuration: 3,
                                isApplied: false,
                                stacking: false,
                                source: unit,
                                owner: e,
                                variable: {},
                                onApply: (p, buff) => {
                                    buff.variable.speedLost = p.speed;
                                    p.speed -= buff.variable.speedLost;
                                },
                                onRemove: (p, buff) => {
                                    p.speed += buff.variable.speedLost;
                                },
                            });
                        }
                    });
                };
            },
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;

                if (nearest) {
                    unit.variable.targets = [nearest.enemy];
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 15,
                        speed: 12 * (unit?.projectileSpeed),
                        targets: [nearest.enemy],
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "#FDBE0F",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Guard",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Guard.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Uncommon",
            "damageType": "Normal",
            "cost" : 10,
            "damage" : 2.22,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 5,
            "cooldown": 3.22,
            "abilityDescription": "<b>Greater Bash</b>: Has 10% chance on stunning an enemy.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{
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
                            buff.variable.lostSpeed = (parseFloat(p.speed) * 1.1); // store original speed
                            p.speed -= buff.variable.lostSpeed; // stun = can't move
                        },
                        onRemove: (p, buff) => {
                            p.speed += buff.variable.lostSpeed; // restore
                        },
                    });
                }
            },
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;

                if (nearest) {
                    unit.variable.targets = [nearest.enemy];
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 20,
                        speed: 11 * (unit?.projectileSpeed),
                        targets: [nearest.enemy],
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Cavalier.png",
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Gunner",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Gunner.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Common",
            "damageType": "Normal",
            "cost" : 10,
            "damage" : 1.82,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 5,
            "cooldown": 4.65,
            "abilityDescription": "<b>Spread Shot</b>: Has 10% chance to fire a 2 (+1 per ability) spread shot dealing 20% (+1% per Level) damage.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;

                if (nearest) {
                    unit.variable.targets = [nearest.enemy];
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 23,
                        speed: 12 * (unit?.projectileSpeed),
                        targets: [nearest.enemy],
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Bullet.png",
                        color: "purple",
                        owner: unit,
                    });
                }

                if(nearest){
                    if(triggerChance(0.1 * unit.triggerChance)){
                        if(!unit.record.spreadShotCount) unit.record.spreadShotCount = 0;
                        unit.record.spreadShotCount += 1;

                        let shotCount = (2 + Math.floor(unit.ability));
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
                                size: 23,
                                speed: 12 * (unit?.projectileSpeed),
                                damage: (unit.damage * (0.2 + (0.01 * unit.level))),
                                direction: finalAngle,     
                                location: { x: x, y: y },
                                image: "/Images/Projectiles/Bullet.png",
                                owner: unit,
                                piercing: true,                 
                                lifetime: 90,                  
                                hitEnemies: new Set(),         
                            });
                        }
                    }
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Halberdier",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Halberdier.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Uncommon",
            "damageType": "Normal",
            "cost" : 10,
            "damage" : 1.62,
            "ability" : 1,
            "mana" : 0,
            "manaRegen": 0,
            "abilityCooldown": 0,
            "cooldown": 2.95,
            "abilityDescription": "<b>Cull</b>: Deals extra 9% (+1% per ability) current health of the enemy.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;

                if (nearest) {
                    unit.variable.targets = [nearest.enemy];
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 20,
                        speed: 12 * (unit?.projectileSpeed),
                        targets: [nearest.enemy],
                        damage: unit.damage + parseFloat(nearest.enemy.health * (0.09 + (0.01 * unit.ability))),
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Crescent.png",
                        color: "purple",
                        owner: unit,
                    });

                    if(!unit.record.cullDamage) unit.record.cullDamage = 0;
                    unit.record.cullDamage += parseFloat((nearest.enemy.health * (0.09 + (0.01 * unit.ability))).toFixed(2));
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Island",
            "resource": "Natura",
            "image": {
                source: "/Images/Animations/Island.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Epic",
            "damageType": "Pure",
            "cost" : 385,
            "damage" : 0,
            "ability" : 1,
            "mana" : 60,
            "manaRegen": 2,
            "abilityCooldown": 0,
            "cooldown": 10,
            "abilityDescription": "<b>Mana Well</b>: Gives all other allies 25% (+10% per ability) of their maxmana. Does not include the same units. <div class='flex justify-between'><div><b>Casting</b>: Anytime</div><div><b>Manacost</b>: 50</div><div><b>Cooldown</b>: 0</div></div><br><hr><b>Natural Growth</b>: Does not attack but gains 5% maxmana as experience and restores 10% maxmana.</b>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                
                const manaCost = 50; // adjust as needed
                if (unit.mana >= manaCost) {
                    unit.mana -= manaCost;
                    unit.record.manaSpent += manaCost;
                    if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                    unit.record.abilityUses += 1;

                    
                    hitEffects.value.push({
                        x: (x * 45) + 45,
                        y: (y * 45) + 40,
                        radius: 25,
                        alpha: 1,
                        color: "rgba(5, 125, 255, 1)", // yellowish glow
                        decay: 0.03, // how fast it fades
                        grow: 0.5, // how fast it expands
                    });

                    units.value.forEach(row => {
                        row.forEach(target => {
                            if(target){
                                if(target.name != "Island"){
                                    target.mana += target.maxmana * (0.25 + (0.1 * unit.ability));
                                    if(target.mana > target.maxmana){
                                        target.mana = target.maxmana;
                                    }
                                }
                            }
                        })
                    })
                };

                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;

                unit.experience += parseFloat((unit.maxmana * 0.05) * (unit.cooldown / unit.baseCooldown));
                unit.mana += unit.maxmana * (0.1);
                if(unit.mana > unit.maxmana){
                    unit.mana = unit.maxmana;
                }
                if(unit.experience >= unit.nextLevelExp){
                    unit.onLevel(unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y);
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Laser Turret",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Laser_Turret.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Uncommon",
            "damageType": "Pure",
            "cost" : 150,
            "damage" : 2.82,
            "ability" : 1,
            "mana" : 20,
            "manaRegen": 1,
            "abilityCooldown": 5,
            "cooldown": 0.25,
            "abilityDescription": "<b>Plasma Battery</b>: Attacks at the cost of Mana.",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                if(unit.mana < 2){
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;
                unit.mana -= 2;

                if (nearest) {
                    unit.variable.targets = [nearest.enemy];
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 10,
                        speed: 20 * (unit?.projectileSpeed),
                        targets: [nearest.enemy],
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        color: "red",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Lord",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Lord.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Uncommon",
            "damageType": "Normal",
            "cost" : 125,
            "damage" : 2.92,
            "ability" : 1,
            "mana" : 21,
            "manaRegen": 1,
            "abilityCooldown": 5,
            "cooldown": 2.61,
            "abilityDescription": "<b>Selfish Leader</b>: Gains 20% damage of all units and flat (200% ability) damage. <div class='flex justify-between'><div><b>Casting</b>: On Attack</div><div><b>Manacost</b>: 20</div><div><b>Cooldown</b>: 0</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.timer < unit.cooldown){
                    unit.timer += 0.1;
                    return;
                }

                unit.attacking = true;
                unit.image.frame = 0;
                unit.timer -= unit.cooldown;

                if (nearest) {
                    unit.variable.targets = [nearest.enemy];
                    projectiles.value.push({
                        x: (x * 45) + 40,
                        y: (y * 45) + 40,
                        size: 15,
                        speed: 15 * (unit?.projectileSpeed),
                        targets: [nearest.enemy],
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Crescent.png",
                        color: "purple",
                        owner: unit,
                    });
                }

                const manaCost = 20; // adjust as needed
                if (unit.mana < manaCost) return; // not enough mana

                unit.mana -= manaCost;
                unit.record.manaSpent += manaCost;
                if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                unit.record.abilityUses += 1;

                let gain = 0;
                units.value.forEach(row => {
                    row.forEach(target => {
                        if(target && target.name != "Lord"){
                            target.buffs = target.buffs || [];
                            gain += parseFloat(target.damage * 0.2)
                            target.buffs.push({
                                name: "Obligation",
                                description: "Loses Damage",
                                duration: (10 * unit.buffDuration) * target.debuffDuration,
                                baseDuration: 10,
                                isApplied: false,
                                stacking: false,
                                source: unit,
                                owner: target,
                                variable: {}, // stores internal state
                                onApply: (p, buff) => {
                                    buff.variable.damageLose = parseFloat(p.damage * 0.2); // store how much was added
                                    p.damage -= parseFloat(buff?.variable?.damageLose || 0);
                                },
                                onRemove: (p, buff) => {
                                    p.damage += parseFloat(buff?.variable?.damageLose || 0);
                                },
                            });
                        }
                    })
                });

                gain += parseFloat(2 * unit.ability);
                
                unit.buffs.push({
                    name: "Leadership",
                    description: "Gains Damage",
                    duration: 10 * unit.buffDuration,
                    baseDuration: 10,
                    isApplied: false,
                    stacking: false,
                    source: unit,
                    owner: unit,
                    variable: {}, // stores internal state
                    onApply: (p, buff) => {
                        buff.variable.damageGain = parseFloat(gain); // store how much was added
                        p.damage += parseFloat(buff?.variable?.damageGain || 0);
                    },
                    onRemove: (p, buff) => {
                        p.damage -= parseFloat(buff?.variable?.damageGain || 0);
                    },
                });
                
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Mage",
            "resource": "Metio",
            "image": {
                source: "/Images/Animations/Mage.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Uncommon",
            "damageType": "Normal",
            "cost" : 60,
            "damage" : 2.32,
            "ability" : 1,
            "mana" : 12,
            "manaRegen": 1,
            "abilityCooldown": 6,
            "cooldown": 4.25,
            "abilityDescription": "<b>Fire Burst (Active)</b> : Fires a blast on the current target and nearby enemies (75 (+50 per ability)) dealing distributed (1000% ability) damage. <div class='flex justify-between'><div><b>Casting</b>: Has Enemy</div><div><b>Manacost</b>: 10</div><div><b>Cooldown</b>: 6</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.abilityTimer >= unit.abilityCooldown){
                    
                    const manaCost = 11;
                    if (unit.mana >= manaCost) {
                        unit.abilityTimer -= unit.abilityCooldown;
                        const target = nearest.enemy;
                        unit.mana -= manaCost;
                        unit.record.manaSpent += manaCost;
                        
                        if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                        unit.record.abilityUses += 1;

                        unit.attacking = true;
                        unit.image.frame = 0;

                        unit.onCast(unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y);

                        const splashRadius = 75 + parseFloat(50 * unit.ability); // how close other enemies must be (in pixels)
                        const splashDamage = unit.ability * 10;

                        hitEffects.value.push({
                            x: target.x + target.size / 2,
                            y: target.y + target.size / 2,
                            radius: 30 + parseFloat(25 * unit.ability),
                            alpha: 1,
                            color: "rgba(255, 200, 0, 1)", // yellowish glow
                            decay: 0.03, // how fast it fades
                            grow: 0.5, // how fast it expands
                        });

                        let affectedEnemies = [];
                        
                        enemies.value.forEach((enemy) => {
                            const dx = (enemy.x + enemy.size / 2) - (target.x + target.size / 2);
                            const dy = (enemy.y + enemy.size / 2) - (target.y + target.size / 2);
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist <= splashRadius) {
                                affectedEnemies.push(enemy);
                            }
                        });

                        affectedEnemies.forEach(enemy => {
                            if(!unit.record.abilityTotalDamage) unit.record.abilityTotalDamage = 0;
                            unit.record.abilityTotalDamage += parseFloat((splashDamage / affectedEnemies.length).toFixed(2));
                            enemy.onTakeDamage(parseFloat(splashDamage / affectedEnemies.length),null,damageTexts, hitEffects, areaFields, resource,units,enemies,unit,projectiles,x,y, false);
                        })

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
                            size: 8,
                            speed: 6 * (unit?.projectileSpeed),
                            damage: unit.damage,
                            target: nearest.enemy,
                            location: {x:x,y:y},
                            color: "blue",
                            owner: unit,
                        });
                    }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Mecha",
            "resource": "Machina",
            "image": {
                source: "/Images/Animations/Mecha.png",
                frame: 0,
                frameCount: 5,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Rare",
            "damageType": "Normal",
            "cost" : 285,
            "damage" : 3.62,
            "ability" : 1,
            "mana" : 21,
            "manaRegen": 1,
            "abilityCooldown": 1,
            "cooldown": 3.81,
            "abilityDescription": "<b>Missile Barrage (Active)</b> : Fires a 5 (+1 per Level) missles targeting random areas dealing (250% ability) damage. <div class='flex justify-between'><div><b>Casting</b>: Has Enemy</div><div><b>Manacost</b>: 20</div><div><b>Cooldown</b>: 6</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                if (enemies.value.length === 0) return;

                let nearest = enemies.value.reduce((closest, enemy) => {
                    const dx = (enemy.x + enemy.size/2) - (x * 100 + 50);
                    const dy = (enemy.y + enemy.size/2) - (y * 100 + 50);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
                }, null);
                
                if(unit.abilityTimer >= unit.abilityCooldown){
                    
                    const manaCost = 20;
                    if (unit.mana >= manaCost) {
                        unit.abilityTimer -= unit.abilityCooldown;
                        unit.mana -= manaCost;
                        unit.record.manaSpent += manaCost;
                        
                        if(!unit.record.abilityUses) unit.record.abilityUses = 0;
                        unit.record.abilityUses += 1;

                        unit.attacking = true;
                        unit.image.frame = 0;

                        unit.onCast(unit, null, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y);

                        const splashRadius = 100; // how close other enemies must be (in pixels)
                        const splashDamage = unit.ability * 2.5;

                        for(let i = 0; i < (5 + unit.level); i++){
                            let target = {
                                x: Math.random() * 1200,
                                y: Math.random() * 400,
                            }

                            hitEffects.value.push({
                                x: target.x,
                                y: target.y,
                                radius: 35,
                                alpha: 1,
                                color: "rgba(212, 69, 3, 1)", // yellowish glow
                                decay: 0.03, // how fast it fades
                                grow: 0.5, // how fast it expands
                            });

                            enemies.value.forEach((enemy) => {
                                const dx = (enemy.x + enemy.size / 2) - (target.x);
                                const dy = (enemy.y + enemy.size / 2) - (target.y);
                                const dist = Math.sqrt(dx * dx + dy * dy);

                                if (dist <= splashRadius) {
                                    if(!unit.record.abilityTotalDamage) unit.record.abilityTotalDamage = 0;
                                    unit.record.abilityTotalDamage += parseFloat((splashDamage).toFixed(2));
                                    enemy.onTakeDamage(parseFloat(splashDamage),null,damageTexts, hitEffects, areaFields, resource,units,enemies,unit,projectiles,x,y, false);
                                }
                            });
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
                            size: 8,
                            speed: 6 * (unit?.projectileSpeed),
                            damage: unit.damage,
                            target: nearest.enemy,
                            location: {x:x,y:y},
                            color: "#FF4433",
                            owner: unit,
                        });
                    }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        {
            "name": "Mechspider",
            "resource": "Machina",
            "image": {
                source: "/Images/Animations/Mechspider.png",
                frame: 0,
                frameCount: 6,
                frameWidth: 64,
                frameHeight: 96,
            },
            "description": "",
            "rarity": "Uncommon",
            "damageType": "Normal",
            "cost" : 135,
            "damage" : 0.02,
            "ability" : 1,
            "mana" : 12,
            "manaRegen": 1,
            "abilityCooldown": 10,
            "cooldown": 3.45,
            "abilityDescription": "<b>Spin Web (Active)</b> : Creates a web in an (50) area slowing enemies for 10% (+1% per Level) last for 10 (+1 per Ability) turns. <div class='flex justify-between'><div><b>Casting</b>: Has Enemy</div><div><b>Manacost</b>: 10</div><div><b>Cooldown</b>: 3</div></div>",
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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

                        unit.onCast(unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y);

                        const splashRadius = 75; // how close other enemies must be (in pixels)
                        
                        areaFields.value.push({
                            name: "Web",
                            x: target.x,
                            y: target.y,
                            radius: 50,
                            color: 'black',
                            duration: 10 + (1 * unit.ability), // 3 seconds
                            elapsed: 0,
                            affectedUnits: new Set(),
                            onEnter: (enemy, field) => {},
                            onTurn: (field) => {
                                for (let enemy of enemies.value) {
                                    if (isInField(enemy, field)) {
                                        enemy.buffs.push({
                                            name: "Web!",
                                            description: "Slowed Movement.",
                                            duration: (0.5 * unit.buffDuration) * target.debuffDuration,
                                            baseDuration: 0.5,
                                            isApplied: false,
                                            stacking: false,
                                            variable: {},
                                            source: unit,
                                            owner: target,
                                            onApply: (p, buff) => {
                                                buff.variable.lostSpeed = parseFloat(p.speed * (0.2 + (0.01 * unit.level))) * (p.slowEffectivity); // store original speed
                                                p.speed -= parseFloat(buff.variable.lostSpeed); // stun = can't move
                                            },
                                            onRemove: (p, buff) => {
                                                p.speed += parseFloat(buff.variable.lostSpeed);
                                                // p.speed += parseFloat(buff.variable.lostSpeed); // restore
                                            },
                                        });
                                    }
                                }
                            },
                            onLeave: (enemy, field) => {},
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
                            size: 8,
                            speed: 6 * (unit?.projectileSpeed),
                            damage: unit.damage,
                            target: nearest.enemy,
                            location: {x:x,y:y},
                            color: "blue",
                            owner: unit,
                        });
                    }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
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
        baseBuffDuration: f?.buffDuration || 1,
        baseDebuffDuration: f?.debuffDuration || 1,
        baseTriggerChance: 1,
        baseCritChance: f?.critChance || 0.05,
        baseCritDamage: f?.critDamage || 1.5,

        critChance: f?.critChance || 0.05,
        critDamage: f?.critDamage || 1.5,

        projectileSpeed: f?.projectileSpeed || 1,
        buffDuration: f?.buffDuration || 1,
        debuffDuration: f?.debuffDuration || 1,
        triggerChance: f?.triggerChance || 1,
        xpGain: f?.xpGain || 1,
        bountyGain: f?.bountyGain || 1,
        dropChance: f?.dropChance || 1,
        dropQuality: f?.dropQuality || 1,
        buffs: [],
        debuffs: [],
        items: [],
        variable: {},

        originalSellValue: f.sellValue,
        
        timer: 0,
        abilityTimer: f?.abilityCooldown - 1 || 0,
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


function isInField(unit, field) {
  const dx = unit.x - field.x;
  const dy = unit.y - field.y;
  return Math.sqrt(dx * dx + dy * dy) <= field.radius;
}
/*
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
            onDamage: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCrit: (unit, target, projectile, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onEffect: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onGrowth: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onLevel: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
                unit.level += 1;
                unit.damage += parseFloat(unit.baseDamage * 0.1);
                unit.ability += parseFloat(unit.baseAbility * 0.1);
                unit.maxmana += parseFloat(unit.baseMaxmana * 0.1);
                unit.manaRegen += parseFloat(unit.baseManaRegen * 0.1);
                unit.critChance += 0.001;
                unit.critDamage += 0.01;
                unit.nextLevelExp += parseFloat(unit.nextLevelExp * 1.1);
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
            onTurn: (unit, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{
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
                        speed: 8 * (unit?.projectileSpeed),
                        damage: unit.damage,
                        target: nearest.enemy,
                        location: {x:x,y:y},
                        image: "/Images/Projectiles/Crescent.png",
                        color: "purple",
                        owner: unit,
                    });
                }
            },
            onKill: (unit, target, damageTexts, hitEffects, areaFields, resource, units, enemies, projectiles, x, y)=>{},
            onTrigger: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
            onCast: (unit, target, damageTexts, hitEffects, areaFields,  resource, units, enemies, projectiles, x, y)=>{},
        },
        */


