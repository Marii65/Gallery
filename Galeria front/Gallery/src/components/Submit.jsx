import { useNavigate } from "react-router-dom";
import "./Submit.css";

function Submit() {
  const navigate = useNavigate();

  function handleClick() {
    const isLogged = !!localStorage.getItem("token");

    if (isLogged) {
      navigate("/submit");
    } else {
      navigate("/login");
    }
  }

  return (
    <button className="submit-btn" onClick={handleClick}>
      Submit <span className="plus">+</span>
    </button>
  );
}

export default Submit;
