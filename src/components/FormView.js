import { Form, Col, Button } from "react-bootstrap"
export   const FormView = ({onButtonClick}) =>(
    <Col className="form" md="4">
      <h3>Input</h3>

      <h4>Patient Specifics</h4>

      <Form.Group controlId="formGridState">
        <Form.Label>Age</Form.Label>
        <Form.Select defaultValue="">
          <option></option>
          <option></option>
        </Form.Select>
      </Form.Group>
      <br/>

      <Form.Group controlId="formGridState">
        <Form.Label>Performance Score</Form.Label>
        <Form.Select defaultValue="">
          <option></option>
          <option></option>
        </Form.Select>
      </Form.Group>
      <br/>

      <Form.Group controlId="formGridState">
        <Form.Label>Pack Years</Form.Label>
        <Form.Select defaultValue="">
          <option></option>
          <option></option>
        </Form.Select>
      </Form.Group>
      <br/>

      <h4>Tumor Specifics</h4>

      <Form.Group controlId="formGridState">
        <Form.Label>Tumor Site</Form.Label>
        <Form.Select defaultValue="">
          <option></option>
          <option></option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>T Stage</Form.Label>
        <br/>
        <Form.Check
          inline
          label="T1"
          name="group1"
          type="radio"
          id={`inline-radio-1`}
        />
        <Form.Check
          inline
          label="T2"
          name="group1"
          type="radio"
          id={`inline-radio-2`}
        />
        <Form.Check
          inline
          label="T3"
          type="radio"
          id={`inline-radio-3`}
        />
      </Form.Group>
      <br/>


      <Form.Group>
        <Form.Label>N Stage</Form.Label>
        <br/>
        <Form.Check
          inline
          label="N1"
          name="group1"
          type="radio"
          id={`inline-radio-1`}
        />
        <Form.Check
          inline
          label="N2"
          name="group1"
          type="radio"
          id={`inline-radio-2`}
        />
        <Form.Check
          inline
          label="N3"
          type="radio"
          id={`inline-radio-3`}
        />
      </Form.Group>
      <br/>

      <Form.Group controlId="formGridState">
        <Form.Label>HPV Status</Form.Label>
        <Form.Select defaultValue="">
          <option></option>
          <option></option>
        </Form.Select>
      </Form.Group>
      <br/>

      <Form.Group controlId="formGridState">
        <Form.Label>AJCC<sup>8th</sup> Stage</Form.Label>
        <Form.Select defaultValue="">
          <option></option>
          <option></option>
        </Form.Select>
      </Form.Group>
      <br/>

      <Button variant="primary"
        onClick={onButtonClick}
      >
        Submit
      </Button>

    </Col>
  )