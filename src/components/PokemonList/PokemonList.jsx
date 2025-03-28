import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    // const [pokemonList, setPokemonlist] = useState([]);
    // const [isLoading, setIsloading] = useState(true);
    // const [prevUrl, setPrevUrl] = useState(null);
    // const [nextUrl, setNextUrl] = useState(null);
    // const [PokedexUrl,setPokedexUrl]= useState('https://pokeapi.co/api/v2/pokemon')


    const [pokemonListState, setPokemonListState] = useState({
        isLoading: true,
        PokedexUrl: "https://pokeapi.co/api/v2/pokemon",
        nextUrl: "",
        prevUrl: ""
    });

    async function downloadPokemon() {
        setPokemonListState((state)=>({ ...state, isLoading: true }));
        const response = await axios.get(pokemonListState.PokedexUrl);  
        const pokemonResults = response.data.results;
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        }));
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const pokeListResult = (pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        }));
        console.log(pokeListResult);
        setPokemonListState((state)=>({
            ...state,
            pokemonList: pokeListResult,
            isLoading: false
        }));

    }
    useEffect(() => {
        downloadPokemon();

    }, [pokemonListState.PokedexUrl]);

    return (
        <div className="pokemons-list-wrapper">
            <div className="pokemon-wrapper">
                {(pokemonListState.isLoading) ? 'Loading' : pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)}
            </div>
            <div className="controls">
                <button disabled={!pokemonListState.prevUrl}
                    onClick={() => {
                        const urlToSet = pokemonListState.prevUrl;
                        setPokemonListState({ ...pokemonListState, PokedexUrl: pokemonListState.prevUrl })
                    }}>
                    Prev
                </button>

                <button disabled={!pokemonListState.nextUrl}
                    onClick={() => {
                        const urlToSet = pokemonListState.nextUrl;
                        setPokemonListState({ ...pokemonListState, PokedexUrl: pokemonListState.nextUrl })
                    }}>
                    Next
                </button>

            </div>
        </div>
    );
}

export default PokemonList;