import elevator from "./assets/elevator.webp";
import userSprit from "./assets/user.png";
import onePerson from "./assets/onePerson.png";
import twoPersons from "./assets/twoPersons.png";
import threePersons from "./assets/threePersons.png";
import group from "./assets/group.png";

import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const stages = 6;
  const [currentElevatorStage, setCurrentElevatorStage] = useState(0);
  const [personsStages, setPersonStage] = useState([
    { currentStage: 0, targetStage: 3, state: "waiting" },
    { currentStage: 1, targetStage: 4, state: "taked" }
  ]);
  const personsTaked = personsStages.filter((person) => person.state === "taked");

  const elevatorDirection = useRef("up"); // "down" | "up"

  const personLength = personsTaked.length;

  const getImage = (length: any) => {
    switch (length) {
      case 0: 
        return elevator;

      case 1: 
        return onePerson;

      case 2:
          return twoPersons;
      
      case 3:
        return threePersons;

      case 4: 
        return group;

      default: 
        return group;
    }
  }

  const getElevatorTargetStage = () => {
    if (personsStages.length === 0) return 0;

    const waitingPersons = personsStages.filter((person) => person.state === "waiting");
    const takedPersons = personsStages.filter((person) => person.state === "taked");

    if (elevatorDirection.current === "up") {
      const waitingPersonsUp = waitingPersons
        .filter((person) => person.currentStage > currentElevatorStage)
        .sort((a, b) => a.currentStage - b.currentStage)[0];
      const takedPersonsUp = takedPersons
        .filter((person) => person.targetStage > currentElevatorStage)
        .sort((a, b) => a.targetStage - b.targetStage)[0];
      if (!waitingPersonsUp && !takedPersonsUp) return currentElevatorStage;
      if (!waitingPersonsUp) return takedPersonsUp.targetStage;
      if (!takedPersonsUp) return waitingPersonsUp.currentStage;
      return Math.max(...[waitingPersonsUp.currentStage, takedPersonsUp.targetStage]);
    } else {
      const waitingPersonsDown = waitingPersons
        .filter((person) => person.currentStage < currentElevatorStage)
        .sort((a, b) => b.currentStage - a.currentStage)[0];
      const takedPersonsDown = takedPersons
        .filter((person) => person.targetStage < currentElevatorStage)
        .sort((a, b) => b.targetStage - a.targetStage)[0];
      if (!waitingPersonsDown && !takedPersonsDown) return currentElevatorStage;
      if (!waitingPersonsDown) return takedPersonsDown.targetStage;
      if (!takedPersonsDown) return waitingPersonsDown.currentStage;
      return Math.min(...[waitingPersonsDown.currentStage, takedPersonsDown.targetStage]);
    }
  };

  const movingElevator = () => {
    const targetStage = getElevatorTargetStage();

    if (personsStages.length === 0) {
      elevatorDirection.current = "down";
    }

    if (currentElevatorStage === targetStage && personsStages.length > 0) {
      if (elevatorDirection.current === "up") elevatorDirection.current = "down";
      else elevatorDirection.current = "up";
    }
    if (elevatorDirection.current === "up") {
      if (currentElevatorStage === stages - 1) return;
      setCurrentElevatorStage((prev) => prev + 1);
    } else {
      if (currentElevatorStage === 0) return;
      setCurrentElevatorStage((prev) => prev - 1);
    }
  };

  const generateRandomPerson = (): {
    currentStage: number;
    targetStage: number;
    state: "waiting" | "taked";
  } => {
    const currentStage = Math.floor(Math.random() * stages);
    const targetStage = Math.floor(Math.random() * stages);
    if (currentStage === targetStage) return generateRandomPerson();
    return { currentStage, targetStage, state: "waiting" };
  };

 const person = generateRandomPerson();

  useEffect(() => {
    setTimeout(() => {
      const newPersonStage = personsStages
        .map((person) => {
          if (person.currentStage === currentElevatorStage && person.state === "waiting") {
            return { ...person, state: "taked" };
          }
          if (person.targetStage === currentElevatorStage && person.state === "taked") {
            return null;
          }
          return person;
        })
        .filter((el) => el);

      // @ts-ignore
      setPersonStage(newPersonStage);
    }, 500);
  }, [currentElevatorStage]);

  useEffect(() => {
    const interval = setInterval(() => {
      movingElevator();
    }, 500);
    return () => clearInterval(interval);
  }, [personsStages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPersonStage((prev) => [...prev, generateRandomPerson()]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse relative">
        <div
          className="elevator h-[100px] absolute"
          style={{
            top: `${(stages - currentElevatorStage - 1) * 100}px`,
            transition: "top 0.5s"
          }}
        >
          <div className="elevator-door absolute top-6 left-10 text-black text-5xl	">
            {personsTaked.length}
          </div>
          <img src={getImage(personLength)} alt="elevator" className="h-[100px]" />
        </div>
        {Array.from({ length: stages }).map((_, index) => {
          const currentStagePersons = personsStages.filter(
            (person) => person.currentStage === index && person.state === "waiting"
          );
          return (
            <div key={index} className="stage">
              <div
                className="stage-elevator w-[400px] h-[100px] flex justify-end"
                style={{
                  backgroundColor: index % 2 === 0 ? "#ababab" : "#818080",
                  border: "solid 3px #000"
                }}
              >
              
                
                <div className="persons flex items-end">
                  {currentStagePersons.map((person) => {
                    return (
                      <div key={person.currentStage} className="person relative">
                      <img src={userSprit} alt="user" className="h-[70px]" />
                      <p className="absolute top-[-2px] left-[34px] m-0 p-0 text-red-500 text-md">{person.targetStage}</p>
                  </div>
                    );
                  })}
                </div>
              </div>
             
            </div>
            
          );
        })}
        
      </div>
    </>
  );
}

export default App;
