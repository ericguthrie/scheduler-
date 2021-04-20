import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
