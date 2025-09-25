import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Container, Row, Col, Card, Form, Button, InputGroup, Alert, ProgressBar } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";

function scorePassword(pw) {
  let score = 0;
  if (!pw) return score;
  if (pw.length >= 8) score += 25;
  if (/[A-Z]/.test(pw)) score += 20;
  if (/[a-z]/.test(pw)) score += 15;
  if (/\d/.test(pw)) score += 20;
  if (/[^A-Za-z0-9]/.test(pw)) score += 20;
  return Math.min(score, 100);
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [err, setErr] = useState("");
  const [agree, setAgree] = useState(false);
  const { register: registerUser } = useAuth(); // expects register(email, password, name?)
  const navigate = useNavigate();

  const strength = useMemo(() => scorePassword(pw), [pw]);
  const strengthVariant =
    strength < 40 ? "danger" : strength < 70 ? "warning" : "success";
  const strengthLabel =
    strength < 40 ? "Weak" : strength < 70 ? "Medium" : "Strong";

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (pw !== pw2) return setErr("Passwords do not match.");
    if (!agree) return setErr("Please accept the Terms & Privacy Policy.");
    try {
      // Adjust to your AuthContext signature as needed:
      await registerUser(email, pw, name);
      navigate("/dashboard");
    } catch (e) {
      setErr(e?.message || "Registration failed. Please try again.");
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
                  <h2 className="fw-bold mb-1">Create your account</h2>
                  <p className="text-muted mb-0">Join us in seconds</p>
                </div>

                {err && <Alert variant="danger" className="mb-3">{err}</Alert>}

                <Form onSubmit={onSubmit} noValidate>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FiUser /></InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={2}
                      />
                    </InputGroup>
                  </Form.Group>

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
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        required
                        minLength={8}
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
                    <div className="mt-2">
                      <ProgressBar now={strength} variant={strengthVariant} animated />
                      <small className={`ms-1 text-${strengthVariant}`}>
                        {strengthLabel} password
                      </small>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FiLock /></InputGroup.Text>
                      <Form.Control
                        type={showPw2 ? "text" : "password"}
                        placeholder="••••••••"
                        value={pw2}
                        onChange={(e) => setPw2(e.target.value)}
                        required
                        minLength={8}
                        isInvalid={pw2.length > 0 && pw2 !== pw}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => setShowPw2((v) => !v)}
                        tabIndex={-1}
                      >
                        {showPw2 ? <FiEyeOff /> : <FiEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        Passwords don’t match.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 d-inline-flex align-items-center justify-content-center gap-2"
                    size="lg"
                    disabled={!name || !email || !pw || !pw2}
                  >
                    <FiUserPlus />
                    Create Account
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Already have an account? <Link to="/login">Login</Link>
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