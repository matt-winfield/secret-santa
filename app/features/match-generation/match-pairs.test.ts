import { Member } from '../types/member';
import { createGraph } from './create-graph';
import { MatchPairsResult, matchPairs } from './match-pairs';

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

    it('should make a loop with 3 members', () => {
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
        ];

        const graph = createGraph(members);

        const result = matchPairs(graph);

        assertValidSolution(members, result);
    });

    const assertValidSolution = (
        members: Array<Member>,
        pairings: MatchPairsResult,
    ) => {
        expect(pairings, 'Pairings should be solved').not.toBe('unsolved');
        if (pairings === 'unsolved') {
            return;
        }

        for (const member of members) {
            const givingPair = pairings.find((pair) => pair.giver === member);
            const receivingPair = pairings.find(
                (pair) => pair.receiver === member,
            );

            expect(
                givingPair,
                `Member ${member.id} (${member.name}) should be giving a gift`,
            ).toBeDefined();
            expect(
                receivingPair,
                `Member ${member.id} (${member.name}) should be receiving a gift`,
            ).toBeDefined();

            const isExcluded = member.exclusions.includes(
                receivingPair!.receiver.id,
            );
            expect(
                isExcluded,
                `Member ${member.id} (${member.name}) should not be giving a gift to someone in exclusion list`,
            ).toBe(false);
        }
    };
});
