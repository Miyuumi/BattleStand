import { getItems } from "./Items";
import { Rarity } from "./Rarity";

function getSingleDrop(baseChance, unit, target, Items, Rarity) {
    const c1 = unit.dropChance || 1;
    const c2 = target.dropChance || 1;
    let rand = Math.random();

    if (rand >= baseChance * c1 * c2) return null; // No drop this roll

    const q1 = unit.dropQuality || 1;
    const q2 = target.dropQuality || 1;
    const qAvg = Math.max(0.1, (q1 + q2) / 2);

    const getRarityScore = (it) => {
        if (typeof it.rarity === 'number' && isFinite(it.rarity))
            return Math.max(1, it.rarity);

        const keys = Object.keys(Rarity);
        if (keys.length === 0) return 1;

        const sortedByChanceDesc = keys
            .slice()
            .sort((a, b) => (Rarity[b].chance || 0) - (Rarity[a].chance || 0));

        const idx = sortedByChanceDesc.indexOf(it.rarity);
        return idx >= 0 ? idx + 1 : 1;
    };

    const weights = Items.map((it) => {
        const r = getRarityScore(it);
        const weight = (1 / r) * Math.pow(qAvg, Math.max(0, r - 1));
        return Math.max(0, weight);
    });

    const total = weights.reduce((s, w) => s + w, 0);
    if (Items.length === 0) return null;

    let selectedIndex;
    if (total <= 0) {
        selectedIndex = Math.floor(Math.random() * Items.length);
    } else {
        let pick = Math.random() * total;
        for (let i = 0; i < weights.length; i++) {
            pick -= weights[i];
            if (pick <= 0) {
                selectedIndex = i;
                break;
            }
        }
    }

    selectedIndex = Math.min(Math.max(selectedIndex ?? 0, 0), Items.length - 1);
    return Items[selectedIndex];
}

export function getDrop(unit, target, baseChance = 0.02) {
    let Items = getItems();
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