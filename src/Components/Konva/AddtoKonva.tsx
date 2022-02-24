import React, { useEffect, useState } from "react";
import { Layer } from "react-konva";
import URLImage from "./URLImage";
import hat from "../images/hat.png";
import holster from "../images/holster.png";

interface AKTypes {
    stage_ref: React.MutableRefObject<null>;
}
interface DropItem {
    obj_id: string;
    x: number;
    y: number;
}

const AddtoKonva = ({ stage_ref }: AKTypes) => {
    const [objs, setObjs] = useState<Array<DropItem>>([]);

    //@ts-ignore
    const drop = (e) => {
        e.preventDefault();
        const obj_id = e.dataTransfer.getData("obj_id");
        console.log("recieved", e);
        let x = e.target.x();
        let y = e.target.y();
        //@ts-ignore
        setObjs((prev) => {
            return prev.push({ obj_id, x, y });
        });
        //Add to state
    };

    //@ts-ignore
    const dragOver = (e) => {
        e.preventDefault();
    };
    // Event Listerner to listen for drag on in toolbar and drag down on canvas
    //

    // useEffect(() => {

    //     return () => {};
    // }, []);

    // add state to state array
    // Render those objects in Konva with URLImage through their id

    return (
        // Return map state to Konva nodes
        //
        <>
            <Layer
                // id={id}
                onDrop={drop}
                onDragOver={dragOver}
                className={dragOver}
            >
                {objs.map((eachObj) => (
                    <URLImage
                        src={eachObj.obj_id}
                        x={eachObj.x}
                        y={eachObj.y}
                    />
                ))}
            </Layer>
        </>
    );
};

export default AddtoKonva;
