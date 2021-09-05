import { CSSProperties, memo } from "react";

function SpacerHorizontal({
  inline,
  size,
}: {
  inline?: boolean;
  size?: CSSProperties["width"];
}) {
  const Element = inline ? "span" : "div";

  const style = {
    display: inline ? "inline-block" : "block",
    ...(size !== undefined
      ? {
          width: size,
          minWidth: size,
          maxWidth: size,
        }
      : { flex: 1 }),
  };

  return <Element style={style} />;
}

function SpacerVertical({
  inline,
  size,
}: {
  inline?: boolean;
  size?: CSSProperties["height"];
}) {
  const Element = inline ? "span" : "div";

  const style = {
    display: inline ? "inline-block" : "block",
    ...(size !== undefined
      ? {
          height: size,
          minHeight: size,
          maxHeight: size,
        }
      : { flex: 1 }),
  };

  return <Element style={style} />;
}

export const Spacer = {
  Vertical: memo(SpacerVertical),
  Horizontal: memo(SpacerHorizontal),
};
