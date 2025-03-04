import React from "react";
import Loading from "@src/components/Loading/Loading";
import { useAppSelector } from "@src/hooks/redux";
import styles from "./profile.module.scss";
import ProfileNav from "./ProfileNav/ProfileNav";
import ProfileHeader from "./ProfileHeader/ProfileHeader";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  if (!user) return <Loading />;
  return (
    <div className={styles.profile_wrapper}>
      <div className={styles.profile}>
        <ProfileHeader user={user} />
        <ProfileNav userId={user.id} />
      </div>
    </div>
  );
};

export default Profile;
