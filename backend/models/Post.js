const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const PostSchema = new Schema({
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
},
{ timestamps: true }
);

const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);
module.exports = PostModel;


