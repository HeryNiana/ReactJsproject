import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
export const loginUser = (user) => dispatch => {
    axios.post('http://localhost:8000/api/login/', user)
            .then(response => {
                const { token } = response.data;
            if(response.data.status == 200)
                {
                    localStorage.setItem('dateCreate', Date.now() / 1000);
                    localStorage.setItem('jwtToken', token);
                    dispatch(setCurrentUser(token));
                    this.props.history.push('/index');
                }
                else if(response.data.status == 201)
                {
                  alert('Veuillez reessayer avec des infàormations correctes !!!')
                }
            }).catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: 'err.response.data'
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('dateCreate');

    dispatch(setCurrentUser({}));
    history.push('/login');
}