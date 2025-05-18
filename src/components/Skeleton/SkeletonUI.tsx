import { Skeleton } from '@mui/material'
import React from 'react'

const SkeletonUI = () => {
  return (
    <div>
        <Skeleton variant="rectangular" width={250} height={250} />
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} />
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} width={80} />
        <Skeleton variant="rounded" width={120} height={30} />
    </div>
  )
}

export default SkeletonUI