export const priorityBuffs = (plants, buffs) => {
  // Flatten 2D array into a single array and remove nulls
  const allPlants = plants.flat().filter(p => p);

  // Sort: plants without any of the specified buffs go first
  return allPlants.sort((a, b) => {
    const hasTargetBuff = (plant) =>
      plant.buffs &&
      plant.buffs.some(pb => buffs.some(bf => pb.name === bf.name));

    const aBuffed = hasTargetBuff(a);
    const bBuffed = hasTargetBuff(b);

    if (aBuffed === bBuffed) return 0;
    return aBuffed ? 1 : -1; // unbuffed (regarding these buffs) first
  });
};