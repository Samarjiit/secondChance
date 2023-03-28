import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
//import products from "../products";
import { useParams } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
// eslint-disable-next-line no-empty-pattern
const ProductScreen = ({}) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  return (
    <>
      <Link className="btn btn-light my-3 back" to="/">
        <i className="fa-solid fa-chevron-left"></i>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid id="pimg" />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5 id="pname">
                    <b>{product.name}</b>
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item id="pseller">
                  Seller: {product.sellername}
                </ListGroup.Item>

                <ListGroupItem>
                  <Row id="pprice">
                    <Col>Price:</Col>
                    <Col>
                      <b>₹{product.price}</b>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row id="pstatus">
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          className="form-select"
                          id="qty"
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
              </ListGroup>

              <br></br>
              <ListGroup className="buttons" horizontal>
                <ListGroupItem id="btn">
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Buy
                  </Button>
                </ListGroupItem>
                <h6 id="or">or</h6>
                <ListGroupItem id="btn">
                  <Button className="btn-block" type="button">
                    Chat with the Seller
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          <br></br>
          <Row>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h5 id="pdesc">
                      <b>Description:</b>
                    </h5>
                  </Col>
                </Row>
                <Row>
                  <Col id="dcontent">{product.description}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
