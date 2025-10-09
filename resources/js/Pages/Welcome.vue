<script setup>
import { getUnits } from '@/Resources/Units';
import { Head } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';
import Inventory from '@/Pages/Inventory.vue';
import { Resources } from '@/Resources/Resource';
import List from './List.vue';
import Roll from './Roll.vue';
import UnitDescription from './UnitDescription.vue';
import Game from './Game.vue';
import Shop from './Shop.vue';

const Units = getUnits();

const fields = ref([[null,null,null],[null,null,null],[null,null,null]]);
const inventory = ref([]);
const resources = ref({...Resources});
const stage = ref(0);

const selected = ref(null);
const description = ref(null);
const location = ref({x:0,y:0});

const inventoryDialog = ref(false);
const listDialog = ref(false);
const rollDialog = ref(false);
const descriptionDialog = ref(false);
const shopDialog = ref(false);
const gameDialog = ref(false);

const setPlant = (index)=>{
    if(fields.value[index[0]][index[1]]){
        inventory.value.push(fields.value[index[0]][index[1]]);
    }

    selected.value.location = [index[0], index[1]];
    fields.value[index[0]][index[1]] = selected.value;
    let existing = inventory.value.find(f => f.name === selected.value.name);
    if(existing.count > 1){
        existing.count -= 1;
    }else{
        inventory.value = inventory.value.filter(f => f.name !== existing.name);
    }
    selected.value = null;
}

const viewPlant = (plant,x ,y)=>{
    if(!plant) return;
    location.value.x = x;
    location.value.y = y;
    description.value = plant;
    descriptionDialog.value = true;
}

const digPlant = ()=>{

    let existing = inventory.value.find(f => f.name === description.value.name);
    if(location.value.x == -1 && location.value.y == -1 ) return;
    if(existing){
        existing.count += 1;
    }else{
        inventory.value.push(fields.value[location.value.x][location.value.y]);
    }

    fields.value[location.value.x][location.value.y] = null;
    descriptionDialog.value = false;
}

onMounted(()=>{
    inventory.value.push(Units[1]);
});

const start = ()=>{
    fields.value.forEach(row => {
        row.forEach(plant => {
            if(plant){
                plant.livingTime += 1;
            }
        });
    })
    gameDialog.value = true;
    stage.value += 1;
}
</script>

<template>
    <Head title="Welcome" />
    <v-card class="absolute top-0 w-screen h-[50px]">
        <div class="flex w-full h-full items-center gap-5">
            <div class="flex items-center mx-4 gap-1" v-for="res in Object.entries(resources)">
                <div v-if="res[0] !== 'currentSeason'" class="flex items-center gap-1">
                    <img class="w-[30px]" :src="'/icons/'+res[0]+'.png'"></img>
                    <span>{{ res[1].toFixed(0) }}</span>
                </div>
                <div v-else>

                </div>
                
            </div>
        </div>
    </v-card>
    <div class="absolute top-[50px] left-0 w-full">
        <div class="flex justify-between gap-2 my-2 mx-2">
            <div class="flex gap-2">
                <v-btn icon @click="inventoryDialog = true"><v-icon>mdi-apps-box</v-icon></v-btn>
                <v-btn icon @click="rollDialog = true"><v-icon>mdi-basket-fill</v-icon></v-btn>
                <v-btn icon @click="shopDialog = true"><v-icon>mdi-swap-horizontal</v-icon></v-btn>
                <v-btn icon @click="start">{{stage + 1}}</v-btn>
            </div>
            <div class="flex gap-2">
                <v-btn icon @click="listDialog = true"><v-icon>mdi-unit</v-icon></v-btn>
            </div>
        </div>
    </div>
    <div class="w-screen bg-green-100" style="height: calc(100vh - 50px);">
        <div class="flex justify-center items-center h-full w-full" v-if="selected">
            <div v-for="(field, x_index) in fields">
                <v-card v-for="(plant, y_index) in field" class="m-2 w-64 h-64" @click="setPlant([x_index, y_index])">
                    <v-card-title class="text-center">
                        {{  plant?.name ?? "Empty" }}
                    </v-card-title>
                    <v-card-text class="flex justify-center w-full h-full items-center" style="height: calc(100% - 24px);">
                        <img v-if="plant" :src="'/images/'+plant?.name+'.png'" style="object-fit: contain; height: 100%"></img> 
                    </v-card-text>
                </v-card>
            </div>
        </div>

        <div class="flex justify-center items-center h-full w-full" v-else>
            <div v-for="(field, x) in fields">
                <v-card v-for="(plant, y) in field" class="m-2 w-64 h-64" @click="viewPlant(plant,x,y)">
                    <v-card-title class="text-center">
                        {{  plant?.name ?? "Empty" }}
                    </v-card-title>
                    <v-card-text class="flex flex-col justify-center w-full h-full items-center" style="height: calc(100% - 24px);">
                        <div 
                            v-if="plant" 
                            class="relative w-full h-full" 
                            style="overflow: hidden;"
                        >
                            <img 
                                :src="'/images/' + plant?.name + '.png'" 
                                class="absolute bottom-0 w-full object-contain"
                                :style="{ 
                                    height: '100%', 
                                    clipPath: 'inset(' + (100 - Math.min(((plant?.livingTime + (plant.growthDuration * 0.2)) / plant?.growthDuration) * 100, 100)) + '% 0 0 0)' 
                                }"
                            />
                        </div>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>

    <div v-if="selected" class="absolute bottom-0 left-0">
        <div>
            <div class="flex justify-between">
                <div class="ps-2" style="font-size: 17;">Please select a plot</div>
                <v-btn 
                    v-if="selected" 
                    class="absolute cursor-pointer text-gray-500 hover:text-red-500"
                    style="margin-bottom: -35px; margin-right: -15px; z-index: 2;"
                    @click="selected = null"
                    icon
                >
                    <v-icon >mdi-close</v-icon>
                    
                </v-btn>
            </div>
            <v-card class="m-2 w-64 h-64 relative" @click="viewPlant(selected, -1, -1)">

                <v-card-title class="text-center">
                    {{ selected?.name ?? "Empty" }}
                </v-card-title>

                <v-card-text class="flex justify-center w-full h-full items-center" style="height: calc(100% - 24px);">
                <img 
                    v-if="selected" 
                    :src="'/images/' + selected?.name + '.png'" 
                    style="object-fit: contain; height: 100%"
                />
                </v-card-text>
            </v-card>
            </div>
    </div>

    <Inventory v-model:show="inventoryDialog" v-model:inventory="inventory" v-model:selected="selected"></Inventory>
    <List v-model:show="listDialog"></List>
    <Shop v-model:show="shopDialog" v-model:inventory="inventory" v-model:resources="resources"></Shop>
    <Roll v-model:show="rollDialog" v-model:inventory="inventory" v-model:resources="resources"></Roll>
    <UnitDescription v-model:show="descriptionDialog" v-model:unit="description" v-model:location="location" @dig="digPlant"></UnitDescription>
    <Game v-model:show="gameDialog" v-model:fields="fields" v-model:resources="resources" v-model:stage="stage" v-model:inventory="inventory"></Game>
</template>
