import "./Skeleton.css";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = "" }: SkeletonProps) => {
  return <div className={`skeleton ${className}`} />;
};

export default Skeleton;
