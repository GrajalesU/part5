import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import noteService from './services/blogs'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    noteService.setToken(null)
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
      {
        user ?
          <div>
            <h5>Welcome, {user.name}</h5>
            <button onClick={handleLogOut}>Logout</button>
            <NewBlog setBlogs={setBlogs} blogs={blogs} />
            <Blogs blogs={blogs} />
          </div >
          :
          <Login setUser={setUser} />
      }
    </>
  )
}

export default App
