

const getAppointmentsForDay = (state, day) => {

  const filteredDay = state.days.filter(requestedDay => requestedDay.name === day)

  if(filteredDay.length === 0 ) {
    return [];
  }

  const appointmentObject = filteredDay[0].appointments.map(appt => {
    return state.appointments[appt]
  })
  
  return appointmentObject;
};

const getInterview = (state, interview) => {
  if (interview) {
    const obj = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
    return obj;
  }
  return null;
}

module.exports = { getAppointmentsForDay, getInterview}