import {FElement} from "./FElement";

export class FLine extends FElement{
    draw(data:[any]){     
        let s = this._definition['stroke'] || '#000',
            sw= this._definition['stroke-width'] || 1;

        return `<div class="element line" ${this.getStyleAttribute()}>
                    <svg style="position:absolute" height="100%" width="100%">
                        <line x1="0" y1="0" x2="100%" y2="100%" style="stroke:${s}; stroke-width:${sw}px;"/>
                    </svg>
                </div>`;
    }
} 

