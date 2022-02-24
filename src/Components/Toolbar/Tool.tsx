import { Paper } from "@mui/material";

interface ToolsProps {
    img?: string;
    svg?: JSX.Element;
    id?: string;
}
/**
 * Pass either img:string or svg:JSX.Element to render
 * @param id: string
 */
//@ts-ignore
const Tool = ({ img, svg, id }: ToolsProps) => {
    //@ts-ignore
    const dragStart = (e) => {
        //@ts-ignore
        const target = e.target;
        //@ts-ignore
        e.dataTransfer.setData("obj_id", target.id);
        console.log(target.id);
    };

    //@ts-ignore
    const dragOver = (e) => {
        //@ts-ignore
        e.stopPropagation();
    };

    return (
        <>
            <Paper
                id={id}
                onDragStart={dragStart}
                onDragOver={dragOver}
                draggable={true}
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
                {img ? (
                    <img src={img} alt="hat" width="100%" draggable="false" />
                ) : (
                    <>{svg}</>
                )}
            </Paper>
        </>
    );
};

export default Tool;
