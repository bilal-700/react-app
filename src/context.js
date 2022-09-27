import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [cocktails, setcocktails] = useState([]);
  const [searchTerm, setsearchTerm] = useState("a");

  const fetchDrinks = useCallback(async () => {
    setloading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;

      if (drinks) {
        const newDrinks = drinks.map((item) => {
          const { idDrink, strDrink, strAlcoholic, strGlass, strDrinkThumb } =
            item;

          return {
            id: idDrink,
            name: strDrink,
            info: strAlcoholic,
            picture: strDrinkThumb,
            glass: strGlass,
          };
        });

        setcocktails(newDrinks);
      } else {
        setcocktails([]);
      }
      setloading(false);
    } catch (e) {
      console.log(e);
      setloading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider value={{ loading, cocktails, setsearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
