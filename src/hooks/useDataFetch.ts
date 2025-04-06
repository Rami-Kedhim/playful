
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export function useDataFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (
    table: string,
    options: {
      columns?: string;
      filters?: Record<string, any>;
      single?: boolean;
      orderBy?: string;
      ascending?: boolean;
      limit?: number;
    } = {}
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const {
        columns = '*',
        filters = {},
        single = false,
        orderBy,
        ascending = true,
        limit,
      } = options;

      let query = supabase
        .from(table)
        .select(columns);

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });

      // Apply ordering
      if (orderBy) {
        query = query.order(orderBy, { ascending });
      }

      // Apply limit
      if (limit) {
        query = query.limit(limit);
      }

      // Get single result or array
      const { data, error } = single
        ? await query.single()
        : await query;

      if (error) {
        setError(error.message);
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      setData(data as T);
      return data as T;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.error("Error in fetchData:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createData = async (
    table: string,
    data: Record<string, any>
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();

      if (error) {
        setError(error.message);
        toast({
          title: "Error creating data",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Data created successfully",
      });

      return result;
    } catch (err: any) {
      console.error("Error in createData:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = async (
    table: string,
    id: string,
    data: Record<string, any>,
    idField: string = 'id'
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq(idField, id)
        .select()
        .single();

      if (error) {
        setError(error.message);
        toast({
          title: "Error updating data",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Data updated successfully",
      });

      return result;
    } catch (err: any) {
      console.error("Error in updateData:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (
    table: string,
    id: string,
    idField: string = 'id'
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from(table)
        .delete()
        .eq(idField, id);

      if (error) {
        setError(error.message);
        toast({
          title: "Error deleting data",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Data deleted successfully",
      });

      return true;
    } catch (err: any) {
      console.error("Error in deleteData:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchData,
    createData,
    updateData,
    deleteData,
    setData,
  };
}

export default useDataFetch;
