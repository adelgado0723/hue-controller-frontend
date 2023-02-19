export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export const enum AlertType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export type UpdateLightRequest = {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: [number, number]; // -0.5 to 0.5
  ct: number;
  alert: 'none' | 'select' | 'lselect';
  transitiontime: number;
  bri_inc: number; // -254 to 254
  sat_inc: number; // -254 to 254
  hue_inc: number; // -65534 to 65534
  ct_inc: number; // -65534 to 65534
  xy_inc: [number, number]; // -0.5 to 0.5

}

export type HueScene = {
  name: string;
  lights?: string[];
  recycle?: boolean;
  appdata?: {
    version?: number;
    data?: string;
  };
  lightstates?: {
    [lightId: string]: {
      on: boolean;
      bri: number;
      xy: [number, number];
      effect?: string;
    };
  };
  type: string;
};

export type HueLightState = {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: [number, number];
  ct: number;
  alert: string;
  colormode: string;
  mode: string;
  reachable: boolean;
};

export type HueLightSWUpdate = {
  state: string;
  lastinstall: string;
};

export type HueLightControl = {
  mindimlevel: number;
  maxlumen: number;
  colorgamuttype: string;
  colorgamut: [number, number][];
  ct: {
    min: number;
    max: number;
  };
};

export type HueLightStreaming = {
  renderer: boolean;
  proxy: boolean;
};

export type HueLightCapabilities = {
  certified: boolean;
  control: HueLightControl;
  streaming: HueLightStreaming;
};

export type HueLightConfig = {
  archetype: string;
  function: string;
  direction: string;
};

export type HueLight = {
  state: HueLightState;
  swUpdate: HueLightSWUpdate;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: HueLightCapabilities;
  config: HueLightConfig;
  uniqueid: string;
  swVersion: string;
};

export type HueLights = {
  [id: string]: HueLight;
};

