import { supabase } from '../supabase/instance';
import { getPlasticType } from '../types/plastic';

export const getCalculNumber = async () => {
  const { data: resData, error } = await supabase
    .from('calcul_number')
    .select()
    .returns<getPlasticType[]>();
  return { resData, error };
};
