import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import countries from "./countries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");

  let category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Toggle theme (light/dark)
  function toggleTheme() {
    setTheme(prevTheme => (prevTheme === "light-theme" ? "dark-theme" : "light-theme"));
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.dropdown-li')) {
        setShowCountryDropdown(false);
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 fixed top-0 left-0 w-full z-10 shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <h3 className="text-2xl font-bold text-white">News_Aggregator</h3>

        {/* Hamburger icon */}
        <div className="lg:hidden ham-burger z-50" onClick={() => setActive(!active)}>
          <span className={`lines line-1 ${active ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`lines line-2 ${active ? "opacity-0" : ""}`}></span>
          <span className={`lines line-3 ${active ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </div>

        {/* Navigation Menu */}
        <ul className={`nav-ul lg:flex items-center gap-10 text-white lg:static absolute top-16 left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent px-6 lg:px-0 py-4 lg:py-0 ${active ? "block" : "hidden lg:block"}`}>
          <li>
            <Link className="no-underline font-semibold hover:text-gray-300 transition" to="/" onClick={() => setActive(false)}>All News</Link>
          </li>
          
          {/* Top Headlines Dropdown */}
          <li className="dropdown-li">
  <Link
    className="no-underline font-semibold flex items-center gap-2"
    onClick={() => { 
      setShowCategoryDropdown(!showCategoryDropdown); 
      setShowCountryDropdown(false); 
    }}
  >
    Top-Headlines 
    <FontAwesomeIcon 
      className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} 
      icon={faCircleArrowDown} 
    />
  </Link>
  <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
    {category.map((element, index) => (
      <li key={index} onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
        <Link 
          to={`/top-headlines/${element}`} 
          className="flex gap-3 capitalize"
          onClick={() => setActive(!active)}
        >
          {element}
        </Link>
      </li>
    ))}
  </ul>
</li>

          
          {/* Country Dropdown */}

          <li className="dropdown-li">
  <Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false) }}>
    Country 
    <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
  </Link>
  <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
    {countries.map((element, index) => (
      <li key={index} onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
        <Link to={`/country/${element.iso_2_alpha}`} className="flex gap-3">
          <img src={element.png} alt={element.countryName} className="w-8 h-6" />
          <span>{element.countryName}</span>
        </Link>
      </li>
    ))}
  </ul>
</li>

          {/* <li className="dropdown-li relative">
            <button className="no-underline font-semibold flex items-center gap-2 hover:text-gray-300 transition" onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false); }}>
              Country <FontAwesomeIcon icon={faCircleArrowDown} className={`transform transition-transform ${showCountryDropdown ? "rotate-180" : ""}`} />
            </button>
            <ul className={`dropdown-menu absolute bg-gray-700 rounded-lg shadow-lg mt-2 transition-all duration-300 ${showCountryDropdown ? "opacity-100 visible" : "opacity-0 invisible"}`}>
              {countries.map((element, index) => (
                <li key={index} className="p-2 hover:bg-gray-600 transition-colors rounded-md" onClick={() => setShowCountryDropdown(false)}>
                  <Link to={`/country/${element?.iso_2_alpha}`} className="flex items-center gap-3" onClick={() => setActive(false)}>
                    <img
                      src={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png`}
                      alt={element?.countryName}
                      className="w-6 h-auto"
                    />
                    <span>{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li> */}

          {/* Dark Mode Toggle */}
          <li>
            <button className="flex items-center gap-2 font-semibold" onClick={toggleTheme}>
              <span className="hidden lg:block">{theme === "light-theme" ? "Dark Mode" : "Light Mode"}</span>
              <div className="relative inline-block w-10 h-6 transition duration-200 ease-linear">
                <input type="checkbox" className="absolute opacity-0 w-0 h-0" checked={theme === "dark-theme"} readOnly />
                <div className="toggle-bg block bg-gray-600 w-10 h-6 rounded-full shadow-inner"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform ${theme === "dark-theme" ? "translate-x-4" : ""}`}></div>
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
