import { useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Button,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { updateAppointment } from "../../data/actions";
import "./styles.scss";

const FIRST_NAME = "firstName";
const LAST_NAME = "lastName";
const MOBILE_NUMBER = "mobile";

const AppointmentDetails = ({ appointments, updateAppointment }) => {
  let { date, month, year, timeFrom } = useParams();
  const currentDate = `${date}/${month}/${year}`;
  const history = useHistory();
  const DATA = useMemo(
    () => (appointments && appointments[currentDate]) || {},
    [appointments, currentDate]
  );
  const [userDetails, setUserDetails] = useState(DATA[timeFrom] || {});
  const updateFormData = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.dataset.type]: e.target.value,
    });
  };

  const onClickSave = () => {
    let error = false;
    let obj = {
      ...userDetails,
    };

    [FIRST_NAME, MOBILE_NUMBER, LAST_NAME].forEach((detail) => {
      if (!userDetails[detail]) {
        error = true;
        obj = {
          ...obj,
          [detail]: "",
        };
      }
    });

    setUserDetails(obj);

    if (error) {
      return;
    }

    updateAppointment(currentDate, timeFrom, obj);

    history.goBack();
  };

  return (
    <div className="main-div">
      <div className="center-div">
    <Container >
      <Row>
        <Col>
          <h3 className="mt-5">Please Fill Your Details</h3>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <InputGroup className="mb-4">
            <FormControl
              placeholder="First Name"
              aria-label="First Name"
              aria-describedby="First Name"
              data-type={FIRST_NAME}
              onChange={updateFormData}
              isInvalid={userDetails[FIRST_NAME] === ""}
              value={userDetails[FIRST_NAME]}
            />
            <Form.Control.Feedback className="error" type="invalid">
              Please enter your first name
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-4">
            <FormControl
              placeholder="Last Name"
              aria-label="Last Name"
              aria-describedby="Last Name"
              data-type={LAST_NAME}
              onChange={updateFormData}
              isInvalid={userDetails[LAST_NAME] === ""}
              value={userDetails[LAST_NAME]}
            />
            <Form.Control.Feedback className="error" type="invalid">
              Please enter your last name
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup>
            <FormControl
              placeholder="Mobile Number"
              aria-label="First Name"
              aria-describedby="First Name"
              data-type={MOBILE_NUMBER}
              onChange={updateFormData}
              isInvalid={userDetails[MOBILE_NUMBER] === ""}
              value={userDetails[MOBILE_NUMBER]}
            />
            <Form.Control.Feedback className="error" type="invalid">
              Please enter your mobile number
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
      <Row className="buttons">
        <Col>
          <Button onClick={() => history.goBack()} variant="secondary">
            Cancel
          </Button>
        </Col>
        <Col>
          <Button onClick={onClickSave}>Save</Button>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
  );
};

export default connect(
  ({ appointments }) => ({
    appointments,
  }),
  {
    updateAppointment,
  }
)(AppointmentDetails);
