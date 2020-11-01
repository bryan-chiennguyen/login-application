const express  = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.send('Login Application Backend');
});

//Import Route
app.use('/validate', require('./routes/validate'));
app.get('/validate', function(req, res) {
    res.send('Creating and Validating Access Code')
})

//app.get('/verify', require('./routes/verify'));

module.exports = app;