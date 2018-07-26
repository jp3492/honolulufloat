const User = require('../models/user')
const Booking = require('../models/booking')
const config = require('../config/config')
const jwt = require('jwt-simple')

exports.updateUser = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body
  try {
    const user = await User.findOneAndUpdate({ _id: req.user }, { firstName, lastName, email, phone })
    return res.status(200).send(user)
  } catch (e) {
    return res.status(400).send(e)
  }
}
exports.getUser = async (req, res) => {
    const { _id } = req.user
    if (req.headers && req.headers.authorization) {
      let user, bookings
      try {
        const now = new Date()
        let start = now
        start = start.setDate(start.getDate() - start.getDay())
        start = new Date(start)
        const decoded = jwt.decode(req.headers.authorization, config.secret);
        user = await User.findById(decoded.sub)
        bookings = await Booking.find({ status: 'booked', date: { $gte: start } })
        bookings = bookings.map( b => {
          if (b.user.toString() === _id.toString()) {
            return b._doc
          }
          return { date: b._doc.date }
        })
      } catch (e) {
        return res.status(400).send({ error: 'could not fetch user based on authentication token'})
      }
      console.log(user);
      return res.status(200).send({ ...user._doc, password: undefined, bookings })
    }
    return res.status(400).send({ error: 'authorization header is missing'})
}
