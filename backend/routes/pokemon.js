const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// Rutas públicas (no requieren autenticación)
router.get('/', getPokemon);
router.get('/:id', getPokemonById);

// Rutas protegidas (requieren autenticación)
router.post('/', validarJWT, createPokemon);
router.put('/:id', validarJWT, updatePokemon);
router.delete('/:id', validarJWT, deletePokemon);

module.exports = router;