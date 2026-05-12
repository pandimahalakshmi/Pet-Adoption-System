import petsData from "../data/petsData";

/**
 * Returns the price for a pet.
 * - User-added pets: use pet.price set by admin
 * - System pets: use admin-set price from localStorage "petPrices" map
 * - Falls back to "Not set" if admin hasn't set a price yet
 */
export function getPetPrice(pet) {
  // For user-added pets, price is stored on the pet object
  if (pet.price) return pet.price;

  // For system pets, admin sets price via localStorage "petPrices" { [id]: price }
  const petPrices = JSON.parse(localStorage.getItem("petPrices")) || {};
  if (petPrices[pet.id]) return petPrices[pet.id];

  return null; // not set yet
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
 * Deletes a pet from the platform entirely.
 */
export function deletePetGlobally(id) {
  const userPets = JSON.parse(localStorage.getItem("userPets")) || [];
  localStorage.setItem("userPets", JSON.stringify(userPets.filter(p => p.id !== id)));

  const deletedIds = JSON.parse(localStorage.getItem("deletedPets")) || [];
  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
    localStorage.setItem("deletedPets", JSON.stringify(deletedIds));
  }

  const adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];
  localStorage.setItem("adoptions", JSON.stringify(adoptions.filter(p => p.id !== id)));

  const fav = JSON.parse(localStorage.getItem("fav")) || [];
  localStorage.setItem("fav", JSON.stringify(fav.filter(p => p.id !== id)));
}
