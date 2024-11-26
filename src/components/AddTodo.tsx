import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Category } from '../types';

interface AddTodoProps {
  categories: Category[];
  onAdd: (todo: {
    title: string;
    category: string;
    dueDate?: string;
  }) => void;
}

export function AddTodo({ categories, onAdd }: AddTodoProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || '');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      category,
      dueDate: dueDate || undefined,
    });

    setTitle('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 rounded-lg border border-navy-200 focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gold-500 text-navy-900 rounded-lg hover:bg-gold-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      <div className="flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-navy-200 focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-2 rounded-lg border border-navy-200 focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
        />
      </div>
    </form>
  );
}