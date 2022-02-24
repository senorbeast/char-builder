import { useRef, useState, useEffect } from "react";
import { Image } from "react-konva";
interface URLImageProps {
    src: string;
    x: number;
    y: number;
}

const URLImage = ({ src, x, y }: URLImageProps): JSX.Element => {
    const imageRef = useRef(null);
    const [image, setImage] = useState(null);

    const loadImage = () => {
        const img = new window.Image();
        img.src = src;
        img.crossOrigin = "Anonymous";
        //@ts-ignore
        imageRef.current = img;
        //@ts-ignore
        imageRef.current.addEventListener("load", handleLoad);
    };

    const handleLoad = () => {
        setImage(imageRef.current);
    };

    useEffect(() => {
        loadImage();
        return () => {
            if (imageRef.current) {
                //@ts-ignore
                imageRef.current.removeEventListener("load", handleLoad);
            }
        };
    }, []);

    useEffect(() => {
        loadImage();
    }, [src]);

    //@ts-ignore
    return <Image x={x} y={y} image={image} draggable />;
};

export default URLImage;
