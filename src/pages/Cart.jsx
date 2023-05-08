import { useSelector } from 'react-redux';
import CartFull from '../components/Cart/CartFull';
import EmptyCart from '../components/Cart/EmptyCart';

function Cart() {
  const { items } = useSelector((state) => state.cart);

  return !!items.length ? <CartFull /> : <EmptyCart />;
}

export default Cart;
