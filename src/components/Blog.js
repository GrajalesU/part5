import { useState } from 'react'
const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    < div className='blog'>
      <p>{blog.title} {blog.author}</p>
      {showInfo &&
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button> </p>
        </>}
      <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Cancel' : 'View'}</button>
    </div >
  )
}

export default Blog