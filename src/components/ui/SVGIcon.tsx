export const SVGIcon = ({
  className,
  fill,
  width = 20,
  path,
  style,
  ...props
}: {
  className?: string;
  fill?: string;
  path: string;
  width?: number;
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div style={{ ...style, width }} {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className={className}
      style={{ fill }}
      viewBox="0 0 256 256"
    >
      <path d={path} />
    </svg>
  </div>
);

// https://phosphoricons.com/
SVGIcon.paths = {
  home: "M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H52V121.65l76-76,76,76Z",
};
