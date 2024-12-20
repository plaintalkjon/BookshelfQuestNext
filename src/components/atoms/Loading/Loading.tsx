import { LoadingProps } from "./Loading.types";
import "./Loading.css";
import { Image } from "@/components/atoms/Image";

export const Loading = ({
  size = "medium",
  className = "",
}: LoadingProps) => {
  return (
    <div className={`loading-container ${size} ${className}`}>
      <Image
        src="/img/loading.svg"
        alt="Loading..."
        className="loading-spinner"
        variant="small"
      />
    </div>
  );
};
