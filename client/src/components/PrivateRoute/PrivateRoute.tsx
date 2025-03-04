import React, { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { useNavigate } from "react-router-dom";
import { toggle } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";
import Loading from "../Loading/Loading";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.userReducer.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      dispatch(toggle(ActiveToggle.AUTH));
      navigate("/video");
    }
  }, [isAuth, dispatch, navigate]);

  if (!isAuth) {
    return <Loading />;
  }

  return children;
};

export default PrivateRoute;
