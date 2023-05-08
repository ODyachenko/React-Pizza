import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { clearItems } from '../../redux/slices/cartSlice';
import trash from '../../assets/img/trash.svg';

function Cart() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalCount = items.reduce((sum, item) => item.count + sum, 0);

  return (
    <div className="cart">
      <div className="cart__inner">
        <h2 className="cart__title">
          <svg
            width="29"
            height="29"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
              stroke="#3F3F3F"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
              stroke="#3F3F3F"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
              stroke="#3F3F3F"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Корзина
        </h2>
        <div onClick={() => dispatch(clearItems())} className="cart__clear">
          <img className="cart__clear-img" src={trash} alt="trash" />

          <span>Очистити корзину</span>
        </div>
      </div>
      <ul className="cart__list">
        {items.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </ul>
      <div className="cart__result">
        <h2 className="cart__result-caption">
          Всього піц: <strong className="bold">{totalCount} шт.</strong>
        </h2>
        <h2 className="cart__result-sum">
          Сума замовлення:&nbsp;
          <strong className="bold">{totalPrice} грн.</strong>
        </h2>
      </div>
      <div className="cart__footer">
        <Link to="/" className="cart__return btn">
          Повернутись назад
        </Link>
        <button className="cart__pay btn">Оплатити зараз</button>
      </div>
    </div>
  );
}

export default Cart;
