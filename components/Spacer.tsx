import { memo } from "react";

function SpacerHorizontal({
  inline,
  size,
}: {
  inline?: boolean;
  size?: number;
}) {
  const Element = inline ? "span" : "div";

  const style = {
    display: inline ? "inline-block" : "block",
    ...(size !== undefined ? { "--size": `${size}px` } : { flex: 1 }),
  };

  return <Element className="spacer-horizontal" style={style} />;
}

function SpacerVertical({ inline, size }: { inline?: boolean; size?: number }) {
  const Element = inline ? "span" : "div";

  const style = {
    display: inline ? "inline-block" : "block",
    ...(size !== undefined ? { "--size": `${size}px` } : { flex: 1 }),
  };

  return <Element className="spacer-vertical" style={style} />;
}

export const Spacer = {
  Vertical: memo(SpacerVertical),
  Horizontal: memo(SpacerHorizontal),
};
