import { useEffect, useState } from "react";
import "./Pokemon.css";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.results);
      });
  }, []);

  return (
    <div className="pokemon-app">
      <h1 className="page-title">PokeDex</h1>
      <div className="pokemon-grid">
        {pokemon.map((item, index) => (
          <div key={index} className="pokemon-card">
            <span className="pokemon-number">
              #{String(index + 1).padStart(3, "0")}
            </span>
            <div className="pokemon-image-wrapper">
              <img
                src={`https://img.pokemondb.net/sprites/home/normal/${item.name}.png`}
                alt={item.name}
                className="pokemon-sprite"
              />
            </div>
            <h2 className="pokemon-name">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
