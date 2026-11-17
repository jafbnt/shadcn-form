import type React from "react";
import { cn } from "../utils/cn";

export type UploadFile = {
  uid: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  originFileObj: File;
};

export type UploadChangeParam = {
  file: UploadFile;
  fileList: UploadFile[];
  event?: Event;
};

export type UploadProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
  className?: string;
  fileList?: UploadFile[];
  onChange?: (info: UploadChangeParam) => void;
  multiple?: boolean;
};

function mapFile(file: File): UploadFile {
  return {
    uid: `${file.name}-${file.lastModified}`,
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    originFileObj: file,
  };
}

export function Upload({ className, fileList, onChange, multiple, ...props }: UploadProps) {
  return (
    <input
      type="file"
      className={cn("block w-full text-sm", className)}
      multiple={multiple}
      onChange={(event) => {
        const files = Array.from(event.target.files ?? []);
        if (files.length === 0) {
          return;
        }

        const nextList = files.map(mapFile);
        const merged = fileList ? [...fileList, ...nextList] : nextList;
        onChange?.({
          file: nextList[0],
          fileList: merged,
          event: event.nativeEvent,
        });
      }}
      {...props}
    />
  );
}

export type UploadDraggerProps = UploadProps & {
  children?: React.ReactNode;
};

export function UploadDragger({ className, children, ...props }: UploadDraggerProps) {
  return (
    <label
      className={cn(
        "flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input p-6 text-sm text-muted-foreground",
        className,
      )}
    >
      <Upload {...props} className="hidden" />
      {children ?? "Clique ou arraste arquivos para enviar"}
    </label>
  );
}

type UploadComponent = typeof Upload & {
  Dragger: typeof UploadDragger;
};

export const UploadWithDragger = Object.assign(Upload, {
  Dragger: UploadDragger,
}) as UploadComponent;
