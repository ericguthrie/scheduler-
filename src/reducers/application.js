export const SET_DAY = "SET_DAY";
export const SET_DAYS = "SET_DAYS";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_WEB_SOCKET = "SET_WEB_SOCKET";

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

export default function reducer (state, action) {

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