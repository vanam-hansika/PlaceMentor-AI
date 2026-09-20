// ============================================
// PlaceMentor AI — Placeholder Module Component
// ============================================
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ModulePlaceholder({ title, description, icon: Icon, phase = 'Phase 2' }) {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div className="card" style={{ maxWidth: 500, width: '100%', padding: 'var(--space-8)' }}>
        <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-2xl)', background: 'var(--primary-alpha)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', margin: '0 auto var(--space-4)' }}>
          {Icon ? <Icon size={32} /> : <Sparkles size={32} />}
        </div>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', marginBottom: 'var(--space-2)' }}>{title}</h2>
        <p className="text-secondary-color text-sm" style={{ marginBottom: 'var(--space-6)', lineHeight: 'var(--leading-relaxed)' }}>
          {description}
        </p>

        <div className="badge badge-primary mb-6" style={{ padding: '6px 16px', fontSize: 'var(--text-xs)' }}>
          🚀 Ready for {phase} Expansion
        </div>

        <button className="btn btn-outline btn-full" onClick={() => navigate('/dashboard')}>
          Back to Dashboard <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
