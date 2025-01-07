import { useState, useEffect } from "react";

const Play = () => {
  const [pokemon, setPokemon] = useState([]);
  const [shuffledPokemon, setShuffledPokemon] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=12"
        );
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (poke) => {
            const details = await fetch(poke.url);
            return await details.json();
          })
        );

        setPokemon(detailedPokemon);
        shufflePokemon(detailedPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  const shufflePokemon = (pokemonList) => {
    const shuffled = [...pokemonList]
      .sort(() => Math.random() - 0.5)
      .map((poke, index) => ({
        ...poke,
        tileId: index,
      }));
    setShuffledPokemon(shuffled);
  };

  const handleCardClick = (id) => {
    const clickedCard = shuffledPokemon.find((card) => card.tileId === id);

    if (clickedCards.includes(clickedCard.name)) {
      setShowModal(true);
      setHighScore(Math.max(score, highScore));
      setScore(0);
      setClickedCards([]);
    } else {
      setClickedCards([...clickedCards, clickedCard.name]);
      setScore(score + 1);
    }

    shufflePokemon(pokemon);
  };

  const restartGame = () => {
    setShowModal(false);
    setScore(0);
    setClickedCards([]);
    shufflePokemon(pokemon);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-700 text-center mb-6">
          Play Memorite
        </h1>

        <div className="text-center mb-8">
          <p className="text-xl text-gray-700">Score: {score}</p>
          <p className="text-xl text-gray-700">High Score: {highScore}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {shuffledPokemon.map((poke) => (
            <div
              key={poke.tileId}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => handleCardClick(poke.tileId)}
            >
              <img
                src={poke.sprites.front_default}
                alt={poke.name}
                className="w-20 mx-auto"
              />
              <p className="text-center text-lg font-semibold text-slate-700 capitalize mt-2">
                {poke.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-lg mb-6">Your final score: {score}</p>
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Restart Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Play;
