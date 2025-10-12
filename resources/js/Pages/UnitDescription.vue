<script setup>

import { getUnits } from '@/Resources/Units';
import { Rarity } from '@/Resources/Rarity';
import { onMounted, ref } from 'vue';
const dialog = defineModel("show");
const unit = defineModel("unit");
const location = defineModel("location");
const tab = ref("one");
const emits = defineEmits(['dig']);

const dig = ()=>{
  emits('dig');
}

const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1') // insert space before capital letters
      .replace(/^./, str => str.toUpperCase()); // capitalize first letter
  }

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
            <div class="flex justify-between">
              <div>{{ unit?.name }}</div>
              <div><v-btn prepend-icon="mdi-hand-extended" variant="outlined" @click="dig">Retrieve</v-btn></div>
            </div>
          </v-toolbar-title>
        </v-toolbar>

        <v-card class="w-full h-full m-5 p-5">
          <div class="flex">
            <div class="w-[50%] flex justify-center">
              <img :src="'/images/'+unit?.name+'.png'" style="object-fit: contain; height: 100%"></img> 
            </div>
            <div class="w-full p-5 overflow-y-auto">
              <v-tabs
                v-model="tab"
                bg-color="primary"
              >
                <v-tab value="one">Unit</v-tab>
                <v-tab value="two">Battle</v-tab>
                <v-tab value="three">Stats</v-tab>
                <v-tab value="four">Buffs</v-tab>
                <v-tab value="five">Items</v-tab>
                <v-tab value="six">Upgrades</v-tab>
              </v-tabs>

              <v-card-text>
                <v-tabs-window v-model="tab">
                  <v-tabs-window-item value="one">
                    <div class="h-[675px] overflow-y-auto">
                    <table class="w-full border-collapse" style="font-size: 18px">
                      <tbody>
                        <tr>
                          <td class="font-bold w-[200px] border-b p-2" style="font-size: 21px">Name</td>
                          <td class="border-b p-2" v-html="unit?.name"></td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Description</td>
                          <td class="border-b p-2" v-html="unit?.description"></td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Resource</td>
                          <td class="border-b p-2" >{{ unit?.resource }}</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Rarity</td>
                          <td class="border-b p-2" >{{ unit?.rarity }}</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Usages</td>
                          <td class="border-b p-2" >{{ unit?.livingTime }}</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </v-tabs-window-item>

                  <v-tabs-window-item value="two">
                    <div class="h-[675px] overflow-y-auto">
                    <table class="w-full border-collapse" style="font-size: 18px">
                      <tbody>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Level</td>
                          <td class="border-b p-2" >{{  unit?.level }}</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Experience</td>
                          <td class="border-b p-2" >{{ unit?.experience }} / {{ unit?.nextLevelExp }}</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Ability Description</td>
                          <td class="border-b p-2" v-html="unit?.abilityDescription"></td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Ability Power</td>
                          <td class="border-b p-2" >{{ (unit?.ability * 100).toFixed(2) }}% </td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Damage</td>
                          <td class="border-b p-2" >{{ (unit?.damage).toFixed(3) }}</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Crit. Chance / Damage</td>
                          <td class="border-b p-2" >{{ (unit?.critChance * 100).toFixed(2) }}% / {{ (unit?.critDamage * 100).toFixed(2) }}%</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Mana [Regen]</td>
                          <td class="border-b p-2" >{{(unit?.mana).toFixed(2)}} / {{ (unit?.maxmana).toFixed(2) }} - [{{(unit?.manaRegen).toFixed(2)}}]</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Attackspeed</td>
                          <td class="border-b p-2" >{{ (unit?.cooldown).toFixed(3) }}</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Ability Cooldown</td>
                          <td class="border-b p-2" >{{ (unit?.abilityCooldown).toFixed(2) }}</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Trigger Chance</td>
                          <td class="border-b p-2" >{{ (unit?.triggerChance).toFixed(2) }}</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Buff / Debuff Duration</td>
                          <td class="border-b p-2" >{{ (unit?.buffDuration * 100).toFixed(2) }}% / {{ (unit?.debuffDuration * 100).toFixed(2) }}%</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">XP / Bounty Gain</td>
                          <td class="border-b p-2" >{{ (unit?.xpGain * 100).toFixed(2) }}% / {{ (unit?.bountyGain * 100).toFixed(2) }}%</td>
                        </tr>
                        <tr>
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">Drop Chance / Quantity</td>
                          <td class="border-b p-2" >{{ (unit?.dropChance * 100).toFixed(2) }}% / {{ (unit?.dropQuality * 100).toFixed(2) }}%</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </v-tabs-window-item>

                  <v-tabs-window-item value="three">
                    <div class="h-[675px] overflow-y-auto">
                    <table class="w-full border-collapse" style="font-size: 18px">
                      <tbody>
                        <tr v-for="record in Object.entries(unit.record)" :key="record[0]">
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">{{ formatLabel(record[0]) }}</td>
                          <td class="border-b p-2">{{ record[1] }}</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="four">
                    <div class="h-[675px] overflow-y-auto">
                    <table class="w-full border-collapse" style="font-size: 18px">
                      <tbody>
                        <tr v-for="buff in unit?.buffs">
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">{{buff.name}}</td>
                          <td class="border-b p-2">{{ buff.description }}. Duration: {{ (buff.duration).toFixed(2) }}</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="five">
                    <div class="h-[675px] overflow-y-auto">
                    <!-- <table class="w-full border-collapse" style="font-size: 18px">
                      <tbody>
                        <tr v-for="buff in unit?.buffs">
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">{{buff.name}}</td>
                          <td class="border-b p-2">{{ buff.description }}. Duration: {{ (buff.duration).toFixed(2) }}</td>
                        </tr>
                      </tbody>
                    </table> -->
                    </div>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="six">
                    <div class="h-[675px] overflow-y-auto">
                    <!-- <table class="w-full border-collapse" style="font-size: 18px">
                      <tbody>
                        <tr v-for="buff in unit?.buffs">
                          <td class="font-bold border-b p-2 w-[300px]" style="font-size: 21px">{{buff.name}}</td>
                          <td class="border-b p-2">{{ buff.description }}. Duration: {{ (buff.duration).toFixed(2) }}</td>
                        </tr>
                      </tbody>
                    </table> -->
                    </div>
                  </v-tabs-window-item>
                </v-tabs-window>
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-card>
    </v-dialog>
</template>