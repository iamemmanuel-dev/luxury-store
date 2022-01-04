const mongoose = require(`mongoose`)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CON_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`connection to database established`)
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
