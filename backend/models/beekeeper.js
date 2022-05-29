const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const beekeeperSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
    },
    temporaryPassword: {
        type: String,

        minlength: 7

    },
    verificationCode: {
        type: String
    }
})

beekeeperSchema.pre('save', async function (next) {
    const beekeper = this

    if (beekeeper.isModified('password')) {
        beekeeper.password = await bcrypt.hash(beekeeper.password, 8)
    }
    next()
})

//podesavanje da JSON ne vraca podatke o sifri pcelara
beekeeperSchema.methods.toJSON = function () {
    const beekeeper = this
    const beekeeperObject = beekeeper.toObject()

    delete beekeeperObject.password
    delete beekeeperObject.temporaryPassword
    delete beekeeperObject.verificationCode

    return beekeeperObject
}

const beekeeper = mongoose.model('beekeeper', beekeeperSchema)
module.exports = beekeeper