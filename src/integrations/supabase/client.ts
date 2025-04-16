
// Mock Supabase client for development purposes
// In a real application, this would be replaced with the actual Supabase client

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: (callback: any) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      return { data: { user: { id: 'mock-user-id', email } }, error: null };
    },
    signOut: async () => ({ error: null }),
  },
  from: (table: string) => ({
    insert: (data: any) => ({
      select: () => ({
        single: async () => {
          return { 
            data: { id: `mock-${table}-id`, ...data, created_at: new Date().toISOString() }, 
            error: null 
          };
        }
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        select: () => ({
          single: async () => {
            return { 
              data: { id: value, ...data, updated_at: new Date().toISOString() }, 
              error: null 
            };
          }
        })
      })
    }),
    select: (columns = '*') => ({
      eq: (column: string, value: any) => ({
        single: async () => {
          return { 
            data: { id: value, created_at: new Date().toISOString() }, 
            error: null 
          };
        }
      })
    })
  }),
  channel: (name: string) => ({
    on: (event: string, filter: any, callback: any) => ({
      subscribe: () => {
        console.log(`Subscribed to ${name} for ${event}`);
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
    })
  }),
  removeChannel: (subscription: any) => {
    console.log('Removed subscription');
    return true;
  }
};
