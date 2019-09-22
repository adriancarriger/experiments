import React, { useEffect, useState } from 'react';
import { Auth, Hub, API, graphqlOperation } from 'aws-amplify';

// import { createBlog } from './graphql/mutations';
import { listBlogs } from './graphql/queries';
import logo from './logo.svg';
import './App.css';

function App(props) {
  useEffect(() => {
    Hub.listen('auth', data => {
      const { payload } = data;
      console.log('A new auth event has happened: ', data);
      if (payload.event === 'signIn') {
        console.log('a user has signed in!');
      }
      if (payload.event === 'signOut') {
        console.log('a user has signed out!');
      }
    });

    Hub.listen('configured', data => {
      console.log('configured data', data);
    });

    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log('user', user);
      } catch (e) {
        console.log('e', e);
      }
      // const blogs = await listBlogsQuery();
      // setBlog(blogs);
    })();
  }, []);

  const [blogs, setBlog] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {blogs.map(({ name, id }) => (
          <div key={id}>{name}</div>
        ))}
        <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
        <button onClick={checkUser}>Check User</button>
        <button onClick={signOut}>Sign Out</button>
        <button onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
          Sign In with Google
        </button>
      </header>
    </div>
  );
}

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(user => console.log({ user }))
    .catch(err => console.log(err));
}

function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

// async function createBlogMutation() {
//   const todoDetails = {
//     name: 'Party tonight!'
//   };

//   const newBlog = await API.graphql(graphqlOperation(createBlog, todoDetails));
//   console.log(newBlog);
// }

async function listBlogsQuery() {
  const { data } = await API.graphql(graphqlOperation(listBlogs));

  return data.listBlogs.items;
}

export default App;
