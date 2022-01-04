const fs = require(`fs`)
const path = require(`path`)
const connectDB = require(`./connection/connection`)
const ProductsModel = require(`./models/productsModel`)

connectDB()

const products = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'data.json'), 'utf8')
)

const seedDB = async () => {
  try {
    await ProductsModel.create(products.data)
    console.log(`seeding completed`)
  } catch (err) {
    console.log(err)
  }

  process.exit()
}

const emptyDB = async () => {
  try {
    await ProductsModel.deleteMany({})
    console.log(`DB emptied`)
  } catch (err) {
    console.log(err)
  }

  process.exit()
}

process.argv[2] === '--seed' && seedDB()
process.argv[2] === '--delete' && emptyDB()
