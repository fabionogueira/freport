export declare class FReport {
    private _html;
    designerMode: boolean;
    private _pageInfo;
    private _dataRows;
    private _dataRow;
    private _dataRowIndex;
    private _s_title;
    private _s_header;
    private _s_detail;
    private _s_footer;
    private _s_summary;
    private _iframe;
    private _col;
    private _cols;
    private _userVarValues;
    private _userVarNames;
    private _internalVarValues;
    private _internalVarNames;
    private _fields;
    private _events;
    private _groups;
    constructor(container: HTMLElement);
    private dispatchEvent(eventName);
    private updateInternalVars();
    definition(definition: any): FReport;
    zoom(percent: number): void;
    getDocument(): Document;
    print(): void;
    addPage(drawPageHeader?: boolean, checkCollumn?: boolean): void;
    endPage(): void;
    getHTML(): string;
    setHTML(html: string): void;
    getPageInfo(): IPageInfo;
    getRow(): any;
    getUserVars(): {};
    getInternalVars(): any;
    getIdentifiers(): {
        internal: any;
        userDef: any;
    };
    draw(rows: [any]): string;
    drawGroup(rows: [any], groupIndex: number): void;
}
export interface IPageInfo {
    orientation: string;
    width: number;
    height: number;
    marginRight: number;
    marginTop: number;
    marginLeft: number;
    marginBottom: number;
    activeClientHeight: number;
    activeClientWidth: number;
    activeFooterY: number;
    activePageX: number;
    activePageY: number;
    activePageNumber: number;
}
export interface IFReport extends FReport {
}
