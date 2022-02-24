import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Toolbar from "./Components/Toolbar";
import KonvaStage from "./Components/Konva";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <KonvaStage></KonvaStage>
                <Toolbar></Toolbar>
            </header>
        </div>
    );
}

export default App;
