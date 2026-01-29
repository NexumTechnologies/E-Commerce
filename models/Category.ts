import { Schema, model, models, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    // Only store the category name as requested
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Category = models.Category || model<ICategory>("Category", CategorySchema);
