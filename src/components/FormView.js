import { Form, Col, Button } from "react-bootstrap"
export   const FormView = ({onButtonClick}) =>(
    <Col className="form" md="4">
        <Form.Group controlId="formGridState">
          <Form.Label>Age</Form.Label>
          <Form.Select defaultValue="">
            <option></option>
            <option></option>
          </Form.Select>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>T Stage</Form.Label>
          <br/>
          <Form.Check
            inline
            label="1"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
          />
          <Form.Check
            inline
            label="2"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
          />
          <Form.Check
            inline
            label="3"
            type="radio"
            id={`inline-radio-3`}
          />
        </Form.Group>

        <Button variant="primary"
          onClick={onButtonClick}
        >
          Submit
        </Button>

      </Col>
  )