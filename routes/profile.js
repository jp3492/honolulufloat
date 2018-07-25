const User = require('../models/user')
const Booking = require('../models/booking')
const config = require('../config/config')
const jwt = require('jwt-simple')

exports.updateUser = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body
  console.log(req.user, req.body);
  try {
    const user = await User.findOneAndUpdate({ _id: req.user }, { firstName, lastName, email, phone })
    res.status(200).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
}
exports.getUser = async (req, res) => {
    if (req.headers && req.headers.authorization) {
      let user
      try {
        const decoded = jwt.decode(req.headers.authorization, config.secret);
        user = await User.findById(decoded.sub)
      } catch (e) {
        res.status(400).send({ error: 'could not fetch user based on authentication token'})
      }
      res.status(200).send({ ...user._doc, password: undefined })
    }
    res.status(400).send({ error: 'authorization header is missing'})
}
