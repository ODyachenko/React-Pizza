import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from './Search';
import logo from '../../assets/img/logo.svg';
import cart from '../../assets/img/cart.svg';
import './style.scss';

function Header() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const totalCount = items.reduce((sum, item) => item.count + sum, 0);
  const isMounted = useRef(false);
  const location = useLocation();

  // Зберігаємо вибрані піци в localStorage
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }

    isMounted.current = true;
  }, [items]);

  return (
    <header className="header">
      <Link to="/" className="header__brand brand">
        <img className="brand__logo" src={logo} alt="logo" />
        <div className="brand__captions">
          <h1 className="brand__name">REACT PIZZA</h1>
          <span className="brand__slogan">найсмачніша піца у всесвіті</span>
        </div>
      </Link>
      {location.pathname !== '/cart' && <Search />}
      {location.pathname !== '/cart' && (
        <Link to="/cart" className="header__cart">
          <span className="header__cart-price">{totalPrice} грн.</span>
          <span className="header__cart-number">
            <img src={cart} alt="cart" /> <span>{totalCount}</span>
          </span>
        </Link>
      )}
    </header>
  );
}

export default Header;
