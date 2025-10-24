<script setup>

import { getUnits } from '@/Resources/Units';
import { Rarity } from '@/Resources/Rarity';
import { onMounted, ref, watch } from 'vue';
import { getItems } from '@/Resources/Items';
import { getConsumables } from '@/Resources/Consumables';

const dialog = defineModel("show");
const resources = defineModel("resources");
const items = defineModel('items');
const stage = defineModel('stage');
const Items = [...getItems()];

const description = ref("Pick a Resource");
const shop = ref([]);
const current_stage = ref(null);

const pick = (res) => {
  if (resources.value['Coins'] < res.cost) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Not enough Coins!',
    });
    return;
  }

  Swal.fire({ title: `${res.name}`, text: `Are you sure you want to buy this item?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes, buy it!', cancelButtonText: 'Cancel', }).then((result) => {
    if (result.isConfirmed) {
      resources.value['Coins'] -= res.cost;
      items.value.push(res);

      const index = shop.value.indexOf(res);
      if (index !== -1) shop.value.splice(index, 1);
    }
  });

  
};

watch(dialog, (newVal)=>{
  if(newVal){
    if(current_stage.value != stage.value){
      current_stage.value = stage.value;
      shop.value = [];
      for(let i = 0; i < 9; i++){
      // Build weightedItems array based on rarity chance
      const weightedItems = [];
        Items.forEach(item => {
          const rarityChance = Rarity[item.rarity]?.chance || 0;
          const count = Math.floor(rarityChance * 1000);
          for (let j = 0; j < count; j++) {
            weightedItems.push(item);
          }
        });

        // Pick a random item for the shop slot
        if (weightedItems.length > 0) {
          shop.value[i] = weightedItems[Math.floor(Math.random() * weightedItems.length)];
        } else {
          shop.value[i] = Items[Math.floor(Math.random() * Items.length)];
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

          <v-toolbar-title>Item Shop</v-toolbar-title>
          <v-toolbar-items>
            <div class="flex items-center gap-1 pe-5" style="font-size: 30px;">
                  <img class="w-[50px]" :src="'/icons/Coins.png'"></img>
                  <span>{{ resources['Coins'].toFixed(0) }}</span>
              </div>
          </v-toolbar-items>
        </v-toolbar>        
          <v-card-text class="overflow-y-auto">
            <div class="grid grid-cols-3 gap-4 w-full mt-4 mx-2">
              <v-card v-for="res in shop" :key="res.id" @click="pick(res)" :disabled="res.cost > resources.Coins">
                <v-card-title>
                  <div class="flex justify-between">
                    <div class="w-fit"><v-chip size="30" :style="'color: '+Rarity[res?.rarity].color+';'" class="text-sm p-2"><span style="color:black;"><v-icon size="30" :style="'color: '+Rarity[res?.rarity].color+';'">mdi-star</v-icon>{{res?.rarity}}</span></v-chip></div>
                    <div class="w-full text-center">{{  res?.name }}</div>
                    <div class="w-fit flex items-center"></div>
                  </div>
                </v-card-title>
                <div class="flex">
                  <div class="flex flex-col items-center p-5">
                    <img class="w-[125px] min-h-[125px]" :src="res.image" style="object-fit: contain; height: 100%"/>
                  </div>
                  <div class="flex flex-col items-center p-5 justify-center">
                    <span style="font-size:25px;" v-html="res.abilityDescription"></span>
                  </div>
                </div>
                 <div class="flex gap-2 justify-end me-5">
                  <img class="w-[50px]" :src="'/icons/Coins.png'"></img>
                  <span style="font-size:30px;">{{ parseFloat(res.cost).toFixed(0) }}</span>
                </div>
              </v-card>
            </div>
          </v-card-text>
      </v-card>
    </v-dialog>
</template>