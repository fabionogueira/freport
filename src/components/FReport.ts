import {FUtils} from "./FUtils";
import {FSection} from "./FSection";
import {FElement} from "./FElement";

export class FReport{
    
    private _html:string;
    public designerMode:boolean;

    //IPageInfo
    private _pageInfo:IPageInfo;

    //informações sobre dados
    private _dataRows:[any];      //array de dados
    private _dataRow:any;         //linha atual de dados
    private _dataRowIndex:number; //índice da linha atual de dados

    //seções
    private _s_title  : FSection; //cabeçalho do relatório
    private _s_header : FSection; //cabeçalho da página
    private _s_detail : FSection; //detalhes da página
    private _s_footer : FSection; //rodapé da página
    private _s_summary: FSection; //rodapé do relatório

    private _iframe:HTMLIFrameElement;

    //variáveis de controle local
    private _col:number;
    private _cols:number;
    private _userVarValues={};
    private _userVarNames=<any>[];     //lista de nomes de variáveis definidas pelo usuário
    private _internalVarValues:any={};
    private _internalVarNames=<any>['#page', '#pages']; //lista de variáveia internas
    private _fields={};
    private _events={};
    private _groups:[any];
    
    constructor(container:HTMLElement){
        let div = document.createElement('div');
        
        this._iframe = document.createElement('iframe');
        this._pageInfo = <IPageInfo>{};

        this._iframe.style.cssText = 'position:absolute;border:none;width:100%;height:100%';
        div.style.cssText          = 'position:relative;border:solid 1px #c0c0c0;width:100%;height:100%';
        
        div.appendChild(this._iframe);
        container.appendChild(div);
    }

    private dispatchEvent(eventName:string){
        FUtils.dispatch(this, this._events, eventName, this._dataRow, this._userVarValues);
    }

    private updateInternalVars(){
        this._internalVarValues['#page'] = this._pageInfo.activePageNumber;
        this._internalVarValues['#pages'] = this._pageInfo.activePageNumber;
    }

    definition(definition:any):FReport{
        let i, g, go, p,
            sizes = {
                'A4':[21, 29.7] //794px = 21cm / 1123px = 29.7cm
            };;

        p = (<any>sizes)[definition.page.paper];

        definition.page.marginLeft   = definition.page.marginLeft   || 0;
        definition.page.marginRight  = definition.page.marginRight  || 0;
        definition.page.marginTop    = definition.page.marginTop    || 0;
        definition.page.marginBottom = definition.page.marginBottom || 0;

        this._userVarValues = definition.vars || {};
        this._userVarNames = Object.keys(definition.vars || {});
        this._events = definition.on || {};
        this._html = '';
        this._col = 1;
        this._cols = definition.page.collumns;

        this._pageInfo.activePageX = 0;
        this._pageInfo.activePageY = 0;
        this._pageInfo.activePageNumber = 0;
        this._pageInfo.orientation = definition.page.orientation || 'portrait';
        this._pageInfo.width = p ? p[definition.page.orientation=='ladscape'?1:0] : definition.page.width;
        this._pageInfo.height= p ? p[definition.page.orientation=='ladscape'?0:1] : definition.page.height;
        this._pageInfo.marginLeft  = FUtils.cm2px(definition.page.marginLeft);
        this._pageInfo.marginRight = FUtils.cm2px(definition.page.marginRight);
        this._pageInfo.marginTop   = FUtils.cm2px(definition.page.marginTop);
        this._pageInfo.marginBottom= FUtils.cm2px(definition.page.marginBottom);
        this._pageInfo.activeClientHeight = null;
        this._pageInfo.activeClientWidth = FUtils.cm2px(this._pageInfo.width) - this._pageInfo.marginLeft - this._pageInfo.marginRight;
        this._pageInfo.activeFooterY = null;

        this._dataRows = <[any]>[];
        this._dataRow = null;
        this._dataRowIndex = 0;
        this._groups = <[any]>[];
        this._s_title  = new FSection(this, definition.sections.title,  'title');  //cabeçalho do relatório
        this._s_header = new FSection(this, definition.sections.header, 'header'); //cabeçalho da página
        this._s_detail = new FSection(this, definition.sections.detail, 'detail'); //detalhes da página
        this._s_footer = new FSection(this, definition.sections.footer, 'footer'); //rodapé da página
        this._s_summary= new FSection(this, definition.sections.summary,'summary');//rodapé do relatório
        
        this.updateInternalVars();

        if (definition.groups){
            for (i=0; i<definition.groups.length; i++){
                g = definition.groups[i];
                if (g.header || g.footer){
                    go = {groupBy:g.groupBy, header:null, footer:null};
                    if (g.header){
                        go.header = new FSection(this, g.header, 'sheader');
                    }
                    if (g.footer){
                        go.footer = new FSection(this, g.footer, 'sfooter');
                    }
                    this._groups.push(go);
                }
            }
        }

        return this;
    }

    zoom(percent:number){
        this._iframe.contentDocument.body.style['zoom'] = percent + '%';
    }

    getDocument(){
        return this._iframe.contentDocument;
    }

    print(){
        this._iframe.contentWindow.print();
    }

    addPage(drawPageHeader?:boolean, checkCollumn?:boolean){
        this._pageInfo.activePageY = this._pageInfo.marginTop;
        
        //TODO: implementar colunas
        if (checkCollumn===true){
            if (this._col<this._cols){
                this._col++;
            }
        }
        
        this.dispatchEvent('startPage');
        
        //encerra a página anterior
        if ( this._pageInfo.activePageNumber>0 ){
            this.endPage();
            this._html += '<div class="page-break"></div>';
        }

        this._pageInfo.activePageNumber++;
        this.updateInternalVars();
        this._html += `<div class="page" style="width:${this._pageInfo.width}cm;height:${this._pageInfo.height}cm">`;
        
        //desenha o cabeçalho da página
        if (drawPageHeader!==false){
            this._s_header.draw(this._dataRow);
        }
    }

    endPage(){
        this._pageInfo.activePageX = this._pageInfo.marginLeft;
        this._col = 1;

        //desenha o rodapé da página
        this._s_footer.draw(this._dataRow);//($this->attributes['pageFooterTop'] );
        
        //retorna ao topo da página
        this._pageInfo.activePageY = this._pageInfo.marginTop;
        this._html += '</div>';
        
        this.dispatchEvent('endPage');
    }

    getHTML(){
        return this._html;
    }

    setHTML(html:string){
        this._html = html;
    }

    getPageInfo():IPageInfo{
        return this._pageInfo;
    }

    getRow(){
        return this._dataRow;
    }

    getUserVars(){
        return this._userVarValues;
    }

    getInternalVars(){
        return this._internalVarValues;
    }

    getIdentifiers(){
        return {
            internal: this._internalVarNames,
            userDef : this._userVarNames
        }
    }

    draw(rows:[any]){
        let i, h, orientation;
        
        this._iframe.contentDocument.body.innerHTML = '';
        
        if (!rows){
            return;
        }
        
        h = FUtils.cm2px(this._pageInfo.height);

        this._dataRows = rows;
        this._dataRow = this._dataRows[0];
        
        this.dispatchEvent('start');
        
        this._pageInfo.activeClientHeight = h - this._pageInfo.marginBottom - this._pageInfo.marginTop;
        this._pageInfo.activeFooterY      = h - this._pageInfo.marginBottom - this._s_footer.getHeight();
        
        this.addPage(false, false);    //cria a primeira página do relatório, sem cabeçalho de página
            this._s_title.draw(this._dataRow);      //desenha o cabeçalho do relatório
            this._s_header.draw(this._dataRow);     //desenha o cabeçalho da primeira página
            
            //desenha o corpo do relatório
            if (this._groups.length>0){
                this.drawGroup(rows, 0);
            }else{
                for (i=0; i<rows.length; i++){
                    this._dataRow = rows[i];
                    this._s_detail.draw(this._dataRow);
                }
            }
            
            this._pageInfo.activePageX = this._pageInfo.marginLeft;
            this._s_summary.draw(this._dataRow); //desenha o rodapé do relatórios
        this.endPage();         //finaliza a página
        
        orientation = this._pageInfo.orientation=='landscape' ? '@media print{@page {size: landscape}}' : '';

        this._iframe.contentDocument.body.innerHTML = 
        `<style>
            *{
                -webkit-box-sizing:border-box;
                box-sizing:border-box;
                font:12pt sans-serif, Georgia, "Times New Roman", Times, serif;
            }
            body{padding:0;margin:0;}
            .page{position:relative; overflow:hidden; background:#fff;}
            .page-break{position:relative;height:1px;width:10px;overflow:hidden;margin-top:-1px;page-break-after: always;}
            .section{position:absolute; overflow:hidden}
            .section-desiger{position:absolute;left:0;right:0;top:0;bottom:0;border:dashed 1px #c0c0c0;}
            .section-desiger-title{border-color:red}
            .section-desiger-header{border-color:blue}
            .section-desiger-title{border-color:green}
            .section-desiger-detail{border-color:rgb(10, 165, 159)}
            .section-desiger-footer{border-color:rgb(189, 24, 253)}
            .section-desiger-summary{border-color:rgb(114, 2, 47)}
            .element{position:absolute}
            .rect{border-width:1px; border-color:#000; border-style:solid; width:100px; height:40px}

            @media screen {
                body{
                    background:rgb(244, 244, 244);
                }
                .page{
                    margin-top:10px;
                    margin-right:10px;
                    margin-left:10px;
                    box-shadow:1px 1px 4px rgba(161, 161, 161, 0.7);
                }
            }
            @page {
                margin: 0cm;
            }
            ${orientation}
        </style>
        ${this._html}`;

        this._s_title.onComplete();
        this._s_header.onComplete();
        this._groups.forEach((group:any)=>{if (group.header) group.header.onComplete();});
        this._s_detail.onComplete();
        this._s_footer.onComplete();
        this._groups.forEach((group:any)=>{if (group.footer) group.footer.onComplete();});
        this._s_summary.onComplete();
        
        this.dispatchEvent('end');

        return this._html;
    }

    drawGroup(rows:[any], groupIndex:number){
        let i, groups, groupByFieldName, groupByFieldValue, vars;
        
        groups = this._groups[groupIndex];
        
        if (groups){
            groupByFieldName = groups.groupBy;
            vars = this.getUserVars();

            for (i=0; i<rows.length; i++){
                this._dataRow = rows[i];
                
                this.dispatchEvent('groupStart');
                if (groups.header) groups.header.draw(this._dataRow);
                
                //TODO: desenhar subgrupos
                //this.drawGroup(rows)
                
                //desenha o detalhe enquando estiver dentro do mesmo grupo
                groupByFieldValue = this._dataRow[groupByFieldName];
                while (this._dataRow[groupByFieldName]===groupByFieldValue){
                    this._s_detail.draw(this._dataRow);
                    
                    //próximo registro
                    i++;
                    if (i<rows.length){
                        this._dataRow = rows[i];
                    }else{
                        break;
                    }
                }
                
                //deixa o ponteiro no último registro desenhado
                i--;
                this._dataRow = rows[i];
                
                if (groups.footer) groups.footer.draw(this._dataRow);
                this.dispatchEvent('groupEnd');
            }
        }
    }
}

export interface IPageInfo{
    orientation       : string;
    width             : number;
    height            : number;
    marginRight       : number;
    marginTop         : number;
    marginLeft        : number;
    marginBottom      : number;
    activeClientHeight: number; //altura da área de impressão da página
    activeClientWidth : number; //largura da área de impressão da página
    activeFooterY     : number; //valor y da seção(FSection) _s_footer
    activePageX       : number;
    activePageY       : number;
    activePageNumber  : number;
};

export interface IFReport extends FReport{}