import React, { FunctionComponent } from 'react';

interface ColorPaletteProps {
  colorList: { centroids: number[][] }
}

const ColorPalette: FunctionComponent<ColorPaletteProps> = ({ colorList }) => {
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0));
          break;
        case g:
          h = ((b - r) / d + 2);
          break;
        case b:
          h = ((r - g) / d + 4);
          break;
      }
      h /= 6;
    }

    return { h, s, l };
  };

  const rgba = (r: number, g: number, b: number, a: number) => `rgba(${r}, ${g}, ${b}, ${a})`;

  const colorData = colorList?.centroids?.map((color) => {
    const [r, g, b] = color;
    const hsl = rgbToHsl(r, g, b);
    return { color, hsl };
  });

  const sortedColors = colorData?.sort((a, b) => {
    return a.hsl.l - b.hsl.l;
    if (a.hsl.s !== b.hsl.s) return a.hsl.s - b.hsl.s;
    if (a.hsl.h !== b.hsl.h) return a.hsl.h - b.hsl.h;
  });

  const swatch = sortedColors?.map((item, index) =>
    <div
      key={index}
      style={{
        backgroundColor: rgba(item.color[0], item.color[1], item.color[2], 1),
        width: '125px',
        height: '125px',
        display: 'inline-block',
        margin: '0.5px'
      }}
    ></div>
  );

  return (
    <div>{swatch}</div>
  );
};

export default ColorPalette;