const { Router } = require(`express`)
const passport = require(`passport`)
const router = Router()

router.get(
  `/`,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

router.get(`/callback`, passport.authenticate('google'), (req, res) => {
  res.status(200).redirect('/')
})

module.exports = router
