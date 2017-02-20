var report2 = (function(){
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
    var sectionStyle = 'border:dotted 1px #A7A7A7;';
    var table1 =
    '<table border="0" cellspacing="0" style="width:100%;font-weight:bold;">'+
        '<tr>'+
            '<td style="text-align:right;border-bottom:solid 1px"></td>'+
            '<td style="text-align:right;border-bottom:solid 1px">This Period</td>'+
            '<td style="text-align:right;border-bottom:solid 1px">Year-to-Date</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Beginning Account Value</td>'+
            '<td style="text-align:right;">9,234.81</td>'+
            '<td style="text-align:right;">0.00</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Additions</td>'+
            '<td style="text-align:right;">0.10</td>'+
            '<td style="text-align:right;">10,000.00</td>'+
        '</tr>'+
        '<tr>'+
            '<td style="font-weight:normal;padding-left:30px">Exchanges In</td>'+
            '<td style="font-weight:normal;text-align:right;">0.10</td>'+
            '<td style="font-weight:normal;text-align:right;">10,000.00</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Subtractions</td>'+
            '<td style="text-align:right;">0.20</td>'+
            '<td style="text-align:right;">-28.54</td>'+
        '</tr>'+
        '<tr>'+
            '<td style="font-weight:normal;padding-left:30px">Transaction Costs & Fees</td>'+
            '<td style="font-weight:normal;text-align:right;">0.20</td>'+
            '<td style="font-weight:normal;text-align:right;">-28.54</td>'+
        '</tr>'+
        '<tr>'+
            '<td style="border-bottom:solid 2px">Change in Investment Value</td>'+
            '<td style="text-align:right;border-bottom:solid 2px">-194.94</td>'+
            '<td style="text-align:right;border-bottom:solid 2px">-931.29</td>'+
        '</tr>'+
        '<tr>'+
            '<td style="padding-top:20px;font-weight:normal;padding-left:30px">Free Credit Balance</td>'+
            '<td style="padding-top:20px;font-weight:normal;text-align:right;"></td>'+
            '<td style="padding-top:20px;font-weight:normal;text-align:right;">$7,482.57</td>'+
        '</tr>'+
        '<tr>'+
            '<td colspan="3" style="font-weight:normal;padding:12px 0;font-size:13px;">Important disclosures: Past results do not guarantee future returns. All investments involve risk.</td>'+
        '</tr>'+
        '<tr>'+
            '<td colspan="3" style="font-weight:normal;padding:12px 0;">Income Summary</td>'+
        '</tr>'+
        '<tr>'+
            '<td style="text-align:right;border-bottom:solid 1px"></td>'+
            '<td style="text-align:right;border-bottom:solid 1px">This Period</td>'+
            '<td style="text-align:right;border-bottom:solid 1px">Year-to-Date</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Taxable</td>'+
            '<td></td>'+
            '<td></td>'+
        '</tr>'+
        '<tr>'+
            '<td style="border-bottom:solid 2px;font-weight:normal;padding-left:30px">Interest</td>'+
            '<td style="border-bottom:solid 2px;font-weight:normal;text-align:right;">0.06</td>'+
            '<td style="border-bottom:solid 2px;font-weight:normal;text-align:right;">0.31</td>'+
        '</tr>'+
        '<tr>'+
            '<td></td>'+
            '<td style="text-align:right;">$0.06</td>'+
            '<td style="text-align:right;">$0.31</td>'+
        '</tr>'+
    '</table>';

    var table2 =
    '<table border="0" cellspacing="0" style="width:100%;">'+
        '<tr>'+
            '<td style="border-bottom:solid 1px;font-weight:bold;">Holding Type</td>'+
            '<td style="text-align:right;border-bottom:solid 1px;font-weight:bold;">Value</td>'+
            '<td style="text-align:right;border-bottom:solid 1px;font-weight:bold;">Percent of Account</td>'+
        '</tr>'+
        '<tr>'+
            '<td style="">Core Account</td>'+
            '<td style="text-align:right;">7,482</td>'+
            '<td style="text-align:right;">83%</td>'+
        '</tr>'+
        '<tr>'+
            '<td style="border-bottom:solid 2px">Stocks</td>'+
            '<td style="text-align:right;border-bottom:solid 2px">1,557</td>'+
            '<td style="text-align:right;border-bottom:solid 2px">17%</td>'+
        '</tr>'+
        '<tr>'+
            '<td></td>'+
            '<td style="text-align:right;font-weight:bold;">9,039</td>'+
            '<td style="text-align:right;font-weight:bold;">100%</td>'+
        '</tr>'+
    '</table>';

    var definition = {
        page:{
            paper: 'A4',
            orientation: 'ladscape',
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
            marginBottom: 2
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
        sections:{
            //título do relatório
            title:{
                height: 625,
                children: [
                    {type:"Image", width:175, height:32, value:"logo.png"},
                    {type:"Text", style:"right:0;text-align:right", value:'<b>Account Summary</b><br/>Dec 1, 2015 to Dec 31, 2015'},

                    //coluna esquerda
                    {type:"Text", y:120, value:'Account Value:'},
                    {type:"Text", y:120, style:"right:540;text-align:right;font-weight:bold", value:"$9,040.17"},
                    {type:"Text", y:160, value:'Change in Account Value'},
                    {type:"Text", y:160, style:"right:540;text-align:right;font-weight:bold;color:#9E9E9E", value:"($194.64)"},
                    {type:"Text", y:200, x:0, style:"right:540;", value:table1},

                    //coluna direita
                    {type:"Text", y:120, style:"right:0;text-align:right;font-weight:bold", value:'Account # Z04-20049713'},
                    {type:"Text", y:140, style:"right:0;text-align:right;font-weight:bold", value:"John Q. Public - INDIVIDUAL"},
                    {type:"Text", y:160, x:500, value:'Account Holdings'},
                    {type:"Text", y:385, x:500, style:"right:0;", value:table2},
                    {type:"Text", y:485, x:500, style:"font-size:13px;", value:'Please note that due to rounding, percentages may not add to 100%.'},
                ]
            }
        }
    };

    

    return {
        data:data,
        definition: definition
    }
}());