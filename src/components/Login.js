import React, { useState } from 'react';
import loginService from '../services/login'




const Login = ({ setUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e);
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
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
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='Password'
          placeholder='password...'
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>Login</button>
    </form>)
};


export default Login;
