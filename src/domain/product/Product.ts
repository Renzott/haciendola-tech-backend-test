export interface Product {
    sku: string; // id
    handle: string; // slug
    title: string;
    description: string;
    grams: number;
    stock: number;
    price: number;
    comparePrice: number;
    barcode: string;
}