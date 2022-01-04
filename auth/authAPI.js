const { Router } = require(`express`)
const authController = require(`../controllers/authController`)
const UsersModel = require(`../models/usersModel`)
const router = Router()

router.post(`/signup`, authController.signup)
router.post(`/signin`, authController.signin)
router.get(`/current_user`, async (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user })
  }
  if (req.cookies.user) {
    const user = await UsersModel.findById(req.cookies.user)
    return res.status(200).json({ user })
  }
  res.json({})
})

router.get(`/logout`, (req, res) => {
  req.logOut()
  res.clearCookie('user')
  return res.status(200).json({ status: `success` })
})

module.exports = router
