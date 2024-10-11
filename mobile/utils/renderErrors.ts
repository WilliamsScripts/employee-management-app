import { FieldValues, UseFormSetError } from "react-hook-form";

export const renderErrors = (errors: Record<string, any>, setError: UseFormSetError<FieldValues>) => {
  for (const field in errors) {
    if (Object.hasOwnProperty.call(errors, field)) {
      setError(field, { type: 'custom', message: errors[field] });
    }
  }
}