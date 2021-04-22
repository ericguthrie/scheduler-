import React, {useEffect} from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Error from './Error';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const EDITING = 'EDITING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment (props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      transition(ERROR_SAVE, true);
    })
    transition(SAVING);
  }

  const confirmDelete = () => {
    props.deleteInterview(props.id)
      .then(() => {
        transition(EMPTY);
      }).catch((error) => {
        console.log(error)
        transition(ERROR_DELETE, true);
      })
    transition(DELETING, true);
  }

  const edit = () => {
    transition(EDIT);
  }

  const editBookingInDB = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview, false).then(() => {
      transition(SHOW);
    }).catch((error) => {
      transition(ERROR_SAVE, true);
    })
    transition(EDITING);
  }

  const deleteInterview = () => {
    transition(CONFIRM);
  }



  return (
    <article className='appointment' data-testid="appointment">
      <Header
        time={props.time}
      />
      {mode === ERROR_DELETE && <Error message='Error while deleting appointment' onClose={()=>back()}/>}
      {mode === ERROR_SAVE && <Error message='Error while saving appointment' onClose={()=>back()}/>}
      {mode === CONFIRM && <Confirm onConfirm={confirmDelete} onCancel={() => back()} message='Are you sure you would like to delete?' />}
      {mode === SAVING && <Status message='Saving...' />}
      {mode === DELETING && <Status message='Deleting...' />}
      {mode === EDITING && <Status message='Editing...' />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview &&(
        <Show
          student={props.interview.student}
          value={props.interview.interviewer}
          onDelete={deleteInterview}
          onEdit={edit}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          value={props.interview.interviewer.id}
          onCancel={() => back()} onSave={editBookingInDB}
        />)}
    </article>
  );
}
