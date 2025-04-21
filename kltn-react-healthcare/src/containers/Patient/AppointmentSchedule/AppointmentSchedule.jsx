import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import "./AppointmentSchedule.scss";
import { getListPatientByUserId } from "../../../services/userService";
import AppointmentItem from "./components/AppointmentItem";

class AppointmentSchedulePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentList: [],
    };
  }

  async componentDidMount() {
    const appoinmentIds =
      JSON.parse(localStorage.getItem("appointment_ids")) || [];

    if (appoinmentIds && appoinmentIds.length) {
      const data = { appoinmentIds: appoinmentIds.join(",") };
      const res = await getListPatientByUserId(data);
      if (res && res.errCode === 0) {
        console.log("res.data", res.data);
        this.setState({
          appointmentList: res.data,
        });
      }
    }
  }

  async componentDidUpdate() {}

  render() {
    const { appointmentList } = this.state;
    return (
      <>
        <HomeHeader />
        <main>
          <div className="spp-container">
            <div className="spp-title">
              <FormattedMessage id="patient.appointment-schedule.title" />
            </div>
            {appointmentList.length ? (
              <ul className="spp-list">
                {appointmentList.map((item) => (
                  <li className="spp-item">
                    <AppointmentItem data={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="spp-no-data">
                <FormattedMessage id="patient.appointment-schedule.no-data" />
              </div>
            )}
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentSchedulePage);
