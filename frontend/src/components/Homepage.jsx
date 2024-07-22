import { useLocation } from "react-router-dom";

export default function Homepage() {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div>
      <h4>Welcome to HomePage</h4>
      {/* Other components and content */}
      <br />
      {message && <h2 className="text-danger">{message}</h2>}
    </div>
  );
}
