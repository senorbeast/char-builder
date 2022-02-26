import Konva from "konva";
import React, { useRef, useState, useEffect } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import { useSel, useShapeRef, useTrRef } from "../ContextStore";

interface URLImageProp {
    image: any;
    rkey: number;
    onSelect: any;
}

const URLImage = ({ image, rkey, onSelect }: URLImageProp) => {
    const [img] = useImage(image.src);
    //@ts-ignore
    const handleDragStart = (e) => {
        e.target.setAttrs({
            shadowOffset: {
                x: 15,
                y: 15,
            },
            scaleX: 0.35,
            scaleY: 0.35,
        });
    };
    //@ts-ignore
    const handleDragEnd = (e) => {
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 0.3,
            scaleY: 0.3,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
        });
    };

    //@ts-ignore
    const handleClick = (e) => {
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.EaseOut,
            scaleX: 0,
            scaleY: 0,
        });
    };
    let trRef = useTrRef();
    let isSelected = useSel();
    let shapeRef = useShapeRef();
    // useEffect(() => {
    //     if (isSelected) {
    //         // we need to attach transformer manually
    //         //@ts-ignore
    //         trRef.current.nodes([shapeRef.current]);
    //         //@ts-ignore
    //         trRef.current.getLayer().batchDraw();
    //     }
    // }, [isSelected]);
    // console.log(rkey);
    return (
        <React.Fragment key={rkey}>
            <Image
                image={img}
                x={image.x}
                y={image.y}
                // onClick={onSelect}
                // onTap={onSelect}
                // ref={shapeRef.current}
                // I will use offset to set origin to the center of the image
                offsetX={img ? img.width / 2 : 0}
                offsetY={img ? img.height / 2 : 0}
                draggable
                scaleX={0.3}
                scaleY={0.3}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                // onClick={handleClick}
                // onTransformEnd={(e) => {
                //     // transformer is changing scale of the node
                //     // and NOT its width or height
                //     // but in the store we have only width and height
                //     // to match the data better we will reset scale on transform end
                //     //@ts-ignore
                //     const node = shapeRef.current;
                //     const scaleX = node.scaleX();
                //     const scaleY = node.scaleY();

                //     // we will reset it back
                //     node.scaleX(1);
                //     node.scaleY(1);
                //     // onChange({
                //     //     ...shapeProps,
                //     //     x: node.x(),
                //     //     y: node.y(),
                //     //     // set minimal value
                //     //     width: Math.max(5, node.width() * scaleX),
                //     //     height: Math.max(node.height() * scaleY),
                //     // });
                // }}
            />
            {/* {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )} */}
        </React.Fragment>
    );
};

// const URLImage = ({ src, x, y }: URLImageProps): JSX.Element => {
//     const imageRef = useRef(null);
//     const [image, setImage] = useState(null);

//     const loadImage = () => {
//         const img = new window.Image();
//         img.src = src;
//         img.crossOrigin = "Anonymous";
//         //@ts-ignore
//         imageRef.current = img;
//         //@ts-ignore
//         imageRef.current.addEventListener("load", handleLoad);
//     };

//     const handleLoad = () => {
//         setImage(imageRef.current);
//     };

//     useEffect(() => {
//         loadImage();
//         return () => {
//             if (imageRef.current) {
//                 //@ts-ignore
//                 imageRef.current.removeEventListener("load", handleLoad);
//             }
//         };
//     }, []);

//     useEffect(() => {
//         loadImage();
//     }, [src]);

//     //@ts-ignore
//     return <Image x={x} y={y} image={image} draggable />;
// };

export default URLImage;
