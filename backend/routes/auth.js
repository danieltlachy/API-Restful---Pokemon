const { Router } = require('express');
const { loginPokemon } = require('../controllers/pokemon-auth');
const router = Router();

router.post('/login/pokemon', loginPokemon);

module.exports = router;