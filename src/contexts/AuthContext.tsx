
import { createContext, useEffect, useState, ReactNode } from 'react';
import { User, UserProfile, AuthResult } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, username: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    const fetchInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { user: authUser } = session;
          if (authUser) {
            // Transform Supabase user to our User type
            const transformedUser: User = {
              id: authUser.id,
              email: authUser.email || '',
              username: authUser.user_metadata?.username || '',
              name: authUser.user_metadata?.name || '',
              isVerified: false,
              createdAt: authUser.created_at,
              roles: authUser.user_metadata?.roles || []
            };
            
            setUser(transformedUser);
            setIsAuthenticated(true);
            
            // Fetch user profile if authenticated
            fetchUserProfile(transformedUser.id);
          }
        }
      } catch (error) {
        console.error('Error fetching initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { user: authUser } = session;
        if (authUser) {
          // Transform Supabase user to our User type
          const transformedUser: User = {
            id: authUser.id,
            email: authUser.email || '',
            username: authUser.user_metadata?.username || '',
            name: authUser.user_metadata?.name || '',
            isVerified: false,
            createdAt: authUser.created_at,
            roles: authUser.user_metadata?.roles || []
          };
          
          setUser(transformedUser);
          setIsAuthenticated(true);
          
          // Fetch user profile 
          fetchUserProfile(transformedUser.id);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const userProfile: UserProfile = {
          id: data.id,
          userId: data.id,
          username: data.username || '',
          displayName: data.full_name || '',
          email: data.email || '',
          bio: data.bio || '',
          location: data.location || '',
          isVerified: !!data.is_verified,
          website: data.website || '',
          avatarUrl: data.avatar_url || '',
          joinedDate: new Date(data.created_at),
          avatar_url: data.avatar_url || '',
          sexual_orientation: data.sexual_orientation || '',
          phone: data.phone_number
        };
        
        setProfile(userProfile);
      }
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Transform Supabase user to our User type
        const transformedUser: User = {
          id: data.user.id,
          email: data.user.email || '',
          username: data.user.user_metadata?.username || '',
          name: data.user.user_metadata?.name || '',
          isVerified: false,
          createdAt: data.user.created_at,
          roles: data.user.user_metadata?.roles || []
        };
        
        setUser(transformedUser);
        setIsAuthenticated(true);
        
        // Fetch user profile
        await fetchUserProfile(transformedUser.id);
        
        return {
          success: true,
          user: transformedUser,
          session: data.session
        };
      }
      
      return {
        success: false,
        error: 'Login failed'
      };
      
    } catch (error: any) {
      setError(error.message);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, username: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            name: username,
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // For services that require email verification, user might not be fully authenticated yet
        const transformedUser: User = {
          id: data.user.id,
          email: data.user.email || '',
          username: username,
          name: username,
          isVerified: false,
          createdAt: data.user.created_at,
          roles: ['user']
        };
        
        setUser(transformedUser);
        setIsAuthenticated(true);
        
        return {
          success: true,
          user: transformedUser,
          session: data.session
        };
      }
      
      return {
        success: false,
        error: 'Registration failed'
      };
      
    } catch (error: any) {
      setError(error.message);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update user function
  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Convert to Supabase updateUser format
      const updateData: any = {};
      
      if (userData.name) updateData.data = { ...updateData.data, name: userData.name };
      if (userData.username) updateData.data = { ...updateData.data, username: userData.username };
      
      const { data, error } = await supabase.auth.updateUser(updateData);
      
      if (error) throw error;
      
      if (data.user) {
        // Update the local state
        setUser(prevUser => {
          if (!prevUser) return null;
          
          return {
            ...prevUser,
            ...userData
          };
        });
        
        return true;
      }
      
      return false;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      setLoading(true);
      setError(null);
      
      // Convert our UserProfile type to Supabase profiles table format
      const supabaseProfileData: any = {};
      
      if (profileData.username) supabaseProfileData.username = profileData.username;
      if (profileData.displayName) supabaseProfileData.full_name = profileData.displayName;
      if (profileData.bio) supabaseProfileData.bio = profileData.bio;
      if (profileData.website) supabaseProfileData.website = profileData.website;
      if (profileData.avatarUrl) supabaseProfileData.avatar_url = profileData.avatarUrl;
      if (profileData.location) supabaseProfileData.location = profileData.location;
      if (profileData.sexual_orientation) supabaseProfileData.sexual_orientation = profileData.sexual_orientation;
      if (profileData.phone) supabaseProfileData.phone_number = profileData.phone;
      
      const { error } = await supabase
        .from('profiles')
        .update(supabaseProfileData)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update the local state
      setProfile(prevProfile => {
        if (!prevProfile) return null;
        
        return {
          ...prevProfile,
          ...profileData
        };
      });
      
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    profile,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    updateProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
