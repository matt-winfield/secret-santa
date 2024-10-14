import { createGraph } from './create-graph';
import { matchPairs } from './match-pairs';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
const originalMath = global.Math;

describe('match-pairs', () => {
    beforeEach(() => {
        global.Math = mockMath;
    });

    afterEach(() => {
        global.Math = originalMath;
    });

    it('should mock Math.random to always return 0.5', () => {
        // Sanity check that Math.random is mocked so we don't have unstable tests
        expect(Math.random()).toBe(0.5);
    });

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

        expect(pairings).toHaveLength(2);
        expect(pairings).toContainEqual({
            giver: members[0],
            receiver: members[1],
        });
        expect(pairings).toContainEqual({
            giver: members[1],
            receiver: members[0],
        });
    });

    it('should return unsolved if loop is not possible because of exclusions', () => {
        const members = [
            {
                id: '0',
                name: 'Alice',
                exclusions: ['1'],
            },
            {
                id: '1',
                name: 'Bob',
                exclusions: [],
            },
        ];

        const graph = createGraph(members);

        const result = matchPairs(graph);

        expect(result).toBe('unsolved');
    });
});
