import ButtonBlue from "@src/components/ButtonBlue/ButtonBlue";
import Input from "@src/components/Input/Input";
import { useAppDispatch } from "@src/hooks/redux";
import {
  loginVerify,
  registrationVerify,
  resendVerificationCode,
} from "@src/store/reducers/ActionCreators/UserAC";
import { removeTempUserId } from "@src/store/reducers/userSlice";
import React, { useState } from "react";
import arrow from "@src/assets/expand-arrow.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import styles from "./auth-verify-form.module.scss";

interface Props {
  tempUserId: number;
  canResendCode: boolean;
  secondsLeft: number;
  isRegForm: boolean;
}

const AuthVerifyForm: React.FC<Props> = ({
  tempUserId,
  canResendCode,
  secondsLeft,
  isRegForm,
}) => {
  const [code, setCode] = useState<string>("");
  const isDisabled = !code;

  const dispatch = useAppDispatch();

  const auth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegForm) {
      dispatch(registrationVerify({ tempUserId, code }));
    } else {
      dispatch(loginVerify({ tempUserId, code }));
    }
  };

  const resendCode = () => {
    dispatch(resendVerificationCode(tempUserId));
  };

  return (
    <>
      <form onSubmit={auth} className={styles.form}>
        <Input value={code} setValue={setCode} placeholder="code" type="text" />
        <div className={styles.button_box}>
          <ButtonBlue
            text="Продолжить"
            isDisabled={isDisabled}
            handleOnClick={() => {}}
            isSubmit
          />
        </div>
        {canResendCode ? (
          <button type="button" className={styles.button} onClick={resendCode}>
            Отправить новый
          </button>
        ) : (
          <span className={styles.button}>
            Повторно отправить код можно через {secondsLeft} сек.
          </span>
        )}
      </form>
      <div className={styles.arrow}>
        <ButtonImg
          img={arrow}
          handleOnClick={() => dispatch(removeTempUserId())}
        />
      </div>
    </>
  );
};

export default AuthVerifyForm;
