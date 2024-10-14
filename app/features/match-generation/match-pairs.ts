// eslint-disable-next-line import/no-named-as-default
import Graph from 'graphology';
import { Member } from '../types/member';
import { EdgeAttributes } from '../types/graph';

export type Pair = {
    giver: Member;
    receiver: Member;
};

type MatchPairsResult = Array<Pair> | 'unsolved';

export const matchPairs = (
    graph: Graph<Member, EdgeAttributes>,
): MatchPairsResult => {
    const startNodeKey = selectRandom(graph.nodes()).value;
    const startMember = graph.getNodeAttributes(startNodeKey);

    const pairings: Array<Pair> = [];
    let currentMember = startMember;
    while (pairings.length < graph.order) {
        const neighbors = graph.filterOutNeighbors(currentMember.id, (key) => {
            const neighbor = graph.getNodeAttributes(key);
            return !currentMember.exclusions.includes(neighbor.id);
        });

        if (neighbors.length === 0) {
            return 'unsolved';
        }

        const neighborKey = selectRandom(neighbors).value;
        const neighbor = graph.getNodeAttributes(neighborKey);

        graph.setEdgeAttribute(currentMember.id, neighbor.id, 'state', 'path');
        pairings.push({ giver: currentMember, receiver: neighbor });

        currentMember = neighbor;
    }

    return pairings;
};

const randomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

const selectRandom = <T>(array: T[]) => {
    const index = randomInt(array.length);
    return { value: array[index], index };
};
