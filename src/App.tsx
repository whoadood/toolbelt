import { useState } from "react";
import Spotify from "./components/Spotify";
import Draggable from "./components/Draggable";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen realtive bg-slate-700 text-white font-bold">
      <div>hello</div>
      <Draggable>
        <Spotify />
      </Draggable>
    </div>
  );
}

export default App;
