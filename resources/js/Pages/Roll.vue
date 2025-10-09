<script setup>

import { getUnits } from '@/Resources/Units';
import { Rarity } from '@/Resources/Rarity';
import { onMounted, ref, watch } from 'vue';
const dialog = defineModel("show");
const inventory = defineModel("inventory");
const resources = defineModel("resources");

const Unit = ref(getUnits());
const plants = ref([null,null,null]);
const rolling = ref(()=>{});
const started = ref(false);
const canClose = ref(true);

const description = ref("Pick a Resource");
const locked = ref([]);
const pick = (res)=>{
  
  if(resources.value[res] < 1){
    description.value = "Resource is Insufficient";
    return;
  };

  plants.value = [];
  let cost = Math.min(resources.value[res], 10);
  for(let i = 0; i < cost; i++){
    plants.value.push(null);
  }

  started.value = true;

  if(res != "Seeds"){
    Unit.value = getUnits().filter((p) => p.resource == res);
  }else{
    Unit.value = getUnits();
  }
  
  canClose.value = false;
  description.value = "Rolling...";
    
  plants.value.forEach((plant, index)=>{
    setTimeout(()=>{
      resources.value[res] -= 1;
      const existing = inventory.value.find(f => f.name === plants.value[index].name);
      if (existing) {
        existing.count += 1;
      } else {
        inventory.value.push({
          ...plants.value[index],
          count: 1,
        });
      }

      locked.value.push(index);
    }, 500 * (index + 1));
  })

  setTimeout(()=>{
    description.value = "Finalized";
  }, (500 * (cost )));

  setTimeout(()=>{
    
    description.value = "Finalized";
    locked.value = [];
    dialog.value = false;
  }, (500 * (cost + 1)) + 1500);

  setTimeout(()=>{
    canClose.value = true;
    started.value = false;
    clearInterval(rolling.value);
    rolling.value = ()=>{};
    
  }, (500 * (cost + 1)) + 2000);
}

watch(dialog, (newVal)=>{
  if(newVal){
    rolling.value = setInterval(()=>{
      let temp = plants.value;
      temp.forEach((plant, index)=>{
        if(locked.value.includes(index)) return;
        plants.value[index] = Unit.value[Math.floor(Math.random() * Unit.value.length)];
      });
    },100);
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
            v-if="canClose"
            icon="mdi-close"
            @click="dialog = false"
          ></v-btn>

          <v-toolbar-title>Roll a Flower</v-toolbar-title>
        </v-toolbar>

        <div class="flex justify-center w-full text-gray-500 mt-5" style="font-size: 26px">{{description}}</div>
        <div class="w-full border-b border-gray-300 mt-2 mb-5"></div>
        
         <div class="flex flex-wrap justify-center items-center h-full w-full" v-if="started">
            <v-card class="m-2 w-64 h-64" v-for="plant in plants">
              <v-card-title>
                <div class="flex justify-between" v-if="plant">
                  <div class="w-fit"><v-icon size="30" :style="'color: '+Rarity[plant?.rarity].color+';'">mdi-star</v-icon></div>
                  <div class="w-full text-center">{{  plant?.name }}</div>
                  <div class="w-fit flex items-center"></div>
                </div>
              </v-card-title>
              <v-card-text class="flex justify-center w-full h-full items-center" style="height: calc(100% - 24px);">
                  <img v-if="plant" :src="'/images/'+plant?.name+'.png'" style="object-fit: contain; height: 100%"></img> 
              </v-card-text>
            </v-card>
          </div>

          
          <div v-else>
          
          <div class="flex flex-wrap justify-around items-center h-full w-full">
            <v-card v-for="res in Object.entries(resources).filter(([key, value]) => key !== 'Coins' && key !== 'Water' && key !== 'Life' && key !== 'currentSeason')" @click="pick(res[0])">
              <div class="flex flex-col items-center p-5 gap-1">
                  <img class="w-[150px]" :src="'/icons/'+res[0]+'.png'"></img>
                  <span style="font-size:30px;">{{ res[1].toFixed(2) }}</span>
              </div>
            </v-card>
          </div>
          </div>
      </v-card>
    </v-dialog>
</template>