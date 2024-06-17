import { Skeleton } from "@mui/material";

function SkeletonView(props) {
    return <Skeleton
        variant="rounded"
        height={props.height}
        width={props.width}
        sx={{
            bgcolor: 'rgb(237 235 235 / 11%)',
            borderRadius: '20px',
            marginBottom: '20px',
            padding: '0px'
        }}
        children={props.children}
    />;
}

export default SkeletonView;