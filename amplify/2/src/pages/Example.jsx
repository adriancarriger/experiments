import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { listTodos } from '../graphql/queries';

class Example extends Component {
  render() {
    console.log(this.props.examples);
    return (
      <div>
        <h4>Example page</h4>
        {this.props.examples.map(({ name, id }) => {
          return <li key={id}>{name}</li>;
        })}
      </div>
    );
  }
}

const ExampleWithData = compose(
  graphql(gql(listTodos), {
    options: () => {
      return {
        fetchPolicy: 'cache-and-network'
      };
    },
    props: props => {
      return {
        examples: props.data.listTodos ? props.data.listTodos.items : []
      };
    }
  })
)(Example);

export default ExampleWithData;
