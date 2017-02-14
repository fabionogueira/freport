let pxPerCm:number;

export class FUtils{
    
    static px2cm(px:number) {
        return px / FUtils.getPxPerCm();
    }

    static cm2px(cm:number) {
        return cm * FUtils.getPxPerCm();
    }
    
    static getPxPerCm(){
        let d;
            
        if (pxPerCm===undefined){
            d = document.createElement('div');
            d.style.cssText = "position:absolute;top:-1000cm;left:-1000cm;height:1000cm;width:1000cm;";
            document.body.appendChild(d);
            pxPerCm = d.offsetHeight / 1000;
            document.body.removeChild(d);
        }
        
        return pxPerCm;
    }

    static dispatch(context:any, events:any, event:string, p1?:any, p2?:any, p3?:any){
        let f = <Function>events[event];
        
        if (f){
            f.call(context,p1, p2, p3);
        }
    }

    static getProperties(el:HTMLElement){
        return  [
            {name:"height", type:'int', value: el.offsetHeight}
        ];
    }

    static compilerTemplate(template:string, internalIdentifiers:[string], userIdentifiers:[string]) {
        var i, params:[any], p = '', parts1, parts2, code = '', v;

        parts1 = template.split('}');
        for (i = 0; i < parts1.length; i++) {
            parts2 = parts1[i].split('${');
            if (parts2.length === 2) {
                v = internalIdentifiers.indexOf(parts2[1])!=-1  ? `internalIdentifiers["${parts2[1]}"]`  : 
                    userIdentifiers.indexOf(parts2[1])!=-1 ? `userIdentifiers["${parts2[1]}"]` : 
                    `data["${parts2[1]}"]`;

                code += (`${p}'${parts2[0]}'+(${v})`);  //(p + "'" + parts2[0] + "'+(" + v + ")");
            } else {
                code += (`${p}'${parts2[0]}'`);
            }
            p = '+';
        }

        params = ['internalIdentifiers','userIdentifiers', 'data', 'return ' + code + ';'];

        return Function.apply(null, params);
    };
}