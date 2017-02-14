// FElement.ts

import {IFReport, IPageInfo} from './FReport';
import {IFSection} from './FSection';
import {FUtils} from './FUtils';

export class FElement{
    protected _report:IFReport;
    private _section:IFSection;
    private _pageInfo:IPageInfo;
    private _fields:[string] = <[string]>[];
    private _key:any;
    private _autoWrap:any;
    private _onBeforePrint:any;
    private _visible:any;
    private _value:string;
    
    protected _identifiers:any;
    protected _definition:any;
    protected _style:any;

    constructor(definition:any){
    }

    init (report:IFReport, section:IFSection, definition:any){
        let a, k:string, i:number, fn:Function, style:string, code='';        
        
        style = (definition.x===undefined      ? '' : `left:${definition.x}px;`) +
                (definition.y===undefined      ? '' : `top:${definition.y}px;`) +
                (definition.width===undefined  ? '' : `width:${definition.width}px;`) +
                (definition.height===undefined ? '' : `height:${definition.height}px;`);
        
        for (k in definition){
            fn = (<any>CssPropertiesConverter)[k];
            if (fn){
                style += (fn(definition[k]) + ';');
            }
        }
        
        if (definition.value){
            this._identifiers  = report.getIdentifiers();

            //cria definition.$fields
            definition.$fields = {};
            (definition.value.match(/\${[^}]+}/g) || []).forEach((field:string)=>{definition.$fields[field]=1;});
            
            definition.value = definition.value.replace('${#pages}', '__pages__');

            //cria definition.$getValue
            definition.$getValue = FUtils.compilerTemplate(definition.value, this._identifiers.internal, this._identifiers.userDef);
            (definition.value.match(/\${[^}]+}/g) || []).forEach((field:string)=>{
                this._fields.push(field.replace('${', '').replace('}',''));
            });
        }

        this._report = report;
        this._section= section;

        this._pageInfo      = report.getPageInfo();
        this._definition    = definition;
        this._key           = definition.key;
        this._autoWrap      = definition.autoWrap;
        this._onBeforePrint = definition.onBeforePrint;
        this._visible       = definition.visible;
        this._value         = definition.value || '';
        this._style         = style + (definition.style ? (';'+definition.style) : '');
        
        return this;
    }

    value(){
        return this._definition.$getValue ? 
               this._definition.$getValue( this._report.getInternalVars(), this._report.getUserVars(), this._report.getRow()) : 
               this._value;
    }

    draw(row:any){
        return '<pre>draw not implemented</pre>';
    }

    getStyleAttribute(){
        return this._style ? `style="${this._style}"` : '';
    }

    onComplete(){}
}
    
let CssPropertiesConverter = {
    "fontBold": function(value:string):string{
        return "font-weight:" + (value ? "bold" : "normal");
    },
    "fontSize": function(value:string):string{
        return "font-size:" + (value + "px");
    },
    "fontUnderline": function(value:string):string{
        return "text-decoration:" + (value ? "underline" : "normal");
    },
    "fontItalic": function(value:string):string{
        return "font-style:" + (value ? "italic" : "");
    },
    "textAlign": function(value:string):string{
        return "text-align:" + (value);
    },
    "background": function(value:string):string{
        return "background-color:" + value;
    },
    "borderStyle": function(value:string):string{
        return "border-style:" + value;
    },
    "borderWidth": function(value:string):string{
        return "border-width:" + (value + "px");
    },
    "borderColor": function(value:string):string{
        return "border-color:" + value;
    }
};


