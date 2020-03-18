import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 offset-md-3">
                <img src={user.profilePicture} 
                    className="
                        img-fluid 
                        rounded-circle
                        w-25
                        mb-3" 
                    alt="Profile Picture"></img>
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Registered Gitas:</h3>
                <p>From secure api endpoint</p>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.serial} className="mb-3">
                                <div>{user.output.serial}</div> 
                                <div>{user.output.className}</div>
                                <div>{user.output.registeredByUsername}</div>
                                <div>{user.output.registeredByEmail}</div>
                                <div>{user.output.created}</div>
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };