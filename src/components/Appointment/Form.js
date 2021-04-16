import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import React, { useState } from 'react'

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [value, onChange] = useState(props.value || null);

const reset = () => {
    setName("");
    onChange(null)
}

const cancel = () => {
    reset();
    props.onCancel();
}

const handleChange = (event) => {
  setName(event.target.value);
}

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
              onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={handleChange}

          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={value} 
          onChange={onChange} />
      </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button onClick={cancel} danger>Cancel</Button>
            <Button onClick={props.onSave} confirm>Save</Button>
          </section>
        </section>
   </main>
  )
};