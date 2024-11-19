import elevator from "./assets/elevator.webp";
import userSprit from "./assets/user.png";
import { useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
  const stages = 6;
  const [currentElevatorStage, setCurrentElevatorStage] = useState(0);
  const [personsStages, setPersonStage] = useState([]);
  const elevatorDirection = useRef("up"); // "down" | "up"

  const generateRandomPerson = () => {
    const currentStage = Math.floor(Math.random() * stages);
    let targetStage = Math.floor(Math.random() * stages);
    while (currentStage === targetStage) {
      targetStage = Math.floor(Math.random() * stages);
    }
    return { currentStage, targetStage, state: "waiting" };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPersonStage((prev) => [...prev, generateRandomPerson()]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="flex flex-col-reverse relative">
        <div
          className="elevator h-[100px] absolute"
          style={{ top: `${(stages - currentElevatorStage - 1) * 100}px` }}
        >
          <img src={elevator} alt="elevator" className="h-[100px]" />
        </div>
        {Array.from({ length: stages }).map((_, index) => {
          const currentStagePersons = personsStages.filter(
            (person) => person.currentStage === index && person.state === "waiting"
          );
          return (
            <div key={index} className="stage">
              <div className="stage-elevator w-[400px] h-[100px] flex justify-end">
                <div className="persons flex items-end">
                  {currentStagePersons.map((person) => {
                    return (
                      <div key={person.currentStage} className="person relative">
                        <img src={userSprit} alt="user" className="h-[70px]" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;