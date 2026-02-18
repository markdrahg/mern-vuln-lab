import mongoose, { Schema, Document } from "mongoose";

export interface IShipment extends Document {
  _id: mongoose.Types.ObjectId;
  id: string;
  trackingNumber: string;
  customer: string;
  origin: string;
  destination: string;
  status: "pending" | "in_transit" | "delivered" | "failed";
  carrier: string;
  weight: string;
  value: number;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  departureDate?: Date;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}

const ShipmentSchema = new Schema<IShipment>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    trackingNumber: {
      type: String,
      unique: true,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_transit", "delivered", "failed"],
      default: "pending",
    },
    carrier: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    departureDate: {
      type: Date,
      default: null,
    },
    estimatedDelivery: {
      type: Date,
      default: null,
    },
    actualDelivery: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IShipment>("Shipment", ShipmentSchema);
