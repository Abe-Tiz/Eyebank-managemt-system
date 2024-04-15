const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const PostSchema = new Schema({
<<<<<<< HEAD
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  
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
=======
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
>>>>>>> 265a67e584919b909806dfc7d0611f1a4c050ef8
},
    { timestamps: true }
);

const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);
module.exports = PostModel;


