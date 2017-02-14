var report1 = (function(){
    var data   = [
        {"product":"ARROZ",       "price": 15.0, "group":"ALIMENTAÇÃO"},
        {"product":"FEIJÃO",      "price":  8.0, "group":"ALIMENTAÇÃO"},
        {"product":"CARNE",       "price": 25.0, "group":"ALIMENTAÇÃO"},
        {"product":"BISCOITO",    "price":  4.0, "group":"ALIMENTAÇÃO"},
        {"product":"SABÃO EM PÓ", "price":  7.0, "group":"LIMPESA"},
        {"product":"AMACIANTE",   "price": 14.0, "group":"LIMPESA"},
        {"product":"SACO DE LIXO","price": 10.0, "group":"LIMPESA"},
        {"product":"VASSOURA",    "price":  4.0, "group":"LIMPESA"},
        {"product":"CAMISA",      "price": 47.0, "group":"VESTUÁRIO"},
        {"product":"CALÇA",       "price": 120.0,"group":"VESTUÁRIO"},
    ];
    var descriptionStyle = 'font-size:9px;color:#FFFFFF;background:#5A5A5A;padding:2px 6px;right:0;';
    var sectionStyle = 'border:dotted 1px #A7A7A7;'
    var definition = {
        page:{
            paper: 'A4',
            orientation: 'portrait',
            marginLeft: 2,
            marginRight: 2,
            marginTop: 3,
            marginBottom: 3
        },
        vars:{
            subtotal: 0,
            total: 0,
            "qtd-itens-grupo": 0
        },
        on:{
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
                    {type:"Text", y:35, x:240, value:'<b>TÍTULO DO RELATÓRIO</b>'},
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

    return {
        data:data,
        definition: definition
    }
}());