// src/actions/characterActions.js
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const GET_CHARACTER = gql`
  query character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
        created
      }
      location {
        id
        name
        type
        dimension
        created
      }
      image
      episode {
        id
        name
        air_date
        episode
        created
      }
      created
    }
  }
`;

export const fetchCharacter = (id) => async (dispatch) => {
  dispatch({ type: 'FETCH_CHARACTER_REQUEST' });
  try {
    const { data } = await client.query({
      query: GET_CHARACTER,
      variables: { id },
    });
    dispatch({ type: 'FETCH_CHARACTER_SUCCESS', payload: data.character });
  } catch (error) {
    dispatch({ type: 'FETCH_CHARACTER_FAILURE', error: error.toString() });
  }
};
