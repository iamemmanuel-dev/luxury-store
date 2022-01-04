const UsersModel = require('../models/usersModel')

const createSendToken = (user, statusCode, status, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  user.password = undefined
  res.cookie('user', user._id, cookieOptions)
  res.status(statusCode).json({
    status,
    user,
  })
}

exports.signup = async (req, res) => {
  const isExisting = await UsersModel.findOne({ username: req.body.username })
  if (isExisting)
    return res.json({ message: `existing_username`, status: `fail` })
  if (req.body.password !== req.body.confirmedPassword)
    return res.json({ message: `mismatch`, status: `fail` })

  const user = await UsersModel.create(req.body)
  createSendToken(user, 201, `success`, res)
}

exports.signin = async (req, res) => {
  const { username, password } = req.body
  const user = await UsersModel.findOne({ username }).select(`+password`)
  if (!user || !(await user.validateUserPassword(password, user.password)))
    return res.status(401).json({ status: `unauthorized` })

  createSendToken(user, 200, `authorized`, res)
}
