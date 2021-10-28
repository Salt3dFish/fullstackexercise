import blogs from '../../src/services/blogs'

/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request({
      url: 'http://localhost:3003/api/users',
      method: 'POST',
      body: { username: 'chicken', name: 'test', password: '123' }
    })
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('log in').should('be.visible')
  })
  describe('Login', function () {
    beforeEach(function () {
      cy.contains('log in').click()
    })
    it('fail with wrong cren...', function () {
      cy.get('#username').type('chicken')
      cy.get('#password').type('cnmb')
      cy.get('#login-button').click()
      cy.contains('Wrong Credentials')
    })
    it('success with correct cren...', function () {
      cy.get('#username').type('chicken')
      cy.get('#password').type('123')
      cy.get('#login-button').click()
      cy.contains('chicken logged in')
    })
  })
  describe.only('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'chicken', password: '123' })
    })
    it('a blog can be created', function () {
      cy.createBlog({ title: 'blog1 cypress', author: 'chicken', url: 'fuck.com' })
      cy.contains('blog1 cypress chicken')
    })
    it('click likes button', function () {
      cy.createBlog({ title: 'clickME', author: 'chicken', url: 'fuck.com' })
      cy.contains('clickME chicken').contains('view').click().as('clickView')
      cy.contains('clickME chicken')
        .parent().contains('like').click()
        .parent().contains('likes: 1')
    })
    it('Delete blog create By itself', function () {
      let id
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title: 'delete', author: 'chicken', url: 'fuck.com' },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
        }
      }).then(({ body }) => {
        id = body.id
        cy.visit('http://localhost:3000')
        cy.contains('delete chicken')
        cy.deleteBlog(id)
        cy.visit('http://localhost:3000')
        cy.get('html').should('not.contain', 'delete chicken')
      })
    })
    describe('is sorted by likes?', function () {
      beforeEach('create several blogs', function () {
        cy.createBlog({ title: 'first', author: 'chicken', url: 'a.com', likes: 2 })
        cy.createBlog({ title: 'second', author: 'chicken', url: 'c.com', likes: 10 })
        cy.createBlog({ title: 'third', author: 'chicken', url: 'k.com', likes: 8 })
      })
      it.only('check wheather second is at first', function () {
        cy.get('.blogContent')
          .then(blogsEle => {
            blogsEle.map(
              (i,blog) => {
                if (i===0)
                  cy.wrap(blog).should('contain','second chicken')
              }
            )
          })
      })
    })
  })
})