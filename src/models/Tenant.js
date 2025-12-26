import mongoose from 'mongoose';
const tenantSchema = new mongoose.Schema({
    name: { type: String, required: true },

    plan: {
        type: String,
        enum: ["FREE", "PRO", "ENTERPRISE"],
        default: "FREE",
    },

    status: {
        type: String,
        enum: ["ACTIVE", "SUSPENDED"],
        default: "ACTIVE",
    },
}, { timestamps: true });
export default mongoose.model('Tenant',tenantSchema);