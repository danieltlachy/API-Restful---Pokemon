const { response } = require('express');
const mongoose = require('mongoose');
const { generarJWT } = require('../helpers/generar-jwt');

const Usuario = mongoose.model('Usuarios');

const loginPokemon = async(req, res = response) => {
    try {
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ correo, password });
        
        console.log(`\nEl usuario ${correo} está intentando acceder al servicio Pokemon...`);
        
        if (usuario) {
            console.log(`Login correcto para el servicio Pokemon.`);
            // Generar JWT
            const token = await generarJWT(usuario._id);
            // Enviar token en header
            res.header('x-token', token);
            console.log(`Token enviado en el header: ${token}`);
            // Enviar respuesta
            res.json({
                mensaje: 'Login exitoso',
                usuario: {
                    nombre: usuario.nombre,
                    correo: usuario.correo
                }
            });
        } else {
            res.status(401).json({
                mensaje: 'Credenciales inválidas para el servicio Pokemon'
            });
        }
    } catch (error) {
        console.error('Error en el login del servicio Pokemon:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

module.exports = {
    loginPokemon
};
