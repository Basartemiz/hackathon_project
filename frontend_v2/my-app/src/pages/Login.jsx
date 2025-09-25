import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Container, Row, Col, Card, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (e) {
      setErr("Invalid credentials");
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center fancy-bg">
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={5} xl={4}>
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Card className="glass-card p-3 p-sm-4">
              <Card.Body>
                <div className="text-center mb-3">
                  <h2 className="fw-bold mb-1">Welcome back</h2>
                  <p className="text-muted mb-0">Sign in to continue</p>
                </div>

                {err && (
                  <Alert variant="danger" className="mb-3">
                    {err}
                  </Alert>
                )}

                <Form onSubmit={onSubmit} noValidate>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FiMail /></InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FiLock /></InputGroup.Text>
                      <Form.Control
                        type={showPw ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        tabIndex={-1}
                      >
                        {showPw ? <FiEyeOff /> : <FiEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Form.Check type="checkbox" label="Remember me" />
                    <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 d-inline-flex align-items-center justify-content-center gap-2"
                    size="lg"
                  >
                    <FiLogIn />
                    Login
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    No account? <Link to="/register">Create one</Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}