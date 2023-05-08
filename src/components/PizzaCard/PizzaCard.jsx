import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import './style.scss';

const typeOfBatter = ['Тонке', 'Традиційне'];
const pizzaSize = [26, 30, 40];

function PizzaCard({ id, imageUrl, title, price, sizes, types }) {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const cartItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const dispatch = useDispatch();
  const pizzaCount = cartItem ? cartItem.count : 0;

  function onCLickAdd() {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeOfBatter[activeType],
      size: pizzaSize[activeSize],
      count: pizzaCount,
    };
    dispatch(addItem(item));
  }

  return (
    <div className="main__card card">
      <img className="card__img" src={imageUrl} alt="pizza" />
      <h3 className="card__title">{title}</h3>
      <div className="card__options options">
        <ul className="options__list">
          {types.map((type) => {
            return (
              <li
                key={type}
                onClick={() => setActiveType(type)}
                className={`options__item batter ${
                  activeType === type ? 'selected' : ''
                }`}
              >
                {typeOfBatter[type]}
              </li>
            );
          })}
        </ul>
        <ul className="options__list">
          {sizes.map((size, index) => {
            return (
              <li
                key={size}
                onClick={() => setActiveSize(index)}
                className={`options__item size ${
                  activeSize === index ? 'selected' : ''
                }`}
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="card__footer">
        <span className="card__price">{price} грн.</span>
        <button onClick={onCLickAdd} className="card__add">
          +&nbsp;Додати{' '}
          {!!pizzaCount && (
            <span className="card__add--count">{pizzaCount}</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default PizzaCard;
