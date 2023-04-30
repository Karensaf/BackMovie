const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token              //!Usamos let porq va a variar su valor

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //? Obtengo el token del encabezado
            token = req.headers.authorization.split(' ')[1]
            //* Verificar lafirma del token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //! Obtener el usuario del token
            req.user = await User.findById(decoded.id).select('-password')

            next()  //! NEXT Continua con la actualizacion del programa ???

        } catch (error) {
            // console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado, porque no se recibió ningún token')
    }
})


module.exports = {
    protect
}