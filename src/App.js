import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import noteService from './services/blogs'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    body: null,
    isError: false
  })

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    noteService.setToken(null)
    setNotification({
      body: 'Success logged out',
      isError: false
    })
    setTimeout(() => {
      setNotification({
        body: null,
        isError: false
      })
    }, 5000)

  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <>
      <Notification setNotification={setNotification}  {...notification} />
      {
        user ?
          <div>
            <h5>Welcome, {user.name}</h5>
            <button onClick={handleLogOut}>Logout</button>
            <NewBlog setBlogs={setBlogs} blogs={blogs} setNotification={setNotification} />
            <Blogs blogs={blogs} />
          </div >
          :
          <Login setUser={setUser} setNotification={setNotification} />
      }
    </>
  )
}

export default App
