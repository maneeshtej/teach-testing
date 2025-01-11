import { supabase } from "./supabase";

export const insertSubstitutions = async (items) => {
    try {
        const {data: insertedData, error} = await supabase
        .from('Substitution')
        .insert(items)


        if (error) {
            return {response:null, error:error}
        } else {
            return {response: "Succesfull", error: null}
        }

        
    } catch (e) {
        return {response:null, error:e.message}
    }
}