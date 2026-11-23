'use client';

import { useEffect, useState } from 'react';
import { Category } from '@/types/database';
import { FolderPlus, Trash2 } from 'lucide-react';

export default function CategoriesManagerPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim() || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Error: ' + err.error);
      } else {
        setName('');
        setSlug('');
        setDescription('');
        fetchCategories();
      }
    } catch (err: any) {
      alert('Failed to add category: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Categories Manager (Local SQLite)</h1>
        <p className="text-sm text-slate-500">Add or remove news sections (e.g., IPO Watch, Global Markets, AI Stocks)</p>
      </div>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Create New Category</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Category Name (e.g. IPO Watch)"
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900"
          />
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug (e.g. ipo-watch)"
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-700"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short SEO description (optional)"
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
        >
          <FolderPlus className="w-4 h-4" />
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </form>

      {/* Existing Categories List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">URL Slug</th>
              <th className="py-3.5 px-4">Description</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-bold text-slate-900">{cat.name}</td>
                <td className="py-3.5 px-4 font-mono text-xs text-blue-600">/{cat.slug}</td>
                <td className="py-3.5 px-4 text-slate-500">{cat.description || '-'}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
