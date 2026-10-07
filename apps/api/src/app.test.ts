import { describe, expect, it } from 'vitest';
import { getStatusStyle } from './styles';

describe('status styles', () => {
  it('returns the correct badge class for moving status', () => {
    expect(getStatusStyle('MOVING').badge).toContain('bg-emerald-500/15');
  });

  it('returns fallback styles for unknown statuses', () => {
    expect(getStatusStyle('UNKNOWN').badge).toContain('bg-slate-800');
  });
});
