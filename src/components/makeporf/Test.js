import React from "react";
import { useForm, Controller } from "react-hook-form";

const defaultValues = {};

function Test() {
  const { control } = useForm({ defaultValues });

  return (
    <Controller
      render={({ field }) => <input {...field} />}
      name="firstName"
      control={control}
      defaultValue="abc"
    />
  );
}
export default Test;
