import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setloading] = useState(true);
  const [cocktail, setcocktail] = useState(null);

  useEffect(() => {
    setloading(true);

    async function fetchDrinks() {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();

      try {
        if (data) {
          const {
            strDrink: name,
            strGlass: glass,
            strInstructions: instructions,
            strDrinkThumb: image,
            strCategory: category,
            strAlcoholic: info,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name,
            glass,
            instructions,
            info,
            image,
            category,
            ingredients,
          };

          setcocktail(newCocktail);
        } else {
          setcocktail(null);
          setloading(false);
        }
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    }
    fetchDrinks();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const { name, glass, instructions, info, image, category, ingredients } =
      cocktail;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name}></img>
          <div className="drink-info">
            <p>
              <span className="drink-data">name :</span> {name}
            </p>
            <p>
              <span className="drink-data">category :</span> {category}
            </p>
            <p>
              <span className="drink-data">info :</span> {info}
            </p>
            <p>
              <span className="drink-data">glass :</span> {glass}
            </p>
            <p>
              <span className="drink-data">instructons :</span> {instructions}
            </p>
            <p>
              <span className="drink-data">ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleCocktail;
