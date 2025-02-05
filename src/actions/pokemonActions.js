// src/actions/pokemonActions.js
export const fetchPokemon = () => async (dispatch) => {
    dispatch({ type: 'FETCH_POKEMON_REQUEST' });
    try {
      const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            {
              pokemon_v2_pokemon(limit: 10) {
                height
                id
                name
                order
                pokemon_species_id
              }
            }
          `,
        }),
      });
      const data = await response.json();
      // Dispatch success with the list of Pokémon from the query
      dispatch({ type: 'FETCH_POKEMON_SUCCESS', payload: data.data.pokemon_v2_pokemon });
    } catch (error) {
      dispatch({ type: 'FETCH_POKEMON_FAILURE', error: error.toString() });
    }
  };
  