require('dotenv').config()
const express = require('express')
const router = express.Router()

// Controllers
const {
  login,
  registration
} = require('../controllers/auth')
const {
  addArtist
} = require('../controllers/music')
const { getMusics } = require('../controllers/music')

// Middleware
const { auth } = require('../middleware/auth')

// Endpoints
router.post('/login', login)
router.post('/register', registration)
router.get('/musics', getMusics)
router.post('/artist', auth, addArtist)

module.exports = router