import { Schema, model, models, Document, Types } from "mongoose";

export interface IRFQ extends Document {
  buyer: Types.ObjectId;
  title: string;
  description: string;
  quantity: number;
  category?: string;
  targetPrice?: number;
  country?: string;
  status: "open" | "closed" | "cancelled";
}

const RFQSchema = new Schema<IRFQ>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String },
    targetPrice: { type: Number },
    country: { type: String },
    status: {
      type: String,
      enum: ["open", "closed", "cancelled"],
      default: "open",
    },
  },
  { timestamps: true }
);

export const RFQ = models.RFQ || model<IRFQ>("RFQ", RFQSchema);
