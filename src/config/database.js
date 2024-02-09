const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/authN_authZ');
}

module.exports = connect;