import React from "react";

const PriceListPagination = (props) => {
    const totalPage = Math.ceil(props.data.length / props.item);

    const changePageHandler = (page) => {
        props.onChangePage(page);
    };

    return (
      <div>
        <div hidden={totalPage === 0}>
          <p>
            Halaman {props.page} dari {totalPage}
          </p>
          <div className="price-list-pagination">
            <button
              className="price-list-pagination__first-page"
              key="first"
              disabled={props.page === 1}
              hidden={totalPage <= 3}
              onClick={() => changePageHandler(1)}
            >
              First Page
            </button>
            {totalPage === 1
              ? Array(totalPage)
                  .fill()
                  .map((_, index) => (
                    <button
                      disabled={index === 0}
                      key={index}
                      onClick={() => changePageHandler(props.page)}
                    >
                      {props.page}
                    </button>
                  ))
              : totalPage < 3 && props.page < totalPage
              ? Array(totalPage)
                  .fill()
                  .map((_, index) => (
                    <button
                      disabled={index === 0}
                      key={index}
                      onClick={() => changePageHandler(props.page + index)}
                    >
                      {props.page + index}
                    </button>
                  ))
              : totalPage < 3
              ? Array(totalPage)
                  .fill()
                  .map((_, index) => (
                    <button
                      disabled={index === 1}
                      key={index}
                      onClick={() => changePageHandler(props.page + index - 1)}
                    >
                      {props.page + index - 1}
                    </button>
                  ))
              : props.page > 1 && props.page < totalPage
              ? Array(3)
                  .fill()
                  .map((_, index) => (
                    <button
                      disabled={index === 1}
                      key={index}
                      onClick={() => changePageHandler(props.page - 1 + index)}
                    >
                      {props.page - 1 + index}
                    </button>
                  ))
              : props.page === 1 && props.page < totalPage
              ? Array(3)
                  .fill()
                  .map((_, index) => (
                    <button
                      disabled={index === 0}
                      key={index}
                      onClick={() => changePageHandler(props.page + index)}
                    >
                      {props.page + index}
                    </button>
                  ))
              : totalPage !== 1
              ? Array(3)
                  .fill()
                  .map((_, index) => (
                    <button
                      disabled={index === 2}
                      key={index}
                      onClick={() => changePageHandler(props.page + index - 2)}
                    >
                      {props.page + index - 2}
                    </button>
                  ))
              : Array(1)
                  .fill()
                  .map((_, index) => (
                    <button disabled key={index}>
                      {props.page}
                    </button>
                  ))}
            <button
              className="price-list-pagination__last-page"
              key="last"
              disabled={props.page === totalPage}
              hidden={totalPage <= 3}
              onClick={() => changePageHandler(totalPage)}
            >
              Last Page
            </button>
          </div>
        </div>
      </div>
    );
}

export default PriceListPagination;