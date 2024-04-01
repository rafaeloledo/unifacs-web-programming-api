const express = require('express')
const pool = require('./db')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { rows } = await pooll.query('SELECT * FROM users')
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body
    const newUser = await pool.query(
      'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
      [username, email]
    )

    res.json(newUser.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
