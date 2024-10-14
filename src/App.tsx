import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "./supabase/instance.ts";

type BasicPlastic = "ABS" | "PVC" | "PP" | "PET" | "HDPE";
interface FormType {
  basicPlastic: BasicPlastic;
  productCount: number | null;
  productWeight: number | null;
  company: string;
  name: string;
  email: string;
}

function App() {
  const { register, handleSubmit } = useForm<FormType>({
    defaultValues: {
      basicPlastic: "ABS",
      productCount: null,
      productWeight: null,
      company: "",
      name: "",
      email: "",
    },
  });
  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const { basicPlastic, productCount, productWeight, company, name, email } =
      data;
    const { error } = await supabase.from("calcul_histories").insert({
      plastic_type: basicPlastic,
      product_count: productCount,
      product_weight: productWeight,
      company,
      name,
      email,
    });
    if (error) {
      console.log(error);
      return;
    }
    alert("saved!");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("basicPlastic", { required: true })} />
        <input {...register("productCount", { required: true })} />
        <input {...register("productWeight", { required: true })} />
        <input {...register("company", { required: true })} />
        <input {...register("name", { required: true })} />
        <input {...register("email", { required: true })} />
        <button type="submit">a</button>
      </form>
    </>
  );
}

export default App;
