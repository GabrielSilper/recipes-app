import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';

function Recipes(props) {
  const { recipe, categorys, type } = props;

  const { setMeals, setDrinks } = useContext(RecipesContext);
  const { makeFetch } = useFetch();

  const MAX_LENGTH = 12;
  const VALUE = 5;

  const removeFilter = async () => {
    const URL_API_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const URL_API_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (type === 'meals') {
      const data = await makeFetch(URL_API_MEALS);
      setMeals(data.meals);
    }

    if (type === 'drinks') {
      const data = await makeFetch(URL_API_DRINKS);
      setDrinks(data.drinks);
    }
  };

  const filterByCategory = async (name) => {
    const URL_API_MEALS = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
    const URL_API_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;

    if (type === 'meals') {
      const dataFilterByCategory = await makeFetch(URL_API_MEALS);
      setMeals(dataFilterByCategory.meals);
    }

    if (type === 'drinks') {
      const dataFilterByCategory = await makeFetch(URL_API_DRINKS);
      setDrinks(dataFilterByCategory.drinks);
    }
  };

  return (
    <main>
      <button data-testid="All-category-filter" onClick={ removeFilter }>All</button>
      {categorys
        .map((item, index) => (
          <button
            data-testid={ `${item.strCategory}-category-filter` }
            key={ index }
            onClick={ () => filterByCategory(item.strCategory) }
          >
            {item.strCategory}
          </button>
        ))
        .slice(0, VALUE)}
      {recipe
        .map((item, index) => (
          <div
            key={ item.idDrink || item.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strDrinkThumb || item.strMealThumb }
              alt="foto do produto"
            />
            <p data-testid={ `${index}-card-name` }>
              {item.strMeal || item.strDrink}
            </p>
          </div>
        ))
        .slice(0, MAX_LENGTH)}
    </main>
  );
}

Recipes.propTypes = {
  categorys: PropTypes.arrayOf(
    PropTypes.shape({
      strCategory: PropTypes.string.isRequired,
    }),
  ).isRequired,
  recipe: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};

export default Recipes;
