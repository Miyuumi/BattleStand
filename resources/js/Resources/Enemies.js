import { Enemy } from "./EnemyClass";
import { Races } from "./Races";

export const getEnemies = (wave) => {
    let races = Races;
    let raceNames = Object.keys(races);
    let raceName = raceNames[Math.floor(Math.random() * raceNames.length)];
    let race = races[raceName][Math.floor(Math.random() * races[raceName].length)];
    
    let rand = Math.floor(Math.random() * 4);
    let count = 10;
    let balance = 1;
    let antibalance = 1;
    let type = "Normal";
    
    switch(rand){
        case 0:
            count = 10;
            balance = 1;
            antibalance = 1;
            type = "Normal";
            break;
        case 1:
            count = 10;
            balance = 1;
            antibalance = 1;
            type = "Normal";
            break;
        case 2:
            count = 1;
            balance = 10;
            antibalance = 0.5;
            type = "Boss";
            break;
        case 3:
            count = 20;
            balance = 0.5;
            antibalance = 1;
            type = "Mass";
            break;
    }
    
    let enemies = [];

    if(wave <= 10){
        let baseHealth = 1 + (wave * 0.275);

        count = 10;
        balance = 1;
        antibalance = 1;

        for(let i = 0; i < count; i++){
            let enemy = new Enemy(
                {
                    name: race.name,
                    health: baseHealth * balance,
                    mana: 10 * balance,
                    damage: 1 * balance,
                    wave: wave,
                    level: 1,
                    value: 1 * balance,
                    bounty: (1 * balance) * Math.floor(1 + (wave / 20)),
                    experience: 1 * balance,
                    type: type,
                    size: 30,
                    x: 1200,
                    y: 100,
                    speed: 1 * antibalance,
                    image: race.image,
                    race: race
                }
            );
            enemies.push(enemy);
        }
    }else{
        let baseHealth = 1 + (wave * 0.275) +  (wave * wave * 0.1075);
        
        for(let i = 0; i < count; i++){
            let enemy = new Enemy(
                {
                    name: race.name,
                    health: baseHealth * balance,
                    mana: 10 * balance,
                    damage: 1 * balance,
                    wave: wave,
                    level: 1,
                    value: 1 * balance,
                    bounty: 1 * balance,
                    experience: 1 * balance,
                    type: type,
                    size: 30,
                    x: 1200,
                    y: 100,
                    speed: 1 * antibalance,
                    image: race.image,
                    race: race
                }
            );
            enemies.push(enemy);
        }
    }

    

    return enemies;
};