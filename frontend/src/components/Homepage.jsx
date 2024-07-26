import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterSuccessToast from "./RegisterSuccessToast";

export default function Homepage() {
  const location = useLocation();
  const message = location.state?.message;
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (message) {
      setShowToast(true);
      const toastTimeout = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide toast after 3 seconds

      return () => clearTimeout(toastTimeout);
    }
  }, [message]);

  return (
    <div>
      {showToast ? (
        <RegisterSuccessToast message={message} />
      ) : (
        <h4>Welcome to HomePage</h4>
      )}
    </div>
  );
}
