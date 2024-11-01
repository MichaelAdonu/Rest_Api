const express = require('express');

const morgan = require('morgan');
const booksRoute = require('./routes/bookRoute');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use((res, req, next) => {
	console.log('Hello from the middleware 👋');
	next();
});

app.use((res, req, next) => {
	req.RequestTime = new Date().toISOString();
	console.log(req.RequestTime);

	next();
});

// /api/v1/
app.use('/api/v1', booksRoute);

module.exports = app;
