import { supabase } from '../supabase/instance';
import { FormType, UserFormType } from '../types/form';

const postCalculHistory = async (
  data: Omit<UserFormType, 'privacyAgree'> & FormType,
) => {
  const {
    basicPlastic,
    productCount,
    productWeight,
    company,
    name,
    email,
    phone,
  } = data;
  const { error } = await supabase.from('calcul_histories').insert({
    plastic_type: basicPlastic,
    product_count: productCount,
    product_weight: productWeight,
    company,
    name,
    email,
    phone,
  });

  return { error };
};

export default postCalculHistory;
