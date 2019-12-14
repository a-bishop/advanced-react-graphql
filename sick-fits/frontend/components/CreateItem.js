import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import Form from './styles/Form';
// import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      price: $price
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const CreateItem = () => {
  const [state, setState] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    largeImage: ''
  });

  const handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setState({ ...state, [name]: val });
  };

  const uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch(
      'http://api.cloudinary.com/v1_1/andrewb/image/upload',
      { method: 'POST', body: data }
    );
    const file = await res.json();
    setState({
      ...state,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={state}>
      {(createItem, { loading, error }) => (
        <Form
          onSubmit={async e => {
            e.preventDefault();
            const res = await createItem();
            console.log(res);
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            });
          }}
        >
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="file">
              Image
              <input
                type="file"
                id="file"
                name="file"
                placeholde="Upload an image"
                required
                onChange={uploadFile}
              />
            </label>
            {state.image && (
              <img width="200" src={state.image} alt={state.title} />
            )}
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                placeholde="Title"
                required
                value={state.title}
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
                value={state.price}
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
                value={state.description}
                required
                onChange={handleChange}
              />
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Mutation>
  );
};
export default CreateItem;
export { CREATE_ITEM_MUTATION };
