/**
 * Section 3: Slope of a Curve
 * ===========================
 * Connects the speed concept to graph slopes.
 * Students explore how the tangent line represents instantaneous rate of change.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineFeedback,
    InlineTooltip,
    InlineLinkedHighlight,
} from "@/components/atoms";
import { Cartesian2D, InteractionHintSequence } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
} from "../variables";
import { useVar, useSetVar } from "@/stores";
import { useCallback } from "react";

// ── The function we're exploring ─────────────────────────────────────────────
const f = (x: number) => x * x; // f(x) = x²
const fPrime = (x: number) => 2 * x; // f'(x) = 2x

// ── Reactive Visualization: Tangent and Secant Lines ─────────────────────────
function TangentSecantViz() {
    const tangentPoint = useVar("tangentPoint", 2) as number;
    const secantDistance = useVar("secantDistance", 1.5) as number;
    const highlightId = useVar("slopeHighlight", "") as string;
    const setVar = useSetVar();

    const y0 = f(tangentPoint);
    const slope = fPrime(tangentPoint);

    // Secant line points
    const x1 = tangentPoint;
    const y1 = f(x1);
    const x2 = tangentPoint + secantDistance;
    const y2 = f(x2);
    const secantSlope = (y2 - y1) / (x2 - x1);

    // Handle point drag
    const handlePointDrag = useCallback(
        (point: [number, number]) => {
            const newX = Math.max(0.5, Math.min(4, point[0]));
            setVar("tangentPoint", Math.round(newX * 10) / 10);
        },
        [setVar]
    );

    return (
        <div className="relative">
            <Cartesian2D
                height={380}
                viewBox={{ x: [-1, 5], y: [-1, 18] }}
                showGrid={true}
                highlightVarName="slopeHighlight"
                movablePoints={[
                    {
                        initial: [tangentPoint, y0],
                        color: "#62D0AD",
                        constrain: (p) => [p[0], f(Math.max(0.5, Math.min(4, p[0])))],
                        onChange: handlePointDrag,
                    },
                ]}
                plots={[
                    // The parabola f(x) = x²
                    {
                        type: "function",
                        fn: f,
                        color: "#64748b",
                        weight: 2,
                        domain: [-0.5, 4.5],
                        highlightId: "curve",
                    },
                    // Tangent line at the point
                    {
                        type: "function",
                        fn: (x: number) => y0 + slope * (x - tangentPoint),
                        color: "#62D0AD",
                        weight: 3,
                        domain: [tangentPoint - 2, tangentPoint + 2],
                        highlightId: "tangent",
                    },
                    // Secant line
                    {
                        type: "segment",
                        point1: [x1, y1],
                        point2: [x2, y2],
                        color: "#F7B23B",
                        weight: 2,
                        style: "dashed",
                        highlightId: "secant",
                    },
                    // Second point for secant
                    {
                        type: "point",
                        x: x2,
                        y: y2,
                        color: "#F7B23B",
                        highlightId: "secant",
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="slope-curve-drag"
                steps={[
                    {
                        gesture: "drag",
                        label: "Drag the teal point along the curve",
                        position: { x: "55%", y: "35%" },
                        dragPath: { type: "arc", startAngle: -45, endAngle: 45, radius: 35 },
                    },
                ]}
            />
            {/* Info overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-sm shadow-sm">
                <div className="flex flex-col gap-1">
                    <span className="text-slate-600">
                        Point: x ={" "}
                        <span className="font-semibold text-teal-500">
                            {tangentPoint.toFixed(1)}
                        </span>
                    </span>
                    <span className="text-slate-600">
                        <span className="text-teal-500">Tangent slope</span>:{" "}
                        <span className="font-semibold">{slope.toFixed(1)}</span>
                    </span>
                    <span className="text-slate-600">
                        <span className="text-amber-500">Secant slope</span>:{" "}
                        <span className="font-semibold">{secantSlope.toFixed(2)}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

// ── Reactive slope text ──────────────────────────────────────────────────────
function SlopeCalculation() {
    const tangentPoint = useVar("tangentPoint", 2) as number;
    const secantDistance = useVar("secantDistance", 1.5) as number;

    const slope = fPrime(tangentPoint);
    const y1 = f(tangentPoint);
    const y2 = f(tangentPoint + secantDistance);
    const secantSlope = (y2 - y1) / secantDistance;

    return (
        <span>
            At x = {tangentPoint.toFixed(1)}, the tangent line has slope{" "}
            <strong className="text-teal-500">{slope.toFixed(1)}</strong>. The secant line
            (with distance {secantDistance.toFixed(1)}) has slope{" "}
            <strong className="text-amber-500">{secantSlope.toFixed(2)}</strong>.
            {Math.abs(slope - secantSlope) < 0.5 && (
                <span className="text-green-600"> They are very close!</span>
            )}
        </span>
    );
}

// ── Section Blocks ───────────────────────────────────────────────────────────
export const slopeOfCurveBlocks: ReactElement[] = [
    // Section Title
    <StackLayout key="layout-slope-title" maxWidth="xl">
        <Block id="slope-title" padding="md">
            <EditableH2 id="h2-slope-title" blockId="slope-title">
                Slope of a Curve
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-slope-intro" maxWidth="xl">
        <Block id="slope-intro" padding="sm">
            <EditableParagraph id="para-slope-intro" blockId="slope-intro">
                You already know how to find the slope of a straight line. But what about a curve?
                A curve does not have one single slope; it is constantly changing direction. Yet at
                any single point, we can ask: "What is the slope right here?"
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Tangent line explanation
    <StackLayout key="layout-slope-tangent-concept" maxWidth="xl">
        <Block id="slope-tangent-concept" padding="sm">
            <EditableParagraph id="para-slope-tangent" blockId="slope-tangent-concept">
                The answer is the{" "}
                <InlineTooltip
                    id="tooltip-tangent"
                    tooltip="A line that just touches a curve at exactly one point, matching the curve's direction at that point."
                >
                    tangent line
                </InlineTooltip>
                . Imagine zooming in very close to a point on the curve. As you zoom in, the curve
                looks more and more like a straight line. That straight line is the tangent, and its
                slope tells us the rate of change at that exact point.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive exploration
    <SplitLayout key="layout-slope-exploration" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="slope-explore-text" padding="sm">
                <EditableParagraph id="para-slope-explore" blockId="slope-explore-text">
                    Let us explore the parabola f(x) = x². Drag the{" "}
                    <InlineLinkedHighlight
                        id="highlight-tangent-point"
                        varName="slopeHighlight"
                        highlightId="tangent"
                        color="#62D0AD"
                    >
                        teal point
                    </InlineLinkedHighlight>{" "}
                    along the curve to see how the tangent line changes. You can also adjust the
                    secant distance{" "}
                    <InlineScrubbleNumber
                        varName="secantDistance"
                        {...numberPropsFromDefinition(getVariableInfo("secantDistance"))}
                    />{" "}
                    to see how the{" "}
                    <InlineLinkedHighlight
                        id="highlight-secant-line"
                        varName="slopeHighlight"
                        highlightId="secant"
                        color="#F7B23B"
                    >
                        amber secant line
                    </InlineLinkedHighlight>{" "}
                    approaches the tangent.
                </EditableParagraph>
            </Block>
            <Block id="slope-calculation" padding="sm">
                <EditableParagraph id="para-slope-calc" blockId="slope-calculation">
                    <SlopeCalculation />
                </EditableParagraph>
            </Block>
            <Block id="slope-observation" padding="sm">
                <EditableParagraph id="para-slope-obs" blockId="slope-observation">
                    Notice how the slope of the tangent changes as you move along the{" "}
                    <InlineLinkedHighlight
                        id="highlight-curve"
                        varName="slopeHighlight"
                        highlightId="curve"
                        color="#64748b"
                    >
                        curve
                    </InlineLinkedHighlight>
                    . At x = 0, the slope is 0 (the curve is flat there). As x increases, the slope
                    gets steeper and steeper. This slope at each point is exactly what we call the
                    derivative!
                </EditableParagraph>
            </Block>
        </div>
        <Block id="slope-viz" padding="sm" hasVisualization>
            <TangentSecantViz />
        </Block>
    </SplitLayout>,

    // Connection to speed
    <StackLayout key="layout-slope-connection" maxWidth="xl">
        <Block id="slope-connection" padding="sm">
            <EditableParagraph id="para-slope-connection" blockId="slope-connection">
                This is exactly the same idea as before! When we measured speed, we were finding
                the slope of the position-time graph. The instantaneous speed is the slope of the
                tangent line to the position curve. In calculus, we call this slope the derivative.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Formula
    <StackLayout key="layout-slope-formula" maxWidth="xl">
        <Block id="slope-formula" padding="md">
            <FormulaBlock
                latex="\text{Slope at point } x = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}"
                colorMap={{}}
            />
        </Block>
    </StackLayout>,

    // Question
    <StackLayout key="layout-slope-question" maxWidth="xl">
        <Block id="slope-question" padding="md">
            <EditableParagraph id="para-slope-question" blockId="slope-question">
                The slope of the tangent line at a point tells us the{" "}
                <InlineFeedback
                    varName="answerTangentSlope"
                    correctValue="instantaneous"
                    position="mid"
                    successMessage="✓"
                    failureMessage="✗"
                    hint="Think about what we called the speed at one exact moment"
                >
                    <InlineClozeInput
                        varName="answerTangentSlope"
                        correctAnswer="instantaneous"
                        {...clozePropsFromDefinition(getVariableInfo("answerTangentSlope"))}
                    />
                </InlineFeedback>{" "}
                rate of change at that point.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
