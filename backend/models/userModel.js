const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea un nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea un email'],
        unique: true     //!Con esto por ninguna razón habra otro usuario con el mismo correo, en caso de olvidar contraseña se envia a ese mismo email, pero nunca lo ocupa alguien más
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea un password'] //? E mensaje es para asegurarnos q el usuario no deje campos vacios

    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)