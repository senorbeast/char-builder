import { useRef, useState } from "react";
import "./App.css";
import Toolbar from "./Components/Toolbar";
import KonvaStage from "./Components/Konva";
import ContextProvider from "./Components/ContextStore";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <ContextProvider>
                    <KonvaStage></KonvaStage>
                    <Toolbar></Toolbar>
                </ContextProvider>
            </header>
        </div>
    );
}

export default App;
