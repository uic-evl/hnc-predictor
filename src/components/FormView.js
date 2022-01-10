import { Form, Col, Button } from "react-bootstrap"
import './FormView.css'

export   const FormView = ({
  onButtonClick, 
  ageRef, 
  perfScoreRef, 
  packRef, 
  siteRef, 
  // tlcRef, 
  tRef, 
  nRef, 
  hpvRef,
  stage,
  stage7
}) =>(
    <Col className='d-flex justify-content-start'  md="2" >
      <Form id="back" className="formPadding"> 
      <h4 id="textIndent">Input</h4>

      <h6 id="textIndent">Patient Specifics</h6>

      <Form.Group controlId="formGridState">
        <Form.Label id="textIndent">Age</Form.Label>
        <Form.Select defaultValue=">75" ref={ageRef} id="indent">
          <option value='<55'> &#60; 55 </option>
          <option value='55-65'> 55 - 65 </option>
          <option value='65-75'> 65 - 75 </option>
          <option value='>75'> &#62; 75</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formGridState" id='space'>
        <Form.Label id="textIndent">Performance Score</Form.Label>
        <Form.Select defaultValue="0" ref={perfScoreRef} id="indent">
          <option value='0'>0</option>
          <option value='1'>1</option>
          <option value='>2'>&#62; 2</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formGridState" id='space'>
        <Form.Label id="textIndent">Pack Years</Form.Label>
        <Form.Select defaultValue=">50" ref={packRef} id="indent">
          <option value='<5'> &#60; 5 </option>
          <option value='5-25'> 5 - 25</option>
          <option value='25-50'> 25 - 50 </option>
          <option  value='>50'> &#62; 50 </option>
        </Form.Select>
      </Form.Group>

      <h6 id='space'>Tumor Specifics</h6>

      <Form.Group controlId="formGridState" id='space'>
        <Form.Label>Tumor Site</Form.Label>
        <Form.Select defaultValue="Hypopharynx" ref={siteRef} id="indent">
          <option value='OPC'> OPC </option>
          <option value='Hypopharynx'> Hypopharynx </option>
          <option value='Oral Cavity'> Oral Cavity </option>
          <option value='Larynx'> Larynx </option>
          <option value='Nasopharynx'> Nasopharynx </option>
        </Form.Select>
      </Form.Group>

      {/* <Form.Group id='space'>
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
      </Form.Group> */}

      <Form.Group >
        <Form.Label id='space'>T Stage</Form.Label>
        <br/>
        <Form.Check
          inline
          label="T1"
          name="TGroup"
          type="radio"
          id={`inline-radio-1`}
          value="T1"
          onChange={tRef}
          className="radin"
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
          className="radin"
          defaultChecked
        />
      </Form.Group>


      <Form.Group >
        <Form.Label id='space'>N Stage</Form.Label>
        <br/>
        <Form.Check
          inline
          label="N0"
          name="NGroup"
          type="radio"
          id={`inline-radio-1`}
          value="N0"
          onChange={nRef}
          className="radin"
        />

        <Form.Check
          inline
          label="N1"
          name="NGroup"
          type="radio"
          id={`inline-radio-2`}
          value="N1"
          onChange={nRef}
        />
        <Form.Check
          inline
          label="N2a-b"
          name="NGroup"
          type="radio"
          id={`inline-radio-3`}
          value="N2a-b"
          onChange={nRef}
          defaultChecked
        />
        <Form.Check
          inline
          label="N2c"
          name="NGroup"
          type="radio"
          id={`inline-radio-4`}
          value="N2c"
          onChange={nRef}
          className="radin"
          defaultChecked
        />
        <Form.Check
          inline
          label="N3"
          name='NGroup'
          type="radio"
          id={`inline-radio-5`}
          value="N3"
          onChange={nRef}
        />
      </Form.Group>

      <Form.Group controlId="formGridState" id='space'>
        <Form.Label>HPV Status</Form.Label>
        <Form.Select defaultValue="Positive" ref={hpvRef} id="indent">
          <option value='Positive'> Positive </option>
          <option value='Negative'>Negative</option>
        </Form.Select>
      </Form.Group>
      <br/>
      {
        stage !== null &&
        <div id='textIndent'>
          AJCC<sup>8th</sup> stage:  <b>{stage}</b>
        </div>
      }
      <br/>
      
      <Button variant="primary"
        onClick={onButtonClick}
        id='textIndent'
      >
        Submit
      </Button>
      </Form>

    </Col>
  )