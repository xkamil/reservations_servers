const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = process.argv[2] || 'test';
const config = require(`./config/${env}.json`);
const databaseConnectionCheck = require('./middlewares').databaseConnectionCheck;
const authMiddleware = require('./middlewares').authorization;
const cors = require('./middlewares').cors;
const port = process.env.PORT || config.port;
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(databaseConnectionCheck);
app.use(cors);

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// ROUTES API
app.use('/api/users', require('./routes/users'));
app.use('/api/resources', authMiddleware, require('./routes/resources'));
app.use('/api/reservations', require('./routes/reservations'));


// Error handling
app.use((err, req, res, next) => {
    res.status(500).json(err);
});

// Static content
app.use(express.static('build'));

app.listen(port);
console.log('Server started on port ' + port);

module.exports = app;