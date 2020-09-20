const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/203", {
    useNewUrlParser: true, useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connection success!')
    }
});

module.exports = mongoose;