<script setup>
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js'  
import OSM from "ol/source/OSM"
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { toLonLat, fromLonLat } from 'ol/proj';
import { onMounted, ref } from 'vue';

const props = defineProps({
    numberpoint:{
        type: Number,
        default: 1
    }
});
const emit = defineEmits(["clickPoint", "points"]);

const map = ref(null);
var vectorLayer = null;
var pointFeature = [];
var pointCoordinate = [];

const createPoint = (coordinate) => {
    if (pointFeature.length >= props.numberpoint) {
        while(pointFeature.length >= props.numberpoint){
            vectorLayer.getSource().removeFeature(pointFeature.shift());
        }
    }

    const point = new Point(coordinate);
    pointFeature.push(new Feature(point));

    
    pointFeature[pointFeature.length - 1].setStyle(
    new Style({
        image: new Icon({
        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png', // Icon URL
        scale: 1, // Scale of the icon
        }),
    })
    );

    vectorLayer.getSource().addFeature(pointFeature[pointFeature.length - 1]);

    pointCoordinate = [];
    pointFeature.forEach(element => {
        pointCoordinate.push(toLonLat(element.getGeometry().getCoordinates()));
    });
    emit('points',pointCoordinate);
}

onMounted(()=>{
    map.value = new Map({
    target: 'map',
        layers: [
            new TileLayer({source: new OSM()})
        ],
        view: new View({
            center: fromLonLat([121.14971621610005, 16.48341866699974]),
            zoom: 15
        })
    })

    const vectorSource = new VectorSource();
    vectorLayer = new VectorLayer({
        source: vectorSource,
    });

    // Add the vector layer to the map
    map.value.addLayer(vectorLayer);

    map.value.on('click', function (evt) {
        var coordinate = evt.coordinate;
        var lonLat = toLonLat(coordinate);
        var longitude = lonLat[0];
        var latitude = lonLat[1];

        createPoint(coordinate);
        emit('clickPoint',lonLat);
    });
});

</script>
<template>
    <div id="map" class="w-[100%] h-[100%]"></div>
</template>