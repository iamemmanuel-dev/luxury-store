const { Router } = require(`express`)
const usersCartController = require(`../controllers/usersCartController`)
const router = Router()

router
  .route('/')
  .get(usersCartController.getUsersCart)
  .post(usersCartController.addToUsersCart)
  .delete(usersCartController.deleteCartItem)
  .put(usersCartController.updateUsersCart)

module.exports = router
