const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

export default {
  Query: {
    getBooks: () => books
  },
  Book: {
    customers(parent, args, context, info) {
      return [{ first: 'bob' }, { first: 'asdf' }];
    }
  }
};
