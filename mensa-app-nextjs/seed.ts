import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Dish from './lib/models/Dish';
import User from './lib/models/User';
import MenuEntry from './lib/models/MenuEntry';
import Rating from './lib/models/Rating';

dotenv.config({ path: '.env.local' });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

const seedDatabase = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(MONGO_URI);
    console.log('Database connected.');

    console.log('Clearing old data...');
    await Rating.deleteMany({});
    await MenuEntry.deleteMany({});
    await User.deleteMany({});
    await Dish.deleteMany({});
    console.log('Old data cleared.');

    // 1. Create Users
    console.log('Creating users...');
    const [userTim, userSascha] = await User.create([
      { name: 'Tim Steiner', role: 'student' },
      { name: 'Sascha Olthuis', role: 'student' },
    ]);
    console.log(`Created users: ${userTim.name}, ${userSascha.name}`);

    // 2. Create Dishes
    console.log('Creating dishes...');
    const [vegCurry, rindergulasch, kaesespaetzle] = await Dish.create([
      { name: 'Vegetarisches Curry', category: 'vegan', description: 'Leckeres Curry.' },
      { name: 'Rindergulasch', category: 'meat', description: 'Herzhafter Gulasch.' },
      { name: 'Käsespätzle', category: 'vegetarian', description: 'Mit Röstzwiebeln.' },
    ]);
    console.log(`Created dishes: ${vegCurry.name}, ${rindergulasch.name}, ${kaesespaetzle.name}`);

    // 3. Create Menu Entries FOR TODAY
    console.log('Creating menu entries for today...');
    const [menuEntryCurry, menuEntryGulasch] = await MenuEntry.create([
      { date: new Date(), dish: vegCurry._id, canteenId: 'main', mealTime: 'lunch' },
      { date: new Date(), dish: rindergulasch._id, canteenId: 'main', mealTime: 'lunch' },
    ]);
    console.log(`Created ${vegCurry.name} and ${rindergulasch.name} for today's menu.`);
    // 4. some initial ratings
    await Rating.create([
      { menuEntry: menuEntryCurry._id, user: userTim._id, stars: 5 },
      { menuEntry: menuEntryGulasch._id, user: userSascha._id, stars: 3 },
    ]);
    console.log('Created initial ratings.');

    console.log('Database seeding completed successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seedDatabase();