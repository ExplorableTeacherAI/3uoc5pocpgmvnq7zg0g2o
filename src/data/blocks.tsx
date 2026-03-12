import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1 } from "@/components/atoms";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import section blocks
import { speedProblemBlocks } from "./sections/SpeedProblem";
import { gettingCloserBlocks } from "./sections/GettingCloser";
import { slopeOfCurveBlocks } from "./sections/SlopeOfCurve";
import { theDerivativeBlocks } from "./sections/TheDerivative";

/**
 * ------------------------------------------------------------------
 * DERIVATIVES LESSON
 * ------------------------------------------------------------------
 * Understanding what a derivative means through interactive
 * explorations of speed, limits, and slopes.
 */

// Lesson Title Block
const titleBlock: ReactElement[] = [
    <StackLayout key="layout-lesson-title" maxWidth="xl">
        <Block id="lesson-title" padding="lg">
            <EditableH1 id="h1-lesson-title" blockId="lesson-title">
                Understanding Derivatives
            </EditableH1>
        </Block>
    </StackLayout>,
];

export const blocks: ReactElement[] = [
    ...titleBlock,
    ...speedProblemBlocks,
    ...gettingCloserBlocks,
    ...slopeOfCurveBlocks,
    ...theDerivativeBlocks,
];
