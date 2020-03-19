import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

function LoginPage(props) {
  const { loggingIn, dispatch } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    event.target.className += " was-validated";

    setIsSubmitted(!isSubmitted);
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  return (
    <div className="col-md-4 offset-md-4">
      <h2>Login</h2>
      <form name="form" className="needs-validation" onSubmit={handleSubmit} noValidate>
        <div className={'form-group' + (isSubmitted && !email ? ' has-danger' : '')}>
          <label htmlFor="email">Email or Username</label>
          <input type="text" className="form-control" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
          <div className="invalid-feedback">Email is required</div>
        </div>
        <div className={'form-group' + (isSubmitted && !password ? ' has-danger' : '')}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
          <div className="invalid-feedback">Password is required</div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Login</button>
          {loggingIn &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          }
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 