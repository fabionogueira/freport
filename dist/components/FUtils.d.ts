export declare class FUtils {
    static px2cm(px: number): number;
    static cm2px(cm: number): number;
    static getPxPerCm(): number;
    static dispatch(context: any, events: any, event: string, p1?: any, p2?: any, p3?: any): void;
    static getProperties(el: HTMLElement): {
        name: string;
        type: string;
        value: number;
    }[];
    static compilerTemplate(template: string, internalIdentifiers: [string], userIdentifiers: [string]): any;
}
