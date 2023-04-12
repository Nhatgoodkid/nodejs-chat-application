import React from 'react';
import './Friend.scss';

const Friend = ({ chat }) => {
    return (
        <div>
            <h2>
                {chat.Users[0].firstName} {chat.Users[0].lastName}
            </h2>
        </div>
    );
};
export default Friend;
