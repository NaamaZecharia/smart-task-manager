import { useEffect, useState } from 'react';
import { getCategories , createCategory } from '../api/category';

interface Category {
  id: string;
  code: string;
  name: string;
  type: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ code: '', name: '', type: '' });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory = await createCategory(form);
    setCategories(prev => [...prev, newCategory]);
    setForm({ code: '', name: '', type: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          placeholder="Code"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value })}
          className="border p-1"
        />
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-1"
        />
        <input
          placeholder="Type"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          className="border p-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1">Add Category</button>
      </form>

      <ul>
        {categories.map(cat => (
          <li key={cat.id} className="border-b py-1">
            <strong>{cat.name}</strong> ({cat.code}) - {cat.type}
          </li>
        ))}
      </ul>
    </div>
  );
}
