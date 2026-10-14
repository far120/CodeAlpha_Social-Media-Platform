import { Schema, model, Document } from "mongoose";

export interface IAuditLog extends Document {
  user?: Schema.Types.ObjectId;
  userEmail: string;
  userName?: string;
  userRole: string;
  method: string;
  endpoint: string;
  statusCode: number;
  durationMs: number;
  ip: string;
  userAgent?: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    userEmail: {
      type: String,
      default: "Guest",
      index: true,
    },
    userName: {
      type: String,
      default: "Guest User",
    },
    userRole: {
      type: String,
      default: "guest",
    },
    method: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
      index: true,
    },
    statusCode: {
      type: Number,
      required: true,
    },
    durationMs: {
      type: Number,
      default: 0,
    },
    ip: {
      type: String,
      default: "127.0.0.1",
    },
    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast searching and pagination sorting
auditLogSchema.index({ createdAt: -1 });

export const auditLogModel = model<IAuditLog>("AuditLog", auditLogSchema);
export default auditLogModel;
