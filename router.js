const Bookings = require('./routes/bookings')
const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function(app) {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/schedule', requireAuth, Bookings.schedule)
  app.post('/book', requireAuth, Bookings.book)
  app.post('/cancel', requireAuth, Bookings.cancel)
}
