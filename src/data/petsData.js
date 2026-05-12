const pets = [
  // ── DOGS (10) ──
  {
    id: 1, name: "Buddy", type: "Dog", breed: "Golden Retriever", age: 2,
    gender: "Male", color: "Golden", weight: 28, vaccinated: "Yes",
    description: "Buddy is a playful and affectionate Golden Retriever who loves fetch and cuddles. He is great with kids and other pets. Fully trained and house-broken.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80"
  },
  {
    id: 2, name: "Max", type: "Dog", breed: "Labrador", age: 3,
    gender: "Male", color: "Brown", weight: 32, vaccinated: "Yes",
    description: "Max is a loyal and energetic Labrador who loves outdoor adventures. He is well-trained, friendly with strangers, and gets along well with other dogs.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80"
  },
  {
    id: 3, name: "Charlie", type: "Dog", breed: "Beagle", age: 2,
    gender: "Male", color: "Tri-color", weight: 10, vaccinated: "Yes",
    description: "Charlie is a curious and merry Beagle with a great nose for adventure. He loves long walks and playing in the yard. Very gentle with children.",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&q=80"
  },
  {
    id: 4, name: "Rocky", type: "Dog", breed: "Pug", age: 1,
    gender: "Male", color: "Fawn", weight: 7, vaccinated: "Yes",
    description: "Rocky is an adorable and charming Pug who loves to snuggle. He is calm, low-energy, and perfect for apartment living. Great with families.",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&q=80"
  },
  {
    id: 5, name: "Lucy", type: "Dog", breed: "Husky", age: 2,
    gender: "Female", color: "Grey & White", weight: 22, vaccinated: "Yes",
    description: "Lucy is a stunning Husky with bright blue eyes and a playful spirit. She loves cold weather, running, and being the center of attention.",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&q=80"
  },
  {
    id: 6, name: "Cooper", type: "Dog", breed: "Poodle", age: 4,
    gender: "Male", color: "White", weight: 6, vaccinated: "Yes",
    description: "Cooper is an intelligent and elegant Poodle who learns tricks quickly. He is hypoallergenic, great for allergy sufferers, and loves to show off.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80"
  },
  {
    id: 7, name: "Bella", type: "Dog", breed: "Bulldog", age: 3,
    gender: "Female", color: "Brindle", weight: 20, vaccinated: "Yes",
    description: "Bella is a gentle and laid-back Bulldog who loves lounging on the couch. She is great with kids and very low maintenance. A true couch companion.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80"
  },
  {
    id: 8, name: "Daisy", type: "Dog", breed: "Shih Tzu", age: 2,
    gender: "Female", color: "White & Gold", weight: 5, vaccinated: "Yes",
    description: "Daisy is a sweet and affectionate Shih Tzu who loves being pampered. She is calm, friendly, and perfect for families or seniors looking for a companion.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80"
  },
  {
    id: 9, name: "Duke", type: "Dog", breed: "German Shepherd", age: 5,
    gender: "Male", color: "Black & Tan", weight: 35, vaccinated: "Yes",
    description: "Duke is a noble and protective German Shepherd with excellent training. He is loyal, intelligent, and great for active families who enjoy outdoor activities.",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&q=80"
  },
  {
    id: 10, name: "Molly", type: "Dog", breed: "Dachshund", age: 1,
    gender: "Female", color: "Red", weight: 4, vaccinated: "Yes",
    description: "Molly is a lively and curious Dachshund who loves to explore. She is playful, affectionate, and gets along well with other small pets.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&q=80"
  },

  // ── CATS (10) ──
  {
    id: 11, name: "Luna", type: "Cat", breed: "Persian", age: 1,
    gender: "Female", color: "White", weight: 3.5, vaccinated: "Yes",
    description: "Luna is a graceful and calm Persian cat with a silky white coat. She loves quiet environments, gentle petting, and sitting by the window watching birds.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80"
  },
  {
    id: 12, name: "Simba", type: "Cat", breed: "Siamese", age: 2,
    gender: "Male", color: "Cream & Brown", weight: 4, vaccinated: "Yes",
    description: "Simba is a vocal and social Siamese who loves to chat with his owners. He is curious, playful, and forms strong bonds with his family.",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80"
  },
  {
    id: 13, name: "Milo", type: "Cat", breed: "Bengal", age: 1,
    gender: "Male", color: "Brown Spotted", weight: 4.5, vaccinated: "Yes",
    description: "Milo is an energetic and athletic Bengal cat who loves to climb and play. He has a stunning spotted coat and is very interactive with his owners.",
    image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&q=80"
  },
  {
    id: 14, name: "Kitty", type: "Cat", breed: "Ragdoll", age: 2,
    gender: "Female", color: "Blue Point", weight: 5, vaccinated: "Yes",
    description: "Kitty is a docile and gentle Ragdoll who goes limp when picked up — hence the name. She is perfect for families and loves being held and cuddled.",
    image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&q=80"
  },
  {
    id: 15, name: "Coco", type: "Cat", breed: "Maine Coon", age: 3,
    gender: "Female", color: "Brown Tabby", weight: 6, vaccinated: "Yes",
    description: "Coco is a majestic Maine Coon with a thick, luxurious coat. She is friendly, dog-like in personality, and loves following her owners around the house.",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80"
  },
  {
    id: 16, name: "Nala", type: "Cat", breed: "Abyssinian", age: 2,
    gender: "Female", color: "Ruddy", weight: 3.8, vaccinated: "Yes",
    description: "Nala is an active and curious Abyssinian who loves to explore every corner of the house. She is playful, intelligent, and very affectionate.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80"
  },
  {
    id: 17, name: "Oliver", type: "Cat", breed: "British Shorthair", age: 4,
    gender: "Male", color: "Blue Grey", weight: 5.5, vaccinated: "Yes",
    description: "Oliver is a calm and dignified British Shorthair with a plush coat. He is independent but affectionate, and gets along well with children and other pets.",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80"
  },
  {
    id: 18, name: "Lily", type: "Cat", breed: "Scottish Fold", age: 1,
    gender: "Female", color: "Orange & White", weight: 3.2, vaccinated: "Yes",
    description: "Lily is an adorable Scottish Fold with distinctive folded ears and a sweet personality. She loves toys, laser pointers, and curling up in warm spots.",
    image: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80"
  },
  {
    id: 19, name: "Leo", type: "Cat", breed: "Sphynx", age: 3,
    gender: "Male", color: "Peach", weight: 4.2, vaccinated: "Yes",
    description: "Leo is a hairless Sphynx cat who loves warmth and human contact. Despite his unusual appearance, he is incredibly affectionate and loves to cuddle.",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=400&q=80"
  },
  {
    id: 20, name: "Zoe", type: "Cat", breed: "Russian Blue", age: 2,
    gender: "Female", color: "Blue Grey", weight: 3.9, vaccinated: "Yes",
    description: "Zoe is an elegant Russian Blue with a shimmering silver-blue coat. She is gentle, quiet, and forms deep bonds with her chosen family members.",
    image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&q=80"
  },

  // ── BIRDS (10) ──
  {
    id: 21, name: "Tweety", type: "Bird", breed: "Canary", age: 1,
    gender: "Male", color: "Yellow", weight: 0.02, vaccinated: "Partial",
    description: "Tweety is a cheerful Canary with a beautiful singing voice. He fills the room with melodious songs every morning and is easy to care for.",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80"
  },
  {
    id: 22, name: "Polly", type: "Bird", breed: "Parrot", age: 3,
    gender: "Female", color: "Green & Red", weight: 0.4, vaccinated: "Yes",
    description: "Polly is a talkative and intelligent Parrot who can mimic words and sounds. She loves interaction, learning new tricks, and being the center of attention.",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80"
  },
  {
    id: 23, name: "Sky", type: "Bird", breed: "Budgerigar", age: 1,
    gender: "Male", color: "Blue & White", weight: 0.03, vaccinated: "Partial",
    description: "Sky is a friendly Budgerigar who loves to chirp and play with toys. He is easy to tame and can learn to sit on your finger with gentle training.",
    image: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=400&q=80"
  },
  {
    id: 24, name: "Rio", type: "Bird", breed: "Macaw", age: 4,
    gender: "Male", color: "Blue & Gold", weight: 1.1, vaccinated: "Yes",
    description: "Rio is a magnificent Blue and Gold Macaw with vibrant plumage. He is social, intelligent, and can learn an impressive vocabulary of words and phrases.",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&q=80"
  },
  {
    id: 25, name: "Sunny", type: "Bird", breed: "Cockatiel", age: 2,
    gender: "Female", color: "Grey & Yellow", weight: 0.09, vaccinated: "Yes",
    description: "Sunny is a gentle Cockatiel who loves to whistle tunes and be petted on the head. She is calm, affectionate, and great for first-time bird owners.",
    image: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=400&q=80"
  },
  {
    id: 26, name: "Kiwi", type: "Bird", breed: "Lovebird", age: 1,
    gender: "Female", color: "Green & Orange", weight: 0.05, vaccinated: "Partial",
    description: "Kiwi is a vibrant Lovebird who forms strong bonds with her owner. She is playful, curious, and loves to explore her surroundings.",
    image: "https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=400&q=80"
  },
  {
    id: 27, name: "Mango", type: "Bird", breed: "Conure", age: 2,
    gender: "Male", color: "Orange & Green", weight: 0.07, vaccinated: "Yes",
    description: "Mango is a lively and playful Conure who loves to hang upside down and play with toys. He is very social and enjoys being out of his cage.",
    image: "https://images.unsplash.com/photo-1612024782955-49fae79e42bb?w=400&q=80"
  },
  {
    id: 28, name: "Blu", type: "Bird", breed: "Blue Jay", age: 1,
    gender: "Male", color: "Blue & White", weight: 0.08, vaccinated: "Partial",
    description: "Blu is a striking Blue Jay with bold coloring and a curious personality. He is intelligent, alert, and loves to observe everything around him.",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80"
  },
  {
    id: 29, name: "Coco", type: "Bird", breed: "African Grey", age: 5,
    gender: "Female", color: "Grey & Red", weight: 0.5, vaccinated: "Yes",
    description: "Coco is a highly intelligent African Grey Parrot known for her exceptional talking ability. She can hold simple conversations and loves mental stimulation.",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80"
  },
  {
    id: 30, name: "Piper", type: "Bird", breed: "Finch", age: 1,
    gender: "Female", color: "Brown & White", weight: 0.015, vaccinated: "Partial",
    description: "Piper is a delicate and charming Finch who loves to sing softly. She is low-maintenance, peaceful, and perfect for those who enjoy watching birds.",
    image: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=400&q=80"
  },

  // ── RABBITS (10) ──
  {
    id: 31, name: "Thumper", type: "Rabbit", breed: "Holland Lop", age: 1,
    gender: "Male", color: "Grey & White", weight: 1.8, vaccinated: "Yes",
    description: "Thumper is an adorable Holland Lop with floppy ears and a gentle nature. He loves to hop around, explore, and enjoys being gently stroked.",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80"
  },
  {
    id: 32, name: "Snowball", type: "Rabbit", breed: "Angora", age: 2,
    gender: "Female", color: "White", weight: 2.5, vaccinated: "Yes",
    description: "Snowball is a fluffy Angora rabbit with a cloud-like coat. She is calm, gentle, and loves being groomed. Perfect for a quiet, loving home.",
    image: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&q=80"
  },
  {
    id: 33, name: "Biscuit", type: "Rabbit", breed: "Mini Rex", age: 1,
    gender: "Male", color: "Tan", weight: 1.5, vaccinated: "Yes",
    description: "Biscuit is a velvety Mini Rex rabbit with an incredibly soft coat. He is curious, playful, and loves to binky (jump for joy) around the room.",
    image: "https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400&q=80"
  },
  {
    id: 34, name: "Caramel", type: "Rabbit", breed: "Lionhead", age: 2,
    gender: "Female", color: "Caramel", weight: 1.6, vaccinated: "Yes",
    description: "Caramel is a charming Lionhead rabbit with a distinctive mane of fur around her head. She is friendly, social, and loves to be the center of attention.",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80"
  },
  {
    id: 35, name: "Pepper", type: "Rabbit", breed: "Dutch", age: 1,
    gender: "Male", color: "Black & White", weight: 2.0, vaccinated: "Yes",
    description: "Pepper is a classic Dutch rabbit with a distinctive black and white pattern. He is energetic, loves to explore, and enjoys playing with toys.",
    image: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&q=80"
  },
  {
    id: 36, name: "Cotton", type: "Rabbit", breed: "Flemish Giant", age: 3,
    gender: "Female", color: "White", weight: 5.5, vaccinated: "Yes",
    description: "Cotton is a gentle giant Flemish rabbit who is surprisingly calm and docile. Despite her large size, she is very gentle and loves to be petted.",
    image: "https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400&q=80"
  },
  {
    id: 37, name: "Hazel", type: "Rabbit", breed: "Netherland Dwarf", age: 1,
    gender: "Female", color: "Brown", weight: 0.9, vaccinated: "Yes",
    description: "Hazel is a tiny Netherland Dwarf rabbit with big eyes and a compact body. She is lively, curious, and loves to hop around and investigate everything.",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80"
  },
  {
    id: 38, name: "Oreo", type: "Rabbit", breed: "Rex", age: 2,
    gender: "Male", color: "Black & White", weight: 3.0, vaccinated: "Yes",
    description: "Oreo is a handsome Rex rabbit with a plush, velvety coat. He is calm, friendly, and enjoys lounging in comfortable spots around the house.",
    image: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&q=80"
  },
  {
    id: 39, name: "Peanut", type: "Rabbit", breed: "Himalayan", age: 1,
    gender: "Male", color: "White & Dark Points", weight: 1.4, vaccinated: "Yes",
    description: "Peanut is a beautiful Himalayan rabbit with a white body and dark-colored points. He is gentle, easy to handle, and loves quiet companionship.",
    image: "https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400&q=80"
  },
  {
    id: 40, name: "Clover", type: "Rabbit", breed: "English Spot", age: 2,
    gender: "Female", color: "White & Black Spots", weight: 2.3, vaccinated: "Yes",
    description: "Clover is a lively English Spot rabbit with a distinctive spotted pattern. She is energetic, loves to run and jump, and enjoys interactive playtime.",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80"
  },
];

export default pets;
