export type InfoUpdateUser = {
    email?: string;
    password?: string;
};

export type TimeTransact = {
    month: string;
    year: string;
};

export type InfoTransact = {
    time: string;
    wallet: string;
    note?: string;
    price: number;
    category: string;
};

export type InfoUpdateTransact = {
    time?: string;
    wallet?: string;
    note?: string;
    price?: number;
    category?: string;
};
