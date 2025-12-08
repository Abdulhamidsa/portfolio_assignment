import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useAuthContext } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Signin = () => {
  const { login, loading, error, isAuthenticated, clearError } = useAuthContext();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrUsername: "a@a.com",
    password: "Aboood166",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

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

    await login(formData.emailOrUsername, formData.password);
  };

  return (
    <div className="auth-bg">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={5}>
            <Card className="auth-card shadow-lg">
              <Card.Header className="text-center py-4">
                <h4 className="text-light mb-0">Sign In</h4>
              </Card.Header>

              <Card.Body className="p-4">
                {error && (
                  <Alert variant="danger" dismissible onClose={clearError} className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-light">Email or Username</Form.Label>
                    <Form.Control type="text" name="emailOrUsername" value={formData.emailOrUsername} onChange={handleInputChange} required className="form-control-dark" />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-light">Password</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} required className="form-control-dark" />
                  </Form.Group>

                  <Button type="submit" size="lg" className="w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" className="me-2" />
                        Signing in…
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
