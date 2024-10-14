// eslint-disable-next-line import/no-named-as-default
import Graph from 'graphology';
import { EdgeAttributes } from '../types/graph';
import { Member } from '../types/member';

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
    while (!solutionFound(graph)) {
        const validNeighborEdges = graph.filterOutEdges(
            currentMember.id,
            (edgeKey) => {
                const neighbor = graph.getNodeAttributes(graph.target(edgeKey));
                const neighborAlreadyPaired = graph.someInEdge(
                    neighbor.id,
                    (neighborInEdgeKey) => {
                        const edge = graph.getEdgeAttributes(neighborInEdgeKey);
                        return edge.state === 'path';
                    },
                );
                return (
                    !currentMember.exclusions.includes(neighbor.id) &&
                    !neighborAlreadyPaired
                );
            },
        );

        if (validNeighborEdges.length === 0) {
            return 'unsolved';
        }

        const neighborEdgeKey = selectRandom(validNeighborEdges).value;
        const neighborKey = graph.target(neighborEdgeKey);
        const neighbor = graph.getNodeAttributes(neighborKey);

        graph.setEdgeAttribute(currentMember.id, neighbor.id, 'state', 'path');
        pairings.push({ giver: currentMember, receiver: neighbor });

        currentMember = neighbor;
    }

    return pairings;
};

const solutionFound = (graph: Graph<Member, EdgeAttributes>) => {
    // A solution has been found when every node has an incoming + going edge with state 'path' (i.e. every node is part of the path)
    return graph.everyNode((nodeKey) => {
        const hasInput = graph.someInEdge(nodeKey, (edgeKey) => {
            const edge = graph.getEdgeAttributes(edgeKey);
            return edge.state === 'path';
        });

        const hasOutput = graph.someOutEdge(nodeKey, (edgeKey) => {
            const edge = graph.getEdgeAttributes(edgeKey);
            return edge.state === 'path';
        });

        return hasInput && hasOutput;
    });
};

const randomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

const selectRandom = <T>(array: T[]) => {
    const index = randomInt(array.length);
    return { value: array[index], index };
};
