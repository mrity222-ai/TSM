'use client';

import { useEffect, useState } from 'react';
import { Save, Power, Trash2, PlusCircle, Upload, Plus } from 'lucide-react';

interface UpgradedAdSlot {
  id: string;
  slot_key: string;
  slot_label: string;
  ad_type: 'inhouse_banner' | 'adsense';
  ad_size: string;
  code_or_title: string | null;
  description: string | null;
  bullet_points: string[];
  image_url: string | null;
  target_url: string | null;
  cta_text: string;
  is_active: boolean;
}

const AD_SIZES = [
  { value: 'responsive', label: 'Responsive / Auto Fit (Recommended)' },
  { value: '728x90', label: '728×90 — Desktop Leaderboard' },
  { value: '300x250', label: '300×250 — Sidebar Medium Rectangle' },
  { value: '320x100', label: '320×100 — Large Mobile Banner' },
  { value: '970x250', label: '970×250 — Wide Billboard' },
];

export default function AdsManagerPage() {
  const [slots, setSlots] = useState<UpgradedAdSlot[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // Create New Slot Form
  const [newLabel, setNewLabel] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newType, setNewType] = useState<'inhouse_banner' | 'adsense'>('inhouse_banner');
  const [newSize, setNewSize] = useState('responsive');

  const fetchSlots = async () => {
    try {
      const res = await fetch('/api/ad-slots');
      if (res.ok) {
        const data = await res.json();
        setSlots(
          data.map((item: any) => ({
            ...item,
            ad_size: item.ad_size || 'responsive',
            bullet_points: Array.isArray(item.bullet_points) ? item.bullet_points : [],
          }))
        );
      }
    } catch (err) {
      console.error('Error fetching ad slots:', err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !newKey.trim()) return;

    try {
      const res = await fetch('/api/ad-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot_label: newLabel.trim(),
          slot_key: newKey.trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_'),
          ad_type: newType,
          ad_size: newSize,
          bullet_points: ['Zero Account Opening Fee', 'Instant UPI & Charting Access'],
          cta_text: 'Open Free Account',
          is_active: true,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create slot');
      }

      setNewLabel('');
      setNewKey('');
      fetchSlots();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const updateField = <K extends keyof UpgradedAdSlot>(
    id: string,
    field: K,
    value: UpgradedAdSlot[K]
  ) => {
    setSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))
    );
  };

  const handleBulletChange = (slotId: string, idx: number, val: string) => {
    const target = slots.find((s) => s.id === slotId);
    if (!target) return;
    const updated = [...target.bullet_points];
    updated[idx] = val;
    updateField(slotId, 'bullet_points', updated);
  };

  const addBullet = (slotId: string) => {
    const target = slots.find((s) => s.id === slotId);
    if (!target) return;
    updateField(slotId, 'bullet_points', [...target.bullet_points, '']);
  };

  const removeBullet = (slotId: string, idx: number) => {
    const target = slots.find((s) => s.id === slotId);
    if (!target) return;
    updateField(
      slotId,
      'bullet_points',
      target.bullet_points.filter((_, i) => i !== idx)
    );
  };

  const handleBannerUpload = async (slotId: string, file: File) => {
    setUploadingId(slotId);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      updateField(slotId, 'image_url', data.url);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingId(null);
    }
  };

  const handleSave = async (slot: UpgradedAdSlot) => {
    setSavingId(slot.id);
    const cleanBullets = slot.bullet_points.filter((b) => b.trim() !== '');

    try {
      const res = await fetch('/api/ad-slots', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: slot.id,
          slot_label: slot.slot_label,
          ad_type: slot.ad_type,
          ad_size: slot.ad_size,
          code_or_title: slot.code_or_title,
          description: slot.description,
          bullet_points: cleanBullets,
          image_url: slot.image_url,
          target_url: slot.target_url,
          cta_text: slot.cta_text,
          is_active: slot.is_active,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update');
      }

      alert(`"${slot.slot_label}" saved successfully!`);
      fetchSlots();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this ad placement permanently?')) return;
    try {
      const res = await fetch(`/api/ad-slots?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchSlots();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Ads Manager (Google AdSense & In-House Affiliate Banners)
        </h1>
        <p className="text-sm text-slate-500">
          Configure ad sizes, Google AdSense scripts, or In-House promotional cards with bullet points and affiliate links.
        </p>
      </div>

      {/* Add New Placement Form */}
      <form onSubmit={handleCreateSlot} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
          + Add New Ad Placement
        </h2>
        <div className="grid md:grid-cols-5 gap-3">
          <input
            type="text"
            required
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Name (e.g. Article Mid Ad)"
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900"
          />
          <input
            type="text"
            required
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Key (e.g. in_article_para_2)"
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as 'inhouse_banner' | 'adsense')}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
          >
            <option value="inhouse_banner">In-House Banner + Bullets</option>
            <option value="adsense">Google AdSense Code</option>
          </select>
          <select
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
          >
            {AD_SIZES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-sm font-bold transition"
          >
            <PlusCircle className="w-4 h-4" /> Create
          </button>
        </div>
      </form>

      {/* Existing Slots */}
      <div className="space-y-6">
        {slots.map((slot) => (
          <div key={slot.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {slot.slot_key}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Size: {slot.ad_size}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{slot.slot_label}</h3>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => updateField(slot.id, 'is_active', !slot.is_active)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    slot.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  {slot.is_active ? 'ACTIVE' : 'OFF'}
                </button>

                <button
                  type="button"
                  onClick={() => handleSave(slot)}
                  disabled={savingId === slot.id}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  {savingId === slot.id ? 'Saving...' : 'Save Changes'}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(slot.id)}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition"
                  title="Delete Slot"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Ad Type & Ad Size Selector */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ad Type</label>
                <select
                  value={slot.ad_type}
                  onChange={(e) =>
                    updateField(slot.id, 'ad_type', e.target.value as 'inhouse_banner' | 'adsense')
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                >
                  <option value="inhouse_banner">In-House Ad (Image + Bullets + Affiliate Link)</option>
                  <option value="adsense">Google AdSense / Third-Party Script</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ad Banner Size</label>
                <select
                  value={slot.ad_size}
                  onChange={(e) => updateField(slot.id, 'ad_size', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                >
                  {AD_SIZES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Conditional Body */}
            {slot.ad_type === 'adsense' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google AdSense / Ad Network HTML & Script Code
                </label>
                <textarea
                  rows={4}
                  value={slot.code_or_title || ''}
                  onChange={(e) => updateField(slot.id, 'code_or_title', e.target.value)}
                  placeholder='<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-..." data-ad-slot="..."></ins>'
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-xs text-slate-900"
                />
              </div>
            ) : (
              <div className="space-y-4 bg-slate-50/80 border border-slate-200/80 rounded-xl p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ad Headline / Offer Title
                    </label>
                    <input
                      type="text"
                      value={slot.code_or_title || ''}
                      onChange={(e) => updateField(slot.id, 'code_or_title', e.target.value)}
                      placeholder="e.g. Trade Stocks & Options with Zero Brokerage"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Short Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={slot.description || ''}
                      onChange={(e) => updateField(slot.id, 'description', e.target.value)}
                      placeholder="e.g. Trusted by 2M+ active equity traders"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm text-slate-900"
                    />
                  </div>
                </div>

                {/* Bullet Points Section for In-House Ads */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Key Offer Bullet Points (In-House Highlights)
                    </label>
                    <button
                      type="button"
                      onClick={() => addBullet(slot.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Bullet
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {slot.bullet_points.map((bp, bIdx) => (
                      <div key={bIdx} className="flex gap-1.5">
                        <input
                          type="text"
                          value={bp}
                          onChange={(e) => handleBulletChange(slot.id, bIdx, e.target.value)}
                          placeholder={`Bullet ${bIdx + 1} (e.g. Free TradingView Charts)`}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900"
                        />
                        <button
                          type="button"
                          onClick={() => removeBullet(slot.id, bIdx)}
                          className="px-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Remove Bullet"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Upload + Target Affiliate Link + CTA Button */}
                <div className="grid md:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Banner Image (Upload or URL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={slot.image_url || ''}
                        onChange={(e) => updateField(slot.id, 'image_url', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900"
                      />
                      <label className="shrink-0 cursor-pointer flex items-center gap-1 px-3 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition">
                        <Upload className="w-3.5 h-3.5" />
                        {uploadingId === slot.id ? '...' : 'Upload'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files?.[0] && handleBannerUpload(slot.id, e.target.files[0])
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Destination / Affiliate Link *
                    </label>
                    <input
                      type="text"
                      value={slot.target_url || ''}
                      onChange={(e) => updateField(slot.id, 'target_url', e.target.value)}
                      placeholder="https://your-affiliate-link.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Button Text (CTA)
                    </label>
                    <input
                      type="text"
                      value={slot.cta_text || ''}
                      onChange={(e) => updateField(slot.id, 'cta_text', e.target.value)}
                      placeholder="Open Free Account"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm text-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
