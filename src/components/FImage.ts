import {FElement} from "./FElement";

export class FImage extends FElement{
    draw(data:[any]){     
        return `<div class="element image" ${this.getStyleAttribute()}>
                    <img src="${this.value()}" style="width:100%;height:100%"/>
                </div>`;
    }
} 
