import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 productcard">
      <Link to={`/product/${product._id}`}>
        <Card.Text as="h6" id="prodcategory">
          {product.category}
        </Card.Text>
        <Card.Img src={product.image} variant="top" id="prodimg" />

        <Card.Body>
          <Card.Title as="div" id="prodname">
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as="h6" id="prodcond">
            {product.condition}
          </Card.Text>

          <Card.Text as="h6" id="prodprice">
            <strong>₹{product.price}</strong>
          </Card.Text>
          <Card.Text as="h6" id="produpload">
            {product.uploaddate}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Product;
