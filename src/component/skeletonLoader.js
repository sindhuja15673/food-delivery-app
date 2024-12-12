import React from 'react';
import './skeletonLoader.css'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoading = () => {
  return (
    <div className="food-item-skeleton">
      {/* Skeleton for image */}
      <Skeleton height={200} width={200} />
      {/* Skeleton for text */}
      <Skeleton height={20} width={150} style={{ marginTop: 10 }} />
      <Skeleton height={20} width={100} style={{ marginTop: 5 }} />
      <Skeleton height={30} width={80} style={{ marginTop: 10 }} />
    </div>
  );
};

export default SkeletonLoading;
