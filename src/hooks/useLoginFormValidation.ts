
import { useInput } from "@/hooks/useInput";
import {
  checkEmailValidation,
  checkPasswordValidation,
} from "@/utils/checkValidation";

export const useLoginFormValidation = () => {
  const emailInput = useInput({ validation: checkEmailValidation });
  const passwordInput = useInput({ validation: checkPasswordValidation });

  const isValid =
    Boolean(emailInput.value) &&
    Boolean(passwordInput.value) &&
    emailInput.error === null &&
    passwordInput.error === null;

  return {
    email: emailInput.value,
    password: passwordInput.value,
    emailError: emailInput.error,
    passwordError: passwordInput.error,
    handleEmailInput: emailInput.handleInput,
    handleEmailBlur: emailInput.handleBlur,
    handlePasswordInput: passwordInput.handleInput,
    handlePasswordBlur: passwordInput.handleBlur,
    isValid,
  };
};
