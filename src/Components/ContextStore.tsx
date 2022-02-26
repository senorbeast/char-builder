//@ts-nocheck
import React, { useContext, useState, useRef } from "react";

// Create Context gives Provider and Consumer
const StageRefContext = React.createContext(undefined);
const DragUrlRefContext = React.createContext(undefined);

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
    const stageRef = useRef();
    const dragUrl = useRef();

    const [images, setImages] = useState([]);
    const [selectedId, setselectShape] = useState(null);

    const setImg = (src: any) => {
        setImages(src);
    };

    const setSel = (id) => {
        setselectShape(id);
        // console.log("Selected Shape", id);
    };

    return (
        <>
            {/*  Providing Created Context */}
            <StageRefContext.Provider value={stageRef}>
                <DragUrlRefContext.Provider value={dragUrl}>
                    <ImagesContext.Provider value={images}>
                        <SetImagesContext.Provider value={setImg}>
                            <SelectedContext.Provider value={selectedId}>
                                <SetSelectedContext.Provider value={setSel}>
                                    {children}
                                </SetSelectedContext.Provider>
                            </SelectedContext.Provider>
                        </SetImagesContext.Provider>
                    </ImagesContext.Provider>
                </DragUrlRefContext.Provider>
            </StageRefContext.Provider>
        </>
    );
};

export default ContextProvider;
