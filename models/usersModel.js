const mongoose = require(`mongoose`)
const bcrypt = require(`bcryptjs`)
const ProductsModel = require(`./productsModel`)

const UsersSchema = new mongoose.Schema({
  googleID: String,
  email: String,
  name: String,
  username: String,
  password: {
    type: String,
    select: false,
  },
  confirmedPassword: String,
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'role must either be admin or user',
    },
    default: 'user',
  },

  cart: Array,
  cartTotal: {
    type: Number,
    default: 0,
  },
  shippingCost: {
    type: Number,
    default: 0,
  },
})

UsersSchema.pre(`save`, async function (next) {
  if (!this.password) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.confirmedPassword = undefined
  next()
})

UsersSchema.pre(`save`, async function (next) {
  if (!this.isModified('cart')) return next()
  this.cart = await Promise.all(
    this.cart.map(async id => await ProductsModel.findById(id))
  )
  next()
})

UsersSchema.methods.validateUserPassword = async (
  candidatePassword,
  password
) => await bcrypt.compare(candidatePassword, password)

const UsersModel = mongoose.model(`user`, UsersSchema)
module.exports = UsersModel
