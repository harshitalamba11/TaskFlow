import mongoose from "mongoose";

const taskActivitySchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: false,
      index: true // Faster lookups for task history
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true // Crucial for multi-tenant isolation performance
    },
    action: {
      type: String,
      required: true // e.g., "TASK_CREATED", "STATUS_CHANGED"
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    details: {
      type: String, // Optional: "Changed status from Todo to Done"
      required: false
    }
  },
  { timestamps: true }
);

// Optional: Compound index if you often filter a specific company's recent logs
taskActivitySchema.index({ tenantId: 1, createdAt: -1 });

export default mongoose.model("TaskActivity", taskActivitySchema);