// eslint-disable-next-line import/no-named-as-default
import Graph from 'graphology';
import { Member } from '../types/member';
import { EdgeAttributes } from '../types/graph';

export type Pair = {
    giver: Member;
    receiver: Member;
};

export const matchPairs = (
    graph: Graph<Member, EdgeAttributes>,
): Array<Pair> => {
    const startNodeKey = selectRandom(graph.nodes()).value;
    const startMember = graph.getNodeAttributes(startNodeKey);

    const pairings: Array<Pair> = [];
    return pairings;
};

const randomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

const selectRandom = <T>(array: T[]) => {
    const index = randomInt(array.length);
    return { value: array[index], index };
};
