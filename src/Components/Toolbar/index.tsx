import { Box, Paper } from "@mui/material";
import hat from "../images/hat.png";
import holster from "../images/holster.png";
import { indigo } from "@mui/material/colors";
import Tool from "./Tool";
import { ReactComponent as Battery } from "../images/battery.svg";

//@ts-ignore
const Toolbar = () => {
    return (
        <>
            <Box
                id="drag-items"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "flex",
                    flexDirection: "column",
                    m: 2,
                    bgcolor: indigo[200],
                    borderRadius: 1,
                }}
            >
                <Tool imgv={holster} id="holster"></Tool>
                <Tool imgv={hat} id="hat"></Tool>
                {/* <Tool svg={<Battery />} id="battery"></Tool> */}
            </Box>
        </>
    );
};

export default Toolbar;
