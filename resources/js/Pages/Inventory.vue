<script setup>
import { Rarity } from '@/Resources/Rarity';
import { computed, ref } from 'vue';

const dialog = defineModel("show");
const inventory = defineModel("inventory");
const items = defineModel("items");
const selected = defineModel("selected");
const selectedItem = defineModel("selectedItem");

const filters = ref({
  rarity: 'All',
  resource: 'All',
  type: 'All',
});

const types = ['All', 'Permanent', 'Artifact', 'Consumable', 'Special'];
const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythical'];
const resources = ['All', 'Natura', 'Machina', 'Magika', 'Techno', 'Metio'];
const search = ref("");
const tab = ref(null);

const FilteredUnits = computed(() => {
  return inventory.value.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(search.value.toLowerCase());
    return (
      (filters.value.rarity == 'All' || unit.rarity == filters.value.rarity) &&
      (filters.value.resource == 'All' || unit.resource == filters.value.resource) &&
      matchesSearch
    );
  });
});


const FilteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.value.toLowerCase());
    return (
      (filters.value.rarity == 'All' || item.rarity == filters.value.rarity) &&
      (filters.value.type == 'All' || item.type == filters.value.type) &&
      matchesSearch
    );
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
              <div class="w-full h-full flex items-center mx-2 justify-center">
                  <v-text-field v-model="search" density="compact" hide-details prepend-inner-icon="mdi-magnify"></v-text-field>
                </div>
              <div class="flex gap-2 justify-between w-full max-w-[600px]">
                <!-- <v-select v-model="filters.season" class="w-full" label="Seasons" hide-details density="compact" :items="seasons"></v-select> -->
                <v-select v-model="filters.rarity" class="w-full" label="Rarities" hide-details density="compact" :items="rarities"></v-select>
                <v-select v-if="tab == 'one'" v-model="filters.resource" class="w-full" label="Resources" hide-details density="compact" :items="resources"></v-select>
                <v-select v-if="tab == 'two'" v-model="filters.type" class="w-full" label="Item Types" hide-details density="compact" :items="types"></v-select>
              </div>
            </div>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="overflow-y-auto">
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <div class="flex flex-wrap justify-center items-center h-full w-full">
                <div v-for="unit in FilteredUnits" >
                  <div class="flex justify-between">
                    <v-card class="m-2 w-96 h-64" @click="select(unit)">
                      <v-card-title>
                        <div class="flex justify-between">
                          <div class="w-fit"><v-icon size="30" :style="'color: '+Rarity[unit?.rarity].color+';'">mdi-star</v-icon></div>
                          <div class="w-full text-center">{{  unit?.name }}</div>
                          <div class="w-fit flex items-center"><img class="w-[30px]" :src="'/icons/'+unit?.resource+'.png'"></img></div>
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
              <div class="grid grid-cols-3 gap-4 w-full mt-4 mx-2">
                <v-card v-for="res in FilteredItems" :key="res.id" @click="select(res)">
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
                </v-card>
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