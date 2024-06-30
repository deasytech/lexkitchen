declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: mongoose.Connection | null,
        promise: Promise<mongoose.Connection> | null
      };
    }
  }
}

// This is required to make the TypeScript compiler treat this file as a module.
export {};
