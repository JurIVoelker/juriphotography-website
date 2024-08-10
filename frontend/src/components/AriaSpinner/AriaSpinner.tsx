import { ProgressBar, type ProgressBarProps } from "react-aria-components";
import styles from "./AriaSpinner.module.scss";
interface AriaSpinnerProps extends ProgressBarProps {
  label?: string;
  size?: number;
}

let center = 16;
let strokeWidth = 5;
let r = 16 - strokeWidth;
let c = 2 * r * Math.PI;

export function AriaSpinner({ label, size = 24, ...props }: AriaSpinnerProps) {
  return (
    <ProgressBar
      aria-label="Loading…"
      value={60}
      {...props}
      className={styles.spinner}
    >
      {({ percentage }) => (
        <>
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            strokeWidth={strokeWidth}
          >
            <circle
              cx={center}
              cy={center}
              r={r}
              stroke="white"
              strokeDasharray={`${c} ${c}`}
              strokeDashoffset={c - (percentage / 100) * c}
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
            />
          </svg>
        </>
      )}
    </ProgressBar>
  );
}
