import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import moment from "moment";

const ProductEditScreen = () => {
  const { id } = useParams();
  const productId = id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [sellername, setSellerName] = useState("");
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const date = moment(product.uploaddate).format("DD MMM, YYYY");

  const navigate = useNavigate();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setCondition(product.condition);
        setSellerName(product.sellername);
        //setUploadDate(product.uploadDate);
      }
    }
  }, [dispatch, product, productId, navigate, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        condition,
        countInStock,
        sellername,
      })
    );
  };
  return (
    <>
      <Link className="btn btn-light my-3 back" to="/admin/productlist">
        <i className="fa-solid fa-chevron-left"></i>
      </Link>

      <FormContainer>
        <h4>Edit Product</h4>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="light">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="light">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <h5>Seller Name: {product.sellername}</h5>
            <h5>Upload Date: {date}</h5>

            <Form.Group controlId="name">
              <br></br>
              <Form.Label>
                <h6>Name</h6>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <br></br>
              <Form.Label>
                <h6>Price</h6>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <br></br>
              <Form.Label>
                <h6>Image</h6>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <br></br>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>
                <h6>Brand</h6>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <br></br>
              <Form.Label>
                <h6>Count In Stock</h6>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="condition">
              <br></br>
              <Form.Label>
                <h6>Condition</h6>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <br></br>
              <Form.Label>
                <h6>Category</h6>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <br></br>
              <Form.Label>
                <h6>Description</h6>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group id="btn" className="buttons">
              <br></br>
              <br></br>

              <Button type="submit" variant="light">
                Update
              </Button>
            </Form.Group>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
