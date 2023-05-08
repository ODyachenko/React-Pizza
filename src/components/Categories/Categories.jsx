import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../redux/slices/filterSlice';
import Sorting from './Sorting';
import './style.scss';

const categories = [
  'Всі',
  "М'ясні",
  'Вегетаріанська',
  'Гриль',
  'Гострі',
  'Кальцоне',
];

// memo дозволяє виключити лишні ререндри компонентів
const Categories = memo(() => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.filter.activeCategory);

  const onChangeCategory = (id) => {
    dispatch(setActiveCategory(id));
  };

  return (
    <div className="main__categories categories">
      <ul className="categories__list">
        {categories.map((category, index) => {
          return (
            <li
              key={category}
              onClick={() => onChangeCategory(index)}
              className={`categories__list-item ${
                activeCategory === index ? 'active' : ''
              }`}
            >
              {category}
            </li>
          );
        })}
      </ul>
      <Sorting />
    </div>
  );
});

export default Categories;
