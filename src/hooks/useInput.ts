import { useState } from "react";

interface UseInputProps {
  initialValue?: string;
  validation?: (value: string) => string | null;
}

export const useInput = ({
  initialValue = "",
  validation,
}: UseInputProps = {}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>("");
  const [touched, setTouched] = useState(false);

  const handleInput = (newValue: string) => {
    setValue(newValue);
    if (touched && validation) {
      setError(validation(newValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validation) {
      setError(validation(value));
    }
  };

  return {
    value,
    error,
    touched,
    handleInput,
    handleBlur,
  };
};
