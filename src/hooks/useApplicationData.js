import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { useIsMount } from './useIsMount';
import  reducer, {SET_DAY, SET_DAYS, SET_APPLICATION_DATA, SET_INTERVIEW, SET_WEB_SOCKET} from "reducers/application";

const useApplicationData = () => {

  const isMount = useIsMount();
  

  /**
   * This function creates and updates the current state with
   * the appointment information received in the wesocket message
   *
   * @param {*} state
   * @param {*} message
   * @return {*} 
   */
  const getAppointments = (state, message) => {
    const appointment = {
      ...state.appointments[message.id],
      interview: message.interview === null ? null : { ...message.interview }
    };
    const appointments = {
      ...state.appointments,
      [message.id]: appointment
    };
    return appointments;
  }

  /**
   * Axios call to create an appointment and then update state
   *
   * @param {*} id
   * @param {*} interview
   * @return {*} 
   */
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { appointments: getAppointments(state, { id, interview }) } });
      });
  };

  /**
   * Axios call to delete an appointment and then update the state
   *
   * @param {*} id
   * @return {*} 
   */
  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { appointments: getAppointments(state, { id, interview: null }) } });
      });
  };


  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  }); 

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8001');
    socket.addEventListener('message', function (event) {
      const message = JSON.parse(event.data)
      dispatch({ type: SET_WEB_SOCKET, value: { message } });
    });
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data } });
    })
  }, []);

  
  useEffect(() => {
    //console.log('axios days')
    //Promise.all([
      if (!isMount) 
        axios.get('/api/days')
    //])
    .then((response) => {
        dispatch({ type: SET_DAYS, value: { days: response.data } });
      })
  }, [state.appointments, isMount]);


  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day });
  };

  return { state, setDay, bookInterview, deleteInterview };
};

export default useApplicationData;