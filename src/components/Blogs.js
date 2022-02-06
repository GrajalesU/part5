import React from 'react'
import Blog from './Blog'
const Blogs = ({ blogs, setNotification }) => {
  return (
    <>
      <h2>blogs</h2>
      {
        blogs.sort((a, b) => {
          if (a.likes < b.likes) return 1
          if (a.likes > b.likes) return -1
          return 0
        }).map(blog =>
          <Blog key={blog.id} blog={blog} setNotification={setNotification} />
        )
      }
    </>
  )
}

export default Blogs
