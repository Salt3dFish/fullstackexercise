/* eslint-disable no-unused-vars */
import React from 'react'
import { render, fireEvent, prettyDOM } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './blogform'

describe('<BlogForm/>', () => {
  let component
  const handleCreateService = jest.fn()
  beforeEach(() => {
    component = render(
      <BlogForm handleCreateService={handleCreateService} />
    )
  })
  test('create a blog', () => {
    const form = component.container.querySelector('form')
    const tI=component.container.querySelector('#title')
    const aI=component.container.querySelector('#author')
    const uI=component.container.querySelector('#url')
    fireEvent.change(tI,{
      target:{ value:'test blog' }
    })
    fireEvent.change(aI,{
      target:{ value:'SB' }
    })
    fireEvent.change(uI,{
      target:{ value:'fuck.com' }
    })
    const blogToPost={
      title:'test blog',
      author:'SB',
      url:'fuck.com'
    }
    console.log(prettyDOM(form))
    fireEvent.submit(form)
    expect(handleCreateService.mock.calls).toHaveLength(1)
    expect(handleCreateService.mock.calls[0][0]).toEqual(blogToPost)
  })
})