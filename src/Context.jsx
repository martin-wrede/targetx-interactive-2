import React, { useEffect, useState } from 'react';

const Context = React.createContext();

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
 const [language, setLanguage] = useState(() => {
  const saved = localStorage.getItem("lang");
  if (!saved) {
    localStorage.setItem("lang", "de");
    return "de";
  }
  return saved;
});


  // Function to change language (can be used in a button etc.)
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

 

  useEffect(() => {
    const getData = async () => {
      const url = `/targetx-interactive/data-${language}.json`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getData();
  }, [language]);

  return (
    <Context.Provider value={{ data, language, changeLanguage }}>
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
