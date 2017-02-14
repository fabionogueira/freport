import { FReport } from "./FReport";
export declare class FSection {
    private _events;
    private _report;
    private _type;
    private _width;
    private _x;
    private _y;
    private _definition;
    private _children;
    constructor(report: FReport, definition: any, type: string);
    private dispatchEvent(eventName, data, vars);
    onComplete(): void;
    draw(data: any): void;
    fitInPage(height: number): boolean;
    getHeight(): any;
}
export interface IFSection extends FSection {
}
