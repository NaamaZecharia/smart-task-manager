import { useState } from 'react';
import { createCategory } from '../api/category';

export default function CreateCategoryForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({ code: '', name: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(form);
      onCreated();
      setForm({ code: '', name: '', type: '' });
    } catch (err) {
      alert('Failed to create category');
      console.log("Error creating category:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="code" value={form.code} onChange={handleChange} placeholder="Code" />
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="type" value={form.type} onChange={handleChange} placeholder="Type (optional)" />
      <button type="submit">Add Category</button>
    </form>
  );
}
