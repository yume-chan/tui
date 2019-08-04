/**
 * Indicates where an element should be displayed on the horizontal axis
 * relative to the allocated layout slot of the parent element.
 */
export enum HorizontalAlignment {
    /**
     * An element aligned to the left of the layout slot for the parent element.
     */
    Left = 0,
    /**
     * An element aligned to the center of the layout slot for the parent element.
     */
    Center,
    /**
     * An element aligned to the right of the layout slot for the parent element.
     */
    Right,
    /**
     * An element stretched to fill the entire layout slot of the parent element.
     */
    Stretch,
}
