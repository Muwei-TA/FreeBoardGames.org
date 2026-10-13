// Identity is verified before any cached game credentials become readable.
export class BlackRoomSession {
  private username: string | undefined;

  constructor(private storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>) {}

  activate(username: string) {
    if (this.storage.getItem('blackroomUsername') !== username) {
      this.clear();
      this.storage.setItem('blackroomUsername', username);
    }
    this.username = username;
  }

  get(key: string): string | null {
    return this.username && this.storage.getItem('blackroomUsername') === this.username
      ? this.storage.getItem(key)
      : null;
  }

  set(key: string, value: string) {
    if (!this.username || this.storage.getItem('blackroomUsername') !== this.username) {
      throw new Error('BlackRoom identity has not been verified');
    }
    this.storage.setItem(key, value);
  }

  clear() {
    this.username = undefined;
    this.storage.removeItem('fbgNickname2');
    this.storage.removeItem('fbgUserToken2');
  }
}

// A failed optional profile lookup may allow manual naming after the gateway's
// membership check, but must never reuse an unverified cached game identity.
export function temporaryGameStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) || null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
  };
}

export async function fetchBlackRoomUsername(): Promise<string | undefined> {
  const response = await fetch('/_blackroom/me', { credentials: 'same-origin', cache: 'no-store' });
  if (response.status >= 500 && response.status <= 599) return undefined;
  if (!response.ok) throw new Error('Unable to verify BlackRoom membership');
  const profile = await response.json();
  if (typeof profile.username !== 'string' || !profile.username) {
    throw new Error('BlackRoom username is unavailable');
  }
  return profile.username;
}
