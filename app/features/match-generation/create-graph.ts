import { EdgeAttributes } from '../types/graph';
import { Member } from '../types/member';
import type { Graph } from 'graphology';
import graphology from 'graphology';
const { DirectedGraph } = graphology;

export const createGraph = (
    members: Member[],
): Graph<Member, EdgeAttributes> => {
    const graph = new DirectedGraph<Member, EdgeAttributes>();
    addNodes(graph, members);
    addEdges(graph, members);
    return graph;
};

const addNodes = (graph: Graph<Member, EdgeAttributes>, members: Member[]) => {
    members.forEach((member) => {
        graph.addNode(member.id, member);
    });
};

const addEdges = (graph: Graph<Member, EdgeAttributes>, members: Member[]) => {
    members.forEach((member) => {
        members.forEach((otherMember) => {
            if (
                member.id !== otherMember.id &&
                !member.exclusions.includes(otherMember.id)
            ) {
                graph.addEdge(member.id, otherMember.id, { state: 'default' });
            }
        });
    });
};
