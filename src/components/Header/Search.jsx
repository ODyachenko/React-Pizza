import { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';

import { BiSearch } from 'react-icons/bi';
import { GrFormClose } from 'react-icons/gr';
// import { SearchContext } from '../../context/SearchContext';

function Search() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.filter.searchValue);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  function onClearClick() {
    inputRef.current.focus();
    onChangeSearchValue('');
    setValue('');
  }

  function onChangeSearchValue(str) {
    dispatch(setSearchValue(str));
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      onChangeSearchValue(str);
    }, 500),
    []
  );

  function onChangeSearch(event) {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  return (
    <label className="header__search">
      <BiSearch className="header__search--ico" />
      <input
        className="header__search--field"
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeSearch(event)}
        type="text"
        placeholder="Searching for pizza..."
      />
      {searchValue && (
        <GrFormClose onClick={onClearClick} className="header__search--clear" />
      )}
    </label>
  );
}

export default Search;
