import mongoose from "mongoose";

const typesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export const Types = mongoose.model("Types", typesSchema);