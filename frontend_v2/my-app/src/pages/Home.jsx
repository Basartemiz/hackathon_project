import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Home() {
  const navigate = useNavigate();

  return (
    
    <Container fluid className="min-vh-100 d-flex flex-column justify-content-center bg-light">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <h1 className="display-4 mb-4 text-primary">👋 Hello, Welcome!</h1>
          <p className="lead text-secondary mb-5">
            We’re glad you’re here. Let’s get started.
          </p>
          <Button
            variant="success"
            size="lg"
            className="px-5 py-2 shadow"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
}