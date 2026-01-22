import { Schema, model, models, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  parent?: Types.ObjectId | null;
  icon?: string;
  sortOrder: number;
  status: "active" | "inactive";
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    icon: { type: String },
    sortOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Category =
  models.Category || model<ICategory>("Category", CategorySchema);
