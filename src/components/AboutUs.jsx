const AboutUs = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-700 text-center mb-6">
          About Memorite
        </h1>

        <p className="text-lg text-gray-600 text-center mb-10">
          Memorite is a Pokémon-themed memory card game designed to test your
          memory and have fun at the same time! Created with love by developers
          and Pokémon fans, this game is perfect for players of all ages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white shadow-md p-6 rounded-lg">
            <ion-icon
              name="flash-outline"
              size="large"
              className="text-yellow-500 mx-auto mb-4"
            ></ion-icon>
            <h3 className="text-xl font-semibold text-slate-700">
              Fast Gameplay
            </h3>
            <p className="text-gray-600 mt-2">
              Experience quick and engaging gameplay that keeps you on your
              toes.
            </p>
          </div>

          <div className="text-center bg-white shadow-md p-6 rounded-lg">
            <ion-icon
              name="logo-octocat"
              size="large"
              className="text-purple-500 mx-auto mb-4"
            ></ion-icon>
            <h3 className="text-xl font-semibold text-slate-700">
              Pokemon enthuist
            </h3>
            <p className="text-gray-600 mt-2">
              Memorite is build for pokemon enthuist to test their pokemon
              skills
            </p>
          </div>

          <div className="text-center bg-white shadow-md p-6 rounded-lg">
            <ion-icon
              name="heart-outline"
              size="large"
              className="text-red-500 mx-auto mb-4"
            ></ion-icon>
            <h3 className="text-xl font-semibold text-slate-700">
              Loved by Players
            </h3>
            <p className="text-gray-600 mt-2">
              Enjoyed by Pokémon fans and gamers alike for its simplicity and
              fun.
            </p>
          </div>
        </div>

        <div className="mt-10 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-slate-700 text-center">
            Meet the Developers
          </h2>
          <p className="text-gray-600 mt-4 text-center">
            Memorite is a project by Pyro who love coding, gaming, and, of
            course, Pokémon.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-slate-700"
            >
              <ion-icon name="logo-github" size="large"></ion-icon>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-slate-700"
            >
              <ion-icon name="logo-twitter" size="large"></ion-icon>
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-slate-700"
            >
              <ion-icon name="logo-instagram" size="large"></ion-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
