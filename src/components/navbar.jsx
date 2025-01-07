import { Link } from "react-router-dom";
import { useState } from "react";
import pokeball from "../assets/pngegg.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Play", path: "/play" },
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <nav className="md:flex md:justify-between md:items-center p-5 bg-slate-600 shadow text-white">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-serif font-semibold">
          <img src={pokeball} alt="Pokemon" className="h-10 inline px-2" />
          Memorite
        </span>
        <span
          className="text-5xl cursor-pointer md:hidden block"
          onClick={toggleMenu}
        >
          <ion-icon name={menuOpen ? "close" : "menu"}></ion-icon>
        </span>
      </div>

      <ul
        className={`md:flex md:items-center md:static absolute bg-slate-600 w-full left-0 
    md:w-auto md:py-0 py-4 md:pl-0 pl-7 transition-all ease-in-out duration-500 ${
      menuOpen ? "top-[80px] opacity-100 z-10" : "top-[-400px] opacity-0"
    } md:top-auto md:opacity-100 md:z-auto`}
      >
        {navItems.map((item) => (
          <li key={item.name} className="mx-4 my-6 md:my-0">
            <Link
              to={item.path}
              className={`text-xl ${
                active === item.name ? "text-red-300" : "text-white"
              } hover:text-yellow-200 duration-500`}
              onClick={() => {
                setActive(item.name);
                setMenuOpen(false);
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
