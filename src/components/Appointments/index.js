import { useCallback, useMemo } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useParams, Link, Redirect, useHistory } from "react-router-dom";
import "./styles.scss";
import RightArrow from "./image/left.png";
import LeftArrow from "./image/right.png";
import { connect } from "react-redux";
import moment from "moment";

const TIME_SLOT = [9, 10, 11, 12, 13, 14, 15, 16];

const Appointment = ({ appointments }) => {
  let { date, month, year } = useParams();
  const history = useHistory();
  const currentDate = `${date}/${month}/${year}`;

  const bookingData = useMemo(
    () => (appointments && appointments[currentDate]) || {},
    [appointments, currentDate]
  );

  const gotoDate = useCallback(
    (day) =>
      moment(`${date}/${month}/${year}`, "D/M/YYYY")
        .add(day, "days")
        .format("D-M-YYYY")
        .split("-"),
    [date, month, year]
  );

  const changeDate = useCallback(
    (newDate) =>
      history.push(
        `/${parseInt(newDate[0])}/${parseInt(newDate[1])}/${parseInt(
          newDate[2]
        )}/`
      ),
    [history]
  );

  //FORMAT The Time
  const formatTime = useCallback((time) => {
    if (time < 12) {
      return `${time} AM`;
    }

    if (time > 12) {
      time = time - 12;
    }

    return `${time} PM`;
  }, []);

  if (!(date && month && year)) {
    const currentDate = moment();
    date = currentDate.date();
    month = currentDate.month() + 1;
    year = currentDate.year();
    return <Redirect to={`/${date}/${month}/${year}/`} />;
  }

  return (
    <div className="AppointmentWrapper box-shadow text-center justify-content-center">
      <div className="navWrapper text-center">
        <Container className="nav justify-content-center">
          <div onClick={() => changeDate(gotoDate(-1))} className="button">
            <img alt="left button" src={LeftArrow} />
          </div>
          <h2>{currentDate}</h2>
          <div onClick={() => changeDate(gotoDate(1))} className="button">
            <img alt="right button" src={RightArrow} />
          </div>
        </Container>
      </div>
      <Container className=" mt-5 text-center ">
        <Row>
          <Col className="mx-3">
            <h2 className="mt-5">Select A Time Slot</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {TIME_SLOT.map((time) => (
              <Link key={time} to={`${time}/details/`}>
                <Button
                  variant="outline-success"
                  className={bookingData[time] && "btn-outline-danger"}
                >
                  {formatTime(time)} to {formatTime(++time)}
                </Button>
              </Link>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(({ appointments }) => ({
  appointments,
}))(Appointment);
