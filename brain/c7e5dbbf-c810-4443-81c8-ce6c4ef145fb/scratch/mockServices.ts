// Mock Services for Authentication, Library, and Stripe
// Stores state in localStorage for persistent development experience

export interface User {
  uid: string;
  email: string;
  isGuest?: boolean;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  savedAt: number;
  finishedAt?: number;
}

export type SubscriptionStatus = "basic" | "premium" | "premium-plus";

const USERS_KEY = "summarist_mock_users";
const CURRENT_USER_KEY = "summarist_mock_current_user";
const SUBSCRIPTION_PREFIX = "summarist_mock_sub_";
const LIBRARY_PREFIX = "summarist_mock_library_";

// Helper for local storage
const isClient = typeof window !== "undefined";

function getItem<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : defaultValue;
}

function setItem<T>(key: string, value: T): void {
  if (isClient) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// --- AUTHENTICATION MOCK SERVICE ---
export const mockAuth = {
  getCurrentUser: (): User | null => {
    return getItem<User | null>(CURRENT_USER_KEY, null);
  },

  register: async (email: string, passwordHash: string): Promise<User> => {
    await new Promise((res) => setTimeout(res, 500)); // simulate delay
    const users = getItem<Record<string, string>>(USERS_KEY, {});

    if (users[email.toLowerCase()]) {
      throw new Error("auth/email-already-in-use");
    }

    if (passwordHash.length < 6) {
      throw new Error("auth/weak-password");
    }

    const uid = Math.random().toString(36).substring(2, 9);
    users[email.toLowerCase()] = JSON.stringify({ uid, passwordHash });
    setItem(USERS_KEY, users);

    const user: User = { uid, email };
    setItem(CURRENT_USER_KEY, user);
    return user;
  },

  login: async (email: string, passwordHash: string): Promise<User> => {
    await new Promise((res) => setTimeout(res, 500));
    const users = getItem<Record<string, string>>(USERS_KEY, {});
    const userStr = users[email.toLowerCase()];

    if (!userStr) {
      throw new Error("auth/user-not-found");
    }

    const parsed = JSON.parse(userStr);
    if (parsed.passwordHash !== passwordHash) {
      throw new Error("auth/wrong-password");
    }

    const user: User = { uid: parsed.uid, email };
    setItem(CURRENT_USER_KEY, user);
    return user;
  },

  loginGuest: async (): Promise<User> => {
    await new Promise((res) => setTimeout(res, 300));
    const guestUser: User = {
      uid: "guest-user-123",
      email: "guest@gmail.com",
      isGuest: true,
    };
    setItem(CURRENT_USER_KEY, guestUser);
    return guestUser;
  },

  logout: async (): Promise<void> => {
    await new Promise((res) => setTimeout(res, 200));
    if (isClient) {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },
};

// --- SUBSCRIPTION (STRIPE) MOCK SERVICE ---
export const mockBilling = {
  getSubscriptionStatus: (uid: string): SubscriptionStatus => {
    return getItem<SubscriptionStatus>(SUBSCRIPTION_PREFIX + uid, "basic");
  },

  setSubscriptionStatus: (uid: string, status: SubscriptionStatus): void => {
    setItem(SUBSCRIPTION_PREFIX + uid, status);
  },

  // Simulates Stripe Checkout Redirect and Webhook processing
  createCheckoutSession: async (uid: string, plan: "premium" | "premium-plus"): Promise<void> => {
    await new Promise((res) => setTimeout(res, 800));
    mockBilling.setSubscriptionStatus(uid, plan);
  },

  cancelSubscription: async (uid: string): Promise<void> => {
    await new Promise((res) => setTimeout(res, 500));
    mockBilling.setSubscriptionStatus(uid, "basic");
  },
};

// --- DATABASE (LIBRARY) MOCK SERVICE ---
export const mockLibrary = {
  getLibrary: (uid: string): LibraryBook[] => {
    return getItem<LibraryBook[]>(LIBRARY_PREFIX + uid, []);
  },

  saveBook: (uid: string, book: Omit<LibraryBook, "savedAt" | "finishedAt">): void => {
    const library = mockLibrary.getLibrary(uid);
    if (!library.some((b) => b.id === book.id)) {
      library.push({
        ...book,
        savedAt: Date.now(),
      });
      setItem(LIBRARY_PREFIX + uid, library);
    }
  },

  unsaveBook: (uid: string, id: string): void => {
    let library = mockLibrary.getLibrary(uid);
    library = library.filter((b) => b.id !== id);
    setItem(LIBRARY_PREFIX + uid, library);
  },

  markFinished: (uid: string, id: string): void => {
    const library = mockLibrary.getLibrary(uid);
    const book = library.find((b) => b.id === id);
    if (book) {
      book.finishedAt = Date.now();
      setItem(LIBRARY_PREFIX + uid, library);
    }
  },
};
