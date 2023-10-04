import { ReactNode } from 'react';
import { skeletonStyle } from '@/components/Skeleton/skeletonStyle';
import { Skeleton } from 'primereact/skeleton';

interface SkeletonComponentProps {
  height?: string;
  width?: string;
  children?: ReactNode;
  className?: string;
}
function SkeletonComponent(props: SkeletonComponentProps) {
  const { height, children, width, className } = props;
  return (
    <Skeleton
      pt={skeletonStyle}
      height={height}
      width={width}
      className={className}
    >
      {children}
    </Skeleton>
  );
}

export default SkeletonComponent;
