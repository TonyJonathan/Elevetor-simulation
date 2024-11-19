import elevator from "./assets/elevator.webp";
import userSprit from "./assets/user.png";
import { useState } from "react";

import "./App.css";

function App() {
  const stages = 6;
  const [currentElevatorStage, setCurrentElevatorStage] = useState(0);
  const [personsStages, setPersonStage] = useState([
    { currentStage: 0, targetStage: 3, state: "waiting" },
    { currentStage: 1, targetStage: 4, state: "taked" }
  ]);
  const personsTaked = personsStages.filter((person) => person.state === "taked");

  return (
    <div className="App">
      <div className="flex flex-col-reverse relative">
        <div className="elevator h-[100px] absolute">
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