import { FC, ReactNode } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { getContrastingColor } from "../config/helpers";

type Type = "filled" | "outline";

type CustomButton = {
  type: Type;
  handleClick: () => void;
  customStyles: string;
  children: ReactNode;
};

const CustomButton: FC<CustomButton> = (props) => {
  const { customStyles, handleClick, type, children } = props;

  const snap = useSnapshot(state);

  const generateStyle = (type: Type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
    >
      {children}
    </button>
  );
};

export default CustomButton;
