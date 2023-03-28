import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveAppointmentAddress } from "../actions/cartActions";

// eslint-disable-next-line no-empty-pattern
const AppointmentScreen = ({}) => {
  const cart = useSelector((state) => state.cart);
  const { appointmentAddress } = cart;
  const [address, setAddress] = useState(appointmentAddress.address);
  const [city, setCity] = useState(appointmentAddress.city);
  const [postalCode, setPostalCode] = useState(appointmentAddress.postalCode);
  const [country, setCountry] = useState(appointmentAddress.country);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveAppointmentAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 id="steps" />
      <br></br>
      <h4>Appointment</h4>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <br></br>
          <Form.Label>
            <h6>Address</h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <br></br>
          <Form.Label>
            <h6>City</h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <br></br>
          <Form.Label>
            <h6>Postal Code</h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <br></br>
          <Form.Label>
            <h6>Country</h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br></br>
        <br></br>
        <Form.Group id="btn" className="buttons">
          <Button type="submit" variant="light">
            Continue
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default AppointmentScreen;
