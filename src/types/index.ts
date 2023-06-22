
export interface HeroInterface {
    id: number;
    name: string;
    description?: string,
    thumbnail: {
        path: string;
        extension: string;
    };
}

export type HeroesType = HeroInterface[];