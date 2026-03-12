/**
 * Section 1: The Speed Problem
 * ============================
 * Introduces the concept of average speed through a familiar car journey example.
 * Students explore measuring speed between two time points on a timeline.
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
} from "@/components/atoms";
import { Cartesian2D, InteractionHintSequence } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ── Position function: car position over time ────────────────────────────────
// Using a simple quadratic function to represent accelerating motion
const positionFunction = (t: number) => 0.5 * t * t + t;

// ── Reactive Visualization: Timeline Journey ─────────────────────────────────
function TimelineJourneyViz() {
    const startTime = useVar("startTime", 1) as number;
    const endTime = useVar("endTime", 3) as number;

    // Calculate positions at start and end times
    const startPos = positionFunction(startTime);
    const endPos = positionFunction(endTime);
    const distance = endPos - startPos;
    const timeDiff = endTime - startTime;
    const avgSpeed = timeDiff > 0 ? distance / timeDiff : 0;

    return (
        <div className="relative">
            <Cartesian2D
                height={350}
                viewBox={{ x: [-0.5, 6], y: [-1, 20] }}
                showGrid={true}
                plots={[
                    // The position-time curve
                    {
                        type: "function",
                        fn: positionFunction,
                        color: "#64748b",
                        weight: 2,
                        domain: [0, 5.5],
                    },
                    // Start point
                    {
                        type: "point",
                        x: startTime,
                        y: startPos,
                        color: "#62D0AD",
                    },
                    // End point
                    {
                        type: "point",
                        x: endTime,
                        y: endPos,
                        color: "#8E90F5",
                    },
                    // Secant line connecting the two points (average speed)
                    {
                        type: "segment",
                        point1: [startTime, startPos],
                        point2: [endTime, endPos],
                        color: "#F7B23B",
                        weight: 2,
                        style: "dashed",
                    },
                    // Vertical line showing distance
                    {
                        type: "segment",
                        point1: [endTime, startPos],
                        point2: [endTime, endPos],
                        color: "#ef4444",
                        weight: 2,
                    },
                    // Horizontal line showing time
                    {
                        type: "segment",
                        point1: [startTime, startPos],
                        point2: [endTime, startPos],
                        color: "#3b82f6",
                        weight: 2,
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="speed-problem-timeline"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the time values in the text below",
                        position: { x: "50%", y: "80%" },
                    },
                ]}
            />
            {/* Labels overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-sm shadow-sm">
                <div className="flex flex-col gap-1">
                    <span className="text-slate-600">
                        Distance:{" "}
                        <span className="font-semibold text-red-500">
                            {distance.toFixed(1)} m
                        </span>
                    </span>
                    <span className="text-slate-600">
                        Time:{" "}
                        <span className="font-semibold text-blue-500">
                            {timeDiff.toFixed(1)} s
                        </span>
                    </span>
                    <span className="text-slate-600">
                        Average Speed:{" "}
                        <span className="font-semibold text-amber-500">
                            {avgSpeed.toFixed(2)} m/s
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

// ── Reactive text showing calculated values ──────────────────────────────────
function SpeedCalculation() {
    const startTime = useVar("startTime", 1) as number;
    const endTime = useVar("endTime", 3) as number;

    const startPos = positionFunction(startTime);
    const endPos = positionFunction(endTime);
    const distance = endPos - startPos;
    const timeDiff = endTime - startTime;
    const avgSpeed = timeDiff > 0 ? distance / timeDiff : 0;

    return (
        <span>
            The car travels from position {startPos.toFixed(1)}m to{" "}
            {endPos.toFixed(1)}m, covering {distance.toFixed(1)} metres in{" "}
            {timeDiff.toFixed(1)} seconds. That gives an average speed of{" "}
            <strong className="text-amber-600">{avgSpeed.toFixed(2)} m/s</strong>.
        </span>
    );
}

// ── Section Blocks ───────────────────────────────────────────────────────────
export const speedProblemBlocks: ReactElement[] = [
    // Section Title
    <StackLayout key="layout-speed-title" maxWidth="xl">
        <Block id="speed-title" padding="md">
            <EditableH2 id="h2-speed-title" blockId="speed-title">
                The Speed Problem
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction paragraph
    <StackLayout key="layout-speed-intro" maxWidth="xl">
        <Block id="speed-intro" padding="sm">
            <EditableParagraph id="para-speed-intro" blockId="speed-intro">
                Imagine you are on a road trip. Your friend asks, "How fast were we going?"
                The answer seems simple, but there is a catch. Your speed was not constant throughout
                the journey. Sometimes you were stuck in traffic, other times cruising on the motorway.
                So what does "speed" actually mean?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Average speed explanation
    <StackLayout key="layout-speed-average-concept" maxWidth="xl">
        <Block id="speed-average-concept" padding="sm">
            <EditableParagraph id="para-speed-average-concept" blockId="speed-average-concept">
                The simplest answer is{" "}
                <InlineTooltip
                    id="tooltip-average-speed"
                    tooltip="Average speed tells you the overall rate of travel, calculated by dividing total distance by total time."
                >
                    average speed
                </InlineTooltip>
                . If you travelled 100 kilometres in 2 hours, your average speed was 50 km/h.
                We calculate it with a straightforward formula:
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Formula block
    <StackLayout key="layout-speed-formula" maxWidth="xl">
        <Block id="speed-formula" padding="md">
            <FormulaBlock
                latex="\text{Average Speed} = \frac{\text{Distance}}{\text{Time}} = \frac{\Delta s}{\Delta t}"
                colorMap={{}}
            />
        </Block>
    </StackLayout>,

    // Interactive exploration
    <SplitLayout key="layout-speed-exploration" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="speed-explore-text" padding="sm">
                <EditableParagraph id="para-speed-explore-text" blockId="speed-explore-text">
                    Let us explore this with a car journey. The graph shows the car's position over time.
                    The curve tells us where the car is at each moment. Try changing the{" "}
                    <InlineScrubbleNumber
                        varName="startTime"
                        {...numberPropsFromDefinition(getVariableInfo("startTime"))}
                        formatValue={(v) => `${v}s`}
                    />{" "}
                    and{" "}
                    <InlineScrubbleNumber
                        varName="endTime"
                        {...numberPropsFromDefinition(getVariableInfo("endTime"))}
                        formatValue={(v) => `${v}s`}
                    />{" "}
                    time points to measure speed over different intervals.
                </EditableParagraph>
            </Block>
            <Block id="speed-calculation-result" padding="sm">
                <EditableParagraph id="para-speed-calculation" blockId="speed-calculation-result">
                    <SpeedCalculation />
                </EditableParagraph>
            </Block>
            <Block id="speed-observe" padding="sm">
                <EditableParagraph id="para-speed-observe" blockId="speed-observe">
                    Notice the{" "}
                    <span className="text-amber-500 font-medium">dashed yellow line</span>{" "}
                    connecting the two points. The steeper this line, the faster the average speed.
                    The{" "}
                    <span className="text-red-500 font-medium">red vertical line</span>{" "}
                    shows the distance travelled, while the{" "}
                    <span className="text-blue-500 font-medium">blue horizontal line</span>{" "}
                    shows the time elapsed.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="speed-timeline-viz" padding="sm" hasVisualization>
            <TimelineJourneyViz />
        </Block>
    </SplitLayout>,

    // The problem with average speed
    <StackLayout key="layout-speed-problem-para" maxWidth="xl">
        <Block id="speed-problem-para" padding="sm">
            <EditableParagraph id="para-speed-problem" blockId="speed-problem-para">
                Here is the issue: average speed tells us about the overall journey, but what if we want
                to know how fast the car was going at one specific moment? Like when you glance at your
                speedometer, you see the speed right now, not an average. This is the question that leads
                us to something much more powerful.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question
    <StackLayout key="layout-speed-question" maxWidth="xl">
        <Block id="speed-question" padding="md">
            <EditableParagraph id="para-speed-question" blockId="speed-question">
                To calculate average speed, we divide{" "}
                <InlineFeedback
                    varName="answerSpeedFormula"
                    correctValue="distance"
                    position="mid"
                    successMessage="✓"
                    failureMessage="✗"
                    hint="Think about what goes on top of the fraction"
                >
                    <InlineClozeInput
                        varName="answerSpeedFormula"
                        correctAnswer="distance"
                        {...clozePropsFromDefinition(getVariableInfo("answerSpeedFormula"))}
                    />
                </InlineFeedback>{" "}
                by time.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
