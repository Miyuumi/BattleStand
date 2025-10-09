<script setup>

import { getUnits } from '@/Resources/Units';
import { Rarity } from '@/Resources/Rarity';
import { computed, onMounted, ref } from 'vue';
import FlowerDescription from './UnitDescription.vue';
const dialog = defineModel("show");

const descriptionDialog = ref(false);
const description = ref(null);
const viewUnit = (unit)=>{
    if(!unit) return;
    description.value = unit;
    descriptionDialog.value = true;
}

const Units = getUnits();
const filters = ref({
  season: 'All',
  rarity: 'All',
  resource: 'All',
});

const seasons = ['All', 'Spring', 'Summer', 'Fall', 'Winter'];
const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
const resources = ['All', 'Nectar', 'Pollen Dust', 'Petal Essence', 'Flower Crystals',];

const FilteredUnits = computed(()=>{
  return Units.filter(unit=>{
    return (filters.value.season == 'All' || unit.season == filters.value.season) &&
           (filters.value.rarity == 'All' || unit.rarity == filters.value.rarity) &&
           (filters.value.resource == 'All' || unit.resource == filters.value.resource);
  });
});

onMounted(()=>{
  
})
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

          <!-- <v-toolbar-title>
            <div class="flex justify-between w-full items-center w-full">
              <div>List of Units</div>
              <div class="flex gap-2 justify-between w-full max-w-[600px]">
                <v-select v-model="filters.season" class="w-full" label="Seasons" hide-details density="compact" :items="seasons"></v-select>
                <v-select v-model="filters.rarity" class="w-full" label="Rarities" hide-details density="compact" :items="rarities"></v-select>
                <v-select v-model="filters.resource" class="w-full" label="Resources" hide-details density="compact" :items="resources"></v-select>
              </div>
            </div>
          </v-toolbar-title> -->
        </v-toolbar>

         <div class="flex flex-wrap justify-center items-center h-full w-full">
            <v-card v-for="unit in FilteredUnits" class="m-2 w-64 h-64" @click="viewUnit(unit)">
              <v-card-title>
                <div class="flex justify-between">
                  <div class="w-fit"><v-icon size="30" :style="'color: '+Rarity[unit.rarity].color+';'">mdi-flower</v-icon></div>
                  <div class="w-full text-center">{{  unit?.name }}</div>
                  <div class="w-fit flex items-center"></div>
                </div>
              </v-card-title>
              <v-card-text class="flex justify-center w-full h-full items-center" style="height: calc(100% - 24px);">
                  <img v-if="unit" :src="'/images/'+unit.name+'.png'" style="object-fit: contain; height: 100%"></img> 
              </v-card-text>
            </v-card>
          </div>
      </v-card>
    </v-dialog>

    <FlowerDescription v-model:show="descriptionDialog" v-model:flower="description" v-model:location="location" @dig="digUnit"></FlowerDescription>
</template>