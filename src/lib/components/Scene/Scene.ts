import type { XYColor } from '$lib/components/Light/Light';

export enum SceneEffect {
  sparkle = 'sparkle',
  fire = 'fire',
  candle = 'candle',
  no_effect = 'no_effect'
}

export enum SceneMode {
  interpolatedPalette = 'interpolated_palette',
  interpolatedPaletteMirrored = 'interpolated_palette_mirrored',
  randomPixelated = 'random_pixelated'
}

export interface Resource {
  rid: string;
  rtype: string;
}

export interface SceneAction {
  target: Resource;
  action: {
    on: {
      on: boolean;
    };
    dimming: {
      brightness: number;
    };
    color: XYColor;
    color_temperature: {
      mirek: number;
    };
    gradient: {
      points: { color: XYColor }[];
      mode: SceneMode;
    };
    effects: {
      effect: SceneEffect;
    };
    dynamics: {
      duration: number;
    };
  };
}

export interface Scene {
  id: string;
  name: string;
  image: Resource;
  group: Resource;
  pallet: {
    color: {
      color: XYColor;
      dimming: {
        brightness: number;
      };
    }
    dimming: {
      brightness: number;
    }[];
    colorTemperature: {
      colorTemperature: {
        mirek: number;
      };
      dimming: {
        brightness: number;
      };
    }[];
  }[] | null;
  speed: number;
  autoDynamic: boolean
  
  type: string;
  actions: SceneAction[];
  color: XYColor;
  on: boolean;
  dimming: {
    brightness: number;
    minDimLevel: number;
  };
}
