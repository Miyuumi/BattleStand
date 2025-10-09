<script setup>
import { Rarity } from '@/Resources/Rarity';
import { computed, ref } from 'vue';

const dialog = defineModel("show");
const inventory = defineModel("inventory");
const selected = defineModel("selected");

const filters = ref({
  season: 'All',
  rarity: 'All',
  resource: 'All',
});

const seasons = ['All', 'Spring', 'Summer', 'Fall', 'Winter'];
const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
const resources = ['All', 'Nectar', 'Pollen Dust', 'Petal Essence', 'Unit Crystals',];

const FilteredUnits = computed(()=>{
  return inventory.value.filter(unit=>{
    return (filters.value.season == 'All' || unit.season == filters.value.season) &&
           (filters.value.rarity == 'All' || unit.rarity == filters.value.rarity) &&
           (filters.value.resource == 'All' || unit.resource == filters.value.resource);
  });
});

const select = (item)=>{
  selected.value = item;
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
              <div>Inventory</div>
              <div class="flex gap-2 justify-between w-full max-w-[600px]">
                <v-select v-model="filters.season" class="w-full" label="Seasons" hide-details density="compact" :items="seasons"></v-select>
                <v-select v-model="filters.rarity" class="w-full" label="Rarities" hide-details density="compact" :items="rarities"></v-select>
                <v-select v-model="filters.resource" class="w-full" label="Resources" hide-details density="compact" :items="resources"></v-select>
              </div>
            </div>
          </v-toolbar-title>
        </v-toolbar>

        <div class="flex flex-wrap justify-center items-center h-full w-full">
          <div v-for="unit in FilteredUnits" >
            <div class="flex justify-between">
                  <div
                  v-if="unit.count > 1"
                      class="absolute bg-red-100 w-[25px] h-[25px] text-center"
                      style="z-index: 2; margin-left: -5px; margin-top: -5px; border-radius: 100%;"
                  >
                    {{ unit.count }}
                      
                  </div>
              </div>
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
      </v-card>
    </v-dialog>
</template>