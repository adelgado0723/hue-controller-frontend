export interface Light {
  id: string;
  name: string;
  type: string;
  color: XYColor;
  on: boolean;
  dimming: {
    brightness: number;
    minDimLevel: number;
  }
}
export interface XYColor {
  xy: {
    x: number;
    y: number;
  };
}

