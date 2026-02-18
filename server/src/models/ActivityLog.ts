import mongoose, { Schema, Document } from "mongoose";

export interface IActivityLog extends Document {
  _id: mongoose.Types.ObjectId;
  actionType:
    | "login"
    | "logout"
    | "create_shipment"
    | "update_shipment"
    | "delete_shipment"
    | "user_management";
  adminId: mongoose.Types.ObjectId;
  adminName: string;
  targetId?: string;
  targetType?: string;
  description: string;
  status: "success" | "failure";
  details?: Record<string, any>;
  ipAddress?: string;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    actionType: {
      type: String,
      enum: [
        "login",
        "logout",
        "create_shipment",
        "update_shipment",
        "delete_shipment",
        "user_management",
      ],
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    targetId: {
      type: String,
      default: null,
    },
    targetType: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failure"],
      default: "success",
    },
    details: {
      type: Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IActivityLog>("ActivityLog", ActivityLogSchema);
