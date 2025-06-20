import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import Logo from '../assets/BeautifulMindAI.svg';

// ✅ Extracted reusable language switcher
function LanguageSwitcher({ language, changeLanguage }) {
  return (
   
    <div className="language-switcher">
       {/*
      <button className="button" onClick={() => changeLanguage("de")} disabled={language === "de"}>
        DE
      </button>
      <button className="button" onClick={() => changeLanguage("en")} disabled={language === "en"}>
        EN
      </button>
      */}
    </div>
    
  );
}

export default function Header() {
  const [menuShown, setMenuShown] = useState(false);
  const [browserWidth, setBrowserWidth] = useState(window.outerWidth);
  const { language, changeLanguage } = useContext(Context);

  // ✅ Responsive state updates on resize
  useEffect(() => {
    const handleResize = (e) => {
      setBrowserWidth(e.target.outerWidth);
      // Hide menu if resizing to larger screen
      if (e.target.outerWidth > 650) {
        setMenuShown(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    if (browserWidth < 650) {
      setMenuShown((prev) => !prev);
    }
  };

  const isMobile = browserWidth < 650;

  return (
    <header id="header">
      <div className="logo-container logo">
        <Link to="/">
          <img id="logo" src={Logo} alt="DigitalMindAI" />
          <div style={{ opacity: "0", width: "100%", height: "100%" }}>targetx.de</div>
        </Link>
      </div>

      <nav id="nav1">
        {/* ✅ Conditional display of menu */}
        <div id="menu" style={{ display: isMobile && !menuShown ? 'none' : 'block', opacity: isMobile && !menuShown ? 0 : 1 }}>
          <ul>
            <li><Link to="/how-it-works">How It Works</Link></li>
        <li><Link to="/planner">Try the Planner</Link></li>
        <li><Link to="/daily">Daily</Link></li>
        <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      </nav>

      {/* ✅ Language switcher for mobile menu */}
      <div id="menu-sprachen-2">
        <LanguageSwitcher language={language} changeLanguage={changeLanguage} />
      </div>

      {/* ✅ Hamburger menu */}
      {isMobile && (
        <div id="button1" onClick={toggleMenu} className="menu-icon">
          <div className="menu-format">
            <div id="hamburger">
              <div className="hamburger-streifen"></div>
              <div className="hamburger-streifen"></div>
              <div className="hamburger-streifen"></div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Language switcher for desktop */}
      <div id="nav2">
        <div id="menu-sprachen-1">
          <LanguageSwitcher language={language} changeLanguage={changeLanguage} />
        </div>
      </div>
    </header>
  );
}
