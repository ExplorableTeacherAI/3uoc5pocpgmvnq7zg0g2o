/**
 * Section 2: Getting Closer
 * =========================
 * The key insight: what happens when we measure speed over smaller and smaller intervals.
 * Students discover the concept of instantaneous rate of change.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeChoice,
    InlineFeedback,
    InlineTooltip,
} from "@/components/atoms";
import { Cartesian2D, InteractionHintSequence } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ── Position function (same as Section 1) ────────────────────────────────────
const positionFunction = (t: number) => 0.5 * t * t + t;

// ── Reactive Visualization: Shrinking Interval ───────────────────────────────
function ShrinkingIntervalViz() {
    const fixedPoint = useVar("fixedPoint", 2) as number;
    const intervalSize = useVar("intervalSize", 2) as number;

    const endPoint = fixedPoint + intervalSize;
    const startPos = positionFunction(fixedPoint);
    const endPos = positionFunction(endPoint);
    const distance = endPos - startPos;
    const avgSpeed = intervalSize > 0 ? distance / intervalSize : 0;

    // Calculate the "instantaneous" speed (derivative at fixedPoint)
    // For f(t) = 0.5t² + t, f'(t) = t + 1
    const instantSpeed = fixedPoint + 1;

    return (
        <div className="relative">
            <Cartesian2D
                height={380}
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
                    // Fixed point (purple)
                    {
                        type: "point",
                        x: fixedPoint,
                        y: startPos,
                        color: "#AC8BF9",
                    },
                    // Moving end point (amber)
                    {
                        type: "point",
                        x: endPoint,
                        y: endPos,
                        color: "#F7B23B",
                    },
                    // Secant line
                    {
                        type: "segment",
                        point1: [fixedPoint, startPos],
                        point2: [endPoint, endPos],
                        color: "#F7B23B",
                        weight: 2,
                    },
                    // Tangent line (the limit we're approaching)
                    {
                        type: "function",
                        fn: (x: number) => startPos + instantSpeed * (x - fixedPoint),
                        color: "#62D0AD",
                        weight: 2,
                        domain: [fixedPoint - 1.5, fixedPoint + 2.5],
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="getting-closer-interval"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the interval size below to make it smaller",
                        position: { x: "50%", y: "80%" },
                    },
                ]}
            />
            {/* Info overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-sm shadow-sm">
                <div className="flex flex-col gap-1">
                    <span className="text-slate-600">
                        Interval size:{" "}
                        <span className="font-semibold text-amber-500">
                            {intervalSize.toFixed(1)} s
                        </span>
                    </span>
                    <span className="text-slate-600">
                        <span className="text-amber-500">Average speed</span>:{" "}
                        <span className="font-semibold">{avgSpeed.toFixed(2)} m/s</span>
                    </span>
                    <span className="text-slate-600">
                        <span className="text-teal-500">Instant speed</span>:{" "}
                        <span className="font-semibold">{instantSpeed.toFixed(2)} m/s</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

// ── Reactive calculation text ────────────────────────────────────────────────
function IntervalCalculation() {
    const fixedPoint = useVar("fixedPoint", 2) as number;
    const intervalSize = useVar("intervalSize", 2) as number;

    const endPoint = fixedPoint + intervalSize;
    const startPos = positionFunction(fixedPoint);
    const endPos = positionFunction(endPoint);
    const distance = endPos - startPos;
    const avgSpeed = intervalSize > 0 ? distance / intervalSize : 0;

    // Instantaneous speed at fixedPoint
    const instantSpeed = fixedPoint + 1;

    return (
        <span>
            Over an interval of {intervalSize.toFixed(1)} seconds (from t={fixedPoint} to t=
            {endPoint.toFixed(1)}), the average speed is{" "}
            <strong className="text-amber-500">{avgSpeed.toFixed(2)} m/s</strong>.
            The true instantaneous speed at t={fixedPoint} is{" "}
            <strong className="text-teal-500">{instantSpeed.toFixed(2)} m/s</strong>.
            {Math.abs(avgSpeed - instantSpeed) < 0.3 && (
                <span className="text-green-600"> They are getting very close!</span>
            )}
        </span>
    );
}

// ── Section Blocks ───────────────────────────────────────────────────────────
export const gettingCloserBlocks: ReactElement[] = [
    // Section Title
    <StackLayout key="layout-closer-title" maxWidth="xl">
        <Block id="closer-title" padding="md">
            <EditableH2 id="h2-closer-title" blockId="closer-title">
                Getting Closer
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-closer-intro" maxWidth="xl">
        <Block id="closer-intro" padding="sm">
            <EditableParagraph id="para-closer-intro" blockId="closer-intro">
                Here is where the magic happens. What if we measured the average speed over a really
                tiny time interval? Say, instead of measuring between t=1 and t=3, we measure between
                t=2 and t=2.1? Or t=2 and t=2.01? What happens as that interval gets smaller and smaller?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Key insight
    <StackLayout key="layout-closer-insight" maxWidth="xl">
        <Block id="closer-insight" padding="sm">
            <EditableParagraph id="para-closer-insight" blockId="closer-insight">
                This is the crucial idea behind calculus. As the time interval shrinks towards zero,
                the average speed approaches a specific value. That value is the{" "}
                <InlineTooltip
                    id="tooltip-instantaneous"
                    tooltip="The speed at one exact moment in time, as if you froze the clock and measured how fast you were going right then."
                >
                    instantaneous speed
                </InlineTooltip>{" "}
                at that moment.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive exploration
    <SplitLayout key="layout-closer-exploration" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="closer-explore-text" padding="sm">
                <EditableParagraph id="para-closer-explore" blockId="closer-explore-text">
                    Let us see this in action. The{" "}
                    <span className="text-violet-500 font-medium">purple point</span> is fixed at
                    time t={" "}
                    <InlineScrubbleNumber
                        varName="fixedPoint"
                        {...numberPropsFromDefinition(getVariableInfo("fixedPoint"))}
                        formatValue={(v) => `${v}`}
                    />
                    . The{" "}
                    <span className="text-amber-500 font-medium">amber point</span> marks the end of
                    our interval. Try making the interval size{" "}
                    <InlineScrubbleNumber
                        varName="intervalSize"
                        {...numberPropsFromDefinition(getVariableInfo("intervalSize"))}
                        formatValue={(v) => `${v}s`}
                    />{" "}
                    smaller and smaller.
                </EditableParagraph>
            </Block>
            <Block id="closer-calculation" padding="sm">
                <EditableParagraph id="para-closer-calc" blockId="closer-calculation">
                    <IntervalCalculation />
                </EditableParagraph>
            </Block>
            <Block id="closer-observation" padding="sm">
                <EditableParagraph id="para-closer-obs" blockId="closer-observation">
                    Watch the{" "}
                    <span className="text-amber-500 font-medium">amber secant line</span> approach
                    the{" "}
                    <span className="text-teal-500 font-medium">teal tangent line</span>. The tangent
                    line shows the true instantaneous rate of change. As your interval shrinks, the
                    secant line rotates to match the tangent!
                </EditableParagraph>
            </Block>
        </div>
        <Block id="closer-viz" padding="sm" hasVisualization>
            <ShrinkingIntervalViz />
        </Block>
    </SplitLayout>,

    // The limit concept
    <StackLayout key="layout-closer-limit" maxWidth="xl">
        <Block id="closer-limit" padding="sm">
            <EditableParagraph id="para-closer-limit" blockId="closer-limit">
                Mathematicians write this idea using a{" "}
                <InlineTooltip
                    id="tooltip-limit"
                    tooltip="A limit describes what value a function approaches as its input gets arbitrarily close to some value."
                >
                    limit
                </InlineTooltip>
                . We say the instantaneous speed is the limit of the average speed as the time
                interval approaches zero:
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Limit formula
    <StackLayout key="layout-closer-formula" maxWidth="xl">
        <Block id="closer-formula" padding="md">
            <FormulaBlock
                latex="\text{Instantaneous Speed} = \lim_{\Delta t \to 0} \frac{\Delta s}{\Delta t}"
                colorMap={{}}
            />
        </Block>
    </StackLayout>,

    // Question
    <StackLayout key="layout-closer-question" maxWidth="xl">
        <Block id="closer-question" padding="md">
            <EditableParagraph id="para-closer-question" blockId="closer-question">
                To find the instantaneous speed at a point, we need to make the time interval{" "}
                <InlineFeedback
                    varName="answerInstantaneous"
                    correctValue="smaller"
                    position="mid"
                    successMessage="✓"
                    failureMessage="✗"
                    hint="Think about what happens to the interval as we approach a single moment"
                >
                    <InlineClozeChoice
                        varName="answerInstantaneous"
                        correctAnswer="smaller"
                        options={["larger", "smaller", "the same"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerInstantaneous"))}
                    />
                </InlineFeedback>{" "}
                and smaller, approaching zero.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
