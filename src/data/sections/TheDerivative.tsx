/**
 * Section 4: The Derivative
 * =========================
 * Brings everything together: the derivative is the instantaneous rate of change.
 * Students interact with a function and see the derivative value update in real-time.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableH3,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineFeedback,
    InlineTooltip,
    InlineFormula,
    InlineSpotColor,
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

// ── The functions ────────────────────────────────────────────────────────────
const f = (x: number) => x * x; // f(x) = x²
const fPrime = (x: number) => 2 * x; // f'(x) = 2x

// ── Reactive Visualization: Derivative Explorer ──────────────────────────────
function DerivativeExplorerViz() {
    const derivativePoint = useVar("derivativePoint", 1.5) as number;
    const setVar = useSetVar();

    const y0 = f(derivativePoint);
    const slope = fPrime(derivativePoint);

    // Handle point drag
    const handlePointDrag = useCallback(
        (point: [number, number]) => {
            const newX = Math.max(-2, Math.min(3, point[0]));
            setVar("derivativePoint", Math.round(newX * 10) / 10);
        },
        [setVar]
    );

    return (
        <div className="relative">
            <Cartesian2D
                height={400}
                viewBox={{ x: [-3, 4], y: [-2, 12] }}
                showGrid={true}
                movablePoints={[
                    {
                        initial: [derivativePoint, y0],
                        color: "#62D0AD",
                        constrain: (p) => [p[0], f(Math.max(-2, Math.min(3, p[0])))],
                        onChange: handlePointDrag,
                    },
                ]}
                plots={[
                    // The original function f(x) = x²
                    {
                        type: "function",
                        fn: f,
                        color: "#64748b",
                        weight: 2,
                        domain: [-2.5, 3.5],
                    },
                    // The derivative function f'(x) = 2x (shown faded)
                    {
                        type: "function",
                        fn: fPrime,
                        color: "#8E90F5",
                        weight: 2,
                        domain: [-2.5, 3.5],
                    },
                    // Tangent line at current point
                    {
                        type: "function",
                        fn: (x: number) => y0 + slope * (x - derivativePoint),
                        color: "#62D0AD",
                        weight: 2,
                        domain: [derivativePoint - 2, derivativePoint + 2],
                    },
                    // Point on derivative curve showing current slope value
                    {
                        type: "point",
                        x: derivativePoint,
                        y: slope,
                        color: "#8E90F5",
                    },
                    // Vertical line connecting the two curves at x
                    {
                        type: "segment",
                        point1: [derivativePoint, y0],
                        point2: [derivativePoint, slope],
                        color: "#F7B23B",
                        weight: 1,
                        style: "dashed",
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="derivative-explorer-drag"
                steps={[
                    {
                        gesture: "drag",
                        label: "Drag the teal point along the curve",
                        position: { x: "60%", y: "30%" },
                        dragPath: { type: "line", startOffset: { x: -30, y: 0 }, endOffset: { x: 30, y: 0 } },
                    },
                ]}
            />
            {/* Info overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-sm shadow-sm">
                <div className="flex flex-col gap-2">
                    <span className="text-slate-600">
                        x ={" "}
                        <span className="font-semibold text-teal-500">
                            {derivativePoint.toFixed(1)}
                        </span>
                    </span>
                    <span className="text-slate-600">
                        f(x) = x² ={" "}
                        <span className="font-semibold">{y0.toFixed(2)}</span>
                    </span>
                    <span className="text-slate-600">
                        f'(x) = 2x ={" "}
                        <span className="font-semibold text-indigo-500">{slope.toFixed(1)}</span>
                    </span>
                </div>
            </div>
            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-2 text-xs shadow-sm">
                <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-0.5 bg-slate-500"></span>
                        <span>f(x) = x²</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-0.5 bg-indigo-500"></span>
                        <span>f'(x) = 2x</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

// ── Reactive derivative text ─────────────────────────────────────────────────
function DerivativeCalculation() {
    const derivativePoint = useVar("derivativePoint", 1.5) as number;
    const slope = fPrime(derivativePoint);
    const y0 = f(derivativePoint);

    return (
        <span>
            At x = {derivativePoint.toFixed(1)}, the function f(x) = x² has value{" "}
            <strong>{y0.toFixed(2)}</strong>. The derivative f'(x) = 2x gives us{" "}
            <strong className="text-indigo-500">{slope.toFixed(1)}</strong>, which is exactly
            the slope of the tangent line at that point!
        </span>
    );
}

// ── Section Blocks ───────────────────────────────────────────────────────────
export const theDerivativeBlocks: ReactElement[] = [
    // Section Title
    <StackLayout key="layout-derivative-title" maxWidth="xl">
        <Block id="derivative-title" padding="md">
            <EditableH2 id="h2-derivative-title" blockId="derivative-title">
                The Derivative
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-derivative-intro" maxWidth="xl">
        <Block id="derivative-intro" padding="sm">
            <EditableParagraph id="para-derivative-intro" blockId="derivative-intro">
                Now we can finally define the derivative. The{" "}
                <InlineTooltip
                    id="tooltip-derivative"
                    tooltip="A function that gives the instantaneous rate of change of another function at every point."
                >
                    derivative
                </InlineTooltip>{" "}
                of a function f(x) is a new function, written f'(x) or df/dx, that tells us the
                instantaneous rate of change of f at each value of x. In other words, the derivative
                gives us the slope of the tangent line at every point on the curve.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Formal definition
    <StackLayout key="layout-derivative-definition" maxWidth="xl">
        <Block id="derivative-definition" padding="sm">
            <EditableParagraph id="para-derivative-def" blockId="derivative-definition">
                The formal definition uses the limit we discovered earlier:
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Definition formula
    <StackLayout key="layout-derivative-formula-def" maxWidth="xl">
        <Block id="derivative-formula-def" padding="md">
            <FormulaBlock
                latex="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}"
                colorMap={{}}
            />
        </Block>
    </StackLayout>,

    // Example heading
    <StackLayout key="layout-derivative-example-heading" maxWidth="xl">
        <Block id="derivative-example-heading" padding="sm">
            <EditableH3 id="h3-derivative-example" blockId="derivative-example-heading">
                A Worked Example
            </EditableH3>
        </Block>
    </StackLayout>,

    // Example explanation
    <StackLayout key="layout-derivative-example" maxWidth="xl">
        <Block id="derivative-example" padding="sm">
            <EditableParagraph id="para-derivative-example" blockId="derivative-example">
                Let us find the derivative of{" "}
                <InlineFormula latex="f(x) = x^2" colorMap={{}} />. We use the definition:
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Step 1
    <StackLayout key="layout-derivative-step1" maxWidth="xl">
        <Block id="derivative-step1" padding="sm">
            <FormulaBlock
                latex="f'(x) = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h}"
                colorMap={{}}
            />
        </Block>
    </StackLayout>,

    // Step 2
    <StackLayout key="layout-derivative-step2" maxWidth="xl">
        <Block id="derivative-step2" padding="sm">
            <FormulaBlock
                latex="= \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h} = \lim_{h \to 0} \frac{2xh + h^2}{h}"
                colorMap={{}}
            />
        </Block>
    </StackLayout>,

    // Step 3
    <StackLayout key="layout-derivative-step3" maxWidth="xl">
        <Block id="derivative-step3" padding="sm">
            <FormulaBlock
                latex="= \lim_{h \to 0} (2x + h) = 2x"
                colorMap={{}}
            />
        </Block>
    </StackLayout>,

    // Result
    <StackLayout key="layout-derivative-result" maxWidth="xl">
        <Block id="derivative-result" padding="sm">
            <EditableParagraph id="para-derivative-result" blockId="derivative-result">
                So for f(x) = x², the derivative is{" "}
                <InlineSpotColor varName="derivativePoint" color="#8E90F5">
                    f'(x) = 2x
                </InlineSpotColor>
                . This means at any point x, the slope of the tangent is twice the x-value!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive exploration
    <SplitLayout key="layout-derivative-exploration" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="derivative-explore-text" padding="sm">
                <EditableParagraph id="para-derivative-explore" blockId="derivative-explore-text">
                    Let us verify this! The graph shows both the original function f(x) = x²
                    (grey curve) and its derivative f'(x) = 2x (indigo line). Drag the{" "}
                    <span className="text-teal-500 font-medium">teal point</span> along the curve,
                    or scrub the x value here:{" "}
                    <InlineScrubbleNumber
                        varName="derivativePoint"
                        {...numberPropsFromDefinition(getVariableInfo("derivativePoint"))}
                    />
                </EditableParagraph>
            </Block>
            <Block id="derivative-calculation" padding="sm">
                <EditableParagraph id="para-derivative-calc" blockId="derivative-calculation">
                    <DerivativeCalculation />
                </EditableParagraph>
            </Block>
            <Block id="derivative-observe" padding="sm">
                <EditableParagraph id="para-derivative-observe" blockId="derivative-observe">
                    The{" "}
                    <span className="text-indigo-500 font-medium">indigo point</span> shows the
                    value of the derivative at your chosen x. Notice how it sits exactly on the
                    derivative curve! The{" "}
                    <span className="text-amber-500 font-medium">dashed yellow line</span>{" "}
                    connects the two points, visually showing that the derivative value equals
                    the tangent slope.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="derivative-viz" padding="sm" hasVisualization>
            <DerivativeExplorerViz />
        </Block>
    </SplitLayout>,

    // Summary
    <StackLayout key="layout-derivative-summary" maxWidth="xl">
        <Block id="derivative-summary" padding="sm">
            <EditableParagraph id="para-derivative-summary" blockId="derivative-summary">
                Congratulations! You have discovered the fundamental idea of differential calculus.
                The derivative measures instantaneous change. It tells us how fast a quantity is
                changing at each moment. This powerful concept appears everywhere in science,
                engineering, economics, and beyond.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question
    <StackLayout key="layout-derivative-question" maxWidth="xl">
        <Block id="derivative-question" padding="md">
            <EditableParagraph id="para-derivative-question" blockId="derivative-question">
                For the function f(x) = x², the derivative at x = 2 is f'(2) = 2 × 2 ={" "}
                <InlineFeedback
                    varName="answerDerivativeValue"
                    correctValue="4"
                    position="terminal"
                    successMessage="— exactly right! The tangent line at x=2 has slope 4"
                    failureMessage="— not quite"
                    hint="Substitute x=2 into the derivative formula f'(x) = 2x"
                >
                    <InlineClozeInput
                        varName="answerDerivativeValue"
                        correctAnswer="4"
                        {...clozePropsFromDefinition(getVariableInfo("answerDerivativeValue"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
