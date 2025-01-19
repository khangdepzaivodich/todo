"use client";
import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
export default function Home() {
  interface Todo {
    task: string;
    isDone: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    task: "",
    isDone: false,
  });

  const handleClick = () => {
    if (currentTodo?.task.trim()) {
      setTodos([...todos, currentTodo]);
      setCurrentTodo({ task: "", isDone: false });
    }
  };

  const handleCheck = (id: number) => {
    const updatedTodo = todos.map((todo, index) => {
      if (index === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(updatedTodo);
  };

  const handleDelete = (id: number) => {
    const updatedTodo = todos.filter((todo, index) => index !== id);
    setTodos(updatedTodo);
  };

  return (
    <>
      <div className="ml-10 md:ml-40 mr-10 md:mr-40 pt-10">
        <div className="flex mb-5">
          <input
            className="bg-blue-100 py-3 px-4 rounded-l-3xl text-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
            placeholder="Add a new task..."
            onChange={(e) => {
              setCurrentTodo({ task: e.target.value, isDone: false });
            }}
            value={currentTodo?.task}
          />
          <button
            className="bg-blue-500 text-white font-semibold text-lg rounded-r-3xl px-5 py-3 transition-transform transform hover:scale-105"
            onClick={handleClick}
          >
            Add
          </button>
        </div>

        <div
          className={`mt-5 ${
            todos.length ? "bg-blue-50" : ""
          } p-5 rounded-2xl shadow-lg`}
        >
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No tasks to show</p>
          ) : (
            todos.map((todo, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-3 flex items-center justify-between hover:bg-gray-100 transition-all duration-300"
              >
                <div
                  className="flex items-center gap-5 cursor-pointer"
                  onClick={() => handleCheck(index)}
                >
                  {todo.isDone ? (
                    <FaRegCircleCheck color="green" size={24} />
                  ) : (
                    <FaRegCircle color="gray" size={24} />
                  )}
                  <div
                    className={`text-xl transition-all duration-300 ${
                      todo.isDone ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.task}
                  </div>
                </div>

                <button
                  className="text-red-500 hover:text-red-700 transition-all duration-300"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
