import {
  SpinnerWrapper,
  SpinnerCircle,
} from "@/components/LoadingSpinner/LoadingSpinner.style";

interface LoadingSpinnerProps {
  size?: number;
}

export default function LoadingSpinner({ size = 24 }: LoadingSpinnerProps) {
  return (
    <SpinnerWrapper>
      <SpinnerCircle size={size} />
    </SpinnerWrapper>
  );
}
