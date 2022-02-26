//@ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
import URLImage from "./URLImage";
import {
    useSel,
    useSetSel,
    useImages,
    useSetImages,
    useStageRef,
    useDragUrlRef,
} from "../ContextStore";

// [ ] Event Listerner to listen for drag on in toolbar and drag down on canvas
// [] add state to state array
// [] Render those objects in Konva with URLImage through their id
// Make each object selectable and add Remove, resize functionality
// Manipulate attributes with transformer and then setImage with new Attrs

const KonvaStage = () => {
    //To get selected Shape/Obj/Node
    let selectedId = useSel();
    let selectShape = useSetSel();
    // To get Images drag onto Canvas
    let images = useImages();
    let setImages = useSetImages();
    // Reqd Ref
    let imgID = useRef(0);
    let stageRef = useStageRef();
    let dragUrl = useDragUrlRef();

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };
    useEffect(() => {
        // adapt the stage on any window resize
        window.addEventListener("resize", fitStageIntoParentContainer);
        fitStageIntoParentContainer();

        // console.log(hat, holster);
        return () => {
            //cleanup!
            window.removeEventListener("resize", fitStageIntoParentContainer);
        };
    }, []); //Will run only once (mounting)

    let offset = { w: window.innerWidth / 2, h: window.innerHeight / 2 };

    return (
        <div
            onDrop={(e) => {
                e.preventDefault();
                // register event position
                stageRef.current.setPointersPositions(e);
                // add imagegUrl={dragUrl}
                setImages(
                    images.concat([
                        {
                            ...stageRef.current.getPointerPosition(), //Pointer gets to current position on canvas
                            src: dragUrl.current, // Ref from tool
                            id: imgID.current,
                        },
                    ])
                );
                // console.log("StageRef", stageRef);
                // console.table(images);
                imgID.current += 1;
            }}
            onDragOver={(e) => e.preventDefault()}
        >
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                ref={stageRef}
                fill="#fff"
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                // draggible
                // listening
                // dragDistance={10}
                // onDrop={drop}
                // onDragOver={dragOver}
            >
                <Layer>
                    {images.map((image, index) => {
                        return (
                            <URLImage
                                key={index}
                                imageProps={image}
                                isSelected={image.id === selectedId}
                                onSelect={() => {
                                    // OnSelect set selectedId == image.id
                                    selectShape(image.id);
                                }}
                                onChange={(newAttrs) => {
                                    const imgs = images.slice();
                                    imgs[index] = newAttrs;
                                    setImages(imgs); //Set New Attrs to Transformed Image
                                }}
                            />
                        );
                    })}

                    {/* <Text
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
                    /> */}
                    {/* <Line
                        x={offset.w + 20}
                        y={offset.h + 200}
                        points={[0, 0, 100, 0, 100, 100]}
                        tension={0.5}
                        closed
                        stroke="black"
                        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
                        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
                        fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
                    /> */}
                    {/* <URLImage src={hat} x={100} y={100} />
                <URLImage src={holster} x={100} y={100} /> */}
                </Layer>
            </Stage>
        </div>
    );
    function fitStageIntoParentContainer(): void {
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
