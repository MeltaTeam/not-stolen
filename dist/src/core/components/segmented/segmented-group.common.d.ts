import { MbscSegmentedGroupOptions, SegmentedGroupBase } from './segmented-group';
export declare function template(s: MbscSegmentedGroupOptions, inst: SegmentedGroupBase, content: any): any;
/**
 * The SegmentedGroup.
 *
 * Usage:
 *
 * ```
 * <SegmentedGroup>...</SegmentedGroup>
 * ```
 */
export declare class SegmentedGroup extends SegmentedGroupBase {
    protected _template(s: MbscSegmentedGroupOptions): any;
}
