import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import {
    fetchChats,
    onlineFriends,
    onlineFriend,
    offlineFriend,
} from '../../../store/actions/chat';

function useSocket(user, dispatch) {
    useEffect(() => {
        dispatch(fetchChats())
            .then((res) => {
                const socket = socketIOClient.connect('http://127.0.0.1:3000');

                socket.emit('join', user);

                socket.on('typing', (user) => {
                    console.log('Event', user);
                });

                socket.on('friends', (friends) => {
                    console.log('Friends', friends);
                    dispatch(onlineFriends(friends));
                });

                socket.on('online', (user) => {
                    dispatch(onlineFriend(user));
                    console.log('Online', user);
                });

                socket.on('offline', (user) => {
                    dispatch(offlineFriend(user));
                    console.log('Offline', user);
                });

                console.log(res);
            })
            .catch((err) => console.log(err));
    }, [dispatch]);
}

export default useSocket;
