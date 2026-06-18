"use client";

import { CSSProperties, useMemo } from "react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: "chars" | "words";
  from?: Record<string, number>;
  to?: Record<string, number>;
  textAlign?: "left" | "center" | "right";
  tag?: "p" | "h1" | "h2" | "h3" | "span";
};

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  splitType = "chars",
  textAlign = "center",
  tag = "p",
}: Props) {
  const pieces = useMemo(
    () => (splitType === "words" ? text.split(" ") : text.split("")),
    [splitType, text],
  );
  const Tag = tag;

  return (
    <Tag
      className={className}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
      }}
    >
      {pieces.map((piece, index) => {
        if (piece === "\n") {
          return <br key={`break-${index}`} />;
        }

        const style: CSSProperties = {
          animation: `fadeIn ${duration}s ease-out both`,
          animationDelay: `${(delay / 1000) * index}s`,
        };

        return (
          <span
            key={`${piece}-${index}`}
            style={style}
            className="inline-block will-change-transform will-change-opacity"
          >
            {piece}
            {splitType === "words" ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}
