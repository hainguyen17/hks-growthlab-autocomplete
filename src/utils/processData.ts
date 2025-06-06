import censusData from "../data/census_classification.json";
import type {
    GeoEntity,
    RegionGeoEntityMap,
    StateGeoEntityMap,
} from "../types/GeoEntity";

export function getGroupedData() {
    const censusDataTyped = censusData as GeoEntity[];
    let groupedData: Record<
        "regionsMetadata" | "statesMetadata" | "countiesMetadata",
        Record<number, GeoEntity>
    > = { regionsMetadata: {}, statesMetadata: {}, countiesMetadata: {} };

    for (let i = 0; i < censusDataTyped.length; i++) {
        if (censusDataTyped[i].level == "region") {
            groupedData.regionsMetadata[censusDataTyped[i].id] =
                censusDataTyped[i];
        } else if (censusDataTyped[i].level == "state") {
            groupedData.statesMetadata[censusDataTyped[i].id] =
                censusDataTyped[i];
        } else if (censusDataTyped[i].level == "county") {
            groupedData.countiesMetadata[censusDataTyped[i].id] =
                censusDataTyped[i];
        }
    }
    return groupedData;
}

const processDataCache: Record<string, any> = {};

export function processData(input?: string) {
    if (processDataCache[String(input)]) {
        return processDataCache[String(input)];
    }

    const { statesMetadata, countiesMetadata } = getGroupedData();

    let data: StateGeoEntityMap = {};
    let regionData: RegionGeoEntityMap = {};

    Object.values(countiesMetadata).forEach((county) => {
        if (
            !input ||
            county.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
        )
            data[county.parent] = [...(data[county.parent] || []), county];
    });

    Object.keys(data).forEach((stateId) => {
        const state = statesMetadata[stateId as any];
        regionData[state.parent] = {
            ...(regionData[state.parent] || {}),
            [state.id]: data[state.id],
        };
    });

    processDataCache[String(input)] = regionData;
    return regionData;
}
