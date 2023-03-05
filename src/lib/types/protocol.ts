export type GroupAction = {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: [number, number];
  ct: number;
  alert: string;
  colormode: string;
}

export type GroupRow = {
  id: string;
  name: string;
  lights: string[];
  type: string;
  action: GroupAction;
}

export type Groups = {
  all: GroupRow[];
  rooms: GroupRow[];
  zones: GroupRow[];
  luminaires: GroupRow[];
  lightSources: GroupRow[];
  lightGroups: GroupRow[];
  entertainment: GroupRow[];
};
