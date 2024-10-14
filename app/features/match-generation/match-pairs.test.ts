import { createGraph } from './create-graph';
import { matchPairs } from './match-pairs';

describe('match-pairs', () => {
    it('should make a simple loop with 2 members', () => {
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
        ];

        const graph = createGraph(members);

        const pairings = matchPairs(graph);

        expect(pairings).toEqual([
            { giver: members[0], receiver: members[1] },
            { giver: members[1], receiver: members[0] },
        ]);
    });
});
