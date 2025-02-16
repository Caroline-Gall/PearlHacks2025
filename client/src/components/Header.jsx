import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({setListButtonClicked}) => {

  return (
    <header className="bg-[#4B9CD3] py-4 shadow-md sticky top-0 z-50">
      <nav className="w-full mx-auto px-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-white text-2xl font-bold transition-colors duration-300"
          >
            <div className="flex flex-col items-center">
              <img className="w-12 md:w-16" src='/images/jUNC_blue.jpg' alt="Profile" />
              <h6 className="text-xs font-normal">Get rid of all your junk!</h6>
            </div>
          </Link>

        <div className="flex items-center gap-8">
          <div className="flex">
            <button
              onClick={() => setListButtonClicked(true)}
              className={'px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200 '}
            >
              List your item!
            </button>
          </div>

          <Link
            to="/yourSavings"
            className="text-white hover:text-[#13294B] transition-colors duration-300"
          >
            Your Savings
          </Link>

          <Link
            to="/yourItems"
            className="text-white hover:text-[#13294B] transition-colors duration-300 mr-10"
          >
            Your Items
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
