import { memo, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSort } from '../../redux/slices/filterSlice';

const sorts = ['популярності ↑', 'популярності ↓', 'ціні ↑', 'ціні ↓', 'назві'];

const Sorting = memo(() => {
  const activeSort = useSelector((state) => state.filter.activeSort);
  const [showSortPopup, setShowSortPopup] = useState(false);
  const dispatch = useDispatch();
  const sortRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      const path = event.composedPath ? event.composedPath() : event.path;
      if (!path.includes(sortRef.current)) {
        setShowSortPopup(false);
      }
    }
    document.body.addEventListener('click', handleClickOutside);

    // Unmount
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  function changeSortingRule(index) {
    dispatch(setActiveSort(index));
    setShowSortPopup(!showSortPopup);
  }

  return (
    <div ref={sortRef} className="categories__sorting sorting">
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
          fill="#2C2C2C"
        />
      </svg>
      Сортування по:&nbsp;
      <span
        onClick={() => setShowSortPopup(!showSortPopup)}
        className="sorting--type"
      >
        {sorts[activeSort]}
      </span>
      {showSortPopup && (
        <ul className="sorting__popup">
          {sorts.map((sort, index) => {
            return (
              <li
                key={sort}
                onClick={() => changeSortingRule(index)}
                className={`${activeSort === index ? 'active' : ''}`}
              >
                {sort}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default Sorting;
