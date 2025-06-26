const mongoose = require('mongoose');

// Schemas and Models are redefined for this standalone script
const dishSchema = new mongoose.Schema({ name: String, category: String });
const menuEntrySchema = new mongoose.Schema({ date: Date, dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' } });
const ratingSchema = new mongoose.Schema({ menuEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuEntry' }, stars: Number });
const Dish = mongoose.model('Dish', dishSchema);
const MenuEntry = mongoose.model('MenuEntry', menuEntrySchema);
const Rating = mongoose.model('Rating', ratingSchema);

const DB_URL = 'mongodb://mensa-admin:mensaboys123@localhost:27017/mensa-app?authSource=admin';

async function runQueries() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB to run queries.");

    // Query 1: Find today's menu
    console.log("\n--- Heutiges Menü ---");
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const todaysMenu = await MenuEntry.find({ date: { $gte: startOfDay, $lte: endOfDay } }).populate('dish');
    console.log(todaysMenu);

    // Query 2: Calculate average rating for each dish
    console.log("\n--- Durchschnittliche Bewertungen ---");
    const averageRatings = await Rating.aggregate([
        { $lookup: { from: 'menuentries', localField: 'menuEntry', foreignField: '_id', as: 'menuData' } },
        { $unwind: '$menuData' },
        { $lookup: { from: 'dishes', localField: 'menuData.dish', foreignField: '_id', as: 'dishData' } },
        { $unwind: '$dishData' },
        { $group: { _id: '$dishData.name', averageStars: { $avg: '$stars' }, count: { $sum: 1 } } },
        { $sort: { averageStars: -1 } }
    ]);
    console.log(averageRatings);

  } catch (error) {
    console.error("Error running queries:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB.");
  }
}

runQueries();