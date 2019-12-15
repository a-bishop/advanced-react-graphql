import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $price: Int
    $description: String
  ) {
    updateItem(
      id: $id
      title: $title
      price: $price
      description: $description
    ) {
      id
      title
      description
      price
    }
  }
`;

const UpdateItem = props => {
  const [state, setState] = useState(null);

  const handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setState({ ...state, [name]: val });
  };

  const handleUpdateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    if (state) {
      const res = await updateItemMutation({
        variables: {
          id: props.id,
          ...state
        }
      });
      console.log('updated!', res);
    } else {
      alert('You need to update something!');
    }
  };

  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id: props.id }}>
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>No Item Found for ID {props.id}</p>;
        return (
          <Mutation mutation={UPDATE_ITEM_MUTATION} variables={state}>
            {(updateItem, { loading, error }) => (
              <Form onSubmit={e => handleUpdateItem(e, updateItem)}>
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                    Title
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholde="Title"
                      required
                      defaultValue={data.item.title}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="price">
                    Price
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholde="Price"
                      defaultValue={data.item.price}
                      required
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="description">
                    Description
                    <textarea
                      id="description"
                      name="description"
                      placeholde="Enter a description"
                      defaultValue={data.item.description}
                      required
                      onChange={handleChange}
                    />
                  </label>
                </fieldset>
                <button type="submit">
                  Sav{loading ? 'ing' : 'e'} Changes
                </button>
              </Form>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
