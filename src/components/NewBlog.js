import React, { useState } from 'react'
import blogServices from '../services/blogs'
const NewBlog = ({ setBlogs, blogs }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title, author, url
    }
    const res = await blogServices.create(newBlog)
    setBlogs([...blogs, res])
  }

  return (
    <form onSubmit={handleNewBlog}>
      <h2>Create new blog</h2>
      <input placeholder='title:'
        onChange={({ target }) => setTitle(target.value)}
        type='text'
        value={title}
        name='Title'
        required />
      <input placeholder='author:'
        onChange={({ target }) => setAuthor(target.value)}
        type='text'
        value={author}
        name='Author'
        required />
      <input placeholder='url:'
        onChange={({ target }) => setUrl(target.value)}
        type='text'
        value={url}
        name='Url'
        required />

      <button type='submit'>submit</button>
    </form>)
}

export default NewBlog
