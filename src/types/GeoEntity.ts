export interface GeoEntity {
    id: number;
    name: string;
    level: string;
    parent: number;
}

export type StateGeoEntityMap = Record<number, GeoEntity[]>;

export type RegionGeoEntityMap = Record<number, StateGeoEntityMap>;
