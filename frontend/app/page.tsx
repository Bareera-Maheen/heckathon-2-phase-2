'use client';
import { useState, useEffect } from 'react';

interface Task {
  id: number;
  description: string;
  status: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:8000/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const res = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      setDescription('');
      fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleStatus = async (task: Task) => {
    const endpoint = task.status === 'Completed' ? 'reopen' : 'complete';
    try {
      const res = await fetch(`http://localhost:8000/tasks/${task.id}/${endpoint}`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error(`Failed to ${endpoint} task`);
      fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  const suggestions = [
    "Buy Groceries", "Pay Bills", "Call Mom", "Schedule Dentist", "Water Plants", "Gym"
  ];

  const quickAdd = async (text: string) => {
    try {
      const res = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: text }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateTask = async (id: number) => {
    if (!editDescription.trim()) return;
    try {
      const res = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: editDescription }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      setEditingId(null);
      setEditDescription('');
      fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditDescription(task.description);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return task.status !== 'Completed';
    if (filter === 'Completed') return task.status === 'Completed';
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => t.status !== 'Completed').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50 text-gray-900">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8 text-center w-full text-blue-600">Todo App Pro</h1>
      </div>

      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl border border-gray-100">
        
        {/* Quick Suggestions */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 font-bold uppercase mb-2">Suggestions (Don't forget!):</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => quickAdd(s)}
                className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={addTask} className="mb-6 flex gap-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            Add
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-4 text-sm font-medium text-gray-500">
          {(['All', 'Active', 'Completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md transition ${filter === f ? 'bg-blue-100 text-blue-700' : 'hover:text-blue-600'}`}
            >
              {f} ({f === 'All' ? stats.total : f === 'Active' ? stats.active : stats.completed})
            </button>
          ))}
        </div>

        <ul className="space-y-4 min-h-[200px]">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 flex-1">
                <input
                  type="checkbox"
                  checked={task.status === 'Completed'}
                  onChange={() => toggleStatus(task)}
                  className="w-6 h-6 text-blue-600 rounded-full border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                
                {editingId === task.id ? (
                  <div className="flex gap-2 flex-1">
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="flex-1 p-1 border-b-2 border-blue-500 focus:outline-none bg-blue-50"
                      autoFocus
                    />
                    <button onClick={() => updateTask(task.id)} className="text-green-600 font-bold px-2">✓</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-400 px-2">✕</button>
                  </div>
                ) : (
                  <span
                    className={`text-lg transition-all ${
                      task.status === 'Completed' ? 'line-through text-gray-400 italic' : 'text-gray-700'
                    }`}
                  >
                    {task.description}
                  </span>
                )}
              </div>
              
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {editingId !== task.id && (
                  <button
                    onClick={() => startEditing(task)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                    title="Edit Task"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-400 hover:text-red-600 p-1"
                  title="Delete Task"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center py-10 h-full flex flex-col justify-center">
              <p className="text-gray-400 italic">No {filter.toLowerCase()} tasks found.</p>
            </div>
          )}
        </ul>

        {/* Footer Summary */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between text-xs text-gray-400 uppercase font-bold tracking-wider">
          <span>{stats.active} items left</span>
          <span>{stats.completed} finished</span>
        </div>
      </div>
    </main>
  );
}