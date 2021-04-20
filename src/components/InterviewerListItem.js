import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem (props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const interviewerImage = classNames('interviewers__item-image',{
    'interviewers__item-image--selected': props.selected
  });

  return (
    <li className={interviewerClass} onClick={props.onChange}
        onClick={props.onChange}>
        <img
          className="interviewers__item-image"
          src={props.avatar} 
          alt={props.name}
        />
        {props.selected && props.name}
  </li>
  );
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