const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}; const gSchema = mongoose.Schema({
    _id: reqString,
    color: {
        type: Object,
        default: {
            hex: '#ffffff',
            boolean: false
        }
    },
    date: {
        type: Object,
        default: {
            date: 'N/A',
            confidence: 0
        }
    },
    embed: {
        type: Object,
        default: {},
    },
})

module.exports = mongoose.model('guilds', gSchema)