const debug = require('debug')('global');
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const main = require('./routes/home');
const logger = require('./middleware/logger'); //my middlewares
const authenticator = require('./middleware/authenticator');

// build, prepare the app
const app = express();
app.set('view engine', 'pug'); // template engine
app.set('views', './views');
app.use(express.json()); // core
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet()); // thirdparty
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}
app.use(logger); // mine
app.use(authenticator);

// routing
app.use('/vidly.com', main);

// configuration check
console.log('Application Name: ' + config.get('name'));
console.log('Mail Password: ' + config.get('mail.password'));

// init server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connection using PORT: ${port}`));