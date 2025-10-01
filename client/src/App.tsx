import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./app.module.scss";
import Modals from "./components/Modal/Modals";
import useWindowWidth from "./hooks/useWindowWidth";
import Nav from "./components/Nav/Nav";
import { desktopWidth } from "./vars";
import { checkAuth } from "./store/reducers/ActionCreators/UserAC";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import Loading from "./components/Loading/Loading";
import useSse from "./hooks/useSse";

const App: React.FC = () => {
  const width = useWindowWidth();
  const isDesktop = width >= desktopWidth;

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.userReducer.isLoading);

  const userId = useAppSelector((state) => state.userReducer.user?.id);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  useSse(userId);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.container}>
      <Modals />
      {isDesktop ? (
        <div className={styles.wrapper}>
          <Nav />
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default App;
