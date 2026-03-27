import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Submit.css";
import { toast } from "react-toastify";

function Submit({ className }) {

  const navigate = useNavigate();
  const { user } = useAuth();
    

  function handleClick() {

  if (!user) {
    navigate("/login");
    return;
  }

  const role = user.role?.toUpperCase();

  if (role !== "ARTISTA") {
  toast.error("Apenas artistas podem enviar desenhos");
  return;
}
navigate("/artista")
}

  return (
    <button
      className={`submit-btn ${className || ""}`}
      onClick={handleClick}
    >
      Submit <span className="plus">+</span>
    </button>
  );
}

export default Submit;  