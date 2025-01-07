import pokeball from "../assets/pngegg.png";
import squirtle from "../assets/squirtle.png"; // Example Pokémon images
import charmander from "../assets/charmander.png";
import bulbasaur from "../assets/bulbasaur.png";

const Home = () => {
  return (
    <div className="p-5">
      <div className="text-center">
        <img src={pokeball} alt="Pokeball" className="w-20 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-slate-700">
          Welcome to Memorite!
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Test your memory with this fun Pokémon-themed card game. Don't select
          the same card twice!!
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-700 text-center mb-6">
          Meet Some of Your Favorite Pokémon!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center">
            <img src={squirtle} alt="Pikachu" className="w-32 mx-auto" />
            <h3 className="text-xl font-medium text-slate-700 mt-2">
              Squirtle
            </h3>
          </div>
          <div className="text-center">
            <img src={charmander} alt="Charizard" className="w-32 mx-auto" />
            <h3 className="text-xl font-medium text-slate-700 mt-2">
              Charmander
            </h3>
          </div>
          <div className="text-center">
            <img src={bulbasaur} alt="Bulbasaur" className="w-32 mx-auto" />
            <h3 className="text-xl font-medium text-slate-700 mt-2">
              Bulbasaur
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-4xl mx-auto bg-slate-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-slate-700">How to Play:</h2>
        <ul className="list-disc list-inside mt-4 text-gray-600 text-lg">
          <li>Click card to select card</li>
          <li>Try to select different card</li>
          <li>Be careful not to select the same card twice!</li>
          <li>Earn points</li>
        </ul>
        <p className="text-center text-xl text-gray-700 mt-6">
          Are you ready to become the ultimate Pokémon Memory Master?
        </p>
      </div>
    </div>
  );
};

export default Home;
