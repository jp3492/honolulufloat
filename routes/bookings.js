const User = require('../models/user')
const Booking = require('../models/booking')

exports.schedule = async (req, res) => {
  try {
    const bookings = await Booking.find({ time: { $ge: Math.round((new Date()).getTime() / 1000) } })
    res.status(200).send(bookings)
  } catch (e) {
    res.status(400).send({ error: 'system error while retrieving schedule'})
  }
}

exports.book = async (req, res) => {
  const { time, machine } = req.body
  const { _id } = req.user
  try {
    const newBooking = new Booking({
      machine,
      time,
      user: _id
    })
    await newBooking.save()
    res.status(200).send(newBooking)
  } catch (e) {
    res.status(400).send({error: e})
  }
}

exports.cancel = async (req, res) => {
  const { booking } = req.body
  try {
    const updatedBooking = await Booking.findOneAndUpdate({ _id: booking }, { status: 'cancelled' }, { returnOriginal: false })
    res.status(200).send({ booking: updatedBooking._id, status: 'cancelled' })
  } catch (e) {
    res.status(400).send({error: e})
  }
}
