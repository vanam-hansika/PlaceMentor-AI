// ============================================
// PlaceMentor AI — Circular Progress Component
// ============================================
import React from 'react';

export default function CircularProgress({ value = 0, size = 80, strokeWidth = 8, color = 'var(--primary)' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--surface-3)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <span style={{ position: 'absolute', fontSize: size * 0.22, fontWeight: 'var(--font-extrabold)', color: 'var(--text-primary)' }}>
        {Math.round(value)}%
      </span>
    </div>
  );
}
