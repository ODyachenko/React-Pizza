import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Content from './pages/Content';
import Cart from './pages/Cart';
// import EmptyCart from './pages/EmptyCart';
import NotFound from './pages/NotFound';
import { ScrollToTop } from './utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App container">
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
