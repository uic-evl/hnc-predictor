import { Form, Col, Button } from "react-bootstrap"
import './FormView.css'

export   const FormView = ({
  onButtonClick, 
  ageRef, 
  perfScoreRef, 
  packRef, 
  siteRef, 
  tlcRef, 
  tRef, 
  nRef, 
  hpvRef}) =>(
    <Col className='d-flex justify-content-start'  md="4" >
      <Form> 
      <h2>Input</h2>

      <h5>Patient Specifics</h5>

      <Form.Group controlId="formGridState">
        <Form.Label>Age</Form.Label>
        <Form.Select defaultValue=">75" ref={ageRef}>
          <option value='<75'> &#60; 75 </option>
          <option value='>75'> &#62; 75</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formGridState">
        <Form.Label>Performance Score</Form.Label>
        <Form.Select defaultValue="0" ref={perfScoreRef}>
          <option value='0'>0</option>
          <option value='1'>1</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formGridState">
        <Form.Label>Pack Years</Form.Label>
        <Form.Select defaultValue=">50" ref={packRef}>
          <option value='<50'> &#60; 50 </option>
          <option  value='>50'> &#62; 50 </option>
        </Form.Select>
      </Form.Group>

      <h5>Tumor Specifics</h5>

      <Form.Group controlId="formGridState">
        <Form.Label>Tumor Site</Form.Label>
        <Form.Select defaultValue="Hypopharynx" ref={siteRef}>
          <option value='OPC'> OPC </option>
          <option value='Hypopharynx'> Hypopharynx </option>
          <option value='Oral Cavity'> Oral Cavity </option>
          <option value='Larynx'> Larynx </option>
          <option value='Nasopharynx'> Nasopharynx </option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>T Stage LC</Form.Label>
        <br/>
        <Form.Check
          inline
          label="T1"
          name="TLCGroup"
          type="radio"
          id={`inline-radio-1`}
          value="T1"
          onChange={tlcRef}
        />
        <Form.Check
          inline
          label="T2"
          name="TLCGroup"
          type="radio"
          id={`inline-radio-2`}
          value="T2"
          onChange={tlcRef}
        />
        <Form.Check
          inline
          label="T3"
          name="TLCGroup"
          type="radio"
          id={`inline-radio-3`}
          value="T3"
          onChange={tlcRef}
        />

        <Form.Check
          inline
          label="T4"
          name="TLCGroup"
          type="radio"
          id={`inline-radio-4`}
          value="T4"
          onChange={tlcRef}
          defaultChecked
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>T Stage</Form.Label>
        <br/>
        <Form.Check
          inline
          label="T1"
          name="TGroup"
          type="radio"
          id={`inline-radio-1`}
          value="T1"
          onChange={tRef}
        />
        <Form.Check
          inline
          label="T2"
          name="TGroup"
          type="radio"
          id={`inline-radio-2`}
          value="T2"
          onChange={tRef}
        />
        <Form.Check
          inline
          label="T3"
          name="TGroup"
          type="radio"
          id={`inline-radio-3`}
          value="T3"
          onChange={tRef}
        />

        <Form.Check
          inline
          label="T4"
          name="TGroup"
          type="radio"
          id={`inline-radio-4`}
          value="T4"
          onChange={tRef}
          defaultChecked
        />
      </Form.Group>


      <Form.Group>
        <Form.Label>N Stage</Form.Label>
        <br/>
        <Form.Check
          inline
          label="N0"
          name="NGroup"
          type="radio"
          id={`inline-radio-1`}
          value="N0"
          onChange={nRef}
        />

        <Form.Check
          inline
          label="N1"
          name="NGroup"
          type="radio"
          id={`inline-radio-1`}
          value="N1"
          onChange={nRef}
        />
        <Form.Check
          inline
          label="N2a-b"
          name="NGroup"
          type="radio"
          id={`inline-radio-2`}
          value="N2a-b"
          onChange={nRef}
          defaultChecked
        />
        <Form.Check
          inline
          label="N2c"
          name="NGroup"
          type="radio"
          id={`inline-radio-2`}
          value="N2c"
          onChange={nRef}
          defaultChecked
        />
        <Form.Check
          inline
          label="N3"
          name='NGroup'
          type="radio"
          id={`inline-radio-3`}
          value="N3"
          onChange={nRef}
        />
      </Form.Group>

      <Form.Group controlId="formGridState">
        <Form.Label>HPV Status</Form.Label>
        <Form.Select defaultValue="Positive" ref={hpvRef}>
          <option value='Positive'> Positive </option>
          <option value='Negative'>Negative</option>
        </Form.Select>
      </Form.Group>
      <br/>
      
      <Button variant="primary"
        onClick={onButtonClick}
      >
        Submit
      </Button>

      </Form>

    </Col>
  )