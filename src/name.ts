interface Country {
    country_id: string; 
    probability: number;
}


export interface Name {
    count: number;
    name: string;
    country: Country[];
}