/**
 * Variables Configuration
 * =======================
 *
 * CENTRAL PLACE TO DEFINE ALL SHARED VARIABLES
 *
 * This file defines all variables that can be shared across sections.
 * AI agents should read this file to understand what variables are available.
 *
 * USAGE:
 * 1. Define variables here with their default values and metadata
 * 2. Use them in any section with: const x = useVar('variableName', defaultValue)
 * 3. Update them with: setVar('variableName', newValue)
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

/**
 * =====================================================
 * 🎯 DERIVATIVES LESSON VARIABLES
 * =====================================================
 */
export const variableDefinitions: Record<string, VariableDefinition> = {
    // ─────────────────────────────────────────
    // SECTION 1: The Speed Problem
    // ─────────────────────────────────────────
    startTime: {
        defaultValue: 1,
        type: 'number',
        label: 'Start Time',
        description: 'Starting time point for measuring speed',
        unit: 's',
        min: 0,
        max: 4,
        step: 0.5,
        color: '#62D0AD',
    },
    endTime: {
        defaultValue: 3,
        type: 'number',
        label: 'End Time',
        description: 'Ending time point for measuring speed',
        unit: 's',
        min: 1,
        max: 5,
        step: 0.5,
        color: '#8E90F5',
    },
    speedHighlight: {
        defaultValue: '',
        type: 'linkedHighlight',
        label: 'Speed Highlight',
        description: 'Active highlight for speed visualization',
        color: '#62D0AD',
    },

    // ─────────────────────────────────────────
    // SECTION 2: Getting Closer
    // ─────────────────────────────────────────
    intervalSize: {
        defaultValue: 2,
        type: 'number',
        label: 'Interval Size',
        description: 'Size of the time interval for measuring speed',
        unit: 's',
        min: 0.1,
        max: 3,
        step: 0.1,
        color: '#F7B23B',
    },
    fixedPoint: {
        defaultValue: 2,
        type: 'number',
        label: 'Fixed Point',
        description: 'The fixed time point we are approaching',
        unit: 's',
        min: 1,
        max: 4,
        step: 0.5,
        color: '#AC8BF9',
    },

    // ─────────────────────────────────────────
    // SECTION 3: Slope of a Curve
    // ─────────────────────────────────────────
    tangentPoint: {
        defaultValue: 2,
        type: 'number',
        label: 'Tangent Point',
        description: 'X-coordinate where we draw the tangent line',
        unit: '',
        min: 0.5,
        max: 4,
        step: 0.1,
        color: '#62D0AD',
    },
    secantDistance: {
        defaultValue: 1.5,
        type: 'number',
        label: 'Secant Distance',
        description: 'Distance between secant line points',
        unit: '',
        min: 0.1,
        max: 2,
        step: 0.1,
        color: '#F7B23B',
    },
    slopeHighlight: {
        defaultValue: '',
        type: 'linkedHighlight',
        label: 'Slope Highlight',
        description: 'Active highlight for slope visualization',
        color: '#8E90F5',
    },

    // ─────────────────────────────────────────
    // SECTION 4: The Derivative
    // ─────────────────────────────────────────
    derivativePoint: {
        defaultValue: 1.5,
        type: 'number',
        label: 'Derivative Point',
        description: 'X-coordinate for exploring the derivative',
        unit: '',
        min: -2,
        max: 3,
        step: 0.1,
        color: '#62D0AD',
    },
    derivativeHighlight: {
        defaultValue: '',
        type: 'linkedHighlight',
        label: 'Derivative Highlight',
        description: 'Active highlight for derivative visualization',
        color: '#62D0AD',
    },

    // ─────────────────────────────────────────
    // ASSESSMENT QUESTIONS
    // ─────────────────────────────────────────
    answerSpeedFormula: {
        defaultValue: '',
        type: 'text',
        label: 'Speed Formula Answer',
        description: 'Student answer for the speed formula question',
        placeholder: '???',
        correctAnswer: 'distance',
        color: '#62D0AD',
    },
    answerInstantaneous: {
        defaultValue: '',
        type: 'select',
        label: 'Instantaneous Answer',
        description: 'Student answer about instantaneous speed',
        placeholder: '???',
        correctAnswer: 'smaller',
        options: ['larger', 'smaller', 'the same'],
        color: '#8E90F5',
    },
    answerTangentSlope: {
        defaultValue: '',
        type: 'text',
        label: 'Tangent Slope Answer',
        description: 'Student answer for what tangent slope represents',
        placeholder: '???',
        correctAnswer: 'instantaneous',
        color: '#F7B23B',
    },
    answerDerivativeValue: {
        defaultValue: '',
        type: 'text',
        label: 'Derivative Value Answer',
        description: 'Student answer for derivative calculation',
        placeholder: '???',
        correctAnswer: '4',
        color: '#AC8BF9',
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze input props for InlineClozeInput from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 * Extracts the `color` field.
 *
 * @example
 * <InlineSpotColor
 *     varName="radius"
 *     {...spotColorPropsFromDefinition(getVariableInfo('radius'))}
 * >
 *     radius
 * </InlineSpotColor>
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 * Extracts the `color` and `bgColor` fields.
 *
 * @example
 * <InlineLinkedHighlight
 *     varName="activeHighlight"
 *     highlightId="radius"
 *     {...linkedHighlightPropsFromDefinition(getVariableInfo('activeHighlight'))}
 * >
 *     radius
 * </InlineLinkedHighlight>
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 *
 * Takes an array of variable names and returns the config map expected by
 * `<FormulaBlock variables={...} />`.
 *
 * @example
 * import { scrubVarsFromDefinitions } from './variables';
 *
 * <FormulaBlock
 *     latex="\scrub{mass} \times \scrub{accel}"
 *     variables={scrubVarsFromDefinitions(['mass', 'accel'])}
 * />
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
