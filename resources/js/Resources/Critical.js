export const critChance = (probability)=>{
    let rand = Math.random();
    return rand < probability;
}