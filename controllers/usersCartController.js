const UsersModel = require('../models/usersModel')

exports.getUsersCart = async (req, res) => {
  const User = await UsersModel.findById(req.query.user)
  res.status(200).json({ cart: User.cart })
}

exports.addToUsersCart = async (req, res) => {
  const user = await UsersModel.findById(req.query.user)
  const existing = user.cart.find(
    items => items._id.toString() === req.body.productID
  )

  if (existing) {
    return res.status(200).json({ message: `Already in cart ` })
  }
  user.cart = [...user.cart, req.body.productID]
  await user.save()
  res.status(200).json({ cart: user.cart })
}

exports.deleteCartItem = async (req, res) => {
  const { user, product } = req.query
  const User = await UsersModel.findById(user)
  const index = User.cart.findIndex(el => el._id.toString() === product)
  User.cart.splice(index, 1)
  await User.save()
  res.status(200).json({ payload: User.cart })
}

exports.updateUsersCart = async (req, res) => {
  let { cart: newCart, userID, shipCost, cartTotal } = req.query
  const User = await UsersModel.findById(userID)
  const { _id, username, role } = User
  if (isNaN(shipCost)) shipCost = 0
  const data = {
    _id,
    username,
    role,
    cart: JSON.parse(newCart),
    shippingCost: shipCost,
    cartTotal: cartTotal,
  }
  const user = await UsersModel.findByIdAndUpdate(userID, data)
  res.status(200).json({ status: `success`, cart: user.cart, payLoad: user })
}
