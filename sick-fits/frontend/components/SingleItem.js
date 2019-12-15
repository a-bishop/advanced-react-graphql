import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const SingleItem = props => (
  <Query query={SINGLE_ITEM_QUERY} variables={{ id: props.id }}>
    {({ error, loading, data }) => {
      if (error) return <p>Error!</p>;
      if (loading) return <p>Loading...</p>;
      return <p>Single Item {props.id}</p>;
    }}
  </Query>
);

export default SingleItem;
