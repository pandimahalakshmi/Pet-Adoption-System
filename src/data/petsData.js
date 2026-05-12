const pets = [
  // ── DOGS (10) ──
  { id: 1,  name: "Buddy",   type: "Dog",    breed: "Golden Retriever", age: 2, image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80" },
  { id: 2,  name: "Max",     type: "Dog",    breed: "Labrador",         age: 3, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80" },
  { id: 3,  name: "Charlie", type: "Dog",    breed: "Beagle",           age: 2, image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&q=80" },
  { id: 4,  name: "Rocky",   type: "Dog",    breed: "Pug",              age: 1, image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&q=80" },
  { id: 5,  name: "Lucy",    type: "Dog",    breed: "Husky",            age: 2, image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&q=80" },
  { id: 6,  name: "Cooper",  type: "Dog",    breed: "Poodle",           age: 4, image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80" },
  { id: 7,  name: "Bella",   type: "Dog",    breed: "Bulldog",          age: 3, image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80" },
  { id: 8,  name: "Daisy",   type: "Dog",    breed: "Shih Tzu",         age: 2, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80" },
  { id: 9,  name: "Duke",    type: "Dog",    breed: "German Shepherd",  age: 5, image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&q=80" },
  { id: 10, name: "Molly",   type: "Dog",    breed: "Dachshund",        age: 1, image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&q=80" },

  // ── CATS (10) ──
  { id: 11, name: "Luna",    type: "Cat",    breed: "Persian",          age: 1, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80" },
  { id: 12, name: "Simba",   type: "Cat",    breed: "Siamese",          age: 2, image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80" },
  { id: 13, name: "Milo",    type: "Cat",    breed: "Bengal",           age: 1, image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&q=80" },
  { id: 14, name: "Kitty",   type: "Cat",    breed: "Ragdoll",          age: 2, image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&q=80" },
  { id: 15, name: "Coco",    type: "Cat",    breed: "Maine Coon",       age: 3, image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80" },
  { id: 16, name: "Nala",    type: "Cat",    breed: "Abyssinian",       age: 2, image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80" },
  { id: 17, name: "Oliver",  type: "Cat",    breed: "British Shorthair",age: 4, image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80" },
  { id: 18, name: "Lily",    type: "Cat",    breed: "Scottish Fold",    age: 1, image: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80" },
  { id: 19, name: "Leo",     type: "Cat",    breed: "Sphynx",           age: 3, image: "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=400&q=80" },
  { id: 20, name: "Zoe",     type: "Cat",    breed: "Russian Blue",     age: 2, image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&q=80" },

  // ── BIRDS (10) ──
  { id: 21, name: "Tweety",  type: "Bird",   breed: "Canary",           age: 1, image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80" },
  { id: 22, name: "Polly",   type: "Bird",   breed: "Parrot",           age: 3, image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80" },
  { id: 23, name: "Sky",     type: "Bird",   breed: "Budgerigar",       age: 1, image: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=400&q=80" },
  { id: 24, name: "Rio",     type: "Bird",   breed: "Macaw",            age: 4, image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&q=80" },
  { id: 25, name: "Sunny",   type: "Bird",   breed: "Cockatiel",        age: 2, image: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=400&q=80" },
  { id: 26, name: "Kiwi",    type: "Bird",   breed: "Lovebird",         age: 1, image: "https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=400&q=80" },
  { id: 27, name: "Mango",   type: "Bird",   breed: "Conure",           age: 2, image: "https://images.unsplash.com/photo-1612024782955-49fae79e42bb?w=400&q=80" },
  { id: 28, name: "Blu",     type: "Bird",   breed: "Blue Jay",         age: 1, image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80" },
  { id: 29, name: "Coco",    type: "Bird",   breed: "African Grey",     age: 5, image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80" },
  { id: 30, name: "Piper",   type: "Bird",   breed: "Finch",            age: 1, image: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=400&q=80" },

  // ── RABBITS (10) ──
  { id: 31, name: "Thumper", type: "Rabbit", breed: "Holland Lop",      age: 1, image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80" },
  { id: 32, name: "Snowball",type: "Rabbit", breed: "Angora",           age: 2, image: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&q=80" },
  { id: 33, name: "Biscuit", type: "Rabbit", breed: "Mini Rex",         age: 1, image: "https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400&q=80" },
  { id: 34, name: "Caramel", type: "Rabbit", breed: "Lionhead",         age: 2, image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80" },
  { id: 35, name: "Pepper",  type: "Rabbit", breed: "Dutch",            age: 1, image: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&q=80" },
  { id: 36, name: "Cotton",  type: "Rabbit", breed: "Flemish Giant",    age: 3, image: "https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400&q=80" },
  { id: 37, name: "Hazel",   type: "Rabbit", breed: "Netherland Dwarf", age: 1, image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80" },
  { id: 38, name: "Oreo",    type: "Rabbit", breed: "Rex",              age: 2, image: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&q=80" },
  { id: 39, name: "Peanut",  type: "Rabbit", breed: "Himalayan",        age: 1, image: "https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400&q=80" },
  { id: 40, name: "Clover",  type: "Rabbit", breed: "English Spot",     age: 2, image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80" },
];

export default pets;
