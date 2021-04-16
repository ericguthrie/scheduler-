import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem (props) {
  // const [interviewer, setInterviewer] = useState(props.setInterviewer);

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass}
        onClick={props.onChange}>
  
   
    <img
      className="interviewers__item-image"
      src={props.avatar} 
      alt={props.name}
    />
    {props.selected && props.name}
  </li>);

};





// return (
//   <li className={interviewerClass} onClick={props.setInterviewer}>
//     <img
//       className="interviewers__item-image"
//       src={props.avatar}
//       alt={props.name}
//     />
//     {props.selected && props.name}
//   </li>
// );