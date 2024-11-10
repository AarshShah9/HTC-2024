import { Org } from "./org";

export type Disaster = {
  lat: number;
  lng: number;
  name: string;
  summary: string;
  countryIso: string;
  disasterType: string;
  orgs: Org[];
};
