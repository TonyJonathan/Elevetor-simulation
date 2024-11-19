import elevator from "./assets/elevator.webp";
import userSprit from "./assets/user.png";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="flex flex-col-reverse relative">
        <div className="elevator h-[100px] absolute">
          <img src={elevator} alt="elevator" className="h-[100px]" />
        </div>
      </div>
    </div>
  );
}

export default App;