import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList, setPokemonlist] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [prevUrl, setPrevUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [PokedexUrl,setPokedexUrl]= useState('https://pokeapi.co/api/v2/pokemon')
 
    async function downloadPokemon() {
        setIsloading(true);
        const response = await axios.get(PokedexUrl);
        const pokemonResults = response.data.results;
        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);
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
        setPokemonlist(pokeListResult)
        setIsloading(false);
    }
    useEffect(() => {
        downloadPokemon();

    }, [PokedexUrl]); 

    return (
        <div className="pokemons-list-wrapper">
            <div className="pokemon-wrapper">
                {(isLoading) ? 'Loading' : pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)}
            </div>
            <div className="controls">
                <button disabled={prevUrl == null} onClick={()=> setPokedexUrl(prevUrl)} >Prev</button>
                <button disabled={nextUrl == null} onClick={()=> setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;