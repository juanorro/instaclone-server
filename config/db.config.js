const mongoose = require('mongoose');

const mongoConnection = () => {
    mongoose.connect('mongodb://localhost/instaclone', {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log(`DB connected`))
    .catch(err => console.log('DB not connected'))
};

module.exports = mongoConnection; 