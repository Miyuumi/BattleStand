<script setup>

import { getUnits } from '@/Resources/Units';
import { Rarity } from '@/Resources/Rarity';
import { onMounted, ref, watch } from 'vue';
import { getItems } from '@/Resources/Items';

const dialog = defineModel("show");
const resources = defineModel("resources");
const inventory = defineModel('inventory');
const stage = defineModel('stage');
const Units = getUnits();

const description = ref("Pick a Resource");
const shop = ref([]);
const current_stage = ref(null);
const pick = (res)=>{
  if(resources.value['Coins'] < res.cost){
    description.value = "Not Enough Coins";
    return;
  }else{
    resources.value['Coins'] -= res.cost;
    inventory.value.push(res);
    const index = shop.value.indexOf(res);
    if (index !== -1) shop.value.splice(index, 1);
  }
}

watch(dialog, (newVal)=>{
  if(newVal){
    if(current_stage.value != stage.value){
      current_stage.value = stage.value;
      shop.value = [];
      for(let i = 0; i < 9; i++){
        const weightedUnits = [];
        Units.forEach(unit => {
          let rarityChance = Rarity[unit.rarity]?.chance || 0;
          switch (unit.rarity) {
            case 'Uncommon':
          rarityChance += stage.value * 0.0001;
          break;
            case 'Rare':
          rarityChance += stage.value * 0.0005;
          break;
            case 'Unique':
          rarityChance += stage.value * 0.001;
          break;
            case 'Legendary':
          rarityChance += stage.value * 0.0015;
          break;
            case 'Mythical':
          rarityChance += stage.value * 0.0020;
          break;
          }
          const count = Math.floor(rarityChance * 1000);
          for (let j = 0; j < count; j++) {
            weightedUnits.push(unit);
          }
        });

        // Pick a random item for the shop slot
        if (weightedUnits.length > 0) {
          shop.value[i] = weightedUnits[Math.floor(Math.random() * weightedUnits.length)];
        } else {
          shop.value[i] = Units[Math.floor(Math.random() * Units.length)];
        }
      }
    }else{
      
    }
  }
})

onMounted(()=>{
  
})

</script>
<template>
    <v-dialog
      v-model="dialog"
      fullscreen
    >

      <v-card>
        <v-toolbar>
          <v-btn
            icon="mdi-close"
            @click="dialog = false"
          ></v-btn>

          <v-toolbar-title>Unit Shop</v-toolbar-title>
          <v-toolbar-items>
            <div class="flex items-center gap-1 pe-5" style="font-size: 30px;">
                  <img class="w-[50px]" :src="'/icons/Coins.png'"></img>
                  <span>{{ resources['Coins'].toFixed(0) }}</span>
              </div>
          </v-toolbar-items>
        </v-toolbar>        
          <div>
            <div class="grid grid-cols-3 gap-4 w-full mt-4 mx-2">
              <v-card v-for="res in shop" :key="res.id" @click="pick(res)" :disabled="res.cost > resources.Coins">
                <v-card-title>
                  <div class="flex justify-between">
                    <div class="w-fit"><v-icon size="30" :style="'color: '+Rarity[res?.rarity].color+';'">mdi-star</v-icon></div>
                    <div class="w-full text-center">{{  res?.name }}</div>
                    <div class="w-fit flex items-center"></div>
                  </div>
                </v-card-title>
                <div class="flex h-[175px]">
                  <div class="flex flex-col items-center p-5">
                    <img class="w-[125px] min-h-[125px]" :src="'/images/'+res.name+'.png'" style="object-fit: contain; height: 100%"/>
                  </div>
                  <div class="flex flex-col items-center p-5 justify-center">
                    <span style="font-size:15px;" v-html="res.abilityDescription"></span>
                  </div>
                </div>
                 <div class="flex gap-2 justify-end me-5">
                  <img class="w-[50px]" :src="'/icons/Coins.png'"></img>
                  <span style="font-size:30px;">{{ parseFloat(res.cost).toFixed(0) }}</span>
                </div>
              </v-card>
            </div>
          </div>
      </v-card>
    </v-dialog>
</template>