const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorneaRequestSchema = new Schema({
  surgeon: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },

  isApproved: {
    type: Boolean,
    default: false,
  },
  distribute: {
    type: Boolean,
    default: false,
},
  descriptionOfRequest: String,
  suiatablity:String,
});

const CorneaRequestModel = mongoose.model('CorneaRequest', CorneaRequestSchema);
module.exports = CorneaRequestModel;