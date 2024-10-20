// eslint-disable-next-line import/no-named-as-default
import Graph from 'graphology';
import { EdgeAttributes } from '../types/graph';
import { Member } from '../types/member';

export type Pair = {
    giver: Member;
    receiver: Member;
};

export type MatchPairsResult = Array<Pair> | 'unsolved';

export const matchPairs = (
    graph: Graph<Member, EdgeAttributes>,
): MatchPairsResult => {
    const startNodeKey = selectRandom(graph.nodes()).value;
    const startMember = graph.getNodeAttributes(startNodeKey);

    let currentMember = startMember;
    while (!solutionFound(graph)) {
        const validNeighborEdges = graph.filterOutEdges(
            currentMember.id,
            (edgeKey) => {
                const edge = graph.getEdgeAttributes(edgeKey);
                if (edge.state !== 'default') {
                    return false;
                }

                const neighbor = graph.getNodeAttributes(graph.target(edgeKey));
                const neighborAvailable = nodeIsAvailableForStep(
                    graph,
                    neighbor.id,
                );

                return (
                    !currentMember.exclusions.includes(neighbor.id) &&
                    neighborAvailable
                );
            },
        );

        // If the node we are on is already "solved" (has a giver and receiver), and the graph is not solved
        // We need to backtrack because we're in a loop missing some nodes
        if (nodeIsPartOfPath(graph, currentMember.id)) {
            currentMember = backTrack(graph, currentMember);
            continue;
        }

        if (validNeighborEdges.length === 0) {
            if (currentMember.id === startMember.id) {
                return 'unsolved';
            }

            currentMember = backTrack(graph, currentMember);
            continue;
        }

        const neighborEdgeKey = selectRandom(validNeighborEdges).value;
        const neighborKey = graph.target(neighborEdgeKey);
        const neighbor = graph.getNodeAttributes(neighborKey);

        graph.setEdgeAttribute(currentMember.id, neighbor.id, 'state', 'path');

        currentMember = neighbor;
    }

    return createPairingsFromGraph(graph);
};

const solutionFound = (graph: Graph<Member, EdgeAttributes>) => {
    // A solution has been found when every node has an incoming + going edge with state 'path' (i.e. every node is part of the path)
    return graph.everyNode((nodeKey) => nodeIsPartOfPath(graph, nodeKey));
};

/**
 * Backtrack from the current member to the previous member
 * Returns the new current member
 **/
const backTrack = (
    graph: Graph<Member, EdgeAttributes>,
    currentMember: Member,
) => {
    const previousEdgeKey = graph.findInEdge(currentMember.id, (edgeKey) => {
        const edge = graph.getEdgeAttributes(edgeKey);
        return edge.state === 'path';
    });

    if (previousEdgeKey === undefined) {
        // This shouldn't happen since we always mark an edge as 'path' when we traverse it
        // And we've already checked if we're at the start node
        throw new Error('Unable to backtrack: no previous edge found');
    }

    // Reset all the out edges of the current member to 'default'
    // So that if a different path can be taken to reach the same node
    graph.forEachOutEdge(currentMember.id, (edgeKey: string) => {
        graph.setEdgeAttribute(edgeKey, 'state', 'default');
    });

    graph.setEdgeAttribute(previousEdgeKey, 'state', 'backtracked');
    const previousMemberKey = graph.source(previousEdgeKey);
    const previousMember = graph.getNodeAttributes(previousMemberKey);

    return previousMember;
};

const createPairingsFromGraph = (graph: Graph<Member, EdgeAttributes>) => {
    const pairings: Array<Pair> = [];
    const nodes = graph.nodes();
    if (nodes.length === 0) {
        return pairings;
    }

    const startNodeKey = nodes[0];

    let currentMember = graph.getNodeAttributes(startNodeKey);
    do {
        const neighborEdgeKey = graph.findOutEdge(
            currentMember.id,
            (edgeKey) => {
                const edge = graph.getEdgeAttributes(edgeKey);
                return edge.state === 'path';
            },
        );

        if (neighborEdgeKey === undefined) {
            break;
        }

        const neighborKey = graph.target(neighborEdgeKey);
        const neighbor = graph.getNodeAttributes(neighborKey);

        pairings.push({ giver: currentMember, receiver: neighbor });

        currentMember = neighbor;
    } while (currentMember.id !== startNodeKey);

    return pairings;
};

const nodeIsAvailableForStep = (
    graph: Graph<Member, EdgeAttributes>,
    nodeKey: string,
) => {
    // The node is available for a step if it does not have any incoming edges with state 'path'
    return !graph.someInEdge(nodeKey, (neighborInEdgeKey) => {
        const edge = graph.getEdgeAttributes(neighborInEdgeKey);
        return edge.state === 'path';
    });
};

const nodeIsPartOfPath = (
    graph: Graph<Member, EdgeAttributes>,
    nodeKey: string,
) => {
    const hasInEdge = graph.someInEdge(nodeKey, (edgeKey) => {
        const edge = graph.getEdgeAttributes(edgeKey);
        return edge.state === 'path';
    });
    const hasOutEdge = graph.someOutEdge(nodeKey, (edgeKey) => {
        const edge = graph.getEdgeAttributes(edgeKey);
        return edge.state === 'path';
    });
    return hasInEdge && hasOutEdge;
};

const randomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

const selectRandom = <T>(array: T[]) => {
    const index = randomInt(array.length);
    return { value: array[index], index };
};
