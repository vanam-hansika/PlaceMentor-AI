// ============================================
// PlaceMentor AI — Tab-Switch & Focus Monitoring Custom Hook
// Monitors browser tab switches, screen minimization & focus loss
// ============================================
import { useState, useEffect } from 'react';

export function useAntiCheat(isActive = false, onViolation = () => {}) {
  const [violations, setViolations] = useState(0);
  const [violationLogs, setViolationLogs] = useState([]);
  const [warningShown, setWarningShown] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const recordIncident = (type) => {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setViolations(v => {
        const newV = v + 1;
        setWarningShown(true);
        const newLog = { id: newV, type, time: timeStr, penalty: 15 };
        setViolationLogs(logs => [...logs, newLog]);
        onViolation(newV, newLog);
        return newV;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordIncident('Browser Tab Switch / Minimized');
      }
    };

    const handleWindowBlur = () => {
      recordIncident('Window Focus Lost');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isActive, onViolation]);

  const dismissWarning = () => setWarningShown(false);

  const totalPenalty = violations * 15;
  const integrityScore = Math.max(0, 100 - totalPenalty);

  return {
    violations,
    violationLogs,
    warningShown,
    integrityScore,
    totalPenalty,
    dismissWarning,
  };
}
