const mongoose = require('mongoose');


const dishSchema = new mongoose.Schema({ name: String, category: String });
const menuEntrySchema = new mongoose.Schema({ date: Date, dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' } });
const userSchema = new mongoose.Schema({ name: String });
const ratingSchema = new mongoose.Schema({
  menuEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuEntry' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stars: { type: Number, min: 1, max: 5 }
});


const Dish = mongoose.model('Dish', dishSchema);
const MenuEntry = mongoose.model('MenuEntry', menuEntrySchema);
const User = mongoose.model('User', userSchema);
const Rating = mongoose.model('Rating', ratingSchema);

const DB_URL = 'mongodb://mensa-admin:mensaboys123@localhost:27017/mensa-app?authSource=admin';

async function seedDatabase() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB for seeding.");

    await Promise.all([Dish.deleteMany(), MenuEntry.deleteMany(), User.deleteMany(), Rating.deleteMany()]);
    console.log("Old data cleared.");

    const userTim = await User.create({ name: 'Tim' });
    const vegCurry = await Dish.create({ name: 'Vegetarisches Curry', category: 'vegan' });
    const rindergulasch = await Dish.create({ name: 'Rindergulasch', category: 'meat' });

    const menuEntryCurry = await MenuEntry.create({ date: new Date(), dish: vegCurry._id });
    const menuEntryGulasch = await MenuEntry.create({ date: new Date(), dish: rindergulasch._id });

    await Rating.create({ menuEntry: menuEntryCurry._id, user: userTim._id, stars: 5 });
    await Rating.create({ menuEntry: menuEntryGulasch._id, user: userTim._id, stars: 3 });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seedDatabase();