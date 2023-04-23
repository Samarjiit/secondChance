import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const location = useLocation();
  const path = location.pathname;
  const baseURL =
    path.split("/page/")[0] === "/" ? "" : path.split("/page/")[0];
  if (pages <= 1) return null;
  return (
    <Pagination className="justify-content-center my-3">
      <Pagination.First id="page" />
      <Pagination.Prev id="page" />
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `${baseURL}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist`
          }
        >
          <Pagination.Item id="page" active={x + 1 === page}>
            {x + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
      <Pagination.Next id="page" />
      <Pagination.Last id="page" />
    </Pagination>
  );
};

export default Paginate;
