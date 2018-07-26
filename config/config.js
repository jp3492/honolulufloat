if (process.env.NODE_ENV === 'production') {
  console.log('in production');
  module.exports = require('./dev');
} else {
  console.log('in development');
  module.exports = require('./dev');
}
