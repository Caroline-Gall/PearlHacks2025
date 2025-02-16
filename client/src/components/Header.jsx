import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#4B9CD3] py-4 shadow-md sticky top-0 z-50">
      <nav className="w-full mx-auto px-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-white text-2xl font-bold transition-colors duration-300"
          >
            jUNC
            <h6 className="text-xs font-normal">Get rid of all your junk!</h6>
          </Link>

        <div className="flex gap-8">
          <Link
            to="/yourSavings"
            className="text-white hover:text-[#13294B] transition-colors duration-300"
          >
            Your Savings
          </Link>

          <Link
            to="/yourItems"
            className="text-white hover:text-[#13294B] transition-colors duration-300"
          >
            Your Listed Items
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
