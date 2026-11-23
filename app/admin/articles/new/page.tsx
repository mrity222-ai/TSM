'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Category, FaqItem } from '@/types/database';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { generateAutoSeoBundle } from '@/lib/seo/autoSeoGenerator';
import {
  Plus,
  Trash2,
  Send,
  Upload,
  Sparkles,
  Search,
  HelpCircle,
  Link2,
  FileText,
  CheckCircle2,
  ExternalLink,
  Wand2,
} from 'lucide-react';

export default function CompleteBlogWriterPage() {
  const router = useRouter();

  // 1. Core Editorial Fields
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [authorName, setAuthorName] = useState('The Stock Times Editorial Desk');
  const [authorRole, setAuthorRole] = useState('Global Markets & Equity Research');
  const [isFeatured, setIsFeatured] = useState(false);

  // 2. Media & Visual SEO
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // 3. GEO (Generative Engine Optimization — AI Chatbots)
  const [takeaways, setTakeaways] = useState<string[]>(['', '', '']);
  const [entityTags, setEntityTags] = useState(''); // e.g. Nvidia, NVDA, AI Chips, NASDAQ
  const [sourceCitation, setSourceCitation] = useState(''); // e.g. SEC Q3 Filings, NSE Data

  // 4. AEO (Answer Engine Optimization — Featured Snippets & Voice)
  const [directAnswer, setDirectAnswer] = useState('');
  const [faqs, setFaqs] = useState<FaqItem[]>([
    { question: '', answer: '' },
    { question: '', answer: '' },
  ]);

  // 5. Article Body
  const [content, setContent] = useState('');

  // 6. Traditional SEO Meta
  const [focusKeyword, setFocusKeyword] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');

  // 7. Per-Article Affiliate Monetization
  const [affiliateTitle, setAffiliateTitle] = useState('');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [affiliateCta, setAffiliateCta] = useState('Explore Platform');

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          if (data[0]) setCategoryId(data[0].id);
        }
      })
      .catch(console.error);
  }, []);

  // Smart SEO Slug Generator (Removes stop-words)
  const generateCleanSlug = (text: string) => {
    const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is'];
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .split(/\s+/)
      .filter((w) => !stopWords.includes(w))
      .slice(0, 8)
      .join('-');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(generateCleanSlug(val));
    if (!seoTitle) setSeoTitle(val);
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
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
      setFeaturedImage(data.url);
      if (!imageAlt) setImageAlt(title);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!title.trim() || !content.trim()) {
      alert('Headline aur Article Content bharna zaroori hai.');
      return;
    }

    setSaving(true);
    const cleanTakeaways = takeaways.filter((t) => t.trim() !== '');
    const cleanFaqs = faqs.filter((f) => f.question.trim() !== '' && f.answer.trim() !== '');
    const parsedEntities = entityTags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          category_id: categoryId || null,
          author_name: authorName.trim(),
          author_role: authorRole.trim(),
          is_featured: isFeatured,
          featured_image: featuredImage || null,
          image_alt: imageAlt || title,
          key_takeaways: cleanTakeaways,
          entity_tags: parsedEntities,
          source_citation: sourceCitation || null,
          direct_answer: directAnswer || null,
          faqs: cleanFaqs,
          content,
          focus_keyword: focusKeyword || null,
          seo_title: seoTitle || title,
          seo_description: seoDescription || (directAnswer ? directAnswer.slice(0, 155) : null),
          canonical_url: canonicalUrl || null,
          affiliate_title: affiliateTitle || null,
          affiliate_url: affiliateUrl || null,
          affiliate_cta: affiliateCta || 'Explore Platform',
          status,
          published_at: status === 'published' ? new Date().toISOString() : null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save article');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const [autoGeneratedToast, setAutoGeneratedToast] = useState(false);

  const handleAutoGenerateAll = () => {
    if (!title.trim() && !content.trim()) {
      alert('Pehle Article Headline aur thoda Content likhein, phir Auto-Generate dabayein!');
      return;
    }

    const selectedCat = categories.find((c) => c.id === categoryId)?.name || 'Stock Market';
    const result = generateAutoSeoBundle(title, content, selectedCat);

    setSlug(result.slug);
    setFocusKeyword(result.focusKeyword);
    setSeoTitle(result.seoTitle);
    setSeoDescription(result.seoDescription);
    setDirectAnswer(result.directAnswer);
    setTakeaways(result.takeaways);
    if (result.entityTags) setEntityTags(result.entityTags);
    setFaqs(result.faqs);

    setAutoGeneratedToast(true);
    setTimeout(() => setAutoGeneratedToast(false), 3000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Sticky Action Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">All-in-One SEO + AEO + GEO Editor</h1>
          <p className="text-xs text-slate-500">Optimized for Google Search, Featured Snippets & AI Chatbots</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleAutoGenerateAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
            title="Auto-fill Slug, Meta Description, FAQs, Takeaways & Keywords"
          >
            <Wand2 className="w-3.5 h-3.5" />
            {autoGeneratedToast ? 'Auto-Generated!' : 'Auto-Generate SEO & FAQs'}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition"
          >
            <Send className="w-3.5 h-3.5" />
            {saving ? 'Publishing...' : 'Publish Live'}
          </button>
        </div>
      </div>

      {/* BLOCK 1: CORE EDITORIAL & AUTHOR (E-E-A-T) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3">
          <FileText className="w-4 h-4 text-blue-600" />
          1. Core Editorial & E-E-A-T Author Credentials
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Article Headline (H1) *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Nvidia Q3 Earnings Beat Estimates: Stock Target & AI Outlook"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">SEO URL Slug (/[category]/[slug]) *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono text-xs text-blue-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-blue-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Author Name (E-E-A-T)</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Author Expertise / Role</label>
            <input
              type="text"
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              Pin as Top Hero Story
            </label>
          </div>
        </div>

        {/* Cover Image Upload */}
        <div className="grid md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Featured Image (Upload or URL)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://... or click Upload"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
              <label className="shrink-0 cursor-pointer flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition">
                <Upload className="w-3.5 h-3.5" />
                {uploadingImage ? '...' : 'Upload'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                />
              </label>
            </div>
            {featuredImage && (
              <div className="mt-2 relative w-24 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Image Alt Text (Google Image SEO)</label>
            <input
              type="text"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              placeholder="Describe the stock chart or company photo"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* BLOCK 2: GEO (AI CHATBOT CITATION ENGINE) */}
      <section className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-950">
            <Sparkles className="w-4 h-4 text-blue-600" />
            2. GEO — Generative Engine Optimization (ChatGPT, Gemini & Perplexity)
          </div>
          <button
            type="button"
            onClick={() => setTakeaways([...takeaways, ''])}
            className="text-xs font-bold text-blue-700 hover:underline"
          >
            + Add Bullet
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-blue-950">
            Key Takeaways / TL;DR Bullets (AI models cite these exact data points)
          </label>
          {takeaways.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const updated = [...takeaways];
                  updated[idx] = e.target.value;
                  setTakeaways(updated);
                }}
                placeholder={`Key Fact ${idx + 1} (e.g., Revenue jumped 94% YoY to $35.1B in Q3)`}
                className="w-full px-3.5 py-2 rounded-xl border border-blue-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
              {takeaways.length > 1 && (
                <button
                  type="button"
                  onClick={() => setTakeaways(takeaways.filter((_, i) => i !== idx))}
                  className="p-2 text-slate-400 hover:text-red-500 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-blue-950 mb-1">
              Entities, Tickers & Topics (Comma Separated)
            </label>
            <input
              type="text"
              value={entityTags}
              onChange={(e) => setEntityTags(e.target.value)}
              placeholder="e.g. Nvidia, NVDA, NASDAQ, AI Semiconductors, Jensen Huang"
              className="w-full px-3.5 py-2 rounded-xl border border-blue-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-blue-950 mb-1">
              Verified Primary Data Sources (Citation Trust)
            </label>
            <input
              type="text"
              value={sourceCitation}
              onChange={(e) => setSourceCitation(e.target.value)}
              placeholder="e.g. SEC Form 10-Q, Nasdaq Official Feed, Company Earnings Release"
              className="w-full px-3.5 py-2 rounded-xl border border-blue-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* BLOCK 3: AEO (ANSWER ENGINE & FEATURED SNIPPETS) */}
      <section className="bg-indigo-50/50 border border-indigo-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-indigo-200/60 pb-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-950">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            3. AEO — Answer Engine Optimization (Featured Snippets & Voice Search)
          </div>
          <button
            type="button"
            onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
            className="flex items-center gap-1 text-xs font-bold text-indigo-700 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add Question
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-indigo-950 mb-1">
            45-Word Direct Answer Summary (Targets Google Position-0 Snippet)
          </label>
          <textarea
            rows={2}
            value={directAnswer}
            onChange={(e) => setDirectAnswer(e.target.value)}
            placeholder="Write a crisp, factual 40–50 word direct answer to the main question in your headline..."
            className="w-full px-3.5 py-2 rounded-xl border border-indigo-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-indigo-950">
            People Also Ask (Auto-generates FAQPage JSON-LD Schema)
          </label>
          {faqs.map((faq, idx) => (
            <div key={idx} className="grid md:grid-cols-2 gap-2.5 bg-white p-3 rounded-xl border border-indigo-100">
              <input
                type="text"
                value={faq.question}
                onChange={(e) => {
                  const updated = [...faqs];
                  updated[idx].question = e.target.value;
                  setFaqs(updated);
                }}
                placeholder={`Question ${idx + 1} (e.g. Is Nvidia stock a buy after Q3 results?)`}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...faqs];
                    updated[idx].answer = e.target.value;
                    setFaqs(updated);
                  }}
                  placeholder="Concise factual answer (35–50 words)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
                />
                {faqs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCK 4: FULL ARTICLE BODY */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
            4. Full Article Content (Word-Style WYSIWYG Editor + Table & Inline Media) *
          </label>
          <span className="text-[11px] text-slate-400">
            Words: {content.replace(/<[^>]*>/g, ' ').trim() ? content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length : 0}
          </span>
        </div>
        <RichTextEditor value={content} onChange={setContent} />
      </section>

      {/* BLOCK 5: TRADITIONAL SEO META & AFFILIATE MONETIZATION */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* SEO Meta Card */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2.5">
            <Search className="w-4 h-4 text-blue-600" />
            5. Google Search SEO Settings
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Focus Keyword</label>
            <input
              type="text"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder="e.g. nvidia q3 earnings 2026"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>SEO Meta Title</span>
              <span className={seoTitle.length > 60 ? 'text-red-500 font-extrabold' : 'text-slate-400'}>
                {seoTitle.length}/60
              </span>
            </div>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>SEO Meta Description</span>
              <span className={seoDescription.length > 160 ? 'text-red-500 font-extrabold' : 'text-slate-400'}>
                {seoDescription.length}/160
              </span>
            </div>
            <textarea
              rows={2}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Compelling click-worthy summary for Google SERP..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Canonical URL (Optional)</label>
            <input
              type="text"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder="Leave blank for default self-canonical"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </section>

        {/* Per-Article Affiliate Monetization Card */}
        <section className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-950 border-b border-emerald-200/60 pb-2.5">
            <Link2 className="w-4 h-4 text-emerald-600" />
            6. Article Affiliate / Broker CTA (Optional)
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-950 mb-1">Offer Headline</label>
            <input
              type="text"
              value={affiliateTitle}
              onChange={(e) => setAffiliateTitle(e.target.value)}
              placeholder="e.g. Invest in US & Indian Stocks with Zero Account Fee"
              className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-950 mb-1">Affiliate Referral Link</label>
            <input
              type="text"
              value={affiliateUrl}
              onChange={(e) => setAffiliateUrl(e.target.value)}
              placeholder="https://your-broker-or-tradingview-link.com"
              className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-950 mb-1">CTA Button Text</label>
            <input
              type="text"
              value={affiliateCta}
              onChange={(e) => setAffiliateCta(e.target.value)}
              placeholder="Open Free Account"
              className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-2 text-[11px] text-emerald-800 flex items-start gap-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>Automatically adds <code>rel=&quot;nofollow sponsored&quot;</code> for Google AdSense & SEO safety.</span>
          </div>
        </section>
      </div>
    </div>
  );
}
