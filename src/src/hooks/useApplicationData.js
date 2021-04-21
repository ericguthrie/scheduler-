import { useEffect, useReducer } from 'react';
import axios from 'axios';

const useApplicationData = () => {

  const SET_DAY = "SET_DAY";
  const SET_DAYS = "SET_DAYS";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_WEB_SOCKET = "SET_WEB_SOCKET";

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

  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { appointments: getAppointments(state, { id, interview: null }) } });
      });
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_DAYS:
        return { ...state, days: action.value.days };
      case SET_APPLICATION_DATA:
        return { ...state, days: action.value.days, appointments: action.value.appointments, interviewers: action.value.interviewers };
      case SET_INTERVIEW: 
        return { ...state, appointments: action.value.appointments };
      case SET_WEB_SOCKET: 
        return { ...state, appointments: getAppointments(state, action.value.message) }
      default:
        throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
    }
  }

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


  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day });
  };

  return { state, setDay, bookInterview, deleteInterview };
};

export default useApplicationData;