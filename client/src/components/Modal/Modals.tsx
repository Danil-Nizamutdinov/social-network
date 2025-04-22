import React from "react";
import { useAppSelector } from "@src/hooks/redux";
import { ActiveToggle } from "@src/types/main";
import Modal from "./Modal";
import Auth from "./Auth/Auth";
import Nav from "../Nav/Nav";
import Profile from "./Profile/Profile";
import AddVideo from "./AddVideo/AddVideo";
import ChangeDescription from "./ChangeDescription/ChangeDescription";
import ChangeBackground from "./ChangeBackground/ChangeBackground";

const Modals: React.FC = () => {
  const activeToggle = useAppSelector(
    (state) => state.toggleReducer.activeToggle
  );

  return (
    <div>
      <Modal isModal={activeToggle === ActiveToggle.MENU} isMenu>
        <Nav />
      </Modal>
      <Modal isModal={activeToggle === ActiveToggle.AUTH} isMenu={false}>
        <Auth />
      </Modal>
      <Modal isModal={activeToggle === ActiveToggle.PROFILE} isMenu={false}>
        <Profile />
      </Modal>
      <Modal isModal={activeToggle === ActiveToggle.ADD_VIDEO} isMenu={false}>
        <AddVideo />
      </Modal>
      <Modal isModal={activeToggle === ActiveToggle.DESCRIPTION} isMenu={false}>
        <ChangeDescription />
      </Modal>
      <Modal isModal={activeToggle === ActiveToggle.BACKGROUND} isMenu={false}>
        <ChangeBackground />
      </Modal>
    </div>
  );
};

export default Modals;
