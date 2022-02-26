//@ts-nocheck
import React, { useContext, useState, useRef } from "react";

// Create Context gives Provider and Consumer
const StageRefContext = React.createContext(undefined);
const DragUrlRefContext = React.createContext(undefined);
const ShapeRefContext = React.createContext(undefined);
const TrRefContext = React.createContext(undefined);

const ImagesContext = React.createContext(undefined);
const SetImagesContext = React.createContext((_arg0: boolean): void => {});
const SelectedContext = React.createContext(undefined);
const SetSelectedContext = React.createContext((_arg0: string): void => {});

// Export Hooks to access the Store ( Consuming )
// Easier to Consume
export function useStageRef() {
    return useContext(StageRefContext);
}
export function useDragUrlRef() {
    return useContext(DragUrlRefContext);
}

export function useShapeRef() {
    return useContext(ShapeRefContext);
}

export function useTrRef() {
    return useContext(TrRefContext);
}
export function useSel() {
    return useContext(SelectedContext);
}
export function useSetSel() {
    return useContext(SetSelectedContext);
}
export function useImages() {
    return useContext(ImagesContext);
}

export function useSetImages() {
    return useContext(SetImagesContext);
}

const ContextProvider = ({ children }: any) => {
    const stageRef = useRef(null);
    const dragUrl = useRef();
    const shapeRef = useRef();
    const trRef = useRef();

    const [images, setImages] = useState([]);
    const [selectedId, setselectShape] = useState(null);

    const setImg = (src: any) => {
        setImages(src);
    };

    const setSel = (id) => {
        setselectShape(id);
    };

    return (
        <>
            {/*  Providing Created Context */}
            <StageRefContext.Provider value={stageRef}>
                <DragUrlRefContext.Provider value={dragUrl}>
                    <ShapeRefContext.Provider value={shapeRef}>
                        <TrRefContext.Provider value={trRef}>
                            <ImagesContext.Provider value={images}>
                                <SetImagesContext.Provider value={setImg}>
                                    <SelectedContext.Provider
                                        value={selectedId}
                                    >
                                        <SetSelectedContext.Provider
                                            value={setSel}
                                        >
                                            {children}
                                        </SetSelectedContext.Provider>
                                    </SelectedContext.Provider>
                                </SetImagesContext.Provider>
                            </ImagesContext.Provider>
                        </TrRefContext.Provider>
                    </ShapeRefContext.Provider>
                </DragUrlRefContext.Provider>
            </StageRefContext.Provider>
        </>
    );
};

export default ContextProvider;
