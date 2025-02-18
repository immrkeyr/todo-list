import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editingText } : todo))
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold text-center mb-4">To-Do List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-2 border-b"
          >
            {editingId === todo.id ? (
              <input
                className="flex-1 p-1 border rounded"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <span
                className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
            )}
            {editingId === todo.id ? (
              <button
                className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => saveEdit(todo.id)}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => startEditing(todo.id, todo.text)}
              >
                Edit
              </button>
            )}
            <button
              className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
