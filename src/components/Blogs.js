import React from 'react'
import Blog from './Blog'
import propTypes from 'prop-types'


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

Blogs.propTypes = {
  blogs: propTypes.array,
  setNotification: propTypes.func
}

export default Blogs
