export interface TimeTransact {
    month: string;
    year: string;
}

export interface InfoTransact {
    time: string;
    wallet: string;
    note?: string;
    price: number;
    category: string;
}

export interface InfoUpdateTransact {
    time?: string;
    wallet?: string;
    note?: string;
    price?: number;
    category?: string;
}
