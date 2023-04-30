const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require ('../models/userModel')


const loginUser = asyncHandler(async (req, res) => {
    //? Desestructuramos la información del body request
    const { email, password} = req.body

    //* Verificamos que recibamos la informacion q el modelo user necesita
    if(!email || !password){
        res.status(400)
        throw new Error('Favor de verificar que esten todos los datos')
    }

    //* Verificamos que el usuario exista
    const user = await User.findOne({email})

    //! Comparamos el hash del password y el usuario
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
    // res.json({message: 'Login'})  //* Se quita porq solo era para prueba inicial
})

const registerUser = asyncHandler(async (req, res) => {

    //! Desestructuramos el body request
    const { name, email, password } = req.body

    //* Verificamos que recibamos la informacion q el modelo user necesita
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Favor de verificar que esten todos los datos')
    }

    //? Verificamos que no exista ese ususario
    const userExiste = await User.findOne({email})
    if(userExiste){
        res.status(400)
        throw new Error('Ese email ya fue registrado, el usuario ya existe')
    }

    //! Hacer la salt Cadena de testo aleatoria
    const salt = await  bcrypt.genSalt(10)
    // Crear el hash
    const hashedPassword = await bcrypt.hash(password, salt)

    //? CREAMOS EL USUARIO
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    //* Mandamos la respuesta de la funcion
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('No se pudo crear el usuario, los datos son incorrectos')
    }
    // res.json({message: 'Registrar usuario'}) //?Esta linea era solo para probar si funcionaba en postman
})

const getMisDatos = asyncHandler(async  (req, res) => {
    // res.json({message: 'Muestrame tus datos'})
    res.json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = {
    loginUser,
    registerUser,
    getMisDatos
}