import { useAppDispatch } from "@src/hooks/redux";
import { logout } from "@src/store/reducers/ActionCreators/UserAC";
import React from "react";
import { useGetChannelQuery } from "@src/services/ChannelService";
import { useNavigate } from "react-router-dom";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import Loading from "@src/components/Loading/Loading";
import styles from "./profile-nav.module.scss";

const ProfileNav: React.FC<{ userId: number }> = ({ userId }) => {
  const { data: channel, isLoading } = useGetChannelQuery({ userId });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (isLoading || !channel) return <Loading />;

  const navigateChannel = () => {
    navigate(`/channel/${channel.id}`);
    dispatch(toggleFalse());
  };

  return (
    <nav className={styles.nav}>
      <button type="button" onClick={navigateChannel}>
        Мои видео
      </button>
      <button type="button" onClick={() => dispatch(logout())}>
        Выйти
      </button>
    </nav>
  );
};

export default ProfileNav;
