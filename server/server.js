const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = process.argv[2] || 'test';
const config = require(`./config/${env}.json`);
const authMiddleware = require('./middlewares').authorization;
const databaseConnectionCheck = require('./middlewares').databaseConnectionCheck;
const port = process.env.PORT || config.port;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(databaseConnectionCheck);

mongoose.Promise = global.Promise;
mongoose.connect(config.database);


// ROUTES API
app.use('/api/users', require('./routes/users'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/reservations', require('./routes/reservations').router);
app.use('/api/reservations', authMiddleware, require('./routes/reservations').protectedRouter);


// Error handling
app.use((err, req, res, next) => {
    res.status(500).json(err);
});

// Static content
app.use(express.static('build'));

app.listen(port);
console.log('Server started on port ' + port);

module.exports = app;