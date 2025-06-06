import * as d3 from "d3";
import nodeEdges from "../data/nodes_edges.json";
import mapMetadata from "../data/mapMetadata.json";
import { useEffect, useRef } from "react";
import type { ProductId, ProductNode } from "../types/Product";

const hs92ColorsMap = new Map([
    ["product-HS92-1", "rgb(125, 218, 161)"],
    ["product-HS92-2", "#F5CF23"],
    ["product-HS92-3", "rgb(218, 180, 125)"],
    ["product-HS92-4", "rgb(187, 150, 138)"],
    ["product-HS92-5", "rgb(217, 123, 123)"],
    ["product-HS92-6", "rgb(197, 123, 217)"],
    ["product-HS92-7", "rgb(141, 123, 216)"],
    ["product-HS92-8", "rgb(123, 162, 217)"],
    ["product-HS92-9", "rgb(125, 218, 218)"],
    ["product-HS92-10", "#2a607c"],
    ["product-HS92-14", "rgb(178, 61, 109)"],
]);

const betterRed = "rgb(217, 123, 123)";

export function ProductSpaceChart() {
    const svgRef = useRef(null);
    const nodes: ProductNode[] = nodeEdges.nodes.map((node) => ({
        ...node,
        id: node.productId,
        x: ((node.x || 0) - 800) * (window.innerWidth / 2200),
        y: ((node.y || 0) - 1500) * (window.innerHeight / 2000),
        fx: ((node.x || 0) - 800) * (window.innerWidth / 2200),
        fy: ((node.y || 0) - 1500) * (window.innerHeight / 2000),
    }));
    const width = "100%";
    const height = "100%";

    useEffect(() => {
        const svgElement = d3.select(svgRef.current);

        const tooltip = d3
            .select("body")
            .append("div")
            .style("position", "absolute")
            .style("padding", "8px")
            .style("background", "#f9f9f9")
            .style("border", "1px solid #ddd")
            .style("border-radius", "#ccc")
            .style("pointer-events", "none")
            .style("opacity", 0);

        const link = svgElement
            .append("g")
            .selectAll()
            .data(nodeEdges.edges)
            .join("line");

        const node = svgElement
            .append("g")
            .selectAll()
            .data(nodes)
            .join("circle")
            .style("cursor", "pointer")
            .attr("r", 2)
            .attr(
                "fill",
                (d: ProductNode) =>
                    hs92ColorsMap.get(
                        mapMetadata[d.id as ProductId].productSector.productId
                    ) || ""
            );

        node.on("mouseenter", function (e, d: ProductNode) {
            const productMetadata = mapMetadata[d.productId as ProductId];
            tooltip
                .html(
                    `${productMetadata.productName} (${productMetadata.productCode})`
                )
                .style("left", e.pageX + 10 + "px")
                .style("top", e.pageY - 15 + "px")
                .style("opacity", 1);

            d.hover = true;
        }).on("mouseleave", function (_, d: ProductNode) {
            d.hover = false;
            tooltip.style("opacity", 0);
        });

        const ticked = () => {
            link.attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y)
                .attr("stroke", (d: any) =>
                    d.source.hover || d.target.hover ? betterRed : "#ccc"
                )
                .attr("stroke-width", (d: any) =>
                    d.source.hover || d.target.hover ? 3 : 1
                );

            node.attr("cx", (d) => d.x!)
                .attr("cy", (d) => d.y!)
                .attr("stroke", (d: ProductNode) =>
                    d.hover ? betterRed : "#ccc"
                )
                .attr("stroke-width", (d: ProductNode) => (d.hover ? 3 : 1));
        };

        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(nodeEdges.edges).id((d: any) => d.id)
            )
            .force("charge", d3.forceManyBody().strength(0))
            // .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);
    }, []);

    return <svg ref={svgRef} width={width} height={height} />;
}
