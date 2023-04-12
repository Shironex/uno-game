import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()

const router = express.Router()



router.post('/win', (req, res) => {
  const { email, firstname, lastname } = req.body
  const newUser = {
    email,
    firstname,
    lastname,
    gameswon: 0,
    gameslost: 0,
    Coins: 0,
    password: firstname+lastname
  }
  try {
    console.log('Creating user with data:', newUser)
    prisma.user.create({ data: newUser }).then((createdUser) => {
      console.log(createdUser)
      res.send(createdUser)
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error creating user')
  }
})

export default router
