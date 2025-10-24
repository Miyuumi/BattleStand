import { getConsumables } from "./Consumables";
import { getItems } from "./Items";
import { Rarity } from "./Rarity";


function getSingleDrop(baseChance, unit, target, Items, Rarity) {
    const c1 = unit.dropChance || 1;
    const c2 = target.dropChance || 1;
    let rand = Math.random();

    if (rand >= baseChance * c1 * c2) return null;

    const q1 = unit.dropQuality || 1;
    const q2 = target.dropQuality || 1;
    const qAvg = Math.max(0.1, (q1 + q2) / 2);

    const weights = Items.map((it) => {
        const rarData = Rarity[it.rarity];
        if (!rarData) return 0; 

        const rarityChance = rarData.chance || 0.001;
        const qualityBoost = Math.pow(qAvg, Math.max(0, 1 / rarityChance));

        const weight = rarityChance * qualityBoost;

        return Math.max(0, weight);
    });

    const total = weights.reduce((s, w) => s + w, 0);
    if (Items.length === 0 || total <= 0) return null;

    // Step 4: Weighted random selection
    let pick = Math.random() * total;
    let selectedIndex = 0;
    for (let i = 0; i < weights.length; i++) {
        pick -= weights[i];
        if (pick <= 0) {
            selectedIndex = i;
            break;
        }
    }

    return Items[selectedIndex];
}

export function getDrop(unit, target, baseChance = 0.02) {
    let Items = [...getItems(), ...getConsumables()];
    let drops = [];
    const maxDrop = Math.max(1, target.maxDrop || 1);

    for (let i = 0; i < maxDrop; i++) {
        const item = getSingleDrop(baseChance / (i + 1), unit, target, Items, Rarity);
        if (item){
            drops.push(item)
        }else{
            return drops;
        };
    }

    return drops;
}