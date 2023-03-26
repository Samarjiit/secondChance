import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("querystringkey");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <br></br>
      <h4>Sign In</h4>
      {error && <Message variant="light">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <br></br>
          <Form.Label>
            <h6>Email Address</h6>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <br></br>
          <Form.Label>
            <h6>Password</h6>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group id="btn" className="buttons">
          <br></br>
          <Button type="submit" variant="light">
            Sign In
          </Button>
        </Form.Group>
      </Form>
      <br></br>
      <Col className="py-3">
        <h6>
          New Customer?{""} &nbsp;
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register "}>
            Register
          </Link>
        </h6>
      </Col>
    </FormContainer>
  );
};

export default LoginScreen;
