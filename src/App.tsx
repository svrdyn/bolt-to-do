import React, { useEffect, useState } from 'react';
import { ListTodo } from 'lucide-react';
import { Todo, Category } from './types';
import { TodoItem } from './components/TodoItem';
import { AddTodo } from './components/AddTodo';

const defaultCategories: Category[] = [
  { id: '1', name: 'Personal', color: '#4F658F' },
  { id: '2', name: 'Work', color: '#FFD44D' },
  { id: '3', name: 'Shopping', color: '#7281A3' },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [categories] = useState<Category[]>(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = ({
    title,
    category,
    dueDate,
  }: {
    title: string;
    category: string;
    dueDate?: string;
  }) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      category,
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const editTodo = (updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === updatedTodo.id
          ? { ...updatedTodo, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) =>
    selectedCategory === 'all' ? true : todo.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-800 to-navy-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-center mb-8">
          <ListTodo className="w-10 h-10 text-gold-500 mr-3" />
          <h1 className="text-4xl font-bold text-white">Elegant Tasks</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <AddTodo categories={categories} onAdd={addTodo} />

          <div className="mt-8 mb-6 flex gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-gold-500 text-navy-900'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-gold-500 text-navy-900'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo}
              />
            ))}
            {filteredTodos.length === 0 && (
              <div className="text-center py-8 text-white/60">
                No tasks found. Add one above to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;