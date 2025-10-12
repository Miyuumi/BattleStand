<script setup>

import { getEnemies } from '@/Resources/Enemies';
import { Enemy } from '@/Resources/EnemyClass';
import { getUnits } from '@/Resources/Units';
import { Rarity } from '@/Resources/Rarity';
import { nextTick, onMounted, ref, watch } from 'vue';
const dialog = defineModel("show");
const inventory = defineModel("inventory");
const resources = defineModel("resources");
const fields = defineModel("fields");
const stage = defineModel("stage");
const enemies = ref([]);
const Enemies = ref([]);
const enemyValue = ref(0);
const projectiles = ref([]);
const gameUpdate = ref(()=>{});
const damageTexts = ref([]);
const hitEffects = ref([]);

const canvasRef = ref(null);
let ctx = null;
let animationId = null;

// Square properties
const battleField = ref({
  width: 1200,
  height: 400,
});

const update = ()=>{
  console.log("Turn");
  
  enemies.value.forEach((enem) => {
    if (enem && typeof enem.onTurn === "function") {

      if (enem.buffs && enem.buffs.length > 0) {
        
        for (let i = enem.buffs.length - 1; i >= 0; i--) {
          const buff = enem.buffs[i];
          if (!buff.isApplied) {
            if (!buff.stacking) {
              const otherBuff = enem.buffs.find(b => b !== buff && b.name === buff.name);
              if (otherBuff) {
                buff.duration = Math.max(buff.duration, otherBuff.duration);
                enem.buffs.splice(enem.buffs.indexOf(otherBuff), 1);

                damageTexts.value.push({
                  x: enem.x + enem.size / 2,
                  y: enem.y - 10,
                  text: buff.name + " Refreshed",
                  color: "darkblue",
                  size: 12,
                  alpha: 1,
                  vy: -0.8,
                });
              } else {
                if (buff.onApply) buff.onApply(enem, buff);
                damageTexts.value.push({
                  x: enem.x + enem.size / 2,
                  y: enem.y - 10,
                  text: buff.name + " Applied",
                  color: "darkblue",
                  size: 12,
                  alpha: 1,
                  vy: -0.8,
                });
              }
            } else {
              if (buff.onApply) buff.onApply(enem, buff);
              damageTexts.value.push({
                x: enem.x + enem.size / 2,
                y: enem.y - 10,
                text: buff.name + " Applied",
                color: "darkblue",
                size: 12,
                alpha: 1,
                vy: -0.8,
              });
            }
            buff.isApplied = true;
          }

          // ② Per-turn effect
          if (buff.onTurn) buff.onTurn(enem, buff);

          // ③ Decrease duration
          buff.duration -= 0.1;

          // ④ Remove when finished
          if (buff.duration <= 0) {
            if (buff.onRemove) buff.onRemove(enem, buff);
            enem.buffs.splice(i, 1);
            damageTexts.value.push({
              x: enem.x + enem.size / 2,
              y: enem.y - 10,
              text: buff.name + " Ended",
              color: "red",
              size: 12,
              alpha: 1,
              vy: -0.8,
            });
          }
        }
      }

      // === Enemy behavior ===
      enem.onTurn(enem, damageTexts, hitEffects, resources, fields, enemies, projectiles, enem.x, enem.y);
    }
  });

  fields.value.forEach((row, rowIndex) => {
    row.forEach((plant, colIndex) => {
      if (plant && typeof plant.onTurn === "function") {

        if (plant.buffs && plant.buffs.length > 0) {
          for (let i = plant.buffs.length - 1; i >= 0; i--) {
            const buff = plant.buffs[i];

            if (!buff.isApplied){
              
              if(!buff.stacking) {
                const otherBuff = plant.buffs.find(b => b !== buff && b.name === buff.name);
                if (otherBuff) {
                  buff.duration = Math.max(buff.duration, otherBuff.duration);
                  plant.buffs.splice(plant.buffs.indexOf(otherBuff), 1);
                  damageTexts.value.push({
                    x: (colIndex * 32) + 65,
                    y: (rowIndex * 32) + 60,
                    text: buff.name + " Refreshed",
                    color: "green",
                    size: 12,
                    alpha: 1,
                    vy: -0.8, // upward speed
                  });
                }else{
                  if (buff.onApply) buff.onApply(plant, buff);
                  damageTexts.value.push({
                    x: colIndex * 32 + 65,
                    y: rowIndex * 32 + 60,
                    text: buff.name + " Applied",
                    color: "green",
                    size: 12,
                    alpha: 1,
                    vy: -0.8, // upward speed
                  });
                }
              }else{
                if (buff.onApply) buff.onApply(plant, buff);
                damageTexts.value.push({
                  x: (colIndex * 32) + 65,
                  y: (rowIndex * 32) + 60,
                  text: buff.name + " Applied",
                  color: "green",
                  size: 12,
                  alpha: 1,
                  vy: -0.8, // upward speed
                });
              }
              buff.isApplied = true;
            }

            if (buff.onTurn) buff.onTurn(plant, buff);

            buff.duration -= 0.1;

            if (buff.duration <= 0) {
              if (buff.onRemove) buff.onRemove(plant, buff);
              plant.buffs.splice(i, 1);
              damageTexts.value.push({
                  x: (colIndex * 32) + 65,
                  y: (rowIndex * 32) + 60,
                  text: buff.name + " Ended",
                  color: "red",
                  size: 12,
                  alpha: 1,
                  vy: -0.8, // upward speed
              });
            }
          }
        }

        plant.onTurn(plant, damageTexts, hitEffects, resources, fields, enemies, projectiles, rowIndex, colIndex);

        if(plant.mana < plant.maxmana){
          plant.mana += (0.1 * plant.manaRegen);
          if(plant.mana > plant.maxmana) plant.mana = plant.maxmana;
        }
      }
    });
  });

  if(enemies.value.length === 0){
    dialog.value = false;
    clearInterval(gameUpdate.value);
    gameUpdate.value = null;

  }
}

function draw() {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  enemies.value.forEach((enemy) => {
    // Move enemy left
    enemy.x -= enemy.speed;

    // Draw enemy sprite
    if (enemy.sprite && enemy.sprite.complete) {
      ctx.drawImage(enemy.sprite, enemy.x, enemy.y, enemy.size, enemy.size);
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    }

    // === Draw health bar ===
    const barWidth = enemy.size;
    const barHeight = 5;
    const healthPercent = Math.max(enemy.health, 0) / enemy.maxhealth; // assuming max health = 10
    const barX = enemy.x;
    const barY = enemy.y - 10; // above the enemy

    // background (gray)
    ctx.fillStyle = "gray";
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // health (green to red)
    ctx.fillStyle = healthPercent > 0.5 ? "green" : "red";
    ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);

    // === Respawn or remove ===
    if (enemy.x < -enemy.size) {
      enemy.x = canvasRef.value.width; // respawn
      resources.value.Life -= enemy.damage;
      // or: remove if you want it gone
      // enemies.value.splice(index, 1);
    }
  });

  // Draw plants
  fields.value.forEach((row, rowIndex) => {
    row.forEach((plant, colIndex) => {
      if (plant && plant.image) {
        updatePlantAnimation(plant, 0.1); // advance animation
        drawPlant(ctx, plant, colIndex, rowIndex);
      }
    });
  });

  projectiles.value.forEach((proj, index) => {
    // === Lifetime system ===
    if (proj.lifetime !== undefined) {
      proj.lifetime--;
      if (proj.lifetime <= 0) {
        projectiles.value.splice(index, 1);
        return;
      }
    }

    // === MOVEMENT ===
    if (proj.direction !== undefined) {
      // ➤ Directional projectile (like Cavalier)
      proj.x += Math.cos(proj.direction) * proj.speed;
      proj.y += Math.sin(proj.direction) * proj.speed;
    } 
    else if (proj.target) {
      // ➤ Tracking projectile (like Archer arrow)
      if (!proj.target || proj.target.health <= 0) {
        projectiles.value.splice(index, 1);
        return;
      }

      const dx = (proj.target.x + proj.target.size / 2) - proj.x;
      const dy = (proj.target.y + proj.target.size / 2) - proj.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < proj.speed) {
        // Hit!
        let source = fields.value[proj.location.x][proj.location.y];
        proj.target.onTakeDamage(proj.damage, proj, damageTexts, hitEffects, resources, fields, enemies, source, projectiles, proj.location.x, proj.location.y);
        projectiles.value.splice(index, 1);
        return;
      } else {
        proj.x += (dx / dist) * proj.speed;
        proj.y += (dy / dist) * proj.speed;
      }
    }

    // === COLLISION HANDLING ===
    if (proj.piercing) {
      // Only for directional or piercing projectiles
      enemies.value.forEach(enemy => {
        const dx = (enemy.x + enemy.size / 2) - proj.x;
        const dy = (enemy.y + enemy.size / 2) - proj.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < (proj.size + enemy.size) / 2) {
          if (!proj.hitEnemies) proj.hitEnemies = new Set();
          if (!proj.hitEnemies.has(enemy)) {
            proj.hitEnemies.add(enemy);
            let source = fields.value[proj.location.x][proj.location.y];
            enemy.onTakeDamage(proj.damage, proj, damageTexts, hitEffects, resources, fields, enemies, source, projectiles, proj.location.x, proj.location.y);

            // Add fading hit effect
            hitEffects.value.push({
              x: proj.x,
              y: proj.y,
              radius: 5,
              alpha: 0.6,
              decay: 0.05,
              grow: 0.8,
              color: "white",
            });
          }
        }
      });
    }

    // === DRAW PROJECTILE ===
    if (proj.image) {
      if (!proj.sprite) {
        proj.sprite = new Image();
        proj.sprite.src = proj.image;
      }

      if (proj.sprite.complete) {
        ctx.save();
        ctx.translate(proj.x, proj.y);
        const angle = proj.direction !== undefined
          ? proj.direction
          : proj.target
            ? Math.atan2((proj.target.y + proj.target.size / 2) - proj.y, (proj.target.x + proj.target.size / 2) - proj.x)
            : 0;
        ctx.rotate(angle);
        ctx.drawImage(proj.sprite, -proj.size / 2, -proj.size / 2, proj.size, proj.size);
        ctx.restore();
      }
    } else {
      ctx.fillStyle = proj.color || "white";
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, proj.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  for (let i = hitEffects.value.length - 1; i >= 0; i--) {
    const fx = hitEffects.value[i];

    ctx.globalAlpha = fx.alpha;
    ctx.beginPath();
    ctx.fillStyle = fx.color;
    ctx.arc(fx.x, fx.y, fx.radius, 0, Math.PI * 2);
    ctx.fill();

    // Animate
    fx.alpha -= fx.decay;
    fx.radius += fx.grow;

    if (fx.alpha <= 0) hitEffects.value.splice(i, 1);
  }
  ctx.globalAlpha = 1;

  for (let i = damageTexts.value.length - 1; i >= 0; i--) {
    let dmg = damageTexts.value[i];

    // Draw damage text
    ctx.globalAlpha = dmg.alpha;
    ctx.fillStyle = dmg.color;
    ctx.font = `${dmg.size}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(dmg.text, dmg.x, dmg.y);

    // Animate (float upward + fade)
    dmg.y += dmg.vy;
    dmg.alpha -= 0.02;

    if (dmg.alpha <= 0) {
        damageTexts.value.splice(i, 1);
    }
  }
  ctx.globalAlpha = 1;

  animationId = requestAnimationFrame(draw);
}

function updatePlantAnimation(plant, deltaTime = 0.1) {
  if (!plant.image) return;

  const img = plant.image;

  // Only animate if attacking or performing an action
  if (plant.attacking) {
    img.frame += deltaTime * 2; // Adjust speed (10 = fast, 5 = slower)
    if (img.frame >= img.frameCount) {
      img.frame = 0;
      plant.attacking = false; // animation ends
    }
  } else {
    // idle frame
    img.frame = 0;
  }
}

function drawPlant(ctx, plant, gridX, gridY) {
  const imgData = plant.image;
  if (!imgData || !imgData.sprite) return;

  const frame = Math.floor(imgData.frame) % imgData.frameCount;
  const frameX = frame * imgData.frameWidth;

  // Target size (final size on canvas)
  const drawSize = 32;

  ctx.drawImage(
    imgData.sprite,
    frameX, 0, imgData.frameWidth, imgData.frameHeight, // source (frame)
    30 + (gridY * (drawSize + 13)), 30 + (gridX * (drawSize + 13)),                 // destination position
    drawSize, drawSize                                  // destination size (scaled)
  );

  const y = 30 + (gridX * (drawSize + 13));
  const x = 30 + (gridY * (drawSize + 13));

  // === Draw resource bars ===
  const barWidth = drawSize;
  const barHeight = 4;

  // ---- MANA BAR (blue, below plant) ----
  if (plant.maxmana !== undefined) {
    const manaPercent = Math.min(plant.mana / plant.maxmana, 1);
    const manaY = y + drawSize + 2;

    // Background
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(x, manaY, barWidth, barHeight);

    // Mana fill
    ctx.fillStyle = "rgba(0, 150, 255, 0.9)";
    ctx.fillRect(x, manaY, barWidth * manaPercent, barHeight);
  }

  // ---- ENERGY BAR (yellow, below mana) ----
  if (plant.cooldown !== undefined) {
    const energyPercent = Math.min(plant.timer / plant.cooldown, 1);
    const energyY = y + drawSize + 8;

    // Background
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(x, energyY, barWidth, barHeight);

    // Energy fill
    ctx.fillStyle = "rgba(255, 215, 0, 0.9)";
    ctx.fillRect(x, energyY, barWidth * energyPercent, barHeight);
  }
}

function preloadEnemyImages() {
  enemies.value.forEach((enemy) => {
    if (!enemy.sprite) {
      const img = new Image();
      img.src = enemy.image;
      img.onload = () => {
        enemy.sprite = img;
      };
    }
  });
}

function preloadPlantImages() {
  fields.value.forEach((row) => {
    row.forEach((plant) => {
      if (plant && plant.image && !plant.image.sprite) {
        const img = new Image();
        img.src = plant.image.source;
        img.onload = () => {
          plant.image.sprite = img;
        };
      }
    });
  });
}

async function initCanvas() {
  await nextTick();
  const canvas = canvasRef.value;
  if (!canvas) return;

  canvas.width = battleField.value.width;
  canvas.height = battleField.value.height;
  ctx = canvas.getContext("2d");

  preloadEnemyImages();
  preloadPlantImages(); // from before

  gameUpdate.value = setInterval(()=>{
    update();
  }, 100);
  cancelAnimationFrame(animationId);
  draw();
}

watch(dialog, (val) => {
  
  enemyValue.value = 0;
  Enemies.value = getEnemies(stage.value);
  enemies.value = [];
  let index = 0;
  while(enemyValue.value < stage.value * 10){
    let template = Enemies.value[Math.floor(Math.random() * Enemies.value.length)];
    let enemy = Object.assign(
      Object.create(Object.getPrototypeOf(template)), 
      template
    );
    
    enemy.x = 1200 + (Math.random() * 600);
    enemy.y = 100 + (Math.random() * ((battleField.value.height - 100) - enemy.size));
    enemy.name = enemy.name + ' ' + index++;
    enemy.buffs = [];
    enemy.debuffs = [];
    enemies.value.push(enemy);
    enemyValue.value += enemy.value;
  }

  if (val) {
    initCanvas();
  } else {
    cancelAnimationFrame(animationId);
  }
});
</script>

<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Stage {{ stage }}</v-toolbar-title>
        <v-toolbar-items>
          <div class="flex flex-row-reverse w-full h-full items-center gap-5">
            <div class="flex items-center mx-4 gap-1" v-for="res in Object.entries(resources)">
                <div v-if="res[0] !== 'currentSeason'" class="flex items-center gap-1">
                    <img class="w-[30px]" :src="'/icons/'+res[0]+'.png'"></img>
                    <span>{{ res[1].toFixed(0) }}</span>
                </div>
                <div v-else>

                </div>
            </div>
        </div>
        </v-toolbar-items>
      </v-toolbar>
      <canvas ref="canvasRef"></canvas>
    </v-card>
  </v-dialog>
</template>