### Installation
```
$ npm install freport --save
```
### Browser
##### Script tag
```html
<script src="node_modules/freport/dist/index.js"></script>
```
### Babel
Babel is a next generation JavaScript compiler. One of the features is the ability to use ES6/ES2015 modules now, even though browsers do not yet support this feature natively.

```javascript
import {FReport} from "freport";
```
### Browserify/Webpack
There are several ways to use Browserify and Webpack. For more information on using these tools, please refer to the corresponding project's documention. In the script, including jQuery will usually look like this...

```javascript
var FReport = require("freport");
```
### Example Usage (JavaScript)

```javascript
var freport = require('freport');
var report = new freport.FReport(document.querySelector(document.body));

var reportDataArray = [
    //fields: product, price, group
    {"product":"ARROZ",       "price": 15.0, "group":"ALIMENTAÇÃO"},
    {"product":"FEIJÃO",      "price":  8.0, "group":"ALIMENTAÇÃO"},
    {"product":"SABÃO EM PÓ", "price":  7.0, "group":"LIMPEZA"},
    {"product":"AMACIANTE",   "price": 14.0, "group":"LIMPEZA"},
    {"product":"CAMISA",      "price": 47.0, "group":"VESTUÁRIO"}
];
var reportDefinitionJSON = {
    page:{
        paper: 'A4',
        orientation: 'portrait', //portrait|landscape default=portrait
        marginLeft: 2, //default 0
        marginRight: 2,//default 0
        marginTop: 3,  //default 0
        marginBottom: 3//default 0
    },
    vars:{
        subtotal: 0,
        total: 0,
        "qtd-itens-grupo": 0
    },
    on:{
        //evento
        groupStart:function(row, vars){
            vars['qtd-itens-grupo'] = 0;
        }
    },
    groups:[
        {
            groupBy:'group',

            //cabeçalho do grupo
            header:{
                y:10,
                height: 40,
                style:sectionStyle+'background:#9E9E9E;',
                on:{
                    start: function(row,vars){
                        vars.subtotal = 0;
                    }
                },
                children: [
                    {type:"Text", y:12, x:30, value:'GRUPO: ${group}'},
                    {type:"Text", value:'group header', style:descriptionStyle}
                ]
            },

            //rodapé do grupo
            footer:{
                y:4,
                height: 40,
                style:sectionStyle,
                on:{
                    start: function(row, vars){
                        
                    }
                },
                children: [
                    {type:"Text", y:12, x:40, value:'<b>TOTAL: R$ ${subtotal}, QUANTIDADE: ${qtd-itens-grupo}</b>'},
                    {type:"Text", value:'group footer', style:descriptionStyle}
                ]
            }
        }
    ],
    sections:{
        //título do relatório
        title:{
            height: 80,
            style: sectionStyle,
            children: [
                {type:"Text", y:35, x:240, style:"font-weight:bold;color:red", value:'TÍTULO DO RELATÓRIO'},
                {type:"Text", value:'report header', style:descriptionStyle}
            ]
        },

        //título da página
        header:{
            y:4,
            height: 40,
            style: sectionStyle,
            children: [
                {type:"Text", y:12, x:250, value:'TÍTULO DA PÁGINA'},
                {type:"Text", value:'page header', style:descriptionStyle}
            ]
        },

        //detalhes da página
        detail:{
            y:4,
            height: 40,
            style: sectionStyle,
            on:{
                start: function(row, vars){
                    vars['qtd-itens-grupo']++;
                    vars.total += row['price'];
                    vars.subtotal += row['price'];
                }
            },
            children: [
                {type:"Text", y:12, x:40, value:'${product} : R$ ${price}'},
                {type:"Text", value:'detail', style:descriptionStyle}
            ]
        },

        //rodapé da página
        footer:{
            height: 40,
            style: sectionStyle,
            children: [
                {type:"Text", y:12, x:10, value:'Página ${#page}/${#pages}'},
                {type:"Text", value:'page footer', style:descriptionStyle}
            ]
        },
        
        //sumário
        summary:{
            y:10,
            height: 40,
            style: sectionStyle,
            on:{
                start: function(row, vars){
                    //row['total'] = '<b>'+vars.total+'</b>';
                }
            },
            children:[
                {type:"Text", y:12, x:10, value:'<b>TOTAL GERAL: R$${total}</b>'},
                {type:"Text", value:'report summary', style:descriptionStyle}
            ]
        }
    }
};

report.definition(reportDefinitionJSON);
report.draw(reportDataArray);
```

### Example Usage (TypeScript)

```javascript
import {FReport} from "freport";
let report = new FReport(document.querySelector(document.body));

report.definition(reportDefinitionJSON);
report.draw(reportDataArray);
```