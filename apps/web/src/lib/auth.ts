export type DemoSession = {
  email: string;
  role: string;
  token: string;
};

export const DEMO_EMAIL = 'ops@bullettrans.example';
export const DEMO_PASSWORD = 'Welcome123';

export const readSession = (): DemoSession | null => {
  try {
    const raw = localStorage.getItem('bt_session');
    if (!raw) return null;
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
};

export const saveSession = (session: DemoSession) => {
  localStorage.setItem('bt_session', JSON.stringify(session));
};

export const clearSession = () => {
  localStorage.removeItem('bt_session');
};

export const createDemoSession = (email: string, password: string): DemoSession | null => {
  if (!email || !password) return null;
  if (email.toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) return null;

  return {
    email,
    role: 'FLEET_MANAGER',
    token: 'demo-token',
  };
};
