import { Enemy } from "./EnemyClass";

export const getEnemies = (wave) => {

    let fairy = new Enemy(
         {
            name: "Fairy",
            health: 3,
            mana: 1,
            damage: 1,
            wave: 1,
            level: 1,
            value: 1,
            experience: 1,
            size: 30,
            x: 1200,
            y: 100,
            speed: 1,
            image: "/Characters/Fairy_1.png",
        }
    );

    const enemies = [
       fairy
    ];

    return enemies.filter(enemy => enemy.wave <= wave);
};