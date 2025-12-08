// import React, { useState } from "react";
// import { Button, Form, Alert, Spinner, Card, Container, Row, Col } from "react-bootstrap";
// import { useAuthContext } from "../../hooks/useAuth";
// import "./Auth.css";
// import { useNavigate } from "react-router-dom";

// // Custom styles for dark theme

// const SignIn = () => {
//   const navigate = useNavigate();

//   const { user, loading, error, isAuthenticated, login, register, logout, clearError } = useAuthContext();

//   const [isLoginMode, setIsLoginMode] = useState(true);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     clearError();

//     if (isLoginMode) {
//       const result = await login(formData.emailOrUsername, formData.password);
//       console.log("Login result:", result);
//       if (result.success) {
//         navigate("/about");
//       }
//     } else {
//       // Registration mode
//       if (formData.password !== formData.confirmPassword) {
//         alert("Passwords don't match!");
//         return;
//       }

//       const userData = {
//         email: formData.email,
//         password: formData.password,
//         username: formData.username,
//       };

//       const result = await register(userData);
//       if (result.success) {
//         console.log("Registration successful");
//       }
//     }
//   };

//   const toggleMode = () => {
//     setIsLoginMode(!isLoginMode);
//     clearError();
//     setFormData({
//       email: "",
//       emailOrUsername: "",
//       password: "",
//       confirmPassword: "",
//       username: "",
//     });
//   };

//   return (
//     <div style={darkStyles.container}>
//       <div style={darkStyles.backgroundPattern}></div>
//       <Container className="d-flex align-items-center justify-content-center position-relative" style={{ minHeight: "100vh", zIndex: 1 }}>
//         <Row className="justify-content-center w-100">
//           <Col md={6} lg={5}>
//             <Card style={darkStyles.card} className="shadow-lg">
//               <Card.Header style={darkStyles.cardHeader} className="text-center py-4">
//                 <h2 className="text-light mb-0">
//                   {isLoginMode ? (
//                     <>
//                       <i className="fas fa-sign-in-alt me-2"></i>Welcome Back
//                     </>
//                   ) : (
//                     <>
//                       <i className="fas fa-user-plus me-2"></i>Join Us
//                     </>
//                   )}
//                 </h2>
//                 <p className="text-light opacity-75 mb-0 mt-2">{isLoginMode ? "Sign in to your account" : "Create your account"}</p>
//               </Card.Header>
//               <Card.Body className="p-4">
//                 {error && (
//                   <Alert variant="danger" dismissible onClose={clearError} className="mb-4">
//                     <i className="fas fa-exclamation-triangle me-2"></i>
//                     {error}
//                   </Alert>
//                 )}

//                 <Form onSubmit={handleSubmit}>
//                   {!isLoginMode && (
//                     <Form.Group className="mb-4">
//                       <Form.Label className="text-light mb-2">
//                         <i className="fas fa-user me-2"></i>Username
//                       </Form.Label>
//                       <Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange} required={!isLoginMode} placeholder="Enter your username" style={darkStyles.input} className="form-control-dark" />
//                     </Form.Group>
//                   )}

//                   {isLoginMode ? (
//                     <Form.Group className="mb-4">
//                       <Form.Label className="text-light mb-2">
//                         <i className="fas fa-envelope me-2"></i>Email or Username
//                       </Form.Label>
//                       <Form.Control type="text" name="emailOrUsername" value={formData.emailOrUsername} onChange={handleInputChange} required placeholder="Enter your email or username" style={darkStyles.input} className="form-control-dark" />
//                     </Form.Group>
//                   ) : (
//                     <Form.Group className="mb-4">
//                       <Form.Label className="text-light mb-2">
//                         <i className="fas fa-envelope me-2"></i>Email
//                       </Form.Label>
//                       <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Enter your email" style={darkStyles.input} className="form-control-dark" />
//                     </Form.Group>
//                   )}

//                   <Form.Group className="mb-4">
//                     <Form.Label className="text-light mb-2">
//                       <i className="fas fa-lock me-2"></i>Password
//                     </Form.Label>
//                     <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="Enter your password" style={darkStyles.input} className="form-control-dark" />
//                   </Form.Group>

//                   {!isLoginMode && (
//                     <Form.Group className="mb-4">
//                       <Form.Label className="text-light mb-2">
//                         <i className="fas fa-lock me-2"></i>Confirm Password
//                       </Form.Label>
//                       <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required={!isLoginMode} placeholder="Confirm your password" style={darkStyles.input} className="form-control-dark" />
//                     </Form.Group>
//                   )}

//                   <div className="d-grid mb-4">
//                     <Button type="submit" disabled={loading} size="lg" style={{ ...darkStyles.button, ...darkStyles.primaryButton }}>
//                       {loading ? (
//                         <>
//                           <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
//                           {isLoginMode ? "Signing in..." : "Creating Account..."}
//                         </>
//                       ) : isLoginMode ? (
//                         <>
//                           <i className="fas fa-sign-in-alt me-2"></i>Sign In
//                         </>
//                       ) : (
//                         <>
//                           <i className="fas fa-user-plus me-2"></i>Create Account
//                         </>
//                       )}
//                     </Button>
//                   </div>
//                 </Form>

//                 <div className="text-center">
//                   <hr className="bg-secondary opacity-25 my-4" />
//                   <Button variant="link" onClick={toggleMode} className="text-decoration-none" style={{ color: "#667eea" }}>
//                     {isLoginMode ? (
//                       <>
//                         Don't have an account? <strong>Sign up</strong>
//                       </>
//                     ) : (
//                       <>
//                         Already have an account? <strong>Sign in</strong>
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SignIn;

import React from "react";

const Signups = () => {
  return <div>s</div>;
};
export default Signups;
