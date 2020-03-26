import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registeredGitasActions } from '../_actions';
import { skipCodeConstants } from '../_constants';

function HomePage(props) {
  const { registeredGitas, skipCode, dispatch } = props;

  useEffect(() => {
    dispatch(registeredGitasActions.getAll());
    dispatch({ type: skipCodeConstants.SKIPCODE_POLL_START });
    return function cleanup() {
      dispatch({ type: skipCodeConstants.SKIPCODE_POLL_STOP });
    };
  }, []); // execute only once

  function handleSearchInput(e) {
    const searchText = e.target.value;
    const results = {};
    results.gitas = [];
    const objects = registeredGitas.items;
    // loop through every gita in list
    for (let i = 0; i < objects.length; i++) {
      const keys = Object.keys(objects[i].output);
      // loop through every key in the gita's the output object,
      // ie Serial, Name, Registered By, etc.
      for (let j = 0; j < keys.length; j++) {
        if (objects[i].output[keys[j]]
          // only push to results if there is a match
          && objects[i].output[keys[j]].toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
          results.gitas.push(objects[i]);
          break;
        }
      }
    }
    // update store with filtered list
    dispatch(registeredGitasActions.filterItems(results));
  }

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="sticky-top">
          <h4>Registered Gitas:</h4>
          <p>From secure api endpoint</p>

          <input
            className="filter form-control mb-3"
            onInput={handleSearchInput}
            type="text"
            placeholder="Search for..."
          />

          {registeredGitas.loading && <em>Loading registered gitas...</em>}
          {registeredGitas.error &&
            <span className="text-danger">
              ERROR:
              {registeredGitas.error}
            </span>}
          {registeredGitas.filteredItems &&
          <div>
            <ul className="registered-gitas">
              {registeredGitas.filteredItems.map((gita) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                <li key={gita.serial} className="mb-3">
                  <div>
                    <b>Serial:</b>
                    {gita.output.serial}
                  </div>
                  <div>
                    <b>Name:</b>
                    {gita.output.name}
                  </div>
                  <div>
                    <b>Registered by:</b>
                    {gita.output.registeredByUsername}
                  </div>
                  <div>
                    <b>Email:</b>
                    {gita.output.registeredByEmail}
                  </div>
                  <div>
                    <b>Date:</b>
                    {gita.output.created}
                  </div>
                </li>)}
            </ul>
          </div>}
        </div>
      </div>

      <div className="col-md-3" />

      <div className="col-md-3">
        <h4> Wifi Skip Code </h4>
        <p>Updates every 15 seconds</p>
        <h1><b>{skipCode.data}</b></h1>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  registeredGitas: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.string,
    items: PropTypes.array,
    filteredItems: PropTypes.array,
  }).isRequired,

  skipCode: PropTypes.shape({
    data: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    polling: PropTypes.bool.isRequired,
  }).isRequired,

  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { registeredGitas, skipCode } = state;
  return {
    registeredGitas,
    skipCode,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
