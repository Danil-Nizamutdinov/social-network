import React from "react";

interface ButtonImgProps {
  img: string;
  handleOnClick: () => void;
}

const ButtonImg: React.FC<ButtonImgProps> = ({ img, handleOnClick }) => {
  return (
    <button onClick={handleOnClick} type="button">
      <img src={img} alt="img" />
    </button>
  );
};

export default ButtonImg;
