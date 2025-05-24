import { useState, useEffect } from "react";

const Play = () => {
  const [pokemon, setPokemon] = useState([]);
  const [shuffledPokemon, setShuffledPokemon] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=500"
        );
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (poke) => {
            const details = await fetch(poke.url);
            return await details.json();
          })
        );

        setPokemon(detailedPokemon);
        shufflePokemon(detailedPokemon, []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  const shufflePokemon = (pokemonList, clickedCardNames) => {
    const clickedPokemonObjects = pokemonList.filter((poke) =>
      clickedCardNames.includes(poke.name)
    );

    const unclickedPokemon = pokemonList.filter(
      (poke) => !clickedCardNames.includes(poke.name)
    );

    const totalCards = 12;

    const minClickedCards = Math.min(
      Math.floor(
        Math.random() * (Math.floor(10) - Math.ceil(5)) + Math.ceil(5)
      ),
      clickedPokemonObjects.length
    );
    const clickedToInclude = clickedPokemonObjects
      .sort(() => Math.random() - 0.5)
      .slice(0, minClickedCards);

    const remainingSlots = totalCards - clickedToInclude.length;
    const unclickedToInclude = unclickedPokemon
      .sort(() => Math.random() - 0.5)
      .slice(0, remainingSlots);

    const finalCards = [...clickedToInclude, ...unclickedToInclude]
      .map((poke, index) => ({
        ...poke,
        tileId: index,
      }))
      .sort(() => Math.random() - 0.5);

    setShuffledPokemon(finalCards);
    console.log(
      `Clicked cards included: ${clickedToInclude.length}, Total cards: ${finalCards.length}`
    );
  };

  const handleCardClick = (id) => {
    const clickedCard = shuffledPokemon.find((card) => card.tileId === id);

    if (clickedCards.includes(clickedCard.name)) {
      setShowGameOver(true);
      setHighScore(Math.max(score, highScore));
    } else {
      const newClickedCards = [...clickedCards, clickedCard.name];
      setClickedCards(newClickedCards);
      setScore(score + 1);
      shufflePokemon(pokemon, newClickedCards);
    }
  };

  const restartGame = () => {
    setShowGameOver(false);
    setScore(0);
    setClickedCards([]);
    shufflePokemon(pokemon, []);
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
        {Loading ? (
          <div>
            <img
              src="./loading.gif"
              alt="Loading..."
              className="w-full mix-blend-darken mx-auto mb-4 "
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {shuffledPokemon.map((poke) => (
              <div
                key={poke.tileId}
                className="bg-white shadow-lg rounded-lg p-4 cursor-pointer md:transition-transform md:duration-200 md:hover:scale-125"
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
        )}
      </div>

      {showGameOver && (
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
