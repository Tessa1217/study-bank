import {
  getInputClasses,
  type BasicInputProps,
} from "@/components/input/input-styles";
import { forwardRef, type ChangeEvent } from "react";

interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BasicInputProps {
  onSelected?: (files: FileList) => void;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ inputWidth, inputSize, variant, disabled, onSelected, ...props }, ref) => {
    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onSelected?.(e.target.files);
        e.target.value = "";
      }
    };

    const inputClass = getInputClasses({
      inputWidth,
      inputSize,
      variant,
      disabled,
    });

    return (
      <input
        type="file"
        ref={ref}
        onChange={onFileChange}
        className={inputClass}
        {...props}
      />
    );
  }
);

export default FileInput;
