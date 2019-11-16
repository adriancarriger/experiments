import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import './App.css';
import Home from './pages/Home';
import { Contacts } from './pages/Contacts/index';
import NavBar from './components/NavBar';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

const GET_CONTACTS = gql`
  query MyQuery($condition: ContactCondition) {
    contacts(last: 10, condition: $condition) {
      edges {
        node {
          lastName
          firstName
          id
          contactPhones {
            edges {
              node {
                id
                phoneNumber
              }
            }
          }
        }
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1
  }
}));

const state = {};
// const sub = (query, owner, next) =>
//   API.graphql(graphqlOperation(query, { owner })).subscribe({ next });

function App() {
  const { loading, error, data } = useQuery(GET_CONTACTS, {
    variables: { condition: { userId: 1 } }
  });
  console.log('asdf', data);
  const [contacts, setContacts] = useState([]);
  state.contacts = contacts; // this is weird

  const [auth, setAuth] = useState(true);

  useEffect(() => {
    (async () => {
      const contacts = await client.query({
        query: GET_CONTACTS,
        variables: { condition: { userId: 1 } }
      });
      console.log(contacts);

      setContacts(contacts.data.contacts.edges);
    })();
  }, []);

  const classes = useStyles();

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar auth={auth} onModalOpen={handleOpen} />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <div>
            <Route path="/" exact>
              <Redirect to="/contacts/" />
            </Route>
            {auth ? (
              <Route
                path="/contacts/"
                render={props => (
                  <Contacts
                    {...props}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    contacts={contacts}
                    contactMutations={createStateMutations(setContacts)}
                  />
                )}
              />
            ) : (
              <Home />
            )}
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;

function createStateMutations(setContacts) {
  return {
    onCreateContact: contact => {
      if (!state.contacts.some(({ id }) => id === contact.id)) {
        setContacts([...state.contacts, contact]);
      }
    },
    onDeleteContact: contact =>
      setContacts(state.contacts.filter(({ id }) => id !== contact.id)),
    onUpdateContact: contact =>
      setContacts(
        state.contacts.map(existingContact =>
          existingContact.id === contact.id ? contact : existingContact
        )
      )
  };
}
