import { createGraph } from './create-graph';

describe('create-graph', () => {
    it('should include the members in the graph', () => {
        const members = [
            {
                id: '0',
                name: 'Alice',
                exclusions: [],
            },
            {
                id: '1',
                name: 'Bob',
                exclusions: [],
            },
            {
                id: '2',
                name: 'Charlie',
                exclusions: [],
            },
            {
                id: '3',
                name: 'David',
                exclusions: [],
            },
        ];

        const graph = createGraph(members);

        expect(graph.hasNode(0)).toBe(true);
        expect(graph.hasNode(1)).toBe(true);
        expect(graph.hasNode(2)).toBe(true);
        expect(graph.hasNode(3)).toBe(true);

        expect(graph.getNodeAttributes(0)).toEqual(members[0]);
        expect(graph.getNodeAttributes(1)).toEqual(members[1]);
        expect(graph.getNodeAttributes(2)).toEqual(members[2]);
        expect(graph.getNodeAttributes(3)).toEqual(members[3]);
    });

    it('should add edges between every node in the graph when there are no exclusions', () => {
        const members = [
            {
                id: '0',
                name: 'Alice',
                exclusions: [],
            },
            {
                id: '1',
                name: 'Bob',
                exclusions: [],
            },
            {
                id: '2',
                name: 'Charlie',
                exclusions: [],
            },
            {
                id: '3',
                name: 'David',
                exclusions: [],
            },
        ];

        const graph = createGraph(members);

        members.forEach((member) => {
            members.forEach((otherMember) => {
                if (member.id !== otherMember.id) {
                    expect(
                        graph.hasEdge(member.id, otherMember.id),
                        `Expected a connection between ${member.id} and ${otherMember.id}`,
                    ).toBe(true);
                }
            });
        });
    });

    it('should not add edges between members in the exlusion list', () => {
        const members = [
            {
                id: '0',
                name: 'Alice',
                exclusions: ['1', '2'],
            },
            {
                id: '1',
                name: 'Bob',
                exclusions: ['0', '3'],
            },
            {
                id: '2',
                name: 'Charlie',
                exclusions: [],
            },
            {
                id: '3',
                name: 'David',
                exclusions: [],
            },
        ];

        const graph = createGraph(members);

        expect(graph.hasEdge('0', '1')).toBe(false);
        expect(graph.hasEdge('0', '2')).toBe(false);
        expect(graph.hasEdge('0', '3')).toBe(true);
        expect(graph.hasEdge('1', '0')).toBe(false);
        expect(graph.hasEdge('1', '2')).toBe(true);
        expect(graph.hasEdge('1', '3')).toBe(false);
        expect(graph.hasEdge('2', '0')).toBe(true);
        expect(graph.hasEdge('2', '1')).toBe(true);
        expect(graph.hasEdge('2', '3')).toBe(true);
        expect(graph.hasEdge('3', '0')).toBe(true);
        expect(graph.hasEdge('3', '1')).toBe(true);
        expect(graph.hasEdge('3', '2')).toBe(true);
        expect(graph.hasEdge('3', '3')).toBe(false);
        expect(graph.hasEdge('2', '2')).toBe(false);
    });
});
