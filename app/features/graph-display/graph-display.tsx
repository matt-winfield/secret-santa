import type { Graph } from 'graphology';
import { useEffect, useRef } from 'react';
import type { Sigma } from 'sigma';
import { circular } from 'graphology-layout';
import drawLabel, { drawHover } from './label-utils';

type GraphDisplayProps = {
    graph: Graph | null;
};

export const GraphDisplay = ({ graph }: GraphDisplayProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sigmaRef = useRef<Sigma | null>(null);

    useEffect(() => {
        const loadSigma = async () => {
            if (!containerRef.current || !graph) {
                return;
            }

            // Layout in a circle
            const clonedGraph = graph.copy();
            circular.assign(clonedGraph);
            clonedGraph.forEachNode((_, attributes) => {
                attributes.label = attributes.name;
                attributes.size = 10;
                attributes.color = 'orange';
            });

            clonedGraph.forEachEdge((_, attributes) => {
                if (attributes.state === 'path') {
                    attributes.color = 'red';
                    attributes.size = 5;
                }
                attributes.curvature = 0.1;
            });

            // Sigma must be imported dynamically because it relies on the DOM so will fail server-side
            const { Sigma } = await import('sigma');
            const { EdgeCurvedArrowProgram } = await import(
                '@sigma/edge-curve'
            );

            const sigmaInstance = new Sigma(clonedGraph, containerRef.current, {
                defaultEdgeType: 'curvedArrow',
                edgeProgramClasses: {
                    curvedArrow: EdgeCurvedArrowProgram,
                },
                defaultDrawNodeLabel: drawLabel,
                defaultDrawNodeHover: drawHover,
            });
            sigmaRef.current = sigmaInstance;
        };
        loadSigma();

        return () => {
            sigmaRef.current?.kill();
        };
    }, [graph]);

    return <div ref={containerRef} className="h-[700px] w-full" />;
};
