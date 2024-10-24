import { BasicPlastic } from './form';

export type getPlasticType = {
  id: number;
  incineration_percent: number;
  incineration_step: number;
  manufacture_step: number;
  plastic_type: Omit<BasicPlastic, 'NONE'>;
  raw_material_step: number;
  recycle_percent: number;
  recycle_step: number;
  transport_step: number;
  updated_at: string;
};
}