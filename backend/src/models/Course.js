import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["video", "note", "quiz"],
            required: "true",
        },
        title: String,
        url: String, // video,link,pdf
    },
    { timestamps: true }
);

const courseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        price: { type: Number, default: 0 },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: [contentSchema],
        studentsEnrolled: [
            { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
