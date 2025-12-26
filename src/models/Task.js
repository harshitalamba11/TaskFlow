import mongoose from "mongoose"
const taskSchema = new mongoose.Schema(
    {
        tenantid:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Tenant",
            index: true
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Project",
        },
        title: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["TODO", "IN_PROGRESS", "COMPLETED"],
            default: "TODO"
        },
        assignedTo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        dueDate: {
            type: Date,
        },
    },
        { timestamps: true }
    
);

export default mongoose.model("Task", taskSchema);