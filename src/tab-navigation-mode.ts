/**
 * Specifies the tabbing behavior across tab stops for a tabbing sequence within a container.
 */
export enum TabNavigationMode {
    /**
     * Tab indexes are considered on the local subtree only
     * inside this container.
     */
    Local = 0,
    /**
     * Focus returns to the first or the last keyboard navigation stop inside of
     * a container when the first or last keyboard navigation stop is reached.
     */
    Cycle,
    /**
     * The container and all of its child elements as a whole
     * receive focus only once.
     */
    Once,
}
