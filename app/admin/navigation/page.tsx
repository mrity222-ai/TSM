'use client';

import { useEffect, useState, useRef } from 'react';
import { NavItem } from '@/types/database';
import {
  GripVertical,
  Plus,
  Trash2,
  Power,
  ExternalLink,
  SlidersHorizontal,
  Layers,
  Wrench,
  Check,
  Edit2,
  X,
  Save,
  RefreshCw,
} from 'lucide-react';

export default function NavigationManagerPage() {
  const [activeTab, setActiveTab] = useState<'navbar' | 'tools'>('navbar');
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Drag and Drop state
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Editing Item state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editHref, setEditHref] = useState('');
  const [editBadge, setEditBadge] = useState('');

  // New Item state
  const [newLabel, setNewLabel] = useState('');
  const [newHref, setNewHref] = useState('');
  const [newBadge, setNewBadge] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/navigation?section=all');
      if (res.ok) {
        const data: NavItem[] = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error('Failed to load navigation items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Filter items for current active tab
  const currentTabItems = items
    .filter((item) => item.section_type === activeTab)
    .sort((a, b) => a.sort_order - b.sort_order);

  // HTML5 Drag and Drop handlers
  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setIsDragging(true);
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = async () => {
    setIsDragging(false);
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }

    const reordered = [...currentTabItems];
    const draggedItemContent = reordered.splice(dragItem.current, 1)[0];
    reordered.splice(dragOverItem.current, 0, draggedItemContent);

    // Update sort_order numbers
    const updatedWithOrder = reordered.map((item, idx) => ({
      ...item,
      sort_order: idx + 1,
    }));

    // Optimistically update local state
    const otherItems = items.filter((item) => item.section_type !== activeTab);
    setItems([...otherItems, ...updatedWithOrder]);

    dragItem.current = null;
    dragOverItem.current = null;

    // Save to SQLite DB
    try {
      setSavingOrder(true);
      const payload = updatedWithOrder.map((it) => ({
        id: it.id,
        sort_order: it.sort_order,
      }));

      const res = await fetch('/api/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload }),
      });

      if (res.ok) {
        showToast('New sequence saved successfully!');
      } else {
        alert('Failed to save new order to database');
        fetchItems();
      }
    } catch (err) {
      console.error(err);
      fetchItems();
    } finally {
      setSavingOrder(false);
    }
  };

  // Toggle active status
  const handleToggleActive = async (item: NavItem) => {
    const updatedStatus = !item.is_active;
    // Optimistic update
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, is_active: updatedStatus } : it))
    );

    try {
      const res = await fetch('/api/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, is_active: updatedStatus }),
      });
      if (res.ok) {
        showToast(`Item ${updatedStatus ? 'activated' : 'deactivated'}`);
      } else {
        fetchItems();
      }
    } catch {
      fetchItems();
    }
  };

  // Start inline editing
  const handleStartEdit = (item: NavItem) => {
    setEditingId(item.id);
    setEditLabel(item.label);
    setEditHref(item.href);
    setEditBadge(item.badge_text || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditLabel('');
    setEditHref('');
    setEditBadge('');
  };

  const handleSaveEdit = async (id: string) => {
    if (!editLabel.trim() || !editHref.trim()) {
      alert('Label and URL are required');
      return;
    }

    try {
      const res = await fetch('/api/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          label: editLabel.trim(),
          href: editHref.trim(),
          badge_text: editBadge.trim() || null,
        }),
      });

      if (res.ok) {
        showToast('Item updated successfully');
        handleCancelEdit();
        fetchItems();
      } else {
        alert('Failed to update item');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete item
  const handleDeleteItem = async (id: string, label: string) => {
    if (!confirm(`Are you sure you want to delete "${label}"?`)) return;

    try {
      const res = await fetch(`/api/navigation?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Item deleted successfully');
        setItems((prev) => prev.filter((it) => it.id !== id));
      } else {
        alert('Failed to delete item');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add new item
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !newHref.trim()) {
      alert('Label and URL are required');
      return;
    }

    try {
      const currentHighestOrder = currentTabItems.reduce(
        (max, it) => Math.max(max, it.sort_order),
        0
      );

      const res = await fetch('/api/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_type: activeTab,
          label: newLabel.trim(),
          href: newHref.trim(),
          badge_text: newBadge.trim() || null,
          sort_order: currentHighestOrder + 1,
          is_active: true,
        }),
      });

      if (res.ok) {
        showToast('New item added successfully');
        setNewLabel('');
        setNewHref('');
        setNewBadge('');
        setIsAdding(false);
        fetchItems();
      } else {
        alert('Failed to add item');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <SlidersHorizontal className="w-4 h-4" /> Editorial Site Architecture
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Navbar & Tools Drag-and-Drop Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Reorder site header links and financial calculators using native drag & drop. Changes reflect instantly on the live website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchItems}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            title="Reload Items"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
          >
            {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {isAdding ? 'Close Form' : `Add to ${activeTab === 'navbar' ? 'Navbar' : 'Tools'}`}
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Tab Switcher */}
      <div className="flex gap-2 p-1 bg-slate-200/70 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => {
            setActiveTab('navbar');
            handleCancelEdit();
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === 'navbar'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Header Navbar Links ({items.filter((i) => i.section_type === 'navbar').length})</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('tools');
            handleCancelEdit();
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === 'tools'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-4 h-4 text-emerald-600" />
          <span>Financial Tools Hub ({items.filter((i) => i.section_type === 'tools').length})</span>
        </button>
      </div>

      {/* "Add New Item" Form Panel */}
      {isAdding && (
        <form
          onSubmit={handleAddItem}
          className="bg-white border-2 border-blue-500/30 rounded-2xl p-6 space-y-4 shadow-sm animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900">
              Add New {activeTab === 'navbar' ? 'Navbar Link' : 'Financial Tool'}
            </h3>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Section: {activeTab}
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Display Label *
              </label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder={activeTab === 'navbar' ? 'e.g. IPO & STARTUPS' : 'e.g. CAGR Calculator'}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target URL (href) *
              </label>
              <input
                type="text"
                value={newHref}
                onChange={(e) => setNewHref(e.target.value)}
                placeholder={activeTab === 'navbar' ? 'e.g. /ipo' : 'e.g. /tools/cagr-calculator'}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Badge / Category (Optional)
              </label>
              <input
                type="text"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                placeholder="e.g. Investing, Trending, Hot"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              Save New Link
            </button>
          </div>
        </form>
      )}

      {/* Drag & Drop Instruction Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-xl">
        <span className="flex items-center gap-1.5 font-medium">
          <GripVertical className="w-3.5 h-3.5 text-slate-400" />
          Click and hold the grip icon to drag items up or down. Order saves automatically to database.
        </span>
        {savingOrder && (
          <span className="text-blue-600 font-bold flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin" /> Saving sequence...
          </span>
        )}
      </div>

      {/* Draggable Items List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs font-bold">
            Loading navigation items...
          </div>
        ) : currentTabItems.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl text-slate-500 text-xs">
            No items found in this section. Click &ldquo;Add to {activeTab}&rdquo; above to create one.
          </div>
        ) : (
          currentTabItems.map((item, index) => {
            const isEditing = editingId === item.id;

            return (
              <div
                key={item.id}
                draggable={!isEditing}
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`bg-white border rounded-2xl p-4 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  !item.is_active ? 'opacity-50 border-slate-200 bg-slate-50/50' : 'border-slate-200/90 hover:border-blue-300'
                } ${isDragging ? 'cursor-grabbing' : 'cursor-default'}`}
              >
                {/* Left Drag Handle + Position + Info */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div
                    className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-grab active:cursor-grabbing transition shrink-0"
                    title="Drag to reorder"
                  >
                    <GripVertical className="w-4 h-4" />
                  </div>

                  <span className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold">
                    {index + 1}
                  </span>

                  {isEditing ? (
                    /* Inline Editing Inputs */
                    <div className="grid sm:grid-cols-3 gap-2 flex-1">
                      <input
                        type="text"
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        placeholder="Label"
                        className="px-2.5 py-1.5 rounded-lg border border-blue-400 text-xs text-slate-900 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={editHref}
                        onChange={(e) => setEditHref(e.target.value)}
                        placeholder="URL (href)"
                        className="px-2.5 py-1.5 rounded-lg border border-blue-400 text-xs text-slate-900 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={editBadge}
                        onChange={(e) => setEditBadge(e.target.value)}
                        placeholder="Badge (optional)"
                        className="px-2.5 py-1.5 rounded-lg border border-blue-400 text-xs text-slate-900 focus:outline-none"
                      />
                    </div>
                  ) : (
                    /* Display Mode */
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 truncate">
                          {item.label}
                        </span>
                        {item.badge_text && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {item.badge_text}
                          </span>
                        )}
                        {!item.is_active && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                            Hidden / Inactive
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="font-mono text-[11px] text-slate-500">{item.href}</span>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition"
                          title="Open Link"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                        title="Save Changes"
                      >
                        <Save className="w-3.5 h-3.5" /> Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Active / Inactive Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleActive(item)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          item.is_active
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                        title={item.is_active ? 'Click to Hide from site' : 'Click to Make Active'}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{item.is_active ? 'Active' : 'Hidden'}</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleStartEdit(item)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id, item.label)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
