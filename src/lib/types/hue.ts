export type HueUpdateLightRequest = {
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
};

export type HueScene = {
  name: string;
  image: string;
  group: string;
  owner?: string;
  locked?: boolean;
  recycle?: boolean;
  lastupdated?: Date;
  version?: number;
  lights?: string[];
  appdata?: {
    version?: number;
    data?: string;
  };
  lightstates?: {
    [lightId: string]: Partial<HueLightState>;
  };
  type: string;
};

export type HueScenes = {
  [id: string]: HueScene;
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

export type HueGroupAction = {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: [number, number];
  ct: number;
  alert: string;
  colormode: string;
};

export type HueGroupType =
  | 'LightGroup'
  | 'Room'
  | 'Entertainment'
  | 'Zone'
  | 'Luminaire'
  | 'LightSource'
  | '0';

export type HueGroup = {
  name: string;
  lights: string[];
  type: HueGroupType;
  action: HueGroupAction;
};

export type HueGroups = {
  [id: string]: HueGroup;
};

export type HueUpdateGroupRequest = {
  on?: boolean;
  bri?: number;
  hue?: number;
  sat?: number;
  xy?: [number, number];
  ct?: number;
  alert?: 'none' | 'select' | 'lselect';
  effect?: 'none' | 'colorloop';
  colormode?: 'hs' | 'xy' | 'ct';
  transitiontime?: number; // defaults to 4 (400ms)
  bri_inc?: number; // -254 to 254
  sat_inc?: number; // -254 to 254
  hue_inc?: number; // -65534 to 65534
  ct_inc?: number; // -65534 to -65534
  xy_inc?: [number, number]; // -0.5 to 0.5
  scene?: string; // scene id
};

export type HueUpdateGroupResponse = [
  success: {
    address: string;
    value: any;
  },
];

export type HueError = {
  type: number;
  address: string;
  description: string;
};
