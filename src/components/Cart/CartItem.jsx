import { useDispatch } from 'react-redux';
import {
  decrementPizzaCount,
  addItem,
  removeItem,
} from '../../redux/slices/cartSlice';
import './style.scss';

function CartItem({ id, imageUrl, price, size, title, type, count }) {
  const dispatch = useDispatch();

  function onClickPlus() {
    dispatch(
      addItem({
        id,
      })
    );
  }

  function onClickMinus() {
    dispatch(decrementPizzaCount(id));
  }

  return (
    <li className="cart__list-item">
      <div className="cart__info">
        <img className="cart__img" src={imageUrl} alt="pizza" />
        <div className="cart__desc">
          <h3 className="cart__caption">{title}</h3>
          <span className="cart__options">
            {type} тісто, {size} см.
          </span>
        </div>
      </div>
      <div className="cart__count count">
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className="count__minus"
        >
          –
        </button>
        <span className="count__num">{count}</span>
        <button onClick={onClickPlus} className="count__plus">
          +
        </button>
      </div>
      <div className="cart__actions">
        <span className="cart__price">{price * count} грн.</span>
        <span onClick={() => dispatch(removeItem(id))} className="cart__delete">
          x
        </span>
      </div>
    </li>
  );
}

export default CartItem;
