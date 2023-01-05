export interface Light {
  id: string;
  name: string;
  type: string;
  color: {
    xy: {
      x: number;
      y: number;
    };
  };
  on: boolean;
  dimming: {
    brightness: number;
    minDimLevel: number;
  }
}
