import React, { useState } from "react";
import { Button, Form, Alert, Spinner, Card, Container, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import "./AuthExample.css";

// Custom styles for dark theme
const darkStyles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)",
    position: "relative",
    overflow: "hidden",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "radial-gradient(circle at 25% 25%, #333 2px, transparent 2px), radial-gradient(circle at 75% 75%, #333 2px, transparent 2px)",
    backgroundSize: "50px 50px",
    opacity: 0.1,
  },
  card: {
    background: "rgba(26, 26, 26, 0.95)",
    border: "1px solid #333",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  },
  cardHeader: {
    background: "linear-gradient(135deg, #2c2c2c, #1a1a1a)",
    borderBottom: "1px solid #444",
    borderRadius: "20px 20px 0 0",
  },
  input: {
    background: "rgba(40, 40, 40, 0.8)",
    border: "1px solid #444",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    padding: "12px 16px",
  },
  button: {
    borderRadius: "12px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  primaryButton: {
    background: "white",
    border: "none",
    color: "#212121",
  },
  dangerButton: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    border: "none",
  },
};

const AuthExample = () => {
  const { user, loading, error, isAuthenticated, login, register, logout, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: "a@a.com",
    emailOrUsername: "a@a.com",
    password: "Aboood166",
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
        console.log("Login successful:", result.success);
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
      <div style={darkStyles.container}>
        <div style={darkStyles.backgroundPattern}></div>
        <Container className="d-flex justify-content-center align-items-center position-relative" style={{ minHeight: "100vh", zIndex: 1 }}>
          <div className="text-center">
            <Spinner animation="border" role="status" variant="light" style={{ width: "4rem", height: "4rem" }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h4 className="text-light mt-3">Loading...</h4>
          </div>
        </Container>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div style={darkStyles.container}>
        <div style={darkStyles.backgroundPattern}></div>
        <Container className="d-flex align-items-center justify-content-center position-relative" style={{ minHeight: "100vh", zIndex: 1 }}>
          <Row className="justify-content-center w-100">
            <Col md={8} lg={6}>
              <Card style={darkStyles.card} className="shadow-lg">
                <Card.Header style={darkStyles.cardHeader} className="text-center py-4">
                  <h2 className="text-light mb-0">🎉 Welcome Back!</h2>
                  <p className="text-light opacity-75 mb-0 mt-2">{user?.username || user?.email}</p>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div className="bg-success bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
                      <i className="fas fa-check text-success" style={{ fontSize: "2rem" }}></i>
                    </div>
                    <h4 className="text-light mt-3">Successfully Authenticated</h4>
                    <p className="text-light opacity-75">You have full access to your account</p>
                  </div>

                  <div className="mb-4">
                    <h6 className="text-light mb-3">User Information:</h6>
                    <div className="bg-dark bg-opacity-50 rounded p-3">
                      <pre className="text-light m-0" style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
                        {JSON.stringify(user, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div className="d-grid">
                    <Button style={{ ...darkStyles.button, ...darkStyles.dangerButton }} onClick={handleLogout} size="lg">
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div style={darkStyles.container}>
      <div style={darkStyles.backgroundPattern}></div>
      <Container className="d-flex align-items-center justify-content-center position-relative" style={{ minHeight: "100vh", zIndex: 1 }}>
        <Row className="justify-content-center w-100">
          <Col md={6} lg={5}>
            <Card style={darkStyles.card} className="shadow-lg">
              <Card.Header style={darkStyles.cardHeader} className="text-center py-4">
                <h2 className="text-light mb-0">
                  {isLoginMode ? (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>Welcome Back
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-2"></i>Join Us
                    </>
                  )}
                </h2>
                <p className="text-light opacity-75 mb-0 mt-2">{isLoginMode ? "Sign in to your account" : "Create your account"}</p>
              </Card.Header>
              <Card.Body className="p-4">
                {error && (
                  <Alert variant="danger" dismissible onClose={clearError} className="mb-4">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {!isLoginMode && (
                    <Form.Group className="mb-4">
                      <Form.Label className="text-light mb-2">
                        <i className="fas fa-user me-2"></i>Username
                      </Form.Label>
                      <Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange} required={!isLoginMode} placeholder="Enter your username" style={darkStyles.input} className="form-control-dark" />
                    </Form.Group>
                  )}

                  {isLoginMode ? (
                    <Form.Group className="mb-4">
                      <Form.Label className="text-light mb-2">
                        <i className="fas fa-envelope me-2"></i>Email or Username
                      </Form.Label>
                      <Form.Control type="text" name="emailOrUsername" value={formData.emailOrUsername} onChange={handleInputChange} required placeholder="Enter your email or username" style={darkStyles.input} className="form-control-dark" />
                    </Form.Group>
                  ) : (
                    <Form.Group className="mb-4">
                      <Form.Label className="text-light mb-2">
                        <i className="fas fa-envelope me-2"></i>Email
                      </Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Enter your email" style={darkStyles.input} className="form-control-dark" />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-4">
                    <Form.Label className="text-light mb-2">
                      <i className="fas fa-lock me-2"></i>Password
                    </Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="Enter your password" style={darkStyles.input} className="form-control-dark" />
                  </Form.Group>

                  {!isLoginMode && (
                    <Form.Group className="mb-4">
                      <Form.Label className="text-light mb-2">
                        <i className="fas fa-lock me-2"></i>Confirm Password
                      </Form.Label>
                      <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required={!isLoginMode} placeholder="Confirm your password" style={darkStyles.input} className="form-control-dark" />
                    </Form.Group>
                  )}

                  <div className="d-grid mb-4">
                    <Button type="submit" disabled={loading} size="lg" style={{ ...darkStyles.button, ...darkStyles.primaryButton }}>
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          {isLoginMode ? "Signing in..." : "Creating Account..."}
                        </>
                      ) : isLoginMode ? (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>Sign In
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user-plus me-2"></i>Create Account
                        </>
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="text-center">
                  <hr className="bg-secondary opacity-25 my-4" />
                  <Button variant="link" onClick={toggleMode} className="text-decoration-none" style={{ color: "#667eea" }}>
                    {isLoginMode ? (
                      <>
                        Don't have an account? <strong>Sign up</strong>
                      </>
                    ) : (
                      <>
                        Already have an account? <strong>Sign in</strong>
                      </>
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthExample;
