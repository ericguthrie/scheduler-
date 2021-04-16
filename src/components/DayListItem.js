// import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
import React, { useState } from "react";


export default function DayListItem(props) {
  const [count, setCount] = useState(props.spots);

  const formatSpots = (props) => {
   if (count === 0) {
      return <h3 className="text--light">{count}no spots remaining</h3>
   }
   else if (count === 1) {
   setCount(count - 1)
   return <h3 className="text--light">{count}spot remaining</h3>
  }
  else {
  setCount(count - 1)
      return <h3 className="text--light">{count}spots remaining</h3>
    }
  }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.full
  });

  return (
    <li className={dayClass}
        onClick={() => props.setDay(props.name)}
        full={props.full}
    >
      {props.children}
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{count} spots remaining</h3>
    </li>
  );
};

  // function formatSpots() {
  //   return props.spots <= 0
  //     ? "no spots remaining"
  //     : props.spots === 1
  //     ? "1 spot remaining"
  //     : `${props.spots} spots remaining`;
  // }