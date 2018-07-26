const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: Date,
  status: {
    type: String,
    default: 'booked'
  },
  worker: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true });

const ModelClass = mongoose.model('booking', bookingSchema);

module.exports = ModelClass;
