import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'


test('renders blog', () => {
  const blog = {
    id: '1',
    title: 'Component testing is done with react-testing-library',
    author: 'admin',
    url: 'test.com',
    likes: 0,
    user: new Object('61fafd48697f3b584d1a4b75')
  }

  const component = render(<Blog blog={blog} />)
  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)
})

test('renders expanded blog', () => {
  const blog = {
    id: '1',
    title: 'Component testing is done with react-testing-library',
    author: 'admin',
    url: 'test.com',
    likes: 0,
    user: new Object('61fafd48697f3b584d1a4b75')
  }

  const component = render(<Blog blog={blog} />)
  const button = component.getByText('View')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)

})