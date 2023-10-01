const Mongoose = require('mongoose')
const dotenv = require('dotenv')

class dbConnect {
    async connect() {
      dotenv.config()
        try {
         await Mongoose.connect(process.env.DB_CONNECT, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }),
            console.log('Připojeno úspěšně k databázi')
        } catch (err) {
            console.log('K databázi se nejde připojit', err.message)
        }
            
    }
}

module.exports = dbConnect;