import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = (props) => {
  const [showInfo, setShowInfo] = useState(false)
  const [blog, setBlog] = useState(props.blog)

  const handleLike = async () => {
    const res = await blogService.like(blog)
    setBlog(res)
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