import {React,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
} from "react-bootstrap";
//import products from "../products";
import { useParams } from "react-router-dom";
const ProductScreen = ({ match }) => {
  const { id } = useParams();
  const[product,setProduct]=useState({});
  useEffect(()=>{
    const fetchProduct=async()=>{
      const {data}=await axios.get(`/api/products/${id}`)
      setProduct(data)
    }

    fetchProduct()
  },[id])
  //const product = products.find((p) => p._id === id);
  return (
    <>
      <Link className="btn btn-light my-3 back" to="/">
        <i class="fa-solid fa-chevron-left"></i>
      </Link>
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
          </ListGroup>
          <br></br>
          <ListGroup className="buttons" horizontal>
            <ListGroupItem id="btn">
              <Button
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
                Bargain
              </Button>
            </ListGroupItem>
          </ListGroup>
          <ListGroup variant="flush" className="buttons">
            <ListGroupItem>
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
  );
};

export default ProductScreen;
