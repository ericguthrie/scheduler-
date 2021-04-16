import React, {useState} from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <div>
    <Header
      time={props.time}>
            <article 
              className="appointment">
            </article>
    </Header>
    <div>
    {props.interview ? <Show name={props.interview.student}> </Show> : <Empty />}
  </div>
  <b>{props.time2}</b>
  </div>
  )
}
