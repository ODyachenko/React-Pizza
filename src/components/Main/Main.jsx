import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import Categories from '../Categories/Categories';
import PizzaCard from '../PizzaCard/PizzaCard';
import Skelleton from './Skelleton';
import Pagination from '../Pagination/Pagination';
import { setFilters } from '../../redux/slices/filterSlice';
import { fetchPizzas } from '../../redux/slices/pizzasSlice';

import './style.scss';

const sortingParams = [
  { name: 'rating', type: 'asc' },
  { name: 'rating', type: 'desc' },
  { name: 'price', type: 'asc' },
  { name: 'price', type: 'desc' },
  { name: 'alphabetic', type: 'asc' },
];

function Main() {
  const { activeCategory, activeSort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const { pizzasItems, status } = useSelector((state) => state.pizzas);
  const isMounted = useRef(false);
  const isSearch = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchData() {
    dispatch(
      fetchPizzas({
        activeCategory,
        searchValue,
        currentPage,
        sortBy: sortingParams[activeSort].name,
        order: sortingParams[activeSort].type,
      })
    );
  }

  useEffect(() => {
    if (!isSearch.current) {
      fetchData();
    }
    isSearch.current = false;
  }, [activeCategory, activeSort, searchValue, currentPage]);

  // Якщо змінили пераметри і був перший рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeSort,
        activeCategory,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, activeSort, searchValue, currentPage]);

  // Якщо був перший рендер, то перевіряємо URL-параметри і зберігаємо їх в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const obj = {
        activeCategory: params.activeCategory,
        currentPage: params.currentPage,
        activeSort: params.activeSort,
      };
      dispatch(setFilters({ ...obj }));
      isSearch.current = true;
    }
  }, []);

  return (
    <main className="main">
      <Categories />
      <h2 className="main__title">Всі піцци</h2>
      <div className="main__list">
        {status === 'loading'
          ? [...new Array(8)].map((_, index) => <Skelleton key={index} />)
          : pizzasItems.map((pizza) => {
              return <PizzaCard key={pizza.id} {...pizza} />;
            })}
      </div>
      <Pagination />
    </main>
  );
}

export default Main;
