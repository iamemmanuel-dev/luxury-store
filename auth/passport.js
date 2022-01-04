const passport = require(`passport`)
const GoogleStrategy = require(`passport-google-oauth20`).Strategy
const UsersModel = require(`../models/usersModel`)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },

    async (_, __, profile, done) => {
      const { id, emails, name } = profile
      const existing_user = await UsersModel.findOne({ googleID: id })

      if (existing_user) return done(null, existing_user)

      const newUser = await UsersModel.create({
        googleID: id,
        email: emails[0].value,
        name: name.givenName,
      })
      done(null, newUser)
    }
  )
)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  const user = await UsersModel.findById(id)
  done(null, user)
})
