import Konva from "konva";
import React, { useEffect } from "react";

interface WoodyTypes {
    stage_ref: React.MutableRefObject<null>;
}
// Steps:
// Drag event is observed into canvas add state (done in useEffect) ( or in Layer component and accept a prop here)
// adding state will render object dynamically in Konva Canvas

// Init Statefull React component in the tree
// ( Parent of the this component will never rerender ( since they are not statefull))
const Woody = ({ stage_ref }: WoodyTypes) => {
    useEffect(() => {
        // # Connecting to konva DOM element thru stage_ref( useRef Hook )
        // what is url of dragging element?
        let stage = stage_ref.current;
        var itemURL = "";
        //@ts-ignore
        stage.container("container");

        // # Adding eventListener for dragstart
        //@ts-ignore
        document
            .getElementById("drag-items")
            .addEventListener("dragstart", function (e) {
                //@ts-ignore
                itemURL = e.target.src;
            });
        //@ts-ignore
        let con = stage.container();

        // # Drag Over in Konva container
        con.addEventListener(
            "dragover",
            function (e: { preventDefault: () => void }) {
                e.preventDefault(); // !important
            }
        );

        // # Drag in Konva container

        con.addEventListener(
            "drop",
            function (e: { preventDefault: () => void }) {
                e.preventDefault();
                // now we need to find pointer position
                // we can't use stage.getPointerPosition() here, because that event
                // is not registered by Konva.Stage
                // we can register it manually:
                //@ts-ignore
                stage.setPointersPositions(e);

                //@ts-ignore
                Konva.Image.fromURL(
                    itemURL,
                    function (image: {
                        position: (arg0: any) => void;
                        draggable: (arg0: boolean) => void;
                    }) {
                        //@ts-ignore
                        layer.add(image);

                        //@ts-ignore
                        image.position(stage.getPointerPosition());
                        image.draggable(true);
                    }
                );
            }
        );

        return () => {};
    }, []);
    return <></>;
};

export default Woody;
