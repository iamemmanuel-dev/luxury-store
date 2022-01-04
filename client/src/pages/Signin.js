import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import S from '../css/Signin.module.css'
import { Signin_User, Signup_User } from '../redux/reducers/authReducer'

const Signin = props => {
  const signinContainer = useRef()
  const signupContainer = useRef()
  const usernameInput = useRef()

  const {
    credentials: { username, password, confirmedPassword },
    User: { isAuthenticated, errorMsg },
  } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleShowingSignup = () => {
    signinContainer.current.classList.add('hideSignin')
    signupContainer.current.classList.add('showSignup')
  }

  const handleShowingSignin = () => {
    signinContainer.current.classList.remove('hideSignin')
    signupContainer.current.classList.remove('showSignup')
  }

  const handleChange = ({ target: { name, value } }) =>
    dispatch({ type: 'SET_AUTH_CREDENTIALS', payload: { [name]: value } })

  const handleSignup = e => {
    e.preventDefault()
    dispatch(Signup_User({ username, password, confirmedPassword }))
  }

  const handleSignin = e => {
    e.preventDefault()
    dispatch(Signin_User({ username, password }))
  }

  useEffect(() => {
    usernameInput.current.focus()
  }, [])

  useEffect(() => {
    // if (isAuthenticated) {
    //   props.history.replace(`/`)
    //   window.location.reload(true)
    // }
    isAuthenticated && props.history.replace('/')
  }, [isAuthenticated])

  return (
    <div className={S.signinPage}>
      <div className='container_sign'>
        <div className={S.signContainer}>
          <div className={S.parent}>
            <div className={S.signinContainer} ref={signinContainer}>
              <form id={S.sigininForm} onSubmit={handleSignin}>
                <h2>
                  <span className='style_this'>Login</span> to <br /> Luxury-buy
                </h2>
                <div className={S.form_group}>
                  <input
                    type='text'
                    name='username'
                    placeholder='username'
                    ref={usernameInput}
                    value={username}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='username'>username</label>
                </div>

                <div className={S.form_group}>
                  <input
                    type='password'
                    name='password'
                    placeholder='password'
                    value={password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='password'>password</label>
                </div>

                <div className={S.alertContainer}>
                  <p>{errorMsg}</p>
                </div>

                <button className={S.btn}>Log in</button>
              </form>
              <div className={S.divider}>OR</div>
              <a href='/auth/google' className={S.googleBtn}>
                <button>Sign in with google</button>
              </a>
              <footer className={S.form_footer}>
                <p>
                  Don't have an account?{' '}
                  <span className={S.signBtn} onClick={handleShowingSignup}>
                    signup
                  </span>
                </p>
              </footer>
            </div>

            <div className={S.signupContainer} ref={signupContainer}>
              <form id={S.siginupForm} onSubmit={handleSignup}>
                <h2>
                  <span className='style_this'>Signup</span> to <br />{' '}
                  Luxury-buy
                </h2>
                <div className={S.form_group}>
                  <input
                    type='text'
                    name='username'
                    placeholder='username'
                    ref={usernameInput}
                    value={username}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='username'>username</label>
                </div>

                <div className={S.form_group}>
                  <input
                    type='password'
                    name='password'
                    placeholder='password'
                    value={password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='password'>password</label>
                </div>

                <div className={S.form_group}>
                  <input
                    type='password'
                    name='confirmedPassword'
                    placeholder='confirm password'
                    value={confirmedPassword}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='password'>confirm password</label>
                </div>

                <div className={S.alertContainer}>
                  <p>{errorMsg}</p>
                </div>

                <button className={S.btn}>Sign up</button>
              </form>
              <div className={S.divider}>OR</div>
              <a href='/auth/google' className={S.googleBtn}>
                <button>Sign in with google</button>
              </a>
              <footer className={S.form_footer}>
                <p>
                  Already have an account?{' '}
                  <span className={S.signBtn} onClick={handleShowingSignin}>
                    signin
                  </span>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Signin)
