import React, { /* useState,*/ useEffect } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/CheckoutSteps";
import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderId = id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  //const orderPay = useSelector((state) => state.orderPay);
  //const { loading: loadingPay, success: successPay } = orderPay;
  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="light">{error}</Message>
  ) : (
    <>
      <h4>Order id: {order._id}</h4>
      <br></br>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>Appointment</h5>
              <strong>Name: </strong>
              {order.user.name}
              <br></br>
              <strong>Email: </strong>
              <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
              <br></br>
              <p>
                {" "}
                <strong>Address: </strong>
                {order.appointmentAddress.address},{" "}
                {order.appointmentAddress.city},{" "}
                {order.appointmentAddress.postalCode},{" "}
                {order.appointmentAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="light">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="light">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <br></br>
            <ListGroup.Item>
              <h5>Payment Method</h5>
              <p>
                {" "}
                <strong>Method: </strong>
                {order.paymentMethod.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant="light">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="light">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Order Items</h5>
              {order.orderItems.length === 0 ? (
                <Message>No orders.</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={6}>
                          {item.qty} x Rs.{item.price} = Rs.
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h4>Order Summary</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>Rs.{order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>Rs.{order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Total</strong>
                </Col>
                <Col>
                  <strong>Rs.{order.totalPrice}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
