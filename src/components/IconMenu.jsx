import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";

import SettingsIcon from "./icons/SettingsIcon";
import CloseIcon from "./icons/CloseIcon";
import StatsIcon from "./icons/StatsIcon";

const IconMenu = ({ showSettings, toggleShowSettings }) => {
  const { auth } = useAuth();

  return (
    <div className="ui-icon-container">
      <button
        className="settings-icon-container"
        onClick={() => toggleShowSettings(!showSettings)}
      >
        {showSettings ? <CloseIcon /> : <SettingsIcon />}
      </button>
      {auth && (
        <Link className="stats-icon-container" to="/stats">
          <StatsIcon />
        </Link>
      )}
      {!auth && (
        <Link className="stats-icon-container" to="/login">
          <StatsIcon />
        </Link>
      )}
    </div>
  );
};

export default IconMenu;
