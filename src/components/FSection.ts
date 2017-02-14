// FSection.ts

import {FUtils} from "./FUtils";
import {FReport} from "./FReport";
import {FElement} from "./FElement";
import {FText} from "./FText";
import {FImage} from "./FImage";
//import {JsrRect} from "./jsr-rect";
//import {JsrLine} from "./jsr-line";
//import {JsrElipse} from "./jsr-elipse";
//import {JsrBreak} from "./jsr-break";

let FElements = {
    "Text"  : FText,
    "Image" : FImage,
    //Line  = JsrLine,
    //Elipse= JsrElipse,
    //Image = JsrImage,
    //Break = JsrBreak
};

export class FSection{
    private _events:any;
    private _report:FReport;
    private _type:string;
    private _width:number;
    private _x:number;
    private _y:number;
    private _definition:any;
    private _children:[FElement];
    
    constructor(report:FReport, definition:any, type:string){
        let i, j, t,
            felement:FElement,
            TFElement:any, 
            children=[], 
            pageInfo = report.getPageInfo();
        
        this._definition = definition;
        this._events     = {};
        this._report     = report;
        this._type       = type;
        this._width      = pageInfo.activeClientWidth;
        this._x          = pageInfo.marginLeft;
         
        if (!definition) return;

        if (definition.children){
            for (i=0; i<definition.children.length; i++){
                t        = definition.children[i].type;
                j        = definition.children[i];
                felement = null;
                TFElement= (<any>FElements)[t];

                if (TFElement){
                    felement = new TFElement(j);
                    felement.init(report, this, j);

                    if ((<any>felement).onComplete){

                    }

                    children.push(felement);
                }

            }

            this._children = <[FElement]>children;
        }

        if (definition.on){
            this._events = definition.on;
        }    
    }

    private dispatchEvent(eventName:string, data:any, vars:any){
        FUtils.dispatch(this, this._events, eventName, data, vars);
    }   

    onComplete(){
        if (this._children){
            this._children.forEach((element:FElement)=>{
                element.onComplete();
            });
        }
    }

    draw(data:any){
        let i,y,s,vars,py,
            definition:any   = this._definition,
            type:string      = this._type,
            style:string     = '',
            html1:string     = '',
            html2:string     = '',
            html3:string     = '',
            report:FReport = this._report,
            children:[FElement] = this._children;
        
        if (definition){
            let pageInfo = report.getPageInfo();

            //se não cabe na página
            if (!this.fitInPage(definition.height)){
                report.addPage();
            }

            py   = pageInfo.activePageY;
            vars = report.getUserVars();

            this.dispatchEvent('start', data, vars);
            
            if (type==='footer'){
                y = 0;
                this._y = pageInfo.activeFooterY;
                s = 'top:' + (pageInfo.activeFooterY);
            }else{
                y = (definition ? definition.y || 0 : 0);
                this._y = py + y;
                s = 'top:' + (this._y);
            }
            
            style = `style="${(definition.style ? definition.style+';' : '')}`;
            html1 = `<div class="section ${type}" ${style}`;
            html2 = `px;left:${this._x}px;height:${definition.height}px;width:${this._width}px">
                    ${(report.designerMode ? '<div class="section-desiger section-desiger-' + type + '"></div>' : '')}`;
            
            for (i=0; i<children.length; i++){
                html3 += children[i].draw(data);
            }
            
            //se não cabe na página
            if (!this.fitInPage(definition.height+y)){
                report.addPage();
                s = 'top:' + (py + y);
            }
            
            report.setHTML( report.getHTML() + (html1 + s + html2 + html3 + '</div>'));
            pageInfo.activePageY = py + (definition.height+y);
            
            this.dispatchEvent('end', data, vars);
        }
    }

    fitInPage(height:number){
        let pageInfo = this._report.getPageInfo();
        return (pageInfo.activePageY + height > pageInfo.activeFooterY ? false : true);
    }

    getHeight(){
        return this._definition ? this._definition.height : 0;
    }

}

export interface IFSection extends FSection{}
