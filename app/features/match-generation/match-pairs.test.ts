import { Member } from '../types/member';
import { createGraph } from './create-graph';
import { MatchPairsResult, matchPairs } from './match-pairs';

const mockMath = Object.create(global.Math);
mockMath.random = vi.fn();
const originalMath = global.Math;

describe('match-pairs', () => {
    beforeEach(() => {
        mockMath.random.mockReturnValue(0.5);
        global.Math = mockMath;
    });

    afterEach(() => {
        global.Math = originalMath;
    });

    it('should mock Math.random to always return 0.5', () => {
        // Sanity check that Math.random is mocked so we don't have unstable tests
        expect(Math.random()).toBe(0.5);
    });

    describe.each([
        { seed: 0 },
        { seed: 0.1 },
        { seed: 0.2 },
        { seed: 0.3 },
        { seed: 0.4 },
        { seed: 0.5 },
        { seed: 0.6 },
        { seed: 0.7 },
        { seed: 0.8 },
        { seed: 0.9 },
    ])('with random seed $seed', ({ seed }) => {
        it.each([[2], [3], [4], [5], [6], [7], [8], [9], [10]])(
            'should return unsolved if loop (%i members) is not possible because of exclusions',
            (numMembers) => {
                mockMath.random.mockReturnValue(seed);
                const members = makeInvalidMembers(numMembers);

                const graph = createGraph(members);

                const result = matchPairs(graph);

                expect(result).toBe('unsolved');
            },
        );

        it.each([
            [2],
            [3],
            [4],
            [5],
            [6],
            [7],
            [8],
            [9],
            [10],
            [11],
            [12],
            [13],
            [14],
            [15],
        ])('should make a loop with %i members', (numMembers) => {
            mockMath.random.mockReturnValue(seed);
            const members = makeMembers(numMembers);

            const graph = createGraph(members);

            const result = matchPairs(graph);

            assertValidSolution(members, result);
        });
    });

    const makeMembers = (count: number) =>
        Array.from({ length: count }, (_, i) => ({
            id: i.toString(),
            name: `Member ${i}`,
            exclusions: [],
        }));

    const makeInvalidMembers = (count: number) =>
        Array.from({ length: count }, (_, i) => ({
            id: i.toString(),
            name: `Member ${i}`,
            exclusions: Array.from({ length: count }, (_, j) => j.toString()), // Exclude all members
        }));

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
