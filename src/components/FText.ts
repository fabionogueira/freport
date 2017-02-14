import {FElement} from "./FElement";

let idIndex = 0;

export class FText extends FElement{
    private _ids:[number]=<any>[];

    draw(data:any){
        let id='';

        if (this._definition.$fields['${#pages}']){
            this._ids.push(++idIndex);
            id = `id="idIndex${idIndex}" `;
        }

        return `<div ${id}class="element statictext" data-element="Text" ${this.getStyleAttribute()}>${this.value()}</div>`;
    }

    onComplete(){
        let doc = this._report.getDocument();
        let obj = this._report.getInternalVars();

        //substitui as variáveis __pages__ pelo seu valor
        this._ids.forEach((i:number)=>{
            let e= doc.getElementById(`idIndex${i}`);
            e.innerHTML = e.innerHTML.replace('__pages__', obj['#pages']);
        });
    }
} 
