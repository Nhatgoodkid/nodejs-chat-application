import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout, updateProfile } from '../../../../store/actions/auth';
import Modal from '../../../Modal/Modal';
import './Navbar.scss';

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);

    const [showProfileOtions, setShowProfileOptions] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [gender, setGender] = useState(user.gender);
    const [password, setPassword] = useState('');
    const [avatar, setAvatatar] = useState('');

    const submitForm = (e) => {
        e.preventDefault();

        const form = { firstName, lastName, email, gender, avatar };

        if (password.length > 0) form.password = password;

        const formData = new FormData();

        for (const key in form) {
            formData.append(key, form[key]);
        }

        dispatch(updateProfile(formData)).then(() =>
            setShowProfileModal(false),
        );
    };
    return (
        <div id="navbar" className="card-shadow">
            <h2>Harvard Tan Phong </h2>
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
                        <Fragment key="header">
                            <h3 className="m-0">Update profile</h3>
                        </Fragment>

                        <Fragment key="body">
                            <form>
                                <div className="input-field mb-1">
                                    <p className="edit-user">First Name</p>
                                    <input
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        value={firstName}
                                        required="required"
                                        type="text"
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="input-field mb-1">
                                    <p className="edit-user">Last Name</p>
                                    <input
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        value={lastName}
                                        required="required"
                                        type="text"
                                        placeholder="Last name"
                                    />
                                </div>
                                <div className="input-field mb-1">
                                    <p className="edit-user">Email</p>
                                    <input
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                        required="required"
                                        type="text"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="input-field mb-1">
                                    <p className="edit-user">Gender</p>
                                    <select
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        value={gender}
                                        required="required"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div className="input-field mb-2">
                                    <p className="edit-user">Password</p>
                                    <input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        value={password}
                                        required="required"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <p className="edit-user">Avatar</p>
                                <div className="input-field mb-2">
                                    <input
                                        onChange={(e) =>
                                            setAvatatar(e.target.files[0])
                                        }
                                        type="file"
                                    />
                                </div>
                            </form>
                        </Fragment>

                        <Fragment key="footer">
                            <button
                                className="btn-success"
                                onClick={submitForm}
                            >
                                UPDATE
                            </button>
                        </Fragment>
                    </Modal>
                )}
            </div>
        </div>
    );
};
export default Navbar;
