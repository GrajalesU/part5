import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import propTypes from 'prop-types'

const Blog = (props) => {

  const [showInfo, setShowInfo] = useState(false)
  const [blog, setBlog] = useState({ ...props.blog, hidden: false })
  const [isItMyBlog, setIsItMyBlog] = useState(false)

  const handleLike = async () => {
    try {
      const res = await blogService.like(blog)
      setBlog(res)
      props.setNotification({
        body: `You liked the ${blog.title} by ${blog.author} blog`,
        isError: false
      })
    } catch (e) {
      props.setNotification({
        body: e.response.data.error,
        isError: true
      })
    } finally {
      setTimeout(() => {
        props.setNotification({
          body: null,
          isError: false
        })
      }, 5000)
    }

  }

  const handleDelete = async () => {
    const wantRemove = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (!wantRemove) return
    try {
      await blogService.del(blog)
      setBlog({ ...blog, hidden: true })
      props.setNotification({
        body: `You deleted the ${blog.title} by ${blog.author} blog`,
        isError: false
      })
    } catch (e) {
      props.setNotification({
        body: e.response.data.error,
        isError: true
      })
    } finally {
      setTimeout(() => {
        props.setNotification({
          body: null,
          isError: false
        })
      }, 5000)
    }

  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setIsItMyBlog(user.username === blog.user.username)
    }
  }, [])
  return (
    < div className='blog' style={{ display: blog.hidden ? 'none' : '' }}>
      <p>{blog.title} {blog.author}</p>
      {showInfo &&
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={handleLike}>like</button> </p>
          {isItMyBlog && <button onClick={handleDelete}>Remove</button>}
        </>}
      <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Cancel' : 'View'}</button>
    </div >
  )
}

Blog.propTypes = {
  blog: propTypes.shape({
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    url: propTypes.string.isRequired,
    author: propTypes.string,
    likes: propTypes.number,
    user: propTypes.object
  }),
  setNotification: propTypes.func
}
export default Blog