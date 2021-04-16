import React from 'react';
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {

  const value = props.interviewers.map(value => {
    return (
      <InterviewerListItem
        key={value.id}
        name={value.name}
        avatar={value.avatar}
        selected={value.id === props.value}
        onChange={event => props.onChange(value.id)}
      />
    );
  });

    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">interviewers</h4>
        <ul className="interviewers__list">
          {value}
        </ul>
      </section>
    )
};


// export default function DayList(props) {
//   let listOfDays = props.days.map(day => {

//     return <DayListItem
//     key={day.id}
//     name={day.name} 
//     spots={day.spots} 
//     selected={day.name === props.day}
//     setDay={props.setDay}  /> 
//   })

//   return <ul>
//     {listOfDays}
//   </ul>;

// };