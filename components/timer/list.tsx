"use client"; 

import React from "react";
import { AppContext } from "@/components/timer/timercontext"
import { Types } from "@/components/timer/reducers";
import TimerCard from "./timercard";

const List = () => {
  const [form, setForm] = React.useState({
    name: "",
    price: 0
  });

  
  const { state ,dispatch } = React.useContext(AppContext);

  const handleForm = (type: string, value: string) => {
    setForm(form => ({
      ...form,
      [type]: value
    }));
  };

  const createProduct = () => {
    dispatch({
      type: Types.Create,
      payload: {
        id: Math.round(Math.random() * 10000),
        name: form.name,
        price: form.price
      }
    });
  };

  const editProduct = (id: number) => {
    dispatch({
      type: Types.Edit,
      payload: {
        id: id,
        name: form.name,
        price: form.price
      }
    });
  };

  const deleteProduct = (id: number) => {
    dispatch({
      type: Types.Delete,
      payload: {
        id,
      }
    })
  }

  return (
    <div>
      <input
        value={form.name}
        onChange={e => {
          handleForm("name", e.target.value);
        }}
        placeholder="Name"
      />
      <input
        value={form.price}
        type="number"
        onChange={e => {
          handleForm("price", e.target.value);
        }}
        placeholder="Price"
      />
      <button onClick={createProduct}>create</button>
      <div style={{ marginTop: 20 }}>
        {state.products.map(c => (
          <div>
            {/* TODO: Add timer object here*/}

            <TimerCard name={true} duration={c.price} />
            <span>{c.name}</span>
            {/* <span>{c.price}</span> */}
            <button onClick={() => deleteProduct(c.id)}>delete</button>
            <button onClick={() => editProduct(c.id)}>Edit</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
