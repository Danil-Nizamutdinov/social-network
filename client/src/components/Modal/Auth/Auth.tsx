import React from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import cross from "@src/assets/cross.png";
import { toggleFalse, toggleReg } from "@src/store/reducers/toggleSlice";
import styles from "./auth.module.scss";
import AuthForm from "./AuthForm/AuthForm";

const Auth: React.FC = () => {
  const isRegForm = useAppSelector((state) => state.toggleReducer.isRegForm);
  const error = useAppSelector((state) => state.userReducer.error);
  const dispatch = useAppDispatch();

  return (
    <section className={styles.auth}>
      <h1 className={styles.title}>{isRegForm ? "Регистрация" : "Вход"}</h1>
      <div className={styles.form_wrapper}>
        {error && <p className={styles.error}>{error}</p>}
        <AuthForm isRegForm={isRegForm} />
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={() => dispatch(toggleReg(!isRegForm))}
      >
        {isRegForm ? "Войти" : "Зарегистрироваться"}
      </button>
      <div className={styles.close}>
        <ButtonImg img={cross} handleOnClick={() => dispatch(toggleFalse())} />
      </div>
    </section>
  );
};

export default Auth;
