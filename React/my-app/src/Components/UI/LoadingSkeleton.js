import React from 'react';
import { Skeleton } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.css';

function LoadingSkeleton() {
    const style = {
        bgcolor: 'rgb(237 235 235 / 11%)',
        borderRadius: '20px',
        marginBottom: '20px',
        padding: '0px'
    }
    const smallSkeleton = <Skeleton variant="rounded" height={55} width={150} sx={style} />;
    const skeletonView = <Skeleton variant="rounded" height={130} sx={style} />;

    return (
        <span>
            <div className='d-flex justify-content-between'>
                {smallSkeleton}
                <div className='d-flex'>
                    <span className='me-2'>
                        {smallSkeleton}
                    </span>
                    {smallSkeleton}
                </div>
            </div>
            {skeletonView}
            {skeletonView}
            {skeletonView}
            {skeletonView}
            {skeletonView}
            {skeletonView}
            <div className='d-flex justify-content-end'>
                {smallSkeleton}
            </div>
        </span>
    );
}

export default React.memo(LoadingSkeleton);