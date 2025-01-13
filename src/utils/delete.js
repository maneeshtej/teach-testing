import { supabase } from "./supabase";

export const deleteSubstitutions = async (list) => {
    if (!Array.isArray(list) || list.length === 0) {
      return { response: null, error: 'Invalid or empty list' };
    }
  
    try {
      const { data, error } = await supabase
        .from('Substitution')
        .delete()
        .in('sub_id', list); 
  
      if (error) {
        return { response: null, error };
      }
  
      return { response: 'success', data, error: null };
    } catch (error) {
      return { response: null, error };
    }
  };
  