const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    createrName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required: true,
    },
},
    { timestamps: true }
);

const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);
module.exports = PostModel;


