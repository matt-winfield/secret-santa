export type Member = {
    id: string;
    name: string;
    /** List of member IDs that this member cannot be paired with */
    exclusions: string[];
};
