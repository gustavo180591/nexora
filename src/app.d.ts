// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
  namespace App {
    interface Locals {
      user: {
        id: string;
        email: string;
        role: 'ADMIN' | 'SELLER' | 'BUYER';
        createdAt: Date;
        updatedAt: Date;
      } | null;
    }
  }
}

export {};