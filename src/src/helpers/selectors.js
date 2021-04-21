const getAppointmentsForDay = (state, day) => {
  let dayData = state.days.find((d) => d.name === day);
  if (dayData) {
    return dayData.appointments.map((id) => state.appointments[id]);
  }
  return [];
}

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

const getInterviewersForDay = (state, day) => {
  let dayData = state.days.find((d) => d.name === day);
  if (dayData) {
    return dayData.interviewers.map((id) => state.interviewers[id]);
  }
  return [];
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };