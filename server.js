const express = require('express')
require('dotenv').config()
const cors = require('cors')

const app = express()
const port = process.env.PORT
const DB = require('./database/connect')


const shoppingListPost  = require('./routes/shoppinList/shoppingList-post')
const shoppingListGet  = require('./routes/shoppinList/shoppingList-get')
const shoppingListList  = require('./routes/shoppinList/shoppingList-list')
const shoppingListDelete  = require('./routes/shoppinList/shoppingList-delete')
const shoppingListPermanentDelete  = require('./routes/shoppinList/shoppingList-permanentDelete')
const shoppingListUpdate  = require('./routes/shoppinList/shoppingList-update')

const itemPost = require('./routes/item/item-post')
const itemDelete = require('./routes/item/item-delete')
const itemList = require('./routes/item/item-list')
const itemUpdate = require('./routes/item/item-update')

// Napojení na databázi
const db = new DB()
db.connect()

// Middleware (povolení přijímat JSON z frontendu a povolení CORS)
app.use(cors());
app.use(express.json({ extended: false }));

// ROUTY shoppingLIst
app.use('/', shoppingListPost)
app.use('/', shoppingListGet)
app.use('/', shoppingListList)
app.use('/', shoppingListDelete)
app.use('/', shoppingListPermanentDelete)
app.use('/', shoppingListUpdate)


// Routy item
app.use('/', itemPost)
app.use('/', itemDelete)
app.use('/', itemList)
app.use('/', itemUpdate)

app.get('/' ,(req, res) => {
  res.send('Jsi na hlavní stránce')
})

app.listen(port, (err) => {
  console.log(`Server běží na ${port}`)
})