import petsData from "../data/petsData";

/**
 * Returns adoption price based on pet type and age.
 * Dogs: $80 base, younger = more expensive, older = cheaper
 * Cats: $60 base
 * Birds: $40 base
 * Rabbits: $50 base
 */
export function getPetPrice(pet) {
  const basePrices = { Dog: 80, Cat: 60, Bird: 40, Rabbit: 50 };
  const base = basePrices[pet.type] || 50;
  const age = Number(pet.age) || 1;
  // Young pets (1-2 yrs) cost more, older pets cost less
  if (age <= 1) return base + 20;
  if (age === 2) return base + 10;
  if (age === 3) return base;
  if (age === 4) return base - 5;
  if (age === 5) return base - 10;
  return Math.max(base - 15, 20); // min $20
}

/**
 * Returns all pets visible on the platform,
 * excluding any that have been deleted by admin.
 */
export function getAllPets() {
  const userPets = JSON.parse(localStorage.getItem("userPets")) || [];
  const deletedIds = JSON.parse(localStorage.getItem("deletedPets")) || [];
  return [...petsData, ...userPets].filter(p => !deletedIds.includes(p.id));
}

/**
 * Deletes a pet from the platform entirely:
 * - If user-added: removes from userPets
 * - If system pet: adds to deletedPets blacklist
 * - Also removes from adoptions, favorites
 */
export function deletePetGlobally(id) {
  // Remove from userPets if present
  const userPets = JSON.parse(localStorage.getItem("userPets")) || [];
  const updatedUserPets = userPets.filter(p => p.id !== id);
  localStorage.setItem("userPets", JSON.stringify(updatedUserPets));

  // Add to deletedPets blacklist (covers system pets)
  const deletedIds = JSON.parse(localStorage.getItem("deletedPets")) || [];
  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
    localStorage.setItem("deletedPets", JSON.stringify(deletedIds));
  }

  // Remove from adoptions
  const adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];
  localStorage.setItem("adoptions", JSON.stringify(adoptions.filter(p => p.id !== id)));

  // Remove from favorites
  const fav = JSON.parse(localStorage.getItem("fav")) || [];
  localStorage.setItem("fav", JSON.stringify(fav.filter(p => p.id !== id)));
}
