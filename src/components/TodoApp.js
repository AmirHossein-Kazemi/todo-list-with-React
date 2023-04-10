import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFiltereedTodos] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");

  useEffect(() => {
    filterTodos(selectedOption.value);
  }, [todos, selectedOption]);

  const addTodoHandler = (input) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]); // make a copy of all todos and add new todo :)
  };

  const completeTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    // clone => do not mutate
    const selectedTodo = { ...todos[index] };
    selectedTodo.isCompleted = !selectedTodo.isCompleted;
    //clone todos
    const updatedTodos = [...todos];
    updatedTodos[index] = selectedTodo;
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const filterdTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filterdTodos);
  };

  const updateTodo = (id, newValue) => {
    const index = todos.findIndex((todo) => todo.id === id);
    // clone => do not mutate
    const selectedTodo = { ...todos[index] };
    selectedTodo.text = newValue;
    //clone todos
    const updatedTodos = [...todos];
    updatedTodos[index] = selectedTodo;
    setTodos(updatedTodos);
  };

  const filterTodos = (status) => {
    switch (status) {
      case "Completed":
        setFiltereedTodos(todos.filter((t) => t.isCompleted));
        break;
      case "Uncompleted":
        setFiltereedTodos(todos.filter((t) => !t.isCompleted));
        break;
      default:
        setFiltereedTodos(todos);
    }
  };

  const selectHandler = (e) => {
    setSelectedOption(e);
    filterTodos(e.value);
  };

  return (
    <div className="container">
      <NavBar
        unCompletedTodos={todos.filter((t) => !t.isCompleted).length}
        filterTodos={filterTodos}
        selectedOption={selectedOption}
        onChange={selectHandler}
      />
      <TodoForm submitTodo={addTodoHandler} />
      <TodoList
        todos={filteredTodos}
        onComplete={completeTodo}
        onDelete={removeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
};

export default TodoApp;
