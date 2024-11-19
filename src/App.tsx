import elevator from "./assets/elevator.webp";
import userSprit from "./assets/user.png";
import { useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
  const stages = 6;
  const [currentElevatorStage, setCurrentElevatorStage] = useState(0);
  const [personsStages, setPersonStage] = useState([
    { currentStage: 0, targetStage: 3, state: "waiting" },
    { currentStage: 1, targetStage: 4, state: "taked" }
  ]);

  const elevatorDirection = useRef("up"); // "down" | "up"

  const getElevatorTargetStage = () => {
    if (elevatorDirection.current === "up") {
      return Math.min(...personsStages.map((person) => person.targetStage));
    } else {
      return Math.max(...personsStages.map((person) => person.targetStage));
    }
  };

  const movingElevator = () => {
    const targetStage = getElevatorTargetStage();

    if (currentElevatorStage === targetStage) {
      elevatorDirection.current = elevatorDirection.current === "up" ? "down" : "up";
    }

    if (elevatorDirection.current === "up") {
      if (currentElevatorStage < stages - 1) {
        setCurrentElevatorStage(prev => prev + 1);
      }
    } else {
      if (currentElevatorStage > 0) {
        setCurrentElevatorStage(prev => prev - 1);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      movingElevator();
    }, 500);
    return () => clearInterval(interval);
  }, [currentElevatorStage]);

  return (
    <div className="App">
      <div className="flex flex-col-reverse relative">
        <div
          className="elevator h-[100px] absolute"
          style={{ top: `${(stages - currentElevatorStage - 1) * 100}px` }}
        >
          <img src={elevator} alt="elevator" className="h-[100px]" />
        </div>
      </div>
    </div>
  );
}

export default App;