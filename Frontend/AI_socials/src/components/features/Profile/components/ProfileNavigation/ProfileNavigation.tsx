import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfileNavigation.css";
const ProfileNavigation = () => {
  const navigate = useNavigate();

  return (
    <header className="profile-navigation">
      <button
        type="button"
        className="profile-navigation__back"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>
    </header>
  );
};

export default ProfileNavigation;
