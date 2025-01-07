const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold font-serif">Memorite</h2>
            <p className="text-sm mt-2 text-gray-300">
              A fun Pokémon-themed memory card game.
            </p>
          </div>

          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href="https://github.com/AshutoshMishra1615"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <ion-icon name="logo-github" size="large"></ion-icon>
            </a>
            <a
              href="https://x.com/AshuMishra1615"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <ion-icon name="logo-twitter" size="large"></ion-icon>
            </a>
            <a
              href="https://instagram.com/ashumishra_pyro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <ion-icon name="logo-instagram" size="large"></ion-icon>
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-500 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2025 Memorite. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
