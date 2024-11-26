import React, { useState } from 'react';
import { format } from 'date-fns';
import { Check, Clock, Edit2, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({ ...todo, title: editedTitle });
    setIsEditing(false);
  };

  return (
    <div className="group flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-navy-600 border-navy-600'
            : 'border-navy-300 hover:border-navy-400'
        }`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>

      <div className="flex-grow">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-grow">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-2 py-1 border border-navy-200 rounded focus:outline-none focus:border-navy-400"
              autoFocus
              onBlur={handleSubmit}
            />
          </form>
        ) : (
          <div className="flex flex-col">
            <span
              className={`text-lg ${
                todo.completed ? 'line-through text-gray-400' : 'text-navy-800'
              }`}
            >
              {todo.title}
            </span>
            {todo.dueDate && (
              <span className="flex items-center text-sm text-gray-500 mt-1">
                <Clock className="w-4 h-4 mr-1" />
                {format(new Date(todo.dueDate), 'MMM d, yyyy')}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 text-navy-500 hover:text-navy-700 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1 text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}