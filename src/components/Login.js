import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'



const Login = ({ setUser, setNotification }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({
        body: 'Logged in',
        isError: false
      })
    } catch (e) {
      setNotification({
        body: e.response.data.error,
        isError: true
      })

    } finally {
      setTimeout(() => {
        setNotification({
          body: null,
          isError: false
        })
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Log in</h1>
      <div>
        <input
          type='text'
          value={username}
          name='Username'
          placeholder='username...'
          onChange={({ target }) => setUsername(target.value)}
          required />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='Password'
          placeholder='password...'
          onChange={({ target }) => setPassword(target.value)}
          required />
      </div>
      <button type='submit'>Login</button>
    </form>)
}


export default Login
