import './App.css';

import {Container, Row, Col} from 'react-bootstrap'

function App() {
  return (
    <Container fluid>
    <Row>
      <Col className="form" md="6"></Col>
      <Col className="linePlot" md="6"></Col>
    </Row>
  </Container>
  );
}

export default App;
