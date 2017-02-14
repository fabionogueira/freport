import {FElement} from "./FElement";

export class FRect extends FElement{
    draw(data:[any]){
        return `<div class="element rect" ${this.getStyleAttribute()}></div>`;
    }
} 
