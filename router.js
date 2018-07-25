const Bookings = require('./routes/bookings')
const Profile = require('./routes/profile')
const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function(app) {
  app.post('/auth/signin', requireSignin, Authentication.signin)
  app.post('/auth/signup', Authentication.signup)
  app.get('/api/schedule', requireAuth, Bookings.schedule)
  app.post('/api/book', requireAuth, Bookings.book)
  app.post('/api/cancel', requireAuth, Bookings.cancel)
  app.get('/api/getUser', requireAuth, Profile.getUser)
  app.post('/api/updateUser', requireAuth, Profile.updateUser)
}
