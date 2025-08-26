import { urlStatic } from "@src/vars";
import edit from "@src/assets/edit.png";
import React from "react";
import { IUser } from "@src/types/main";
import styles from "./profile-header.module.scss";

const ProfileHeader: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className={styles.profile_header}>
      <div className={styles.info}>
        <div>
          <img src={urlStatic + user.avatar} alt="ava" className={styles.ava} />
        </div>
        <div>
          <h1 className={styles.login}>{user.login}</h1>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>
      <div>
        <img src={edit} alt="edit" />
      </div>
    </div>
  );
};

export default ProfileHeader;
