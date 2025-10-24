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
const accumulation = ref(0);
const description = ref("Pick a Resource");
const locked = ref([]);
const pick = (res)=>{
  if(resources.value['Coins'] < (100 + accumulation.value)){
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'warning',
      title: `Not enough Coins!`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }else{
    resources.value['Coins'] -= (100 + accumulation.value);
    accumulation.value += 50;
    description.value = `Costs ${100 + accumulation.value} Coins`;
    resources.value[res] += 1;
  }
}

watch(dialog, (newVal)=>{
  if(newVal){
    description.value = `Costs ${100 + accumulation.value} Coins`;
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

          <v-toolbar-title>Resource Shop</v-toolbar-title>
          <v-toolbar-items>
            <div class="flex items-center gap-1 pe-5" style="font-size: 30px;">
                  <img class="w-[50px]" :src="'/icons/Coins.png'"></img>
                  <span>{{ resources['Coins'].toFixed(0) }}</span>
              </div>
          </v-toolbar-items>
        </v-toolbar>

        <div class="flex justify-center w-full text-gray-500 mt-5" style="font-size: 26px">{{description}}</div>
        <div class="w-full border-b border-gray-300 mt-2 mb-5"></div>
        
          <div>
          
          <div class="flex flex-wrap justify-around items-center h-full w-full">
            <v-card v-for="res in Object.entries(resources).filter(([key, value]) => key !== 'Coins' && key !== 'Water' && key !== 'Life' && key !== 'currentSeason')" @click="pick(res[0])">
              <div class="flex flex-col items-center p-5 gap-1">
                  <img class="w-[150px]" :src="'/icons/'+res[0]+'.png'"></img>
                  <span style="font-size:30px;">{{ res[1].toFixed(0) }}</span>
              </div>
            </v-card>
          </div>
          </div>
      </v-card>
    </v-dialog>
</template>