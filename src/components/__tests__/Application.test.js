import React from "react";
import axios from "axios";

import {
  waitForElement,
  fireEvent,
  render,
  cleanup,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText
} from '@testing-library/react';


import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const {
      getByText
    } = render( < Application / > );

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving...")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Cancel" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Cancel"));

  // 4. Check that the confirmation message is shown.
  expect(
    getByText(appointment, "Are you sure you would like to delete?")
  ).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, 'Deleting...')).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

// 1. Render the Application.
const { container } = render(<Application />);

// 2. Wait until the text "Archie Cohen" is displayed.
await waitForElement(() => getByText(container, "Archie Cohen"));

// 3. Click the "Edit" button on the booked appointment.
const appointment = getAllByTestId(container, "appointment").find(
  appointment => queryByText(appointment, "Archie Cohen")
);

fireEvent.click(queryByAltText(appointment, "Edit"));

// 4. We change the name and save the interview.
fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  target: { value: "Lydia Miller-Jones" }
});

// 5. We don't want the spots to change for "Monday", since this is an edit.
expect(getByText(appointment, "1 spot remaining")).toBeInTheDocument();

// 6. Read the errors because sometimes they say that await cannot be outside of an async function.
  
  });

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();
// 1. Render the Application.
const { container} = render(<Application />);

// 2. Wait until the text "Archie Cohen" is displayed.
await waitForElement(() => getByText(container, "Archie Cohen"));

// 3. Click the "Edit" button on the booked appointment.
const appointment = getAllByTestId(container, "appointment").find(
  appointment => queryByText(appointment, "Archie Cohen")
);

fireEvent.click(queryByAltText(appointment, "Edit"));

// 4. We change the name and save the interview.
fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  target: { value: "Lydia Miller-Jones" }
});
  
  //4. Show error message when saving doesn't work
  // expect(getByText(appointment, 'Error while saving appointment')).toBeInTheDocument();
  
});

it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.put.mockRejectedValueOnce();

   // 1. Render the Application.
   const { container } = render(<Application />);

   // 2. Wait until the text "Archie Cohen" is displayed.
   await waitForElement(() => getByText(container, "Archie Cohen"));
 
   // 3. Click the "Cancel" button on the booked appointment.
   const appointment = getAllByTestId(container, "appointment").find(
     appointment => queryByText(appointment, "Archie Cohen")
   );
 
   fireEvent.click(queryByAltText(appointment, "Delete"));
 
   // 4. Check that the confirmation message is shown.
   expect(
     getByText(appointment, "Are you sure you would like to delete?")
   ).toBeInTheDocument();
 
   // 5. Click the "Confirm" button on the confirmation.
   fireEvent.click(queryByText(appointment, "Confirm"));
 
   // 6. Check that the element with the text "Deleting" is displayed.
  //  expect(getByText(appointment, 'Error while deleting appointment')).toBeInTheDocument();
  //  console.log(debug);
})

});