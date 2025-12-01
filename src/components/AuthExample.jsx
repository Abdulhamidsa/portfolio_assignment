import React, { useState } from "react";
import { Button, Form, Alert, Spinner, Card, Container, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const AuthExample = () => {
  const { user, loading, error, isAuthenticated, login, register, logout, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    emailOrUsername: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (isLoginMode) {
      const result = await login(formData.emailOrUsername, formData.password);
      if (result.success) {
        console.log("Login successful:", result.data);
      }
    } else {
      // Registration mode
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      const userData = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
      };

      const result = await register(userData);
      if (result.success) {
        console.log("Registration successful:", result.data);
      }
    }
  };

  const handleLogout = () => {
    logout();
    setFormData({
      email: "",
      emailOrUsername: "",
      password: "",
      confirmPassword: "",
      username: "",
    });
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    clearError();
    setFormData({
      email: "",
      emailOrUsername: "",
      password: "",
      confirmPassword: "",
      username: "",
    });
  };

  if (loading && !isAuthenticated) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isAuthenticated) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Header>
                <h4>Welcome, {user?.username || user?.email}!</h4>
              </Card.Header>
              <Card.Body>
                <p>You are successfully logged in.</p>
                <div className="mb-3">
                  <strong>User Info:</strong>
                  <pre className="mt-2 p-2 bg-light rounded">{JSON.stringify(user, null, 2)}</pre>
                </div>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h4>{isLoginMode ? "Login" : "Register"}</h4>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" dismissible onClose={clearError}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {!isLoginMode && (
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange} required={!isLoginMode} placeholder="Enter your username" />
                  </Form.Group>
                )}

                {isLoginMode ? (
                  <Form.Group className="mb-3">
                    <Form.Label>Email or Username</Form.Label>
                    <Form.Control type="text" name="emailOrUsername" value={formData.emailOrUsername} onChange={handleInputChange} required placeholder="Enter your email or username" />
                  </Form.Group>
                ) : (
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Enter your email" />
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="Enter your password" />
                </Form.Group>

                {!isLoginMode && (
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required={!isLoginMode} placeholder="Confirm your password" />
                  </Form.Group>
                )}

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                        {isLoginMode ? "Logging in..." : "Registering..."}
                      </>
                    ) : isLoginMode ? (
                      "Login"
                    ) : (
                      "Register"
                    )}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                <Button variant="link" onClick={toggleMode}>
                  {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthExample;
