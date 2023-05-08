import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import './style.scss';

function Pagination() {
  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();

  function onChangePage(id) {
    dispatch(setCurrentPage(id));
  }
  return (
    <ReactPaginate
      className="main__pagination"
      forcePage={currentPage - 1}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
