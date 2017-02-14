import { IFReport } from './FReport';
import { IFSection } from './FSection';
export declare class FElement {
    protected _report: IFReport;
    private _section;
    private _pageInfo;
    private _fields;
    private _key;
    private _autoWrap;
    private _onBeforePrint;
    private _visible;
    private _value;
    protected _identifiers: any;
    protected _definition: any;
    protected _style: any;
    constructor(definition: any);
    init(report: IFReport, section: IFSection, definition: any): this;
    value(): any;
    draw(row: [any]): string;
    getStyleAttribute(): string;
    onComplete(): void;
}
