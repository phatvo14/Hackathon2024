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
  cards:
    "M180,72H36A20,20,0,0,0,16,92V204a20,20,0,0,0,20,20H180a20,20,0,0,0,20-20V92A20,20,0,0,0,180,72Zm-4,128H40V96H176ZM240,52V176a12,12,0,0,1-24,0V56H64a12,12,0,0,1,0-24H220A20,20,0,0,1,240,52Z",
  paperPlaneTilt:
    "M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3.06,37.25L99,157l40.71,83.65a19.81,19.81,0,0,0,18,11.38c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM156.91,221.07l-34.37-70.64,46-45.95a12,12,0,0,0-17-17l-46,46L34.93,99.09,210,46Z",
};
