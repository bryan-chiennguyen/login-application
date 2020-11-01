//The main file to run the backend
require('dotenv').config();

const app = require('./app');

app.listen(8000, () => {
    console.log('Listening on port 8000');
})