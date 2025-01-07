import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Play = () => {
  const [pokemon, setPokemon] = useState([]);
  const [shuffledPokemon, setShuffledPokemon] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [flippedState, setFlippedState] = useState([]); // Tracks flipped cards
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Card references
  const cardRefs = useRef([]);

  // Fetch Pokémon Data
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

  // Shuffle Pokémon
  const shufflePokemon = (pokemonList) => {
    const shuffled = [...pokemonList, ...pokemonList]
      .sort(() => Math.random() - 0.5)
      .map((poke, index) => ({
        ...poke,
        id: index,
      }));
    setShuffledPokemon(shuffled);
    setFlippedState(new Array(shuffled.length).fill(false)); // Reset flipped state
  };

  // Handle Card Click
  const handleCardClick = (id, index) => {
    if (clickedCards.includes(id)) {
      // Game Over: Show Modal
      setShowModal(true);
      setHighScore(Math.max(score, highScore));
      setScore(0);
      setClickedCards([]);
    } else {
      // Flip card animation for the clicked card
      if (!flippedState[index]) {
        gsap.to(cardRefs.current[index], { rotateY: 180, duration: 0.6 });
        const newFlippedState = [...flippedState];
        newFlippedState[index] = true; // Mark the card as flipped
        setFlippedState(newFlippedState);
      }

      // Delay reshuffle
      setTimeout(() => {
        shufflePokemon(pokemon);
      }, 1000); // 1 second delay before reshuffling

      setClickedCards([...clickedCards, id]);
      setScore(score + 1);
    }
  };

  // Restart Game
  const restartGame = () => {
    setShowModal(false);
    setScore(0);
    setClickedCards([]);

    // Reset all flipped cards to face down
    cardRefs.current.forEach((card, index) => {
      gsap.to(card, { rotateY: 0, duration: 0.6 });
    });

    shufflePokemon(pokemon);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-700 text-center mb-6">
          Play Memorite
        </h1>

        {/* Scoreboard */}
        <div className="text-center mb-8">
          <p className="text-xl text-gray-700">Score: {score}</p>
          <p className="text-xl text-gray-700">High Score: {highScore}</p>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {shuffledPokemon.map((poke, index) => (
            <div
              key={poke.id}
              className="relative w-full h-32 bg-transparent cursor-pointer perspective"
              onClick={() => handleCardClick(poke.id, index)}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <div className="relative w-full h-full">
                {/* Front (Pokémon Image) */}
                <div
                  className="absolute w-full h-full bg-white shadow-md rounded-lg flex items-center justify-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={poke.sprites.front_default}
                    alt={poke.name}
                    className="w-20"
                  />
                  <p className="text-center text-lg font-semibold text-slate-700 capitalize mt-2">
                    {poke.name}
                  </p>
                </div>

                {/* Back (Hidden Side) */}
                <div
                  className="absolute w-full h-full bg-yellow-500 shadow-md rounded-lg flex items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className="text-2xl font-bold text-white">?</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
