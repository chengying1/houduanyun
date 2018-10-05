const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/demo-note',{ useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('connected success')
});
module.exports = db