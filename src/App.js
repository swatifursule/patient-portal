import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";

class App extends Component {

  render() {
    const { fetching, patient, onRequestPatient, error } = this.props;

    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Welcome to Patient Portal</h1>
        </header>
        <button className="newIdeaButton" onClick={this.addNewPatient} >
          New Patient
        </button>
        {patient ? (
          <p className="App-intro">Keep clicking for patient information</p>
        ) : (
          <p className="App-intro">Patient information!</p>
        )}

        {fetching ? (
          <button disabled>Fetching...</button>
        ) : (
          <button onClick={onRequestPatient}>Request a Patient information</button>
        )}

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    patient: state.patient,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestDog: () => dispatch({ type: "API_CALL_REQUEST" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
