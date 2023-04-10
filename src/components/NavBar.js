import { useState } from "react";
import Select from "react-select";
const NavBar = ({ unCompletedTodos, selectedOption, onChange }) => {
  const options = [
    { value: "All", label: "All" },
    { value: "Completed", label: "Completed" },
    { value: "Uncompleted", label: "Uncompleted" },
  ];



  if (!unCompletedTodos) return <h2> set your today todos !</h2>;
  return (
    <header>
      <span>{unCompletedTodos}</span>
      <h2> are not completed</h2>
      <Select options={options} onChange={onChange} value={selectedOption} className="select"/>
    </header>
  );
};

export default NavBar;
