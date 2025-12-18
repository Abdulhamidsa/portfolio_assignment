import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../context/AuthContext";

function SignUp({ apiClient }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await apiClient.request("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      login(res.user, res.token); // auto-login after signup
    } catch {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Username */}
      <Form.Group className="mb-3" controlId="signupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-control-dark" />
        <Form.Text className="text-muted">Your data is protected from third-party access.</Form.Text>
      </Form.Group>

      {/* Email */}
      <Form.Group className="mb-3" controlId="signupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control-dark" />
        <Form.Text className="text-muted">Your data is protected from third-party access.</Form.Text>
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3" controlId="signupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control-dark" />
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-3" controlId="signupConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="form-control-dark" />
      </Form.Group>

      <Button type="submit" variant="success">
        Sign Up
      </Button>
    </Form>
  );
}

export default SignUp;
