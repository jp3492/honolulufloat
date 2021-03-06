const Bookings = require('./routes/bookings')
const Profile = require('./routes/profile')
const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function(app) {
  app.post('/api/getUser', requireAuth, Profile.getUser)
  app.post('/auth/signin', requireSignin, Authentication.signin)
  app.post('/auth/signup', Authentication.signup)
  app.post('/api/book', requireAuth, Bookings.book)
  app.post('/api/cancel', requireAuth, Bookings.cancel)
  app.post('/api/updateUser', requireAuth, Profile.updateUser)
}
