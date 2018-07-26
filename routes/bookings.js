const User = require('../models/user')
const Booking = require('../models/booking')

exports.cancel = async (req, res) => {
  const { _id } = req.body
  try {
    const updatedBooking = await Booking.findOneAndUpdate({ _id }, { status: 'cancelled' })
    res.status(200).send(_id)
  } catch (e) {
    res.status(400).send({error: e})
  }
}

exports.book = async (req, res) => {
  const { date } = req.body
  const { _id } = req.user
  try {
    const newBooking = new Booking({
      date,
      user: _id
    })
    await newBooking.save()
    res.status(200).send(newBooking)
  } catch (e) {
    res.status(400).send({error: e})
  }
}
