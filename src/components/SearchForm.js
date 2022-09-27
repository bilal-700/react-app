import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setsearchTerm } = useGlobalContext();
  const searchValue = useRef("");

  const searchCocktail = () => {
    setsearchTerm(searchValue.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  return (
    <section className="section search">
      <form
        className="search-form"
        onSubmit={() => {
          handleSubmit();
        }}
      >
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            ref={searchValue}
            type="text"
            name="name"
            id="name"
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
