import ButtonBlue from "@src/components/ButtonBlue/ButtonBlue";
import Input from "@src/components/Input/Input";
import React, { useState } from "react";
import { useAppDispatch } from "@src/hooks/redux";
import {
  login,
  registrationStart,
} from "@src/store/reducers/ActionCreators/UserAC";
import styles from "./auth-form.module.scss";

interface AuthFormProps {
  isRegForm: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isRegForm }) => {
  const [email, setEmail] = useState<string>("");
  const [loginText, setLoginText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const isDisabled = !(loginText && password);

  const dispatch = useAppDispatch();

  const auth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegForm) {
      dispatch(registrationStart({ email, loginText, password }));
    } else {
      dispatch(login({ loginText, password }));
    }
  };

  return (
    <form className={styles.form} onSubmit={auth}>
      {isRegForm && (
        <Input
          value={email}
          setValue={setEmail}
          placeholder="email"
          type="email"
        />
      )}
      <Input
        value={loginText}
        setValue={setLoginText}
        placeholder="login"
        type="text"
      />
      <Input
        value={password}
        setValue={setPassword}
        placeholder="password"
        type="password"
      />
      {isRegForm && (
        <Input
          value={password2}
          setValue={setPassword2}
          placeholder="password"
          type="password"
        />
      )}
      <ButtonBlue
        text="Продолжить"
        isDisabled={isDisabled}
        handleOnClick={() => {}}
        isSubmit
      />
    </form>
  );
};

export default AuthForm;
