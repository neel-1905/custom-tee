import { FC } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

type TAB = {
  tab: {
    name: string;
    icon: string;
  };
  handleClick: () => void;
  isFilterTab?: boolean;
  isActiveTab?: boolean;
};

const Tab: FC<TAB> = (props) => {
  const { handleClick, tab, isActiveTab, isFilterTab } = props;
  const { icon, name } = tab;

  const snap = useSnapshot(state);

  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: "transparent", opacity: 1 };

  return (
    <div
      onClick={handleClick}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassmorphism" : "rounded-4"
      }`}
      style={activeStyles}
    >
      <img
        src={icon}
        alt={name}
        className={`${
          isFilterTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"
        }`}
      />
    </div>
  );
};

export default Tab;
