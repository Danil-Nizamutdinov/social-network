import React from "react";

interface ButtonImgProps {
  img: string;
  handleOnClick: () => void;
}

const ButtonImg: React.FC<ButtonImgProps> = ({ img, handleOnClick }) => {
  return (
    <button onClick={handleOnClick} type="button" data-testid="btn">
      <img src={img} alt="img" data-testid="img" />
    </button>
  );
};

export default ButtonImg;
