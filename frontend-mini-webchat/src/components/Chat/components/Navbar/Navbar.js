import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../../../store/actions/auth';
import Modal from '../../../Modal/Modal';
import './Navbar.scss';

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);

    const [showProfileOtions, setShowProfileOptions] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(true);

    return (
        <div id="navbar" className="card-shadow">
            <h2>Chat.io</h2>
            <div
                onClick={() => setShowProfileOptions(!showProfileOtions)}
                id="profile-menu"
            >
                <img width="40" height="40" src={user.avatar} alt="Avatar" />
                <p>
                    {user.lastName} {user.firstName}
                </p>
                <FontAwesomeIcon icon="caret-down" className="fa-icon" />

                {showProfileOtions && (
                    <div id="profile-options">
                        <p onClick={() => setShowProfileModal(true)}>
                            Update profile
                        </p>
                        <p onClick={() => dispatch(logout())}>Logout</p>
                    </div>
                )}

                {showProfileModal && (
                    <Modal click={() => setShowProfileModal(false)}>
                        <Fragment key="header">Modal Header</Fragment>

                        <Fragment key="body">Modal Body</Fragment>

                        <Fragment key="footer">Modal Footer</Fragment>
                    </Modal>
                )}
            </div>
        </div>
    );
};
export default Navbar;
