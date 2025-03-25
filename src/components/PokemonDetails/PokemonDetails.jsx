import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon() {
        const response = axios.get(`https://pokeapi.co/api/v2/pokemon/1/${id}`);
        console.log(response.data);
        setPokemon({
            name: response.data.name,
            image: response.data.spirites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        })
    }

    useEffect(() => {
        downloadPokemon();
    }, []);
    return (
        <div className="pokemon-details-wrapper">
             <img src="" alt="" className="pokemon-image" />
            <div className="pokemon-details-name"><span>name:{pokemon.name}</span> </div>
           
            <div className="pokemon-details-name">
                weight:{pokemon.weight}
            </div>
            <div className="pokemon-details-name">
                height:{pokemon.weight}
            </div>

            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t)=><div key={t}>{t}</div>)}
            </div>
        </div>
    );
}

export default PokemonDetails;