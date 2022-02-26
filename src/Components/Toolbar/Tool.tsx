import { Paper } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDragUrlRef } from "../ContextStore";
interface ToolsProps {
    imgv?: any;
    svg?: JSX.Element;
    id?: string;
}
/**
 * Pass either img:string or svg:JSX.Element to render
 * @param id: string
 */
//@ts-ignore
const Tool = ({ imgv, svg, id }: ToolsProps) => {
    const dragUrl = useDragUrlRef();
    return (
        <>
            <Paper
                sx={{
                    display: "flex",
                    width: "2em",
                    height: "2em",
                    m: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                }}
            >
                {imgv ? (
                    <img
                        src={imgv}
                        alt="hat"
                        width="100%"
                        draggable="true"
                        onDragStart={(e) => {
                            //@ts-ignore
                            dragUrl.current = e.target.src;
                        }}
                    />
                ) : (
                    <>{svg}</>
                )}
            </Paper>
        </>
    );
};

export default Tool;
