declare global {
  namespace Express {
    interface Request {
      validatedBody?: unknown;
      params: Record<string, string>;
    }
  }
}

export {};
