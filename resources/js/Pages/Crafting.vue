<script setup>

import { getUnits } from '@/Resources/Units';
import { breakdownItem } from '@/Resources/Craft';
import { Rarity } from '@/Resources/Rarity';
import { onMounted, ref, watch } from 'vue';
import { getItems } from '@/Resources/Items';
import { getRecipes } from '@/Resources/Recipe';

const dialog = defineModel("show");
const resources = defineModel("resources");
const items = defineModel('items');
const stage = defineModel('stage');
const Units = getUnits();
const Recipes = getRecipes();
const tab = ref('one');

const shop = ref([]);
const current_stage = ref(null);
const pick = (res) => {
  let val = true;
  res.requirements.forEach(element => {
    if (!items.value.find(i => i.name === element)) {
      val = false;
      return;
    }
  });

  Swal.fire({ title: `${res.name}`, text: `Are you sure you want to craft this item?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes, craft it!', cancelButtonText: 'Cancel', }).then((result) => {
    if (result.isConfirmed) {

      if (val) {
        let totalPoints = 0;
        res.requirements.forEach(element => {
          const item = items.value.find(i => i.name === element);
          totalPoints += Rarity[item.rarity].points;
          const idx = items.value.findIndex(i => i.name === element);
          if (idx !== -1) items.value.splice(idx, 1); // Remove the item from inventory
        });
        
        if(res.name === "Craft Item"){
            let highestRarity = null;
            let highestPoints = 0;
            for (const [rarity, data] of Object.entries(Rarity)) {
              if (data.points <= totalPoints && data.points > highestPoints) {
                highestRarity = rarity;
                highestPoints = data.points;
              }
            }

            const filteredItems = getItems().filter(i => i.rarity === highestRarity);
            const craftedItem = filteredItems[Math.floor(Math.random() * filteredItems.length)];

          items.value.push(craftedItem);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `${craftedItem.name} crafted!`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }else{
          items.value.push(res);
        }
        
      }
    }
  });
}

const sell = (res) => {

  Swal.fire({ title: `${res.name}`, text: `Are you sure you want to sell this item?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes, sell it!', cancelButtonText: 'Cancel', }).then((result) => {
    if (result.isConfirmed) {
      const index = items.value.indexOf(res);
      if (index !== -1) {
        items.value.splice(index, 1);
        resources.value.Coins += (res.cost * 0.5)
      }
    }
  });
}

const breakdown = (res) => {
  Swal.fire({ title: `${res.name}`, text: `Are you sure you want to sell this item?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes, break it!', cancelButtonText: 'Cancel', }).then((result) => {
    if (result.isConfirmed) {
      const index = items.value.indexOf(res);
      if (index !== -1) {
        
        let temp = {...breakdownItem};
        temp.rarity = res.rarity;
        temp.level = res.level;
        items.value.splice(index, 1);
        items.value.push(temp);
        // resources.value.Coins += (res.cost * 0.5)
      }
    }
  });
}

watch(dialog, (newVal)=>{
  if(newVal){
    if(current_stage.value != stage.value){
      current_stage.value = stage.value;
      shop.value = [];
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

          <v-toolbar-title>
            <div class="flex justify-between w-full items-center w-full">
              <div class="flex">
                <v-tabs
                  v-model="tab"
                >
                  <v-tab value="one">Craft Items</v-tab>
                  <v-tab value="two">Breakdown Items</v-tab>
                  <v-tab value="three">Sell Items</v-tab>
                </v-tabs>
                
              </div>
            </div>
          </v-toolbar-title>
          <v-toolbar-items>
            <div class="flex items-center gap-1 pe-5" style="font-size: 30px;">
                  <img class="w-[50px]" :src="'/icons/Coins.png'"></img>
                  <span>{{ resources['Coins'].toFixed(0) }}</span>
              </div>
          </v-toolbar-items>
        </v-toolbar>        
        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <div>
                <div class="grid grid-cols-3 gap-4 w-full mt-4 mx-2">
                  <v-card v-for="res in Recipes" :key="res.id" @click="pick(res)">
                    <v-card-title>
                      <div class="flex justify-between">
                        <div class="w-fit"><v-icon size="30" :style="'color: '+Rarity[res?.rarity].color+';'">mdi-star</v-icon></div>
                        <div class="w-full text-center">{{  res?.name }}</div>
                        <div class="w-fit flex items-center"></div>
                      </div>
                    </v-card-title>
                    <div class="flex h-[225px]">
                      <div class="flex flex-col items-center p-5">
                        <img class="w-[125px] min-h-[125px]" :src="res.image" style="object-fit: contain; height: 100%"/>
                      </div>
                      <div class="flex flex-col items-center p-5 justify-center">
                        <span style="font-size:15px;" v-html="res.abilityDescription"></span>
                      </div>
                    </div>
                    <div class="flex gap-2 flex-wrap justify-center mb-2">
                      <div v-for="(requirement, idx) in res.requirements" :key="idx">
                        <v-chip v-if="(items.find(i => i.name === requirement))" color="success">
                          {{ requirement }}
                        </v-chip>
                        <v-chip v-else>
                          {{ requirement }}
                        </v-chip>
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
            </v-tabs-window-item>

            <v-tabs-window-item value="two">
              <div class="grid grid-cols-3 gap-4 w-full mt-4 mx-2">
                <v-card v-for="res in items" :key="res.id" @click="breakdown(res)">
                  <v-card-title>
                    <div class="flex justify-between">
                      <div class="w-fit"><v-icon size="30" :style="'color: '+Rarity[res?.rarity].color+';'">mdi-star</v-icon></div>
                      <div class="w-full text-center">{{  res?.name }}</div>
                      <div class="w-fit flex items-center"></div>
                    </div>
                  </v-card-title>
                  <div class="flex h-[225px]">
                    <div class="flex flex-col items-center p-5">
                      <img class="w-[125px] min-h-[125px]" :src="res.image" style="object-fit: contain; height: 100%"/>
                    </div>
                    <div class="flex flex-col items-center p-5 justify-center">
                      <span style="font-size:15px;" v-html="res.abilityDescription"></span>
                    </div>
                  </div>
                  <div class="flex gap-2 justify-end me-5">
                    <img class="w-[50px]" :src="'/icons/Coins.png'"></img>
                    <span style="font-size:30px;">{{ parseFloat(res.cost * 0.5).toFixed(0) }}</span>
                  </div>
                </v-card>
              </div>
            </v-tabs-window-item>

            <v-tabs-window-item value="three">
                <div class="grid grid-cols-3 gap-4 w-full mt-4 mx-2">
                <v-card v-for="res in items" :key="res.id" @click="sell(res)">
                  <v-card-title>
                    <div class="flex justify-between">
                      <div class="w-fit"><v-icon size="30" :style="'color: '+Rarity[res?.rarity].color+';'">mdi-star</v-icon></div>
                      <div class="w-full text-center">{{  res?.name }}</div>
                      <div class="w-fit flex items-center"></div>
                    </div>
                  </v-card-title>
                  <div class="flex h-[225px]">
                    <div class="flex flex-col items-center p-5">
                      <img class="w-[125px] min-h-[125px]" :src="res.image" style="object-fit: contain; height: 100%"/>
                    </div>
                    <div class="flex flex-col items-center p-5 justify-center">
                      <span style="font-size:15px;" v-html="res.abilityDescription"></span>
                    </div>
                  </div>
                  <div class="flex gap-2 justify-end me-5">
                    <img class="w-[50px]" :src="'/icons/Coins.png'"></img>
                    <span style="font-size:30px;">{{ parseFloat(res.cost * 0.5).toFixed(0) }}</span>
                  </div>
                </v-card>
              </div>
            </v-tabs-window-item>

          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>