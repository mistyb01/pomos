import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";

import SettingsIcon from "../components/icons/SettingsIcon";
import CloseIcon from "../components/icons/CloseIcon";
import StatsIcon from "../components/icons/StatsIcon";

const IconMenu = ({ showSettings, toggleShowSettings }) => {
  const { auth } = useAuth();

  return (
    <div className="ui-icon-container">
      <div
        className="settings-icon-container"
        onClick={() => toggleShowSettings(!showSettings)}
      >
        {showSettings ? <CloseIcon /> : <SettingsIcon />}
      </div>
      <div className="stats-icon-container">
        {auth && (
          <Link to="/stats">
            <StatsIcon />
          </Link>
        )}
        {!auth && (
          <Link to="/login">
            <StatsIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

export default IconMenu;
