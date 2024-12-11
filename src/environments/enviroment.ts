import { Environment } from "../app/core/interfaces/env.interfaces";

// src/environments/environment.ts
declare global {
  interface Window {
    _env: any;
  }
}

export const environment: Environment = {
  production: false,
  apiUrl: typeof window !== 'undefined' && window._env?.apiUrl
  ? window._env.apiUrl
  : 'http://localhost:8081/api',
};
