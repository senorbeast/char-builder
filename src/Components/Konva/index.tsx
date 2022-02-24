//@ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
import Woody from "./Woody";
import URLImage from "./URLImage";
import hat from "../images/hat.png";
import holster from "../images/holster.png";
import AddtoKonva from "./AddtoKonva";

const KonvaStage = () => {
    // Just use to rerender stage on windowresize
    const stageRef = useRef(null);
    const [circles, setCircles] = useState([]);
    useEffect(() => {
        //
        // adapt the stage on any window resize
        window.addEventListener("resize", fitStageIntoParentContainer);
        fitStageIntoParentContainer();

        console.log(hat, holster);
        return () => {
            //cleanup!
            window.removeEventListener("resize", fitStageIntoParentContainer);
        };
    }, []); //Will run only once (mounting)

    let offset = { w: window.innerWidth / 2, h: window.innerHeight / 2 };

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            ref={stageRef}
            draggable
            listening
            dragDistance={10}
        >
            <Layer>
                <Text
                    x={offset.w - 30}
                    y={offset.h - 30}
                    text="Some text on canvas"
                    fontSize={15}
                />
                <Rect
                    x={offset.w + 20}
                    y={offset.h + 50}
                    width={100}
                    height={100}
                    fill="red"
                    shadowBlur={10}
                    draggable
                    name="rect"
                />
                <Circle
                    x={offset.w + 200}
                    y={offset.h + 100}
                    radius={50}
                    fill="green"
                />
                <Line
                    x={offset.w + 20}
                    y={offset.h + 200}
                    points={[0, 0, 100, 0, 100, 100]}
                    tension={0.5}
                    closed
                    stroke="black"
                    fillLinearGradientStartPoint={{ x: -50, y: -50 }}
                    fillLinearGradientEndPoint={{ x: 50, y: 50 }}
                    fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
                />
                <URLImage src={hat} x={100} y={100} />
                <URLImage src={holster} x={100} y={100} />
            </Layer>
            <AddtoKonva></AddtoKonva>

            {/* <Woody stage_ref={stageRef}></Woody> */}
        </Stage>
    );
    function fitStageIntoParentContainer() {
        // if enclosing stage in parent container
        //var container = document.querySelector("#stage-parent");
        //  var containerWidth = container.offsetWidth;
        //setwinSize({ w: window.innerWidth, h: window.innerHeight });
        let stage = stageRef.current;
        //@ts-ignore
        stage.width(window.innerWidth);
        //@ts-ignore
        stage.height(window.innerHeight);
    }
};

export default KonvaStage;
