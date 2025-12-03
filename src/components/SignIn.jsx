import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../context/AuthContext";

function SignIn({ apiClient }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      login(res.user, res.token); // update global state
    } catch {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Email field */}
      <Form.Group className="mb-3" controlId="signinEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Text className="text-muted">
          Your data is protected from third-party access.
        </Form.Text>
      </Form.Group>

      {/* Password field */}
      <Form.Group className="mb-3" controlId="signinPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      {/* Submit button */}
      <Button type="submit" variant="primary">
        Sign In
      </Button>
    </Form>
  );
}

export default SignIn;