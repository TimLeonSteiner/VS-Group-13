import { Schema, model, models, Document, Model } from 'mongoose';

export interface IDish extends Document {
  name: string;
  description?: string;
  category: 'vegan' | 'vegetarian' | 'meat';
  allergens?: string[];
}

export interface IMenuEntry extends Document {
  date: Date;
  dish: Schema.Types.ObjectId | IDish;
  canteenId: string;
  mealTime: 'lunch' | 'dinner';
  estimatedWaitMin?: number;
}

export interface IRating extends Document {
  menuEntry: Schema.Types.ObjectId | IMenuEntry;
  user: Schema.Types.ObjectId;
  stars: number;
  comment?: string;
  timestamp: Date;
}

const dishSchema = new Schema<IDish>({
  name: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['vegan', 'vegetarian', 'meat'], required: true },
  allergens: [String],
});

const menuEntrySchema = new Schema<IMenuEntry>({
  date: { type: Date, required: true },
  dish: { type: Schema.Types.ObjectId, ref: 'Dish', required: true },
  canteenId: { type: String, required: true },
  mealTime: { type: String, enum: ['lunch', 'dinner'], required: true },
  estimatedWaitMin: Number,
});

const ratingSchema = new Schema<IRating>({
  menuEntry: { type: Schema.Types.ObjectId, ref: 'MenuEntry', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  stars: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  timestamp: { type: Date, default: Date.now },
});

export const Dish: Model<IDish> = models.Dish || model<IDish>('Dish', dishSchema);
export const MenuEntry: Model<IMenuEntry> = models.MenuEntry || model<IMenuEntry>('MenuEntry', menuEntrySchema);
export const Rating: Model<IRating> = models.Rating || model<IRating>('Rating', ratingSchema);