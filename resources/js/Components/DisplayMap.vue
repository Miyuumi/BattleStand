<script setup>
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Icon, Style } from "ol/style";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { toLonLat, fromLonLat } from "ol/proj";
import { onMounted, ref, watch } from "vue";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import moment from "moment";

const props = defineProps({
    points: {
        type: Array,
    },
});

const map = ref(null);
const form = ref({});
const open_details = ref(false);
var vectorLayer = null;
var pointFeature = null;
var pointCoordinate = [];

const createPoint = () => {
    if (props.points.length <= 0) {
        return;
    }

    vectorLayer.getSource().clear();

    props.points.forEach((pointer) => {
        const point = new Point(fromLonLat(pointer.coordinate));
        pointFeature = new Feature(point);
        pointFeature.data = pointer;
        pointFeature.setStyle(
            new Style({
                image: new Icon({
                    src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png", // Icon URL
                    scale: 1, // Scale of the icon
                }),
            })
        );

        vectorLayer.getSource().addFeature(pointFeature);
    });
};

onMounted(() => {
    map.value = new Map({
        target: "map",
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
            center: fromLonLat([121.14971621610005, 16.48341866699974]),
            zoom: 15,
        }),
    });

    const vectorSource = new VectorSource();
    vectorLayer = new VectorLayer({
        source: vectorSource,
    });

    // Add the vector layer to the map
    map.value.addLayer(vectorLayer);

    const selectInteraction = new Select({
        condition: click, // You can change this to any other interaction condition
    });

    // Add the Select interaction to the map
    map.value.addInteraction(selectInteraction);

    // Listen for the select event
    selectInteraction.on("select", function (e) {
        const selectedFeatures = e.selected;
        if (selectedFeatures.length > 0) {
            open_details.value = true;
            form.value = selectedFeatures[0].data.incidents;
            form.value.incident_date = moment(form.value.incident_date).format(
                "LL"
            );
            // console.log(selectedFeatures[0].data);
            // You can handle the selected point here
        } else {
            open_details.value = false;
            console.log("No point selected");
        }
    });
});

watch(
    () => props.points,
    (newValue) => {
        // console.log(newValue);
        createPoint();
    }
);
</script>
<template>
    <div id="map" class="w-[100%] h-[100%]"></div>
    <v-dialog max-width="1200" v-model="open_details">
        <template v-slot:default="{ isActive }">
            <v-card title="Incident Details">
                <v-card-text>
                    <div>
                        <div class="flex gap-2">
                            <v-text-field
                                v-model="form.incident_date"
                                label="Date"
                            ></v-text-field>
                        </div>
                        <div class="flex gap-2">
                            <v-text-field
                                v-model="form.incident_name"
                                label="Name"
                            ></v-text-field>
                        </div>
                        <div class="flex gap-2">
                            <v-textarea
                                v-model="form.incident_description"
                                label="Description"
                                rows="3"
                            ></v-textarea>
                        </div>
                        <div class="flex gap-2">
                            <v-text-field
                                v-model="form.incident_injuries"
                                label="Injuries"
                                type="number"
                            ></v-text-field>
                            <v-text-field
                                v-model="form.incident_casualties"
                                label="Casualties"
                                type="number"
                            ></v-text-field>
                        </div>
                        <div class="flex gap-2">
                            <v-textarea
                                v-model="form.incident_damage_description"
                                rows="3"
                                label="Damage Description"
                            ></v-textarea>
                        </div>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Back" @click="isActive.value = false"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
