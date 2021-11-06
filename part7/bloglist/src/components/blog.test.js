/* eslint-disable no-unused-vars */
import React from 'react'
import { render,fireEvent,prettyDOM } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'



describe('<Blog />',() => {
  let component
  let blog={
    title:'test',
    author:'you',
    likes:10,
    url:'baidu.com',
    user:'123',
    id:'10086'
  }

  beforeEach(() => {
    component=render(
      <Blog blog={blog}/>
    )
  })

  test('no render url and likes',() => {
    const bele=component.container.querySelector('.blogContent')
    expect(bele).not.toHaveTextContent('baidu.com')
  })
  test('check url&likes after click',() => {
    const blogToTest={ ...blog }
    blogToTest.viewStatus=true
    const comp=render(
      <Blog blog={blogToTest} />
    )
    const lele=comp.container.querySelector('.likes')
    const uele=comp.container.querySelector('.url')
    expect(lele).toHaveTextContent('10')
    expect(uele).toHaveTextContent('baidu.com')
  })
  test('click 2 times & exec func 2 times',() => {
    const blogToTest={ ...blog }
    const clickLikes=jest.fn()
    blogToTest.viewStatus=true
    const comp=render(
      <Blog blog={blogToTest} likesClickedHandler={clickLikes} />
    )

    const bele=comp.container.querySelector('.blogContent')
    const lB=comp.container.querySelector('.likesButton')

    fireEvent.click(lB)
    fireEvent.click(lB)
    expect(clickLikes.mock.calls[0][0]).toBe('10086')
    expect(clickLikes.mock.calls).toHaveLength(2)
  })
})