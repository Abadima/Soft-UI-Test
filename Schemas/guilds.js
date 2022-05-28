const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}; const gSchema = mongoose.Schema({
    _id: reqString,
    color: reqString
})

module.exports = mongoose.model('guilds', gSchema)