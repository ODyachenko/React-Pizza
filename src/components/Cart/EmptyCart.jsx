import { Link } from 'react-router-dom';
import emptyImage from '../../assets/img/empty_cart.png';

function EmptyCart() {
  return (
    <>
      <div className="empty-cart">
        <h2 className="empty-cart__title">Корзина пуста</h2>
        <p className="empty-cart__text">
          Найімовірніше, ви не замовляли ще піцу. Щоб замовити піцу, перейди на
          головну сторінку.
        </p>
        <img className="empty-cart__img" src={emptyImage} alt="Empty" />
        <Link to="/" className="empty-cart__btn btn">
          Повернутись назад
        </Link>
      </div>
    </>
  );
}

export default EmptyCart;
