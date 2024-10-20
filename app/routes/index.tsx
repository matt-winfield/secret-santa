import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraphDisplay } from '@/features/graph-display/graph-display';
import { createGraph } from '@/features/match-generation/create-graph';
import { matchPairs } from '@/features/match-generation/match-pairs';
import { Member } from '@/features/types/member';
import type { Graph } from 'graphology';
import { useState } from 'react';

export default function Index() {
    const [members, setMembers] = useState<Member[]>([]);
    const [newMember, setNewMember] = useState<string>('');
    const [graph, setGraph] = useState<Graph | null>(null);

    const generatePairs = () => {
        const graph = createGraph(members);
        const result = matchPairs(graph);
        if (result === 'unsolved') {
            console.error('Could not solve the graph');
            return;
        }

        setGraph(graph);
    };

    const addMember = (name: string) => {
        setMembers((members) => [
            ...members,
            {
                id: members.length.toString(),
                name,
                exclusions: [],
            },
        ]);
        setNewMember('');
    };

    return (
        <main className="container relative h-full">
            <div className="flex h-full flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Match Pairs</h1>
                <p className="mt-4">
                    Enter the names of the people you want to match
                </p>
                <Input
                    type="text"
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addMember(newMember);
                        }
                    }}
                />
                <Button onClick={() => addMember(newMember)}>Add</Button>
                <ul className="mt-4">
                    {members.map((member) => (
                        <Input
                            key={member.id}
                            type="text"
                            value={member.name}
                            onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[members.indexOf(member)] = {
                                    ...member,
                                    name: e.target.value,
                                };
                                setMembers(newMembers);
                            }}
                        />
                    ))}
                </ul>
                <Button onClick={generatePairs}>Generate Pairs</Button>
                <GraphDisplay graph={graph} />
            </div>
        </main>
    );
}
