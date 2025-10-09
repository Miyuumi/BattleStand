export const triggerChance = (probability)=>{
    let rand = Math.random();
    return rand < probability;
}