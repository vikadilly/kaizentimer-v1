"use client";

import React, { useEffect } from "react";
import { AppContext } from "@/components/timer/context";
import TimerCard from "./timercard";
import CreateTimerModal from "../modals/createtimer";
import EditTimerModal from "../modals/edittimer";
import { Types } from "@/enums/Types";

function Listing() {
  const { state, dispatch } = React.useContext(AppContext);

  function createTimer(name: string, price: number) {
    dispatch({
      type: Types.Create,
      payload: {
        id: Math.round(Math.random() * 10000),
        name: name,
        price: price,
      },
    });
  }

  function editTimer(id: number, name: string, price: number) {
    dispatch({
      type: Types.Edit,
      payload: {
        id: id,
        name: name,
        price: price,
      },
    });
  }

  function deleteTimer(id: number) {
    dispatch({
      type: Types.Delete,
      payload: {
        id,
      },
    });
  }

  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("storedTimers");

    if (item != null) {
      JSON.parse(item).map((timer : any) => {
        createTimer(timer.name, parseInt(timer.price));
      });
    }
  }, []);

  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <div>
          {state.timers.map((c) => (
            <div className="py-4" key={c.price}>
              <TimerCard
                name={c.name}
                duration={c.price}
                EditModalComponent={
                  <EditTimerModal
                    id={c.id}
                    editTimer={editTimer}
                    deleteTimer={deleteTimer}
                  />
                }
              />
            </div>
          ))}
        </div>

        <CreateTimerModal createTimer={createTimer} />
      </div>
    </div>
  );
}

export default Listing;
