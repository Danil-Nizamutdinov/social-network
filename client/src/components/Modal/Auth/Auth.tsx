import React from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import cross from "@src/assets/cross.png";
import { toggleFalse, toggleReg } from "@src/store/reducers/toggleSlice";
import useCooldownTimer from "@src/hooks/useCooldownTimer";
import styles from "./auth.module.scss";
import AuthForm from "./AuthForm/AuthForm";
import AuthVerifyForm from "./AuthVerifyForm/AuthVerifyForm";

const Auth: React.FC = () => {
  const isRegForm = useAppSelector((state) => state.toggleReducer.isRegForm);
  const error = useAppSelector((state) => state.userReducer.error);
  const tempUserId = useAppSelector((state) => state.userReducer.tempUserId);
  const resendCooldownCode = useAppSelector(
    (state) => state.userReducer.resendCooldownCode
  );

  const dispatch = useAppDispatch();

  const secondsLeft = useCooldownTimer(resendCooldownCode);

  const getTitle = () => {
    if (tempUserId) return "Код из письма";
    return isRegForm ? "Регистрация" : "Вход";
  };

  const title = getTitle();
  const buttonText =
    !tempUserId && (isRegForm ? "Войти" : "Зарегистрироваться");

  const canResendCode = secondsLeft === 0;

  return (
    <section className={styles.auth}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.form_wrapper}>
        {error && <p className={styles.error}>{error}</p>}
        {tempUserId ? (
          <AuthVerifyForm
            tempUserId={tempUserId}
            canResendCode={canResendCode}
            secondsLeft={secondsLeft}
          />
        ) : (
          <AuthForm isRegForm={isRegForm} />
        )}
      </div>
      {buttonText && (
        <button
          type="button"
          className={styles.button}
          onClick={() => dispatch(toggleReg(!isRegForm))}
        >
          {buttonText}
        </button>
      )}
      <div className={styles.close}>
        <ButtonImg img={cross} handleOnClick={() => dispatch(toggleFalse())} />
      </div>
    </section>
  );
};

export default Auth;
