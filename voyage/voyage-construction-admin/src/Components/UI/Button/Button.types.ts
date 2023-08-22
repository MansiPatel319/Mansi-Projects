import { MouseEventHandler } from "react";

export interface ButtonProps {
  buttonLabel?: string | any;
  buttonIcon?: any;
  varient?: string;
  disabled?: boolean;
  size?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  className: string;
}
