//@ts-nocheck
import Konva from "konva";
import { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

interface URLImageProp {
    imageProps: any;
    onSelect: any;
    isSelected: Boolean; // True if slected
    onChange: any; // Change Attrs after transfrom
}

const URLImage = ({
    imageProps,
    isSelected,
    onSelect,
    onChange,
}: URLImageProp) => {
    const [img] = useImage(imageProps.src);
    let trRef = useRef();
    let shapeRef = useRef();

    // Fxn for event change
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
        // console.log("ShapeRef", shapeRef);
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

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            //@ts-ignore
            trRef.current.nodes([shapeRef.current]);
            //@ts-ignore
            // console.log("shapeRef.current", shapeRef.current); //@ts-ignore
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
    return (
        <>
            <Image
                image={img}
                x={imageProps.x}
                y={imageProps.y}
                ref={shapeRef}
                onClick={onSelect}
                onTap={onSelect}
                // width={imageProps.width}
                // height={imageProps.height}
                // I will use offset to set origin to the center of the image
                offsetX={img ? img.width / 2 : 0}
                offsetY={img ? img.height / 2 : 0}
                draggable
                // set attrs here
                scaleX={0.3}
                scaleY={0.3}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                // onClick={handleClick}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    //@ts-ignore
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    console.log(e);
                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        src: imageProps.src,
                        x: node.x(),
                        y: node.y(),
                    });
                }}
            />
            {isSelected && (
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
            )}
        </>
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
