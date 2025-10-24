<script setup>

import { getConsumables } from '@/Resources/Consumables';
import { getItems } from '@/Resources/Items';
import { Rarity } from '@/Resources/Rarity';
import { computed, nextTick, onMounted, ref } from 'vue';
const dialog = defineModel("show");

const tab = ref("one");
const descriptionDialog = ref(false);
const description = ref(null);
const viewItem = async (item)=>{
    if(!item) return;
    description.value = item;
    await nextTick();
    descriptionDialog.value = true;
}

const search = ref("");
const Items = getItems();
const Consumables = getConsumables();
const filters = ref({
  season: 'All',
  rarity: 'All',
  resource: 'All',
});

const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

const FilteredItems = computed(()=>{
  return Items.filter(item=>{
    const matchesSearch = item.name.toLowerCase().includes(search.value.toLowerCase());
    return (filters.value.rarity == 'All' || item.rarity == filters.value.rarity) && matchesSearch;
  });
});

const FilteredConsumables = computed(()=>{
  return Consumables.filter(item=>{
    const matchesSearch = item.name.toLowerCase().includes(search.value.toLowerCase());
    return (filters.value.rarity == 'All' || item.rarity == filters.value.rarity) && matchesSearch;
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

          <v-toolbar-title>
            <div class="flex justify-between w-full items-center w-full gap-2">
              <div>
                <v-tabs
                  v-model="tab"
                >
                  <v-tab value="one">Permanent</v-tab>
                  <v-tab value="two">Consumables</v-tab>
                </v-tabs>
              </div>
              <div class="w-full"><v-text-field v-model="search" density="compact" hide-details prepend-inner-icon="mdi-magnify"></v-text-field></div>
              <div class="flex gap-2 justify-between w-full max-w-[600px]">
                <!-- <v-select v-model="filters.season" class="w-full" label="Seasons" hide-details density="compact" :items="seasons"></v-select> -->
                <v-select v-model="filters.rarity" class="w-full" label="Rarities" hide-details density="compact" :items="rarities"></v-select>
              </div>
            </div>
          </v-toolbar-title>
        </v-toolbar>

        <v-card-text class="overflow-y-auto">
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <div class="grid grid-cols-3 gap-4 w-full mt-4 mx-2">
              <v-card v-for="res in FilteredItems" :key="res.id">
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
              </v-card>
            </div>
            </v-tabs-window-item>

            <v-tabs-window-item value="two">
              <div class="grid grid-cols-3 gap-4 w-full mt-4 mx-2">
              <v-card v-for="res in FilteredConsumables" :key="res.id">
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
              </v-card>
            </div>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>

        <v-card-text class="overflow-y-auto">
            
          </v-card-text>
      </v-card>
    </v-dialog>
</template>