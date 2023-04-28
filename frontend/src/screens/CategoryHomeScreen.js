import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Nav, Button } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { listAllProducts } from "../actions/productActions";

const CategoryHomeScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const productListAll = useSelector((state) => state.productListAll);
  const { loading, error, products } = productListAll;
  //const categoryInUrl = new URLSearchParams(location).split("?")[1];
  //const category = categoryInUrl ? categoryInUrl : "/";
  const category = location.search.split("?")[1];

  const checkCategory = category.toLowerCase();
  console.log(checkCategory);
  const filteredProducts = products.filter(
    //(product) => product.category.toLowerCase === checkCategory
    (product) => console.log(product.category.toLowerCase === checkCategory)
  );
  console.log(filteredProducts);
  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);

  const searchHeader = (
    <Nav>
      <Link to="/">
        <Button className="btn btn-dark my-2 mr-1">All</Button>
      </Link>
      <Link to={`/category?Electronics`}>
        <Button className="btn btn-dark my-2 mr-1">Electronics</Button>
      </Link>
      <Link to={`/category?Stationary`}>
        <Button className="btn btn-dark my-2 mr-1">Stationary</Button>
      </Link>
      <Link to={`/category?Bags`}>
        <Button className="btn btn-dark my-2 mr-1">Bags</Button>
      </Link>
    </Nav>
  );

  return (
    <>
      <Meta title={"SecondChance"} />
      {searchHeader}
      <hr />
      <>
        <h1>{category}</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="light">{error}</Message>
        ) : (
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product._id} sm={6} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </>
    </>
  );
};

export default CategoryHomeScreen;
