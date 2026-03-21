import type { RequestEvent } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';

// 🎯 Tipos para endpoints de SvelteKit
export interface AuthRequestEvent extends Omit<RequestEvent, 'locals'> {
  locals: RequestEvent['locals'] & {
    user?: {
      id: string;
      email: string;
      role: string;
    } | null;
  };
}

export interface RequestParams {
  request: Request;
  cookies: Cookies;
}

export interface RequestWithLocalsParams {
  request: Request;
  locals: AuthRequestEvent['locals'];
}

export interface LocalsParams {
  locals: AuthRequestEvent['locals'];
}

export interface CookiesParams {
  cookies: Cookies;
}
