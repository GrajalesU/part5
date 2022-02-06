import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = (props) => {
  const [showInfo, setShowInfo] = useState(false)
  const [blog, setBlog] = useState(props.blog)

  const handleLike = async () => {
    try {
      const res = await blogService.like(blog)
      setBlog(res)
      props.setNotification({
        body: `You liked the ${blog.title} ${blog.author} blog`,
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
  return (
    < div className='blog'>
      <p>{blog.title} {blog.author}</p>
      {showInfo &&
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={handleLike}>like</button> </p>
        </>}
      <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Cancel' : 'View'}</button>
    </div >
  )
}

export default Blog