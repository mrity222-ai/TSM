'use client';

import { useRef, useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Unlink,
  ImagePlus,
  List,
  ListOrdered,
  Table,
  Code2,
  Eye,
  Quote,
  Plus,
  Minus,
  Type,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const FONT_SIZES = [
  { label: '6px', value: '6' },
  { label: '8px', value: '8' },
  { label: '10px', value: '10' },
  { label: '12px', value: '12' },
  { label: '14px', value: '14' },
  { label: '16px (Normal)', value: '16' },
  { label: '18px', value: '18' },
  { label: '20px', value: '20' },
  { label: '24px', value: '24' },
  { label: '28px', value: '28' },
  { label: '30px (Max)', value: '30' },
];

const FONT_FAMILIES = [
  { label: 'Font: Inter (Default Sans)', value: 'Inter, system-ui, sans-serif' },
  { label: 'Font: Georgia (Editorial Serif)', value: 'Georgia, serif' },
  { label: 'Font: Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Font: Arial (Clean Sans)', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Font: Courier New (Monospace / Data)', value: '"Courier New", Courier, monospace' },
];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const [uploading, setUploading] = useState(false);

  // Sync external value into visual editor when switching back from HTML mode or on initial load
  useEffect(() => {
    if (mode === 'visual' && editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [mode]);

  const exec = (command: string, commandValue?: string) => {
    if (mode !== 'visual') return;
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleHeadingOrBlock = (tag: string) => {
    exec('formatBlock', tag);
  };

  // 1. Font Size Applicator (6px to 30px like MS Word)
  const handleFontSize = (sizePx: string) => {
    if (mode !== 'visual') return;
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.toString().trim() === '') {
      alert('Pehle text select karein jiska size badalna hai.');
      return;
    }

    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('fontSize', false, '7');

    if (editorRef.current) {
      const spans = editorRef.current.querySelectorAll('span');
      spans.forEach((span) => {
        if (
          span.style.fontSize.includes('xxx-large') ||
          span.style.fontSize === '-webkit-xxx-large'
        ) {
          span.style.fontSize = `${sizePx}px`;
        }
      });

      const fontTags = editorRef.current.querySelectorAll('font[size="7"]');
      fontTags.forEach((el) => {
        const span = document.createElement('span');
        span.style.fontSize = `${sizePx}px`;
        span.innerHTML = el.innerHTML;
        el.parentNode?.replaceChild(span, el);
      });

      onChange(editorRef.current.innerHTML);
    }
  };

  // 2. Font Family Applicator
  const handleFontFamily = (fontName: string) => {
    if (mode !== 'visual') return;
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.toString().trim() === '') {
      alert('Pehle text select karein jiska font style badalna hai.');
      return;
    }
    document.execCommand('fontName', false, fontName);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleAddLink = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === '') {
      alert('Pehle editor mein jis text par link lagana hai use select karein.');
      return;
    }
    const url = prompt('Link URL enter karein (e.g., https://thestocktimes.online/...):', 'https://');
    if (url && url.trim() !== '') {
      exec('createLink', url.trim());
    }
  };

  // Helper to find the active table and column/row index from current selection
  const getActiveTableContext = (): {
    table: HTMLTableElement;
    cell: HTMLTableCellElement | null;
    colIndex: number;
    rowIndex: number;
  } | null => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    let node: Node | null = selection.anchorNode;
    let cell: HTMLTableCellElement | null = null;
    let table: HTMLTableElement | null = null;

    while (node && node !== editorRef.current) {
      if (node.nodeName === 'TD' || node.nodeName === 'TH') {
        cell = node as HTMLTableCellElement;
      }
      if (node.nodeName === 'TABLE') {
        table = node as HTMLTableElement;
        break;
      }
      node = node.parentNode;
    }

    if (!table) {
      const tables = editorRef.current?.querySelectorAll('table');
      if (tables && tables.length > 0) {
        table = tables[tables.length - 1];
      }
    }

    if (!table) return null;

    const colIndex = cell ? cell.cellIndex : -1;
    const tr = cell?.parentElement as HTMLTableRowElement | null;
    const rowIndex = tr ? tr.rowIndex : -1;

    return { table, cell, colIndex, rowIndex };
  };

  // Insert initial financial table
  const handleInsertTable = () => {
    const tableHtml = `
      <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="border:1px solid #cbd5e1; padding:8px; text-align:left;">Metric</th>
            <th style="border:1px solid #cbd5e1; padding:8px; text-align:left;">Q3 Actual</th>
            <th style="border:1px solid #cbd5e1; padding:8px; text-align:left;">YoY Growth</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #cbd5e1; padding:8px;">Revenue</td>
            <td style="border:1px solid #cbd5e1; padding:8px;">$35.1B</td>
            <td style="border:1px solid #cbd5e1; padding:8px;">+94%</td>
          </tr>
        </tbody>
      </table><p><br/></p>
    `;
    exec('insertHTML', tableHtml);
  };

  // Add Column (+ Col)
  const handleAddColumn = () => {
    if (mode !== 'visual') return;
    const ctx = getActiveTableContext();
    if (!ctx) {
      alert('Pehle kisi table ke cell par click karein jisme column jodna hai.');
      return;
    }

    const { table, colIndex } = ctx;
    const theadRows = table.querySelectorAll('thead tr');
    if (theadRows.length > 0) {
      theadRows.forEach((row) => {
        const th = document.createElement('th');
        th.style.cssText = 'border:1px solid #cbd5e1; padding:8px; text-align:left; background:#f1f5f9;';
        th.innerHTML = 'New Metric';
        if (colIndex >= 0 && colIndex < row.children.length) {
          row.children[colIndex].after(th);
        } else {
          row.appendChild(th);
        }
      });
    }

    const tbodyRows = table.querySelectorAll('tbody tr');
    tbodyRows.forEach((row) => {
      const td = document.createElement('td');
      td.style.cssText = 'border:1px solid #cbd5e1; padding:8px;';
      td.innerHTML = '-';
      if (colIndex >= 0 && colIndex < row.children.length) {
        row.children[colIndex].after(td);
      } else {
        row.appendChild(td);
      }
    });

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Add Row (+ Row)
  const handleAddRow = () => {
    if (mode !== 'visual') return;
    const ctx = getActiveTableContext();
    if (!ctx) {
      alert('Pehle kisi table ke cell par click karein jisme row jodna hai.');
      return;
    }

    const { table } = ctx;
    const firstRow = table.querySelector('tr');
    const numCols = firstRow ? firstRow.children.length : 3;

    let tbody = table.querySelector('tbody');
    if (!tbody) {
      tbody = document.createElement('tbody');
      table.appendChild(tbody);
    }

    const tr = document.createElement('tr');
    for (let i = 0; i < numCols; i++) {
      const td = document.createElement('td');
      td.style.cssText = 'border:1px solid #cbd5e1; padding:8px;';
      td.innerHTML = '-';
      tr.appendChild(td);
    }
    tbody.appendChild(tr);

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Delete Column (- Col)
  const handleDeleteColumn = () => {
    if (mode !== 'visual') return;
    const ctx = getActiveTableContext();
    if (!ctx || ctx.colIndex === -1) {
      alert('Pehle us column ke cell par click karein jise delete karna hai.');
      return;
    }

    const { table, colIndex } = ctx;
    const rows = table.querySelectorAll('tr');
    rows.forEach((row) => {
      if (row.children[colIndex]) {
        row.children[colIndex].remove();
      }
    });

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Delete Row (- Row)
  const handleDeleteRow = () => {
    if (mode !== 'visual') return;
    const ctx = getActiveTableContext();
    if (!ctx || !ctx.cell) {
      alert('Pehle us row par click karein jise delete karna hai.');
      return;
    }

    const row = ctx.cell.closest('tr');
    if (row) {
      row.remove();
    }

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInlineImageUpload = async (file: File) => {
    setUploading(true);
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
      const imageUrl = data.url;

      const altText = prompt('Is image ka Alt Text likhein (SEO ke liye):', file.name.split('.')[0]) || 'Article chart';

      const imgHtml = `
        <figure style="margin: 20px 0;">
          <img src="${imageUrl}" alt="${altText}" style="width:100%; border-radius:12px; border:1px solid #e2e8f0;" />
          <figcaption style="font-size:12px; color:#64748b; margin-top:6px; text-align:center;">${altText}</figcaption>
        </figure><p><br/></p>
      `;
      exec('insertHTML', imgHtml);
    } catch (err: any) {
      alert('Image upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-slate-300 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Top Word-Style Formatting Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 space-y-2">
        {/* ROW 1: Typography (Headings, Font Style, Font Size, Bold/Italic/Underline) */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Heading / Structure Selector */}
            <select
              disabled={mode !== 'visual'}
              onChange={(e) => handleHeadingOrBlock(e.target.value)}
              defaultValue="P"
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800 disabled:opacity-40"
              title="Heading Style"
            >
              <option value="P">Paragraph (Normal)</option>
              <option value="H2">Heading 2 (H2)</option>
              <option value="H3">Heading 3 (H3)</option>
              <option value="H4">Subheading (H4)</option>
            </select>

            {/* Font Family / Style Selector */}
            <select
              disabled={mode !== 'visual'}
              onChange={(e) => handleFontFamily(e.target.value)}
              defaultValue={FONT_FAMILIES[0].value}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-800 disabled:opacity-40 max-w-[150px] sm:max-w-[190px]"
              title="Font Family / Style"
            >
              {FONT_FAMILIES.map((f) => (
                <option key={f.label} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>

            {/* Font Size Selector (6px to 30px like MS Word) */}
            <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg px-2 py-0.5">
              <Type className="w-3.5 h-3.5 text-slate-400" />
              <select
                disabled={mode !== 'visual'}
                onChange={(e) => handleFontSize(e.target.value)}
                defaultValue="16"
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none disabled:opacity-40 py-1"
                title="Font Size (6px to 30px)"
              >
                {FONT_SIZES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <span className="h-5 w-[1px] bg-slate-300 mx-1 hidden sm:block" />

            {/* Bold, Italic, Underline */}
            <button
              type="button"
              disabled={mode !== 'visual'}
              onClick={() => exec('bold')}
              className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-700 disabled:opacity-40 transition font-bold"
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={mode !== 'visual'}
              onClick={() => exec('italic')}
              className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-700 disabled:opacity-40 transition"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={mode !== 'visual'}
              onClick={() => exec('underline')}
              className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-700 disabled:opacity-40 transition"
              title="Underline (Ctrl+U)"
            >
              <Underline className="w-4 h-4" />
            </button>

            <span className="h-5 w-[1px] bg-slate-300 mx-1 hidden sm:block" />

            {/* Lists & Quote */}
            <button
              type="button"
              disabled={mode !== 'visual'}
              onClick={() => exec('insertUnorderedList')}
              className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-700 disabled:opacity-40 transition"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={mode !== 'visual'}
              onClick={() => exec('insertOrderedList')}
              className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-700 disabled:opacity-40 transition"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={mode !== 'visual'}
              onClick={() => exec('formatBlock', 'BLOCKQUOTE')}
              className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-700 disabled:opacity-40 transition"
              title="Highlight Quote"
            >
              <Quote className="w-4 h-4" />
            </button>
          </div>

          {/* Visual Word Mode vs HTML Code Mode Switcher */}
          <div className="inline-flex rounded-xl bg-slate-200/80 p-0.5">
            <button
              type="button"
              onClick={() => setMode('visual')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                mode === 'visual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Word Editor
            </button>
            <button
              type="button"
              onClick={() => setMode('html')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                mode === 'html' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> HTML
            </button>
          </div>
        </div>

        {/* ROW 2: Insert Media, Link, and Table Operations */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/70">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Link & Unlink */}
            <button
              type="button"
              disabled={mode !== 'visual'}
              onClick={handleAddLink}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold disabled:opacity-40 transition"
              title="Selected Text Par Link Lagayein"
            >
              <LinkIcon className="w-3.5 h-3.5" /> Link
            </button>
            <button
              type="button"
              disabled={mode !== 'visual'}
              onClick={() => exec('unlink')}
              className="p-1 rounded-lg hover:bg-slate-200/70 text-slate-600 disabled:opacity-40 transition"
              title="Remove Link"
            >
              <Unlink className="w-4 h-4" />
            </button>

            <span className="h-4 w-[1px] bg-slate-300 mx-1" />

            {/* Inline Image Upload */}
            <button
              type="button"
              disabled={mode !== 'visual' || uploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold disabled:opacity-40 transition"
              title="Article Ke Beech Mein Image Dalein"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              {uploading ? 'Uploading...' : 'Add Image'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleInlineImageUpload(e.target.files[0])}
            />

            <span className="h-4 w-[1px] bg-slate-300 mx-1" />

            {/* Table Management Group */}
            <div className="inline-flex items-center gap-1 bg-slate-200/50 p-0.5 rounded-lg">
              <button
                type="button"
                disabled={mode !== 'visual'}
                onClick={handleInsertTable}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold shadow-sm disabled:opacity-40 transition"
                title="New Financial Table Insert Karein"
              >
                <Table className="w-3.5 h-3.5 text-blue-600" /> Insert Table
              </button>

              <button
                type="button"
                disabled={mode !== 'visual'}
                onClick={handleAddColumn}
                className="flex items-center gap-0.5 px-2 py-1 rounded-md bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-bold shadow-sm disabled:opacity-40 transition"
                title="Table Mein Naya Column (Col) Jodein"
              >
                <Plus className="w-3 h-3" /> Col
              </button>

              <button
                type="button"
                disabled={mode !== 'visual'}
                onClick={handleAddRow}
                className="flex items-center gap-0.5 px-2 py-1 rounded-md bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-bold shadow-sm disabled:opacity-40 transition"
                title="Table Mein Nayi Row Jodein"
              >
                <Plus className="w-3 h-3" /> Row
              </button>

              <button
                type="button"
                disabled={mode !== 'visual'}
                onClick={handleDeleteColumn}
                className="flex items-center gap-0.5 px-2 py-1 rounded-md bg-white hover:bg-red-50 text-red-600 text-xs font-bold shadow-sm disabled:opacity-40 transition"
                title="Current Column Delete Karein"
              >
                <Minus className="w-3 h-3" /> Col
              </button>

              <button
                type="button"
                disabled={mode !== 'visual'}
                onClick={handleDeleteRow}
                className="flex items-center gap-0.5 px-2 py-1 rounded-md bg-white hover:bg-red-50 text-red-600 text-xs font-bold shadow-sm disabled:opacity-40 transition"
                title="Current Row Delete Karein"
              >
                <Minus className="w-3 h-3" /> Row
              </button>
            </div>
          </div>

          <span className="text-[11px] font-medium text-slate-400 hidden lg:inline">
            💡 Click inside any table cell to add/delete columns & rows
          </span>
        </div>
      </div>

      {/* Editor Writing Area */}
      {mode === 'visual' ? (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          className="min-h-[380px] p-5 prose prose-slate max-w-none focus:outline-none text-slate-900 leading-relaxed [&_a]:text-blue-600 [&_a]:underline [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-bold [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_table]:border-collapse [&_th]:border [&_th]:border-slate-300 [&_th]:p-2 [&_td]:border [&_td]:border-slate-300 [&_td]:p-2"
          data-placeholder="Yahan apna article likhna shuru karein..."
        />
      ) : (
        <textarea
          rows={16}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="<h2>Write raw HTML here...</h2>"
          className="w-full p-5 font-mono text-xs bg-slate-950 text-emerald-400 focus:outline-none leading-relaxed"
        />
      )}
    </div>
  );
}
