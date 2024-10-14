import { EdgeAttributes } from '../types/graph';
import { Member } from '../types/member';
// eslint-disable-next-line import/no-named-as-default
import Graph, { MultiDirectedGraph } from 'graphology';

export const createGraph = (
    members: Member[],
): Graph<Member, EdgeAttributes> => {
    const graph = new MultiDirectedGraph<Member, EdgeAttributes>();
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
