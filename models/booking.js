const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  time: Number,
  status: {
    type: String,
    default: 'booked'
  }
}, { timestamps: true });

const ModelClass = mongoose.model('booking', bookingSchema);

module.exports = ModelClass;
