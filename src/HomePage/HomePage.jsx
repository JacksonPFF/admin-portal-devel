import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userActions, registeredGitasActions } from '../_actions';
import { skipCodeConstants } from '../_constants';

function HomePage(props) {
  const { user, registeredGitas, skipCode, dispatch } = props;
  const [regGitasList, setRegGitasList] = useState([]);

  useEffect(() => {
    dispatch(registeredGitasActions.getAll());
    dispatch({ type: skipCodeConstants.SKIPCODE_POLL_START });
    return function cleanup() {
      dispatch({ type: skipCodeConstants.SKIPCODE_POLL_STOP });
    }
  }, []); // execute only once

  const test_data = [
    {
      "serial": "00001",
      "output": {
        "serial": "2619000001",
        "name": "The One Gita",
        "registeredByUsername": "ring_bearer",
        "registeredByEmail": "frodo@cc.cc",
        "created": "2020-03-22T20:03:59.680Z"
      },
      "csv_output": "s2619000001,The One Gita,ring_bearer,frodo@cc.cc,2020-03-22T20:03:59.680Z\n"
    },
    {
      "serial": "00003",
      "output": {
        "serial": "2619000003",
        "name": "Barad-dûr",
        "registeredByUsername": "put_a_ring_on_it",
        "registeredByEmail": "sauron@cc.cc",
        "created": "2020-03-22T20:03:59.681Z"
      },
      "csv_output": "s2619000003,Barad-dûr,put_a_ring_on_it,sauron@cc.cc,2020-03-22T20:03:59.681Z\n"
    },
    {
      "serial": "00004",
      "output": {
        "serial": "2619000004",
        "name": "Orthanc",
        "registeredByUsername": "white_hand",
        "registeredByEmail": "saruman@cc.cc",
        "created": "2020-03-22T20:03:59.682Z"
      },
      "csv_output": "s2619000004,Orthanc,white_hand,saruman@cc.cc,2020-03-22T20:03:59.682Z\n"
    },
  ];
  useEffect(() => {
    setRegGitasList(test_data);
  }, []); // execute only once
  
  function handleSearchInput(e) {
    let searchText = e.target.value;
    let results = [];
    let objects = registeredGitas.items; 
    for(var i=0; i<objects.length; i++) {
      for(var key in objects[i].output) {
        if(objects[i].output[key].toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
          results.push(objects[i]);
          break;
        }
      }
    }
    setRegGitasList(results);
  }

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="sticky-top">
          <h4>Registered Gitas:</h4>
          <p>From secure api endpoint</p>

          <input className="filter form-control mb-3" 
              onInput={handleSearchInput} 
              type="text" 
              placeholder="Search for..."/>

          {registeredGitas.loading && <em>Loading registered gitas...</em>}
          {registeredGitas.error && <span className="text-danger">ERROR: {registeredGitas.error}</span>}
          {registeredGitas.items &&
            <div>
              <ul className="registered-gitas">
                {regGitasList.map((gita, index) =>
                  <li key={gita.serial} className="mb-3">
                    <div><b>Serial:</b> {gita.output.serial}</div> 
                    <div><b>Name:</b> {gita.output.name}</div>
                    <div><b>Registered by:</b> {gita.output.registeredByUsername}</div>
                    <div><b>Email:</b> {gita.output.registeredByEmail}</div>
                    <div><b>Date:</b> {gita.output.created}</div>
                  </li>
                )}
              </ul>
            </div>
          }
        </div>
      </div>
      
      <div className="col-md-3"></div>

      <div className="col-md-3">
        <h4> Wifi Skip Code </h4>
        <p>Updates every 15 seconds</p>
        <h1><b>{ skipCode.data }</b></h1>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
    const { registeredGitas, skipCode, authentication } = state;
    const { user } = authentication;
    return {
        user,
        registeredGitas,
        skipCode,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
