import React, { useState } from 'react'
import blogServices from '../services/blogs'
const NewBlog = ({ setBlogs, blogs, setNotification }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title, author, url
    }
    try {
      const res = await blogServices.create(newBlog)
      setBlogs([...blogs, res])
      setNotification({
        body: `New blog ${title} by ${author} added to list`,
        isError: false
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      setNotification({
        body: e.response.data.error,
        isError: true
      })
    } finally {
      setTimeout(() => {
        setNotification({
          body: null,
          isError: false
        })
      }, 5000)
    }
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
