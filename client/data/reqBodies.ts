export const reqBodies = {
  'login_post': {
    email: 'email',
    password: 'password',
  },
  'sign-up_post': {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
  },
  'admin/authors_post': {
    name: 'name',
    picture: 'pictureUrl',
  },
  'admin/authors_put': {
    picture: 'pictureUrl',
  },
  'admin/articles_post': {
    authorId: 'authorId',
    categoryId: 'categoryId',
    title: 'title',
    summary: 'summary',
    firstParagraph: 'firstParagraph',
    body: 'body',
  },
  'admin/articles_put': {
    categoryId: 'categoryId',
    title: 'title',
    summary: 'summary',
    firstParagraph: 'firstParagraph',
    body: 'body',
  },
}