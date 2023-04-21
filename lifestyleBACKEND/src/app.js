const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Entry } = require('./models')
require('dotenv').config();

const app = express();
var expressWs = require('express-ws')(app);

// security HTTP headers
app.use(helmet());

// parse json request body
app.use(bodyParser.json());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/v1', routes);

// websockets for updating the step number
app.ws('/', function(ws, req) {
    ws.on('message', async function(msg) {
        const message = JSON.parse(msg)
        const token = message?.token
        if(!token) return ws.send(JSON.stringify({ message: 'No token in request', status: 'error'}))
        try {
            const decoded = jwt.verify(token, process.env.JWT_ENCRYPTION_SECRET);
            if(!message?.date || !message?.steps) return ws.send(JSON.stringify({ message: 'Missing details', status: 'error'}))

            const entry = await Entry.findOne({ user: decoded?._doc?._id, date: message?.date })

            if(!entry){
                try{
                    let entry = await Entry.create({ user: decoded?._doc?._id, date: message?.date })
                    entry = entry.toJson();
                    return ws.send(JSON.stringify({ entry: entry }))
                }catch(e){
                    return ws.send(JSON.stringify({ message: 'Something went wrong', status: 'error'}))
                }
            }

            entry.steps = message?.steps;
            newDocument = await entry.save()
            return ws.send(JSON.stringify({ entry: newDocument }))

        } catch(err) {
            return ws.send(JSON.stringify({ message: 'Unauthorized', status: 'error'}))
        }
    });
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new Error(404, 'Not found'));
});

module.exports = app;