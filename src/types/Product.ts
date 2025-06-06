import mapMetadata from "../data/mapMetadata.json";

export interface Product {
    productId: string;
    productName: string;
    productCode: string;
    productSector: {
        productId: string;
    };
}

export type ProductId = keyof typeof mapMetadata;

export interface ProductNode {
    productId?: string;
    id?: string;
    x?: number;
    y?: number;
    fx?: number;
    fy?: number;
    hover?: boolean;
}

export interface ProductEdge {
    source: string;
    target: string;
}
