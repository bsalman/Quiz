import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Timer() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 50 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/result"); // Call function when time is up
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="timer">
      <p>Time Left: {formatTime(timeLeft)}</p>
    </div>
  );
}

export default Timer;
