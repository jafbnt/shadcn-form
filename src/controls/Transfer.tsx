import type React from "react";
import { useMemo, useState } from "react";
import { cn } from "../utils/cn";

export type TransferItem = {
  key: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};

export type TransferProps = {
  className?: string;
  dataSource: TransferItem[];
  targetKeys?: string[];
  onChange?: (targetKeys: string[], direction: "left" | "right", moveKeys: string[]) => void;
  disabled?: boolean;
};

function splitItems(dataSource: TransferItem[], targetKeys: string[]) {
  const targetKeySet = new Set(targetKeys);
  const source: TransferItem[] = [];
  const target: TransferItem[] = [];

  for (const item of dataSource) {
    if (targetKeySet.has(item.key)) {
      target.push(item);
    } else {
      source.push(item);
    }
  }

  return { source, target };
}

export function Transfer({
  className,
  dataSource,
  targetKeys = [],
  onChange,
  disabled,
}: TransferProps) {
  const { source, target } = useMemo(() => splitItems(dataSource, targetKeys), [dataSource, targetKeys]);
  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<string[]>([]);

  const moveToRight = () => {
    const moveKeys = source
      .filter((item) => selectedSource.includes(item.key) && !item.disabled)
      .map((item) => item.key);
    if (moveKeys.length === 0) {
      return;
    }

    onChange?.([...targetKeys, ...moveKeys], "right", moveKeys);
    setSelectedSource([]);
  };

  const moveToLeft = () => {
    const moveKeySet = new Set(
      target.filter((item) => selectedTarget.includes(item.key) && !item.disabled).map((item) => item.key),
    );

    if (moveKeySet.size === 0) {
      return;
    }

    onChange?.(
      targetKeys.filter((key) => !moveKeySet.has(key)),
      "left",
      Array.from(moveKeySet),
    );
    setSelectedTarget([]);
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <select
        multiple
        disabled={disabled}
        className="h-40 min-w-52 rounded-md border border-input bg-background p-2 text-sm"
        value={selectedSource}
        onChange={(event) => {
          setSelectedSource(Array.from(event.target.selectedOptions).map((opt) => opt.value));
        }}
      >
        {source.map((item) => (
          <option key={item.key} value={item.key} disabled={item.disabled}>
            {item.title}
          </option>
        ))}
      </select>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          disabled={disabled || selectedSource.length === 0}
          className="rounded-md border border-input px-3 py-1 text-sm disabled:opacity-50"
          onClick={moveToRight}
        >
          &gt;
        </button>
        <button
          type="button"
          disabled={disabled || selectedTarget.length === 0}
          className="rounded-md border border-input px-3 py-1 text-sm disabled:opacity-50"
          onClick={moveToLeft}
        >
          &lt;
        </button>
      </div>

      <select
        multiple
        disabled={disabled}
        className="h-40 min-w-52 rounded-md border border-input bg-background p-2 text-sm"
        value={selectedTarget}
        onChange={(event) => {
          setSelectedTarget(Array.from(event.target.selectedOptions).map((opt) => opt.value));
        }}
      >
        {target.map((item) => (
          <option key={item.key} value={item.key} disabled={item.disabled}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}
