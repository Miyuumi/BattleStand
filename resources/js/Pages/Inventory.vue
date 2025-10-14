<script setup>
import { Rarity } from '@/Resources/Rarity';
import { computed, ref } from 'vue';

const dialog = defineModel("show");
const inventory = defineModel("inventory");
const items = defineModel("items");
const selected = defineModel("selected");
const selectedItem = defineModel("selectedItem");

const filters = ref({
  season: 'All',
  rarity: 'All',
  resource: 'All',
});

const seasons = ['All', 'Spring', 'Summer', 'Fall', 'Winter'];
const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
const resources = ['All', 'Natura', 'Machina', 'Magika', 'Techno', 'Metio'];
const tab = ref(null);

const FilteredUnits = computed(()=>{
  return inventory.value.filter(unit=>{
    return (filters.value.season == 'All' || unit.season == filters.value.season) &&
           (filters.value.rarity == 'All' || unit.rarity == filters.value.rarity) &&
           (filters.value.resource == 'All' || unit.resource == filters.value.resource);
  });
});

const FilteredItems = computed(()=>{
  return items.value.filter(item=>{
    return (filters.value.rarity == 'All' || item.rarity == filters.value.rarity);
  });
});

const select = (item)=>{
  if(tab.value == 'one'){
    selected.value = item;
  }else if(tab.value == 'two'){
    selectedItem.value = item;
  }
  
  dialog.value = false;
}


</script>
<template>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
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
                  <v-tab value="one">Units</v-tab>
                  <v-tab value="two">Items</v-tab>
                </v-tabs>
              </div>
              <div class="flex gap-2 justify-between w-full max-w-[600px]">
                <!-- <v-select v-model="filters.season" class="w-full" label="Seasons" hide-details density="compact" :items="seasons"></v-select> -->
                <v-select v-model="filters.rarity" class="w-full" label="Rarities" hide-details density="compact" :items="rarities"></v-select>
                <v-select v-model="filters.resource" class="w-full" label="Resources" hide-details density="compact" :items="resources"></v-select>
              </div>
            </div>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <div class="flex flex-wrap justify-center items-center h-full w-full">
                <div v-for="unit in FilteredUnits" >
                  <div class="flex justify-between">
                    <v-card class="m-2 w-64 h-64" @click="select(unit)">
                      <v-card-title>
                        <div class="flex justify-between">
                          <div class="w-fit"><v-icon size="30" :style="'color: '+Rarity[unit?.rarity].color+';'">mdi-star</v-icon></div>
                          <div class="w-full text-center">{{  unit?.name }}</div>
                          <div class="w-fit flex items-center"></div>
                        </div>
                      </v-card-title>
                      <v-card-text class="flex justify-center w-full h-full items-center" style="height: calc(100% - 24px);">
                          <img v-if="unit" :src="'/images/'+unit.name+'.png'" style="object-fit: contain; height: 100%"></img> 
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </div>
            </v-tabs-window-item>

            <v-tabs-window-item value="two">
              <div class="flex flex-wrap justify-center items-center h-full w-full">
                <div v-for="item in FilteredItems" >
                  <div class="flex justify-between">
                    
                    <v-card class="m-2 w-[600px] h-64" @click="select(item)">
                      <v-card-title>
                        <div class="flex justify-between">
                          <div class="w-fit"><v-icon size="30" :style="'color: '+Rarity[item?.rarity].color+';'">mdi-star</v-icon></div>
                          <div class="w-full text-center">{{  item?.name }}</div>
                          <div class="w-fit flex items-center"></div>
                        </div>
                      </v-card-title>
                      <v-card-text style="height: calc(100% - 24px);">
                      <div class="flex">
                        <div class="flex flex-col items-center p-5">
                          <img class="w-[150px] min-h-[150px]" :src="item.image" style="object-fit: contain; height: 100%"/>
                        </div>
                        <div class="flex flex-col items-center p-5 justify-center">
                          <span style="font-size:25px;" v-html="item.abilityDescription"></span>
                        </div>
                      </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </div>
            </v-tabs-window-item>

            <v-tabs-window-item value="three">
              Three
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>