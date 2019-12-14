import { Mutation } from 'react-apollo';
import { ALL_ITEMS_QUERY } from './Items';
import gql from 'graphql-tag';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = props => {
  const update = (cache, payload) => {
    //manually update the cache on the client so it matches the server
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // filter the deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // Put the items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id: props.id }}
      update={update}
    >
      {(deleteItem, { error }) => {
        if (error) return <p>There was an error deleting this item!</p>;
        return (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this item?')) {
                deleteItem();
              }
            }}
          >
            {props.children}
          </button>
        );
      }}
    </Mutation>
  );
};

export default DeleteItem;
