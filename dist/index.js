(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["freport"] = factory();
	else
		root["freport"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    var pxPerCm;
    var FUtils = (function () {
        function FUtils() {
        }
        FUtils.px2cm = function (px) {
            return px / FUtils.getPxPerCm();
        };
        FUtils.cm2px = function (cm) {
            return cm * FUtils.getPxPerCm();
        };
        FUtils.getPxPerCm = function () {
            var d;
            if (pxPerCm === undefined) {
                d = document.createElement('div');
                d.style.cssText = "position:absolute;top:-1000cm;left:-1000cm;height:1000cm;width:1000cm;";
                document.body.appendChild(d);
                pxPerCm = d.offsetHeight / 1000;
                document.body.removeChild(d);
            }
            return pxPerCm;
        };
        FUtils.dispatch = function (context, events, event, p1, p2, p3) {
            var f = events[event];
            if (f) {
                f.call(context, p1, p2, p3);
            }
        };
        FUtils.getProperties = function (el) {
            return [
                { name: "height", type: 'int', value: el.offsetHeight }
            ];
        };
        FUtils.compilerTemplate = function (template, internalIdentifiers, userIdentifiers) {
            var i, params, p = '', parts1, parts2, code = '', v;
            parts1 = template.split('}');
            for (i = 0; i < parts1.length; i++) {
                parts2 = parts1[i].split('${');
                if (parts2.length === 2) {
                    v = internalIdentifiers.indexOf(parts2[1]) != -1 ? "internalIdentifiers[\"" + parts2[1] + "\"]" :
                        userIdentifiers.indexOf(parts2[1]) != -1 ? "userIdentifiers[\"" + parts2[1] + "\"]" :
                            "data[\"" + parts2[1] + "\"]";
                    code += (p + "'" + parts2[0] + "'+(" + v + ")"); //(p + "'" + parts2[0] + "'+(" + v + ")");
                }
                else {
                    code += (p + "'" + parts2[0] + "'");
                }
                p = '+';
            }
            params = ['internalIdentifiers', 'userIdentifiers', 'data', 'return ' + code + ';'];
            return Function.apply(null, params);
        };
        ;
        return FUtils;
    }());
    exports.FUtils = FUtils;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// FElement.ts
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FUtils_1) {
    "use strict";
    var FElement = (function () {
        function FElement(definition) {
            this._fields = [];
        }
        FElement.prototype.init = function (report, section, definition) {
            var _this = this;
            var a, k, i, fn, style, code = '';
            style = (definition.x === undefined ? '' : "left:" + definition.x + "px;") +
                (definition.y === undefined ? '' : "top:" + definition.y + "px;") +
                (definition.width === undefined ? '' : "width:" + definition.width + "px;") +
                (definition.height === undefined ? '' : "height:" + definition.height + "px;");
            for (k in definition) {
                fn = CssPropertiesConverter[k];
                if (fn) {
                    style += (fn(definition[k]) + ';');
                }
            }
            if (definition.value) {
                this._identifiers = report.getIdentifiers();
                //cria definition.$fields
                definition.$fields = {};
                (definition.value.match(/\${[^}]+}/g) || []).forEach(function (field) { definition.$fields[field] = 1; });
                definition.value = definition.value.replace('${#pages}', '__pages__');
                //cria definition.$getValue
                definition.$getValue = FUtils_1.FUtils.compilerTemplate(definition.value, this._identifiers.internal, this._identifiers.userDef);
                (definition.value.match(/\${[^}]+}/g) || []).forEach(function (field) {
                    _this._fields.push(field.replace('${', '').replace('}', ''));
                });
            }
            this._report = report;
            this._section = section;
            this._pageInfo = report.getPageInfo();
            this._definition = definition;
            this._key = definition.key;
            this._autoWrap = definition.autoWrap;
            this._onBeforePrint = definition.onBeforePrint;
            this._visible = definition.visible;
            this._value = definition.value || '';
            this._style = style + (definition.style ? (';' + definition.style) : '');
            return this;
        };
        FElement.prototype.value = function () {
            return this._definition.$getValue ?
                this._definition.$getValue(this._report.getInternalVars(), this._report.getUserVars(), this._report.getRow()) :
                this._value;
        };
        FElement.prototype.draw = function (row) {
            return '<pre>draw not implemented</pre>';
        };
        FElement.prototype.getStyleAttribute = function () {
            return this._style ? "style=\"" + this._style + "\"" : '';
        };
        FElement.prototype.onComplete = function () { };
        return FElement;
    }());
    exports.FElement = FElement;
    var CssPropertiesConverter = {
        "fontBold": function (value) {
            return "font-weight:" + (value ? "bold" : "normal");
        },
        "fontSize": function (value) {
            return "font-size:" + (value + "px");
        },
        "fontUnderline": function (value) {
            return "text-decoration:" + (value ? "underline" : "normal");
        },
        "fontItalic": function (value) {
            return "font-style:" + (value ? "italic" : "");
        },
        "textAlign": function (value) {
            return "text-align:" + (value);
        },
        "background": function (value) {
            return "background-color:" + value;
        },
        "borderStyle": function (value) {
            return "border-style:" + value;
        },
        "borderWidth": function (value) {
            return "border-width:" + (value + "px");
        },
        "borderColor": function (value) {
            return "border-color:" + value;
        }
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FElement_1) {
    "use strict";
    var FImage = (function (_super) {
        __extends(FImage, _super);
        function FImage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FImage.prototype.draw = function (data) {
            return "<div class=\"element image\" " + this.getStyleAttribute() + ">\n                    <img src=\"" + this.value() + "\" style=\"width:100%;height:100%\"/>\n                </div>";
        };
        return FImage;
    }(FElement_1.FElement));
    exports.FImage = FImage;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// FSection.ts
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(4), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FUtils_1, FText_1, FImage_1) {
    "use strict";
    //import {JsrRect} from "./jsr-rect";
    //import {JsrLine} from "./jsr-line";
    //import {JsrElipse} from "./jsr-elipse";
    //import {JsrBreak} from "./jsr-break";
    var FElements = {
        "Text": FText_1.FText,
        "Image": FImage_1.FImage,
    };
    var FSection = (function () {
        function FSection(report, definition, type) {
            var i, j, t, felement, TFElement, children = [], pageInfo = report.getPageInfo();
            this._definition = definition;
            this._events = {};
            this._report = report;
            this._type = type;
            this._width = pageInfo.activeClientWidth;
            this._x = pageInfo.marginLeft;
            if (!definition)
                return;
            if (definition.children) {
                for (i = 0; i < definition.children.length; i++) {
                    t = definition.children[i].type;
                    j = definition.children[i];
                    felement = null;
                    TFElement = FElements[t];
                    if (TFElement) {
                        felement = new TFElement(j);
                        felement.init(report, this, j);
                        if (felement.onComplete) {
                        }
                        children.push(felement);
                    }
                }
                this._children = children;
            }
            if (definition.on) {
                this._events = definition.on;
            }
        }
        FSection.prototype.dispatchEvent = function (eventName, data, vars) {
            FUtils_1.FUtils.dispatch(this, this._events, eventName, data, vars);
        };
        FSection.prototype.onComplete = function () {
            if (this._children) {
                this._children.forEach(function (element) {
                    element.onComplete();
                });
            }
        };
        FSection.prototype.draw = function (data) {
            var i, y, s, vars, py, definition = this._definition, type = this._type, style = '', html1 = '', html2 = '', html3 = '', report = this._report, children = this._children;
            if (definition) {
                var pageInfo = report.getPageInfo();
                //se não cabe na página
                if (!this.fitInPage(definition.height)) {
                    report.addPage();
                }
                py = pageInfo.activePageY;
                vars = report.getUserVars();
                this.dispatchEvent('start', data, vars);
                if (type === 'footer') {
                    y = 0;
                    this._y = pageInfo.activeFooterY;
                    s = 'top:' + (pageInfo.activeFooterY);
                }
                else {
                    y = (definition ? definition.y || 0 : 0);
                    this._y = py + y;
                    s = 'top:' + (this._y);
                }
                style = "style=\"" + (definition.style ? definition.style + ';' : '');
                html1 = "<div class=\"section " + type + "\" " + style;
                html2 = "px;left:" + this._x + "px;height:" + definition.height + "px;width:" + this._width + "px\">\n                    " + (report.designerMode ? '<div class="section-desiger section-desiger-' + type + '"></div>' : '');
                for (i = 0; i < children.length; i++) {
                    html3 += children[i].draw(data);
                }
                //se não cabe na página
                if (!this.fitInPage(definition.height + y)) {
                    report.addPage();
                    s = 'top:' + (py + y);
                }
                report.setHTML(report.getHTML() + (html1 + s + html2 + html3 + '</div>'));
                pageInfo.activePageY = py + (definition.height + y);
                this.dispatchEvent('end', data, vars);
            }
        };
        FSection.prototype.fitInPage = function (height) {
            var pageInfo = this._report.getPageInfo();
            return (pageInfo.activePageY + height > pageInfo.activeFooterY ? false : true);
        };
        FSection.prototype.getHeight = function () {
            return this._definition ? this._definition.height : 0;
        };
        return FSection;
    }());
    exports.FSection = FSection;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FElement_1) {
    "use strict";
    var idIndex = 0;
    var FText = (function (_super) {
        __extends(FText, _super);
        function FText() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._ids = [];
            return _this;
        }
        FText.prototype.draw = function (data) {
            var id = '';
            if (this._definition.$fields['${#pages}']) {
                this._ids.push(++idIndex);
                id = "id=\"idIndex" + idIndex + "\" ";
            }
            return "<div " + id + "class=\"element statictext\" data-element=\"Text\" " + this.getStyleAttribute() + ">" + this.value() + "</div>";
        };
        FText.prototype.onComplete = function () {
            var doc = this._report.getDocument();
            var obj = this._report.getInternalVars();
            //substitui as variáveis __pages__ pelo seu valor
            this._ids.forEach(function (i) {
                var e = doc.getElementById("idIndex" + i);
                e.innerHTML = e.innerHTML.replace('__pages__', obj['#pages']);
            });
        };
        return FText;
    }(FElement_1.FElement));
    exports.FText = FText;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FUtils_1, FSection_1) {
    "use strict";
    var FReport = (function () {
        function FReport(container) {
            this._userVarValues = {};
            this._userVarNames = []; //lista de nomes de variáveis definidas pelo usuário
            this._internalVarValues = {};
            this._internalVarNames = ['#page', '#pages']; //lista de variáveia internas
            this._fields = {};
            this._events = {};
            var div = document.createElement('div');
            this._iframe = document.createElement('iframe');
            this._pageInfo = {};
            this._iframe.style.cssText = 'position:absolute;border:none;width:100%;height:100%';
            div.style.cssText = 'position:relative;border:solid 1px #c0c0c0;width:100%;height:100%';
            div.appendChild(this._iframe);
            container.appendChild(div);
        }
        FReport.prototype.dispatchEvent = function (eventName) {
            FUtils_1.FUtils.dispatch(this, this._events, eventName, this._dataRow, this._userVarValues);
        };
        FReport.prototype.updateInternalVars = function () {
            this._internalVarValues['#page'] = this._pageInfo.activePageNumber;
            this._internalVarValues['#pages'] = this._pageInfo.activePageNumber;
        };
        FReport.prototype.definition = function (definition) {
            var i, g, go, p, sizes = {
                'A4': [21, 29.7] //794px = 21cm / 1123px = 29.7cm
            };
            ;
            p = sizes[definition.page.paper];
            definition.page.marginLeft = definition.page.marginLeft || 0;
            definition.page.marginRight = definition.page.marginRight || 0;
            definition.page.marginTop = definition.page.marginTop || 0;
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
            this._pageInfo.width = p ? p[definition.page.orientation == 'ladscape' ? 1 : 0] : definition.page.width;
            this._pageInfo.height = p ? p[definition.page.orientation == 'ladscape' ? 0 : 1] : definition.page.height;
            this._pageInfo.marginLeft = FUtils_1.FUtils.cm2px(definition.page.marginLeft);
            this._pageInfo.marginRight = FUtils_1.FUtils.cm2px(definition.page.marginRight);
            this._pageInfo.marginTop = FUtils_1.FUtils.cm2px(definition.page.marginTop);
            this._pageInfo.marginBottom = FUtils_1.FUtils.cm2px(definition.page.marginBottom);
            this._pageInfo.activeClientHeight = null;
            this._pageInfo.activeClientWidth = FUtils_1.FUtils.cm2px(this._pageInfo.width) - this._pageInfo.marginLeft - this._pageInfo.marginRight;
            this._pageInfo.activeFooterY = null;
            this._dataRows = [];
            this._dataRow = null;
            this._dataRowIndex = 0;
            this._groups = [];
            this._s_title = new FSection_1.FSection(this, definition.sections.title, 'title'); //cabeçalho do relatório
            this._s_header = new FSection_1.FSection(this, definition.sections.header, 'header'); //cabeçalho da página
            this._s_detail = new FSection_1.FSection(this, definition.sections.detail, 'detail'); //detalhes da página
            this._s_footer = new FSection_1.FSection(this, definition.sections.footer, 'footer'); //rodapé da página
            this._s_summary = new FSection_1.FSection(this, definition.sections.summary, 'summary'); //rodapé do relatório
            this.updateInternalVars();
            if (definition.groups) {
                for (i = 0; i < definition.groups.length; i++) {
                    g = definition.groups[i];
                    if (g.header || g.footer) {
                        go = { groupBy: g.groupBy, header: null, footer: null };
                        if (g.header) {
                            go.header = new FSection_1.FSection(this, g.header, 'sheader');
                        }
                        if (g.footer) {
                            go.footer = new FSection_1.FSection(this, g.footer, 'sfooter');
                        }
                        this._groups.push(go);
                    }
                }
            }
            return this;
        };
        FReport.prototype.zoom = function (percent) {
            this._iframe.contentDocument.body.style['zoom'] = percent + '%';
        };
        FReport.prototype.getDocument = function () {
            return this._iframe.contentDocument;
        };
        FReport.prototype.print = function () {
            this._iframe.contentWindow.print();
        };
        FReport.prototype.addPage = function (drawPageHeader, checkCollumn) {
            this._pageInfo.activePageY = this._pageInfo.marginTop;
            //TODO: implementar colunas
            if (checkCollumn === true) {
                if (this._col < this._cols) {
                    this._col++;
                }
            }
            this.dispatchEvent('startPage');
            //encerra a página anterior
            if (this._pageInfo.activePageNumber > 0) {
                this.endPage();
                this._html += '<div class="page-break"></div>';
            }
            this._pageInfo.activePageNumber++;
            this.updateInternalVars();
            this._html += "<div class=\"page\" style=\"width:" + this._pageInfo.width + "cm;height:" + this._pageInfo.height + "cm\">";
            //desenha o cabeçalho da página
            if (drawPageHeader !== false) {
                this._s_header.draw(this._dataRow);
            }
        };
        FReport.prototype.endPage = function () {
            this._pageInfo.activePageX = this._pageInfo.marginLeft;
            this._col = 1;
            //desenha o rodapé da página
            this._s_footer.draw(this._dataRow); //($this->attributes['pageFooterTop'] );
            //retorna ao topo da página
            this._pageInfo.activePageY = this._pageInfo.marginTop;
            this._html += '</div>';
            this.dispatchEvent('endPage');
        };
        FReport.prototype.getHTML = function () {
            return this._html;
        };
        FReport.prototype.setHTML = function (html) {
            this._html = html;
        };
        FReport.prototype.getPageInfo = function () {
            return this._pageInfo;
        };
        FReport.prototype.getRow = function () {
            return this._dataRow;
        };
        FReport.prototype.getUserVars = function () {
            return this._userVarValues;
        };
        FReport.prototype.getInternalVars = function () {
            return this._internalVarValues;
        };
        FReport.prototype.getIdentifiers = function () {
            return {
                internal: this._internalVarNames,
                userDef: this._userVarNames
            };
        };
        FReport.prototype.draw = function (rows) {
            var i, h, orientation;
            this._iframe.contentDocument.body.innerHTML = '';
            if (!rows) {
                return;
            }
            h = FUtils_1.FUtils.cm2px(this._pageInfo.height);
            this._dataRows = rows;
            this._dataRow = this._dataRows[0];
            this.dispatchEvent('start');
            this._pageInfo.activeClientHeight = h - this._pageInfo.marginBottom - this._pageInfo.marginTop;
            this._pageInfo.activeFooterY = h - this._pageInfo.marginBottom - this._s_footer.getHeight();
            this.addPage(false, false); //cria a primeira página do relatório, sem cabeçalho de página
            this._s_title.draw(this._dataRow); //desenha o cabeçalho do relatório
            this._s_header.draw(this._dataRow); //desenha o cabeçalho da primeira página
            //desenha o corpo do relatório
            if (this._groups.length > 0) {
                this.drawGroup(rows, 0);
            }
            else {
                for (i = 0; i < rows.length; i++) {
                    this._dataRow = rows[i];
                    this._s_detail.draw(this._dataRow);
                }
            }
            this._pageInfo.activePageX = this._pageInfo.marginLeft;
            this._s_summary.draw(this._dataRow); //desenha o rodapé do relatórios
            this.endPage(); //finaliza a página
            orientation = this._pageInfo.orientation == 'landscape' ? '@media print{@page {size: landscape}}' : '';
            this._iframe.contentDocument.body.innerHTML =
                "<style>\n            *{\n                -webkit-box-sizing:border-box;\n                box-sizing:border-box;\n                font:12pt sans-serif, Georgia, \"Times New Roman\", Times, serif;\n            }\n            body{padding:0;margin:0;}\n            .page{position:relative; overflow:hidden; background:#fff;}\n            .page-break{position:relative;height:1px;width:10px;overflow:hidden;margin-top:-1px;page-break-after: always;}\n            .section{position:absolute; overflow:hidden}\n            .section-desiger{position:absolute;left:0;right:0;top:0;bottom:0;border:dashed 1px #c0c0c0;}\n            .section-desiger-title{border-color:red}\n            .section-desiger-header{border-color:blue}\n            .section-desiger-title{border-color:green}\n            .section-desiger-detail{border-color:rgb(10, 165, 159)}\n            .section-desiger-footer{border-color:rgb(189, 24, 253)}\n            .section-desiger-summary{border-color:rgb(114, 2, 47)}\n            .element{position:absolute}\n            .rect{border-width:1px; border-color:#000; border-style:solid; width:100px; height:40px}\n\n            @media screen {\n                body{\n                    background:rgb(244, 244, 244);\n                }\n                .page{\n                    margin-top:10px;\n                    margin-right:10px;\n                    margin-left:10px;\n                    box-shadow:1px 1px 4px rgba(161, 161, 161, 0.7);\n                }\n            }\n            @page {\n                margin: 0cm;\n            }\n            " + orientation + "\n        </style>\n        " + this._html;
            this._s_title.onComplete();
            this._s_header.onComplete();
            this._groups.forEach(function (group) { if (group.header)
                group.header.onComplete(); });
            this._s_detail.onComplete();
            this._s_footer.onComplete();
            this._groups.forEach(function (group) { if (group.footer)
                group.footer.onComplete(); });
            this._s_summary.onComplete();
            this.dispatchEvent('end');
            return this._html;
        };
        FReport.prototype.drawGroup = function (rows, groupIndex) {
            var i, groups, groupByFieldName, groupByFieldValue, vars;
            groups = this._groups[groupIndex];
            if (groups) {
                groupByFieldName = groups.groupBy;
                vars = this.getUserVars();
                for (i = 0; i < rows.length; i++) {
                    this._dataRow = rows[i];
                    this.dispatchEvent('groupStart');
                    if (groups.header)
                        groups.header.draw(this._dataRow);
                    //TODO: desenhar subgrupos
                    //this.drawGroup(rows)
                    //desenha o detalhe enquando estiver dentro do mesmo grupo
                    groupByFieldValue = this._dataRow[groupByFieldName];
                    while (this._dataRow[groupByFieldName] === groupByFieldValue) {
                        this._s_detail.draw(this._dataRow);
                        //próximo registro
                        i++;
                        if (i < rows.length) {
                            this._dataRow = rows[i];
                        }
                        else {
                            break;
                        }
                    }
                    //deixa o ponteiro no último registro desenhado
                    i--;
                    this._dataRow = rows[i];
                    if (groups.footer)
                        groups.footer.draw(this._dataRow);
                    this.dispatchEvent('groupEnd');
                }
            }
        };
        return FReport;
    }());
    exports.FReport = FReport;
    ;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// index.ts
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(1), __webpack_require__(5), __webpack_require__(3), __webpack_require__(4), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FUtils_1, FElement_1, FReport_1, FSection_1, FText_1, FImage_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(FUtils_1);
    __export(FElement_1);
    __export(FReport_1);
    __export(FSection_1);
    __export(FText_1);
    __export(FImage_1);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYzkwZTMzMDhhMDBkODFjZThlMiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9GVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRkVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRkltYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0ZTZWN0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0ZUZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0ZSZXBvcnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0lDaEVBLElBQUksT0FBYyxDQUFDO0lBRW5CO1FBQUE7UUE0REEsQ0FBQztRQTFEVSxZQUFLLEdBQVosVUFBYSxFQUFTO1lBQ2xCLE1BQU0s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QUMsUUFBUSxDQUFDLENBQUM7d0JBRW5DLGtCQUFrQjt3QkFDbEIsQ0FBQyxFQUFFLENBQUM7d0JBQ0osRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQzs0QkFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQzt3QkFBQSxJQUFJLEVBQUM7NEJBQ0YsS0FBSyxDQUFDO3dCQUNWLENBQUM7b0JBQ0wsQ0FBQztvQkFFRCwrQ0FBK0M7b0JBQy9DLENBQUMsRUFBRSxDQUFDO29CQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV4QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0wsY0FBQztJQUFELENBQUM7SUFqVlksMEJBQU87SUFpV25CLENBQUM7Ozs7Ozs7OztBQ3JXRiwyRUFBVzs7Ozs7O0lBRVgsbUJBQW9DO0lBQ3BDLHFCQUFzQztJQUN0QyxvQkFBcUM7SUFDckMscUJBQXNDO0lBQ3RDLGtCQUFtQztJQUNuQyxtQkFBb0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJmcmVwb3J0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImZyZXBvcnRcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmM5MGUzMzA4YTAwZDgxY2U4ZTIiLCJsZXQgcHhQZXJDbTpudW1iZXI7XG5cbmV4cG9ydCBjbGFzcyBGVXRpbHN7XG4gICAgXG4gICAgc3RhdGljIHB4MmNtKHB4Om51bWJlcikge1xuICAgICAgICByZXR1cm4gcHggLyBGVXRpbHMuZ2V0UHhQZXJDbSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbTJweChjbTpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGNtICogRlV0aWxzLmdldFB4UGVyQ20oKTtcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGdldFB4UGVyQ20oKXtcbiAgICAgICAgbGV0IGQ7XG4gICAgICAgICAgICBcbiAgICAgICAgaWYgKHB4UGVyQ209PT11bmRlZmluZWQpe1xuICAgICAgICAgICAgZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZC5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTEwMDBjbTtsZWZ0Oi0xMDAwY207aGVpZ2h0OjEwMDBjbTt3aWR0aDoxMDAwY207XCI7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGQpO1xuICAgICAgICAgICAgcHhQZXJDbSA9IGQub2Zmc2V0SGVpZ2h0IC8gMTAwMDtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBweFBlckNtO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwYXRjaChjb250ZXh0OmFueSwgZXZlbnRzOmFueSwgZXZlbnQ6c3RyaW5nLCBwMT86YW55LCBwMj86YW55LCBwMz86YW55KXtcbiAgICAgICAgbGV0IGYgPSA8RnVuY3Rpb24+ZXZlbnRzW2V2ZW50XTtcbiAgICAgICAgXG4gICAgICAgIGlmIChmKXtcbiAgICAgICAgICAgIGYuY2FsbChjb250ZXh0LHAxLCBwMiwgcDMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFByb3BlcnRpZXMoZWw6SFRNTEVsZW1lbnQpe1xuICAgICAgICByZXR1cm4gIFtcbiAgICAgICAgICAgIHtuYW1lOlwiaGVpZ2h0XCIsIHR5cGU6J2ludCcsIHZhbHVlOiBlbC5vZmZzZXRIZWlnaHR9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbXBpbGVyVGVtcGxhdGUodGVtcGxhdGU6c3RyaW5nLCBpbnRlcm5hbElkZW50aWZpZXJzOltzdHJpbmddLCB1c2VySWRlbnRpZmllcnM6W3N0cmluZ10pIHtcbiAgICAgICAgdmFyIGksIHBhcmFtczpbYW55XSwgcCA9ICcnLCBwYXJ0czEsIHBhcnRzMiwgY29kZSA9ICcnLCB2O1xuXG4gICAgICAgIHBhcnRzMSA9IHRlbXBsYXRlLnNwbGl0KCd9Jyk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0czEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhcnRzMiA9IHBhcnRzMVtpXS5zcGxpdCgnJHsnKTtcbiAgICAgICAgICAgIGlmIChwYXJ0czIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdiA9IGludGVybmFsSWRlbnRpZmllcnMuaW5kZXhPZihwYXJ0czJbMV0pIT0tMSAgPyBgaW50ZXJuYWxJZGVudGlmaWVyc1tcIiR7cGFydHMyWzFdfVwiXWAgIDogXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZGVudGlmaWVycy5pbmRleE9mKHBhcnRzMlsxXSkhPS0xID8gYHVzZXJJZGVudGlmaWVyc1tcIiR7cGFydHMyWzFdfVwiXWAgOiBcbiAgICAgICAgICAgICAgICAgICAgYGRhdGFbXCIke3BhcnRzMlsxXX1cIl1gO1xuXG4gICAgICAgICAgICAgICAgY29kZSArPSAoYCR7cH0nJHtwYXJ0czJbMF19JysoJHt2fSlgKTsgIC8vKHAgKyBcIidcIiArIHBhcnRzMlswXSArIFwiJysoXCIgKyB2ICsgXCIpXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2RlICs9IChgJHtwfScke3BhcnRzMlswXX0nYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwID0gJysnO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zID0gWydpbnRlcm5hbElkZW50aWZpZXJzJywndXNlcklkZW50aWZpZXJzJywgJ2RhdGEnLCAncmV0dXJuICcgKyBjb2RlICsgJzsnXTtcblxuICAgICAgICByZXR1cm4gRnVuY3Rpb24uYXBwbHkobnVsbCwgcGFyYW1zKTtcbiAgICB9O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0ZVdGlscy50cyIsIi8vIEZFbGVtZW50LnRzXG5cbmltcG9ydCB7SUZSZXBvcnQsIElQYWdlSW5mb30gZnJvbSAnLi9GUmVwb3J0JztcbmltcG9ydCB7SUZTZWN0aW9ufSBmcm9tICcuL0ZTZWN0aW9uJztcbmltcG9ydCB7RlV0aWxzfSBmcm9tICcuL0ZVdGlscyc7XG5cbmV4cG9ydCBjbGFzcyBGRWxlbWVudHtcbiAgICBwcm90ZWN0ZWQgX3JlcG9ydDpJRlJlcG9ydDtcbiAgICBwcml2YXRlIF9zZWN0aW9uOklGU2VjdGlvbjtcbiAgICBwcml2YXRlIF9wYWdlSW5mbzpJUGFnZUluZm87XG4gICAgcHJpdmF0ZSBfZmllbGRzOltzdHJpbmddID0gPFtzdHJpbmddPltdO1xuICAgIHByaXZhdGUgX2tleTphbnk7XG4gICAgcHJpdmF0ZSBfYXV0b1dyYXA6YW55O1xuICAgIHByaXZhdGUgX29uQmVmb3JlUHJpbnQ6YW55O1xuICAgIHByaXZhdGUgX3Zpc2libGU6YW55O1xuICAgIHByaXZhdGUgX3ZhbHVlOnN0cmluZztcbiAgICBcbiAgICBwcm90ZWN0ZWQgX2lkZW50aWZpZXJzOmFueTtcbiAgICBwcm90ZWN0ZWQgX2RlZmluaXRpb246YW55O1xuICAgIHByb3RlY3RlZCBfc3R5bGU6YW55O1xuXG4gICAgY29uc3RydWN0b3IoZGVmaW5pdGlvbjphbnkpe1xuICAgIH1cblxuICAgIGluaXQgKHJlcG9ydDpJRlJlcG9ydCwgc2VjdGlvbjpJRlNlY3Rpb24sIGRlZmluaXRpb246YW55KXtcbiAgICAgICAgbGV0IGEsIGs6c3RyaW5nLCBpOm51bWJlciwgZm46RnVuY3Rpb24sIHN0eWxlOnN0cmluZywgY29kZT0nJzsgICAgICAgIFxuICAgICAgICBcbiAgICAgICAgc3R5bGUgPSAoZGVmaW5pdGlvbi54PT09dW5kZWZpbmVkICAgICAgPyAnJyA6IGBsZWZ0OiR7ZGVmaW5pdGlvbi54fXB4O2ApICtcbiAgICAgICAgICAgICAgICAoZGVmaW5pdGlvbi55PT09dW5kZWZpbmVkICAgICAgPyAnJyA6IGB0b3A6JHtkZWZpbml0aW9uLnl9cHg7YCkgK1xuICAgICAgICAgICAgICAgIChkZWZpbml0aW9uLndpZHRoPT09dW5kZWZpbmVkICA/ICcnIDogYHdpZHRoOiR7ZGVmaW5pdGlvbi53aWR0aH1weDtgKSArXG4gICAgICAgICAgICAgICAgKGRlZmluaXRpb24uaGVpZ2h0PT09dW5kZWZpbmVkID8gJycgOiBgaGVpZ2h0OiR7ZGVmaW5pdGlvbi5oZWlnaHR9cHg7YCk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGsgaW4gZGVmaW5pdGlvbil7XG4gICAgICAgICAgICBmbiA9ICg8YW55PkNzc1Byb3BlcnRpZXNDb252ZXJ0ZXIpW2tdO1xuICAgICAgICAgICAgaWYgKGZuKXtcbiAgICAgICAgICAgICAgICBzdHlsZSArPSAoZm4oZGVmaW5pdGlvbltrXSkgKyAnOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZGVmaW5pdGlvbi52YWx1ZSl7XG4gICAgICAgICAgICB0aGlzLl9pZGVudGlmaWVycyAgPSByZXBvcnQuZ2V0SWRlbnRpZmllcnMoKTtcblxuICAgICAgICAgICAgLy9jcmlhIGRlZmluaXRpb24uJGZpZWxkc1xuICAgICAgICAgICAgZGVmaW5pdGlvbi4kZmllbGRzID0ge307XG4gICAgICAgICAgICAoZGVmaW5pdGlvbi52YWx1ZS5tYXRjaCgvXFwke1tefV0rfS9nKSB8fCBbXSkuZm9yRWFjaCgoZmllbGQ6c3RyaW5nKT0+e2RlZmluaXRpb24uJGZpZWxkc1tmaWVsZF09MTt9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZGVmaW5pdGlvbi52YWx1ZSA9IGRlZmluaXRpb24udmFsdWUucmVwbGFjZSgnJHsjcGFnZXN9JywgJ19fcGFnZXNfXycpO1xuXG4gICAgICAgICAgICAvL2NyaWEgZGVmaW5pdGlvbi4kZ2V0VmFsdWVcbiAgICAgICAgICAgIGRlZmluaXRpb24uJGdldFZhbHVlID0gRlV0aWxzLmNvbXBpbGVyVGVtcGxhdGUoZGVmaW5pdGlvbi52YWx1ZSwgdGhpcy5faWRlbnRpZmllcnMuaW50ZXJuYWwsIHRoaXMuX2lkZW50aWZpZXJzLnVzZXJEZWYpO1xuICAgICAgICAgICAgKGRlZmluaXRpb24udmFsdWUubWF0Y2goL1xcJHtbXn1dK30vZykgfHwgW10pLmZvckVhY2goKGZpZWxkOnN0cmluZyk9PntcbiAgICAgICAgICAgICAgICB0aGlzLl9maWVsZHMucHVzaChmaWVsZC5yZXBsYWNlKCckeycsICcnKS5yZXBsYWNlKCd9JywnJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZXBvcnQgPSByZXBvcnQ7XG4gICAgICAgIHRoaXMuX3NlY3Rpb249IHNlY3Rpb247XG5cbiAgICAgICAgdGhpcy5fcGFnZUluZm8gICAgICA9IHJlcG9ydC5nZXRQYWdlSW5mbygpO1xuICAgICAgICB0aGlzLl9kZWZpbml0aW9uICAgID0gZGVmaW5pdGlvbjtcbiAgICAgICAgdGhpcy5fa2V5ICAgICAgICAgICA9IGRlZmluaXRpb24ua2V5O1xuICAgICAgICB0aGlzLl9hdXRvV3JhcCAgICAgID0gZGVmaW5pdGlvbi5hdXRvV3JhcDtcbiAgICAgICAgdGhpcy5fb25CZWZvcmVQcmludCA9IGRlZmluaXRpb24ub25CZWZvcmVQcmludDtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSAgICAgICA9IGRlZmluaXRpb24udmlzaWJsZTtcbiAgICAgICAgdGhpcy5fdmFsdWUgICAgICAgICA9IGRlZmluaXRpb24udmFsdWUgfHwgJyc7XG4gICAgICAgIHRoaXMuX3N0eWxlICAgICAgICAgPSBzdHlsZSArIChkZWZpbml0aW9uLnN0eWxlID8gKCc7JytkZWZpbml0aW9uLnN0eWxlKSA6ICcnKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhbHVlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uLiRnZXRWYWx1ZSA/IFxuICAgICAgICAgICAgICAgdGhpcy5fZGVmaW5pdGlvbi4kZ2V0VmFsdWUoIHRoaXMuX3JlcG9ydC5nZXRJbnRlcm5hbFZhcnMoKSwgdGhpcy5fcmVwb3J0LmdldFVzZXJWYXJzKCksIHRoaXMuX3JlcG9ydC5nZXRSb3coKSkgOiBcbiAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIGRyYXcocm93OlthbnldKXtcbiAgICAgICAgcmV0dXJuICc8cHJlPmRyYXcgbm90IGltcGxlbWVudGVkPC9wcmU+JztcbiAgICB9XG5cbiAgICBnZXRTdHlsZUF0dHJpYnV0ZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGUgPyBgc3R5bGU9XCIke3RoaXMuX3N0eWxlfVwiYCA6ICcnO1xuICAgIH1cblxuICAgIG9uQ29tcGxldGUoKXt9XG59XG4gICAgXG5sZXQgQ3NzUHJvcGVydGllc0NvbnZlcnRlciA9IHtcbiAgICBcImZvbnRCb2xkXCI6IGZ1bmN0aW9uKHZhbHVlOnN0cmluZyk6c3RyaW5ne1xuICAgICAgICByZXR1cm4gXCJmb250LXdlaWdodDpcIiArICh2YWx1ZSA/IFwiYm9sZFwiIDogXCJub3JtYWxcIik7XG4gICAgfSxcbiAgICBcImZvbnRTaXplXCI6IGZ1bmN0aW9uKHZhbHVlOnN0cmluZyk6c3RyaW5ne1xuICAgICAgICByZXR1cm4gXCJmb250LXNpemU6XCIgKyAodmFsdWUgKyBcInB4XCIpO1xuICAgIH0sXG4gICAgXCJmb250VW5kZXJsaW5lXCI6IGZ1bmN0aW9uKHZhbHVlOnN0cmluZyk6c3RyaW5ne1xuICAgICAgICByZXR1cm4gXCJ0ZXh0LWRlY29yYXRpb246XCIgKyAodmFsdWUgPyBcInVuZGVybGluZVwiIDogXCJub3JtYWxcIik7XG4gICAgfSxcbiAgICBcImZvbnRJdGFsaWNcIjogZnVuY3Rpb24odmFsdWU6c3RyaW5nKTpzdHJpbmd7XG4gICAgICAgIHJldHVybiBcImZvbnQtc3R5bGU6XCIgKyAodmFsdWUgPyBcIml0YWxpY1wiIDogXCJcIik7XG4gICAgfSxcbiAgICBcInRleHRBbGlnblwiOiBmdW5jdGlvbih2YWx1ZTpzdHJpbmcpOnN0cmluZ3tcbiAgICAgICAgcmV0dXJuIFwidGV4dC1hbGlnbjpcIiArICh2YWx1ZSk7XG4gICAgfSxcbiAgICBcImJhY2tncm91bmRcIjogZnVuY3Rpb24odmFsdWU6c3RyaW5nKTpzdHJpbmd7XG4gICAgICAgIHJldHVybiBcImJhY2tncm91bmQtY29sb3I6XCIgKyB2YWx1ZTtcbiAgICB9LFxuICAgIFwiYm9yZGVyU3R5bGVcIjogZnVuY3Rpb24odmFsdWU6c3RyaW5nKTpzdHJpbmd7XG4gICAgICAgIHJldHVybiBcImJvcmRlci1zdHlsZTpcIiArIHZhbHVlO1xuICAgIH0sXG4gICAgXCJib3JkZXJXaWR0aFwiOiBmdW5jdGlvbih2YWx1ZTpzdHJpbmcpOnN0cmluZ3tcbiAgICAgICAgcmV0dXJuIFwiYm9yZGVyLXdpZHRoOlwiICsgKHZhbHVlICsgXCJweFwiKTtcbiAgICB9LFxuICAgIFwiYm9yZGVyQ29sb3JcIjogZnVuY3Rpb24odmFsdWU6c3RyaW5nKTpzdHJpbmd7XG4gICAgICAgIHJldHVybiBcImJvcmRlci1jb2xvcjpcIiArIHZhbHVlO1xuICAgIH1cbn07XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRkVsZW1lbnQudHMiLCJpbXBvcnQge0ZFbGVtZW50fSBmcm9tIFwiLi9GRWxlbWVudFwiO1xuXG5leHBvcnQgY2xhc3MgRkltYWdlIGV4dGVuZHMgRkVsZW1lbnR7XG4gICAgZHJhdyhkYXRhOlthbnldKXsgICAgIFxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJlbGVtZW50IGltYWdlXCIgJHt0aGlzLmdldFN0eWxlQXR0cmlidXRlKCl9PlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7dGhpcy52YWx1ZSgpfVwiIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwJVwiLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgIH1cbn0gXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9GSW1hZ2UudHMiLCIvLyBGU2VjdGlvbi50c1xuXG5pbXBvcnQge0ZVdGlsc30gZnJvbSBcIi4vRlV0aWxzXCI7XG5pbXBvcnQge0ZSZXBvcnR9IGZyb20gXCIuL0ZSZXBvcnRcIjtcbmltcG9ydCB7RkVsZW1lbnR9IGZyb20gXCIuL0ZFbGVtZW50XCI7XG5pbXBvcnQge0ZUZXh0fSBmcm9tIFwiLi9GVGV4dFwiO1xuaW1wb3J0IHtGSW1hZ2V9IGZyb20gXCIuL0ZJbWFnZVwiO1xuLy9pbXBvcnQge0pzclJlY3R9IGZyb20gXCIuL2pzci1yZWN0XCI7XG4vL2ltcG9ydCB7SnNyTGluZX0gZnJvbSBcIi4vanNyLWxpbmVcIjtcbi8vaW1wb3J0IHtKc3JFbGlwc2V9IGZyb20gXCIuL2pzci1lbGlwc2VcIjtcbi8vaW1wb3J0IHtKc3JCcmVha30gZnJvbSBcIi4vanNyLWJyZWFrXCI7XG5cbmxldCBGRWxlbWVudHMgPSB7XG4gICAgXCJUZXh0XCIgIDogRlRleHQsXG4gICAgXCJJbWFnZVwiIDogRkltYWdlLFxuICAgIC8vTGluZSAgPSBKc3JMaW5lLFxuICAgIC8vRWxpcHNlPSBKc3JFbGlwc2UsXG4gICAgLy9JbWFnZSA9IEpzckltYWdlLFxuICAgIC8vQnJlYWsgPSBKc3JCcmVha1xufTtcblxuZXhwb3J0IGNsYXNzIEZTZWN0aW9ue1xuICAgIHByaXZhdGUgX2V2ZW50czphbnk7XG4gICAgcHJpdmF0ZSBfcmVwb3J0OkZSZXBvcnQ7XG4gICAgcHJpdmF0ZSBfdHlwZTpzdHJpbmc7XG4gICAgcHJpdmF0ZSBfd2lkdGg6bnVtYmVyO1xuICAgIHByaXZhdGUgX3g6bnVtYmVyO1xuICAgIHByaXZhdGUgX3k6bnVtYmVyO1xuICAgIHByaXZhdGUgX2RlZmluaXRpb246YW55O1xuICAgIHByaXZhdGUgX2NoaWxkcmVuOltGRWxlbWVudF07XG4gICAgXG4gICAgY29uc3RydWN0b3IocmVwb3J0OkZSZXBvcnQsIGRlZmluaXRpb246YW55LCB0eXBlOnN0cmluZyl7XG4gICAgICAgIGxldCBpLCBqLCB0LFxuICAgICAgICAgICAgZmVsZW1lbnQ6RkVsZW1lbnQsXG4gICAgICAgICAgICBURkVsZW1lbnQ6YW55LCBcbiAgICAgICAgICAgIGNoaWxkcmVuPVtdLCBcbiAgICAgICAgICAgIHBhZ2VJbmZvID0gcmVwb3J0LmdldFBhZ2VJbmZvKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcbiAgICAgICAgdGhpcy5fZXZlbnRzICAgICA9IHt9O1xuICAgICAgICB0aGlzLl9yZXBvcnQgICAgID0gcmVwb3J0O1xuICAgICAgICB0aGlzLl90eXBlICAgICAgID0gdHlwZTtcbiAgICAgICAgdGhpcy5fd2lkdGggICAgICA9IHBhZ2VJbmZvLmFjdGl2ZUNsaWVudFdpZHRoO1xuICAgICAgICB0aGlzLl94ICAgICAgICAgID0gcGFnZUluZm8ubWFyZ2luTGVmdDtcbiAgICAgICAgIFxuICAgICAgICBpZiAoIWRlZmluaXRpb24pIHJldHVybjtcblxuICAgICAgICBpZiAoZGVmaW5pdGlvbi5jaGlsZHJlbil7XG4gICAgICAgICAgICBmb3IgKGk9MDsgaTxkZWZpbml0aW9uLmNoaWxkcmVuLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0ICAgICAgICA9IGRlZmluaXRpb24uY2hpbGRyZW5baV0udHlwZTtcbiAgICAgICAgICAgICAgICBqICAgICAgICA9IGRlZmluaXRpb24uY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgZmVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIFRGRWxlbWVudD0gKDxhbnk+RkVsZW1lbnRzKVt0XTtcblxuICAgICAgICAgICAgICAgIGlmIChURkVsZW1lbnQpe1xuICAgICAgICAgICAgICAgICAgICBmZWxlbWVudCA9IG5ldyBURkVsZW1lbnQoaik7XG4gICAgICAgICAgICAgICAgICAgIGZlbGVtZW50LmluaXQocmVwb3J0LCB0aGlzLCBqKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKDxhbnk+ZmVsZW1lbnQpLm9uQ29tcGxldGUpe1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGZlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSA8W0ZFbGVtZW50XT5jaGlsZHJlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWZpbml0aW9uLm9uKXtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IGRlZmluaXRpb24ub247XG4gICAgICAgIH0gICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTpzdHJpbmcsIGRhdGE6YW55LCB2YXJzOmFueSl7XG4gICAgICAgIEZVdGlscy5kaXNwYXRjaCh0aGlzLCB0aGlzLl9ldmVudHMsIGV2ZW50TmFtZSwgZGF0YSwgdmFycyk7XG4gICAgfSAgIFxuXG4gICAgb25Db21wbGV0ZSgpe1xuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4pe1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudDpGRWxlbWVudCk9PntcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhkYXRhOlthbnldKXtcbiAgICAgICAgbGV0IGkseSxzLHZhcnMscHksXG4gICAgICAgICAgICBkZWZpbml0aW9uOmFueSAgID0gdGhpcy5fZGVmaW5pdGlvbixcbiAgICAgICAgICAgIHR5cGU6c3RyaW5nICAgICAgPSB0aGlzLl90eXBlLFxuICAgICAgICAgICAgc3R5bGU6c3RyaW5nICAgICA9ICcnLFxuICAgICAgICAgICAgaHRtbDE6c3RyaW5nICAgICA9ICcnLFxuICAgICAgICAgICAgaHRtbDI6c3RyaW5nICAgICA9ICcnLFxuICAgICAgICAgICAgaHRtbDM6c3RyaW5nICAgICA9ICcnLFxuICAgICAgICAgICAgcmVwb3J0OkZSZXBvcnQgPSB0aGlzLl9yZXBvcnQsXG4gICAgICAgICAgICBjaGlsZHJlbjpbRkVsZW1lbnRdID0gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgIFxuICAgICAgICBpZiAoZGVmaW5pdGlvbil7XG4gICAgICAgICAgICBsZXQgcGFnZUluZm8gPSByZXBvcnQuZ2V0UGFnZUluZm8oKTtcblxuICAgICAgICAgICAgLy9zZSBuw6NvIGNhYmUgbmEgcMOhZ2luYVxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpdEluUGFnZShkZWZpbml0aW9uLmhlaWdodCkpe1xuICAgICAgICAgICAgICAgIHJlcG9ydC5hZGRQYWdlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB5ICAgPSBwYWdlSW5mby5hY3RpdmVQYWdlWTtcbiAgICAgICAgICAgIHZhcnMgPSByZXBvcnQuZ2V0VXNlclZhcnMoKTtcblxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdzdGFydCcsIGRhdGEsIHZhcnMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZT09PSdmb290ZXInKXtcbiAgICAgICAgICAgICAgICB5ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gcGFnZUluZm8uYWN0aXZlRm9vdGVyWTtcbiAgICAgICAgICAgICAgICBzID0gJ3RvcDonICsgKHBhZ2VJbmZvLmFjdGl2ZUZvb3RlclkpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgeSA9IChkZWZpbml0aW9uID8gZGVmaW5pdGlvbi55IHx8IDAgOiAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gcHkgKyB5O1xuICAgICAgICAgICAgICAgIHMgPSAndG9wOicgKyAodGhpcy5feSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHN0eWxlID0gYHN0eWxlPVwiJHsoZGVmaW5pdGlvbi5zdHlsZSA/IGRlZmluaXRpb24uc3R5bGUrJzsnIDogJycpfWA7XG4gICAgICAgICAgICBodG1sMSA9IGA8ZGl2IGNsYXNzPVwic2VjdGlvbiAke3R5cGV9XCIgJHtzdHlsZX1gO1xuICAgICAgICAgICAgaHRtbDIgPSBgcHg7bGVmdDoke3RoaXMuX3h9cHg7aGVpZ2h0OiR7ZGVmaW5pdGlvbi5oZWlnaHR9cHg7d2lkdGg6JHt0aGlzLl93aWR0aH1weFwiPlxuICAgICAgICAgICAgICAgICAgICAkeyhyZXBvcnQuZGVzaWduZXJNb2RlID8gJzxkaXYgY2xhc3M9XCJzZWN0aW9uLWRlc2lnZXIgc2VjdGlvbi1kZXNpZ2VyLScgKyB0eXBlICsgJ1wiPjwvZGl2PicgOiAnJyl9YDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChpPTA7IGk8Y2hpbGRyZW4ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGh0bWwzICs9IGNoaWxkcmVuW2ldLmRyYXcoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vc2UgbsOjbyBjYWJlIG5hIHDDoWdpbmFcbiAgICAgICAgICAgIGlmICghdGhpcy5maXRJblBhZ2UoZGVmaW5pdGlvbi5oZWlnaHQreSkpe1xuICAgICAgICAgICAgICAgIHJlcG9ydC5hZGRQYWdlKCk7XG4gICAgICAgICAgICAgICAgcyA9ICd0b3A6JyArIChweSArIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXBvcnQuc2V0SFRNTCggcmVwb3J0LmdldEhUTUwoKSArIChodG1sMSArIHMgKyBodG1sMiArIGh0bWwzICsgJzwvZGl2PicpKTtcbiAgICAgICAgICAgIHBhZ2VJbmZvLmFjdGl2ZVBhZ2VZID0gcHkgKyAoZGVmaW5pdGlvbi5oZWlnaHQreSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnZW5kJywgZGF0YSwgdmFycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaXRJblBhZ2UoaGVpZ2h0Om51bWJlcil7XG4gICAgICAgIGxldCBwYWdlSW5mbyA9IHRoaXMuX3JlcG9ydC5nZXRQYWdlSW5mbygpO1xuICAgICAgICByZXR1cm4gKHBhZ2VJbmZvLmFjdGl2ZVBhZ2VZICsgaGVpZ2h0ID4gcGFnZUluZm8uYWN0aXZlRm9vdGVyWSA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0SGVpZ2h0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uID8gdGhpcy5fZGVmaW5pdGlvbi5oZWlnaHQgOiAwO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGU2VjdGlvbiBleHRlbmRzIEZTZWN0aW9ue31cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0ZTZWN0aW9uLnRzIiwiaW1wb3J0IHtGRWxlbWVudH0gZnJvbSBcIi4vRkVsZW1lbnRcIjtcblxubGV0IGlkSW5kZXggPSAwO1xuXG5leHBvcnQgY2xhc3MgRlRleHQgZXh0ZW5kcyBGRWxlbWVudHtcbiAgICBwcml2YXRlIF9pZHM6W251bWJlcl09PGFueT5bXTtcblxuICAgIGRyYXcoZGF0YTpbYW55XSl7XG4gICAgICAgIGxldCBpZD0nJztcblxuICAgICAgICBpZiAodGhpcy5fZGVmaW5pdGlvbi4kZmllbGRzWyckeyNwYWdlc30nXSl7XG4gICAgICAgICAgICB0aGlzLl9pZHMucHVzaCgrK2lkSW5kZXgpO1xuICAgICAgICAgICAgaWQgPSBgaWQ9XCJpZEluZGV4JHtpZEluZGV4fVwiIGA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYDxkaXYgJHtpZH1jbGFzcz1cImVsZW1lbnQgc3RhdGljdGV4dFwiIGRhdGEtZWxlbWVudD1cIlRleHRcIiAke3RoaXMuZ2V0U3R5bGVBdHRyaWJ1dGUoKX0+JHt0aGlzLnZhbHVlKCl9PC9kaXY+YDtcbiAgICB9XG5cbiAgICBvbkNvbXBsZXRlKCl7XG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9yZXBvcnQuZ2V0RG9jdW1lbnQoKTtcbiAgICAgICAgbGV0IG9iaiA9IHRoaXMuX3JlcG9ydC5nZXRJbnRlcm5hbFZhcnMoKTtcblxuICAgICAgICAvL3N1YnN0aXR1aSBhcyB2YXJpw6F2ZWlzIF9fcGFnZXNfXyBwZWxvIHNldSB2YWxvclxuICAgICAgICB0aGlzLl9pZHMuZm9yRWFjaCgoaTpudW1iZXIpPT57XG4gICAgICAgICAgICBsZXQgZT0gZG9jLmdldEVsZW1lbnRCeUlkKGBpZEluZGV4JHtpfWApO1xuICAgICAgICAgICAgZS5pbm5lckhUTUwgPSBlLmlubmVySFRNTC5yZXBsYWNlKCdfX3BhZ2VzX18nLCBvYmpbJyNwYWdlcyddKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0ZUZXh0LnRzIiwiaW1wb3J0IHtGVXRpbHN9IGZyb20gXCIuL0ZVdGlsc1wiO1xuaW1wb3J0IHtGU2VjdGlvbn0gZnJvbSBcIi4vRlNlY3Rpb25cIjtcbmltcG9ydCB7RkVsZW1lbnR9IGZyb20gXCIuL0ZFbGVtZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBGUmVwb3J0e1xuICAgIFxuICAgIHByaXZhdGUgX2h0bWw6c3RyaW5nO1xuICAgIHB1YmxpYyBkZXNpZ25lck1vZGU6Ym9vbGVhbjtcblxuICAgIC8vSVBhZ2VJbmZvXG4gICAgcHJpdmF0ZSBfcGFnZUluZm86SVBhZ2VJbmZvO1xuXG4gICAgLy9pbmZvcm1hw6fDtWVzIHNvYnJlIGRhZG9zXG4gICAgcHJpdmF0ZSBfZGF0YVJvd3M6W2FueV07ICAgICAgLy9hcnJheSBkZSBkYWRvc1xuICAgIHByaXZhdGUgX2RhdGFSb3c6YW55OyAgICAgICAgIC8vbGluaGEgYXR1YWwgZGUgZGFkb3NcbiAgICBwcml2YXRlIF9kYXRhUm93SW5kZXg6bnVtYmVyOyAvL8OtbmRpY2UgZGEgbGluaGEgYXR1YWwgZGUgZGFkb3NcblxuICAgIC8vc2XDp8O1ZXNcbiAgICBwcml2YXRlIF9zX3RpdGxlICA6IEZTZWN0aW9uOyAvL2NhYmXDp2FsaG8gZG8gcmVsYXTDs3Jpb1xuICAgIHByaXZhdGUgX3NfaGVhZGVyIDogRlNlY3Rpb247IC8vY2FiZcOnYWxobyBkYSBww6FnaW5hXG4gICAgcHJpdmF0ZSBfc19kZXRhaWwgOiBGU2VjdGlvbjsgLy9kZXRhbGhlcyBkYSBww6FnaW5hXG4gICAgcHJpdmF0ZSBfc19mb290ZXIgOiBGU2VjdGlvbjsgLy9yb2RhcMOpIGRhIHDDoWdpbmFcbiAgICBwcml2YXRlIF9zX3N1bW1hcnk6IEZTZWN0aW9uOyAvL3JvZGFww6kgZG8gcmVsYXTDs3Jpb1xuXG4gICAgcHJpdmF0ZSBfaWZyYW1lOkhUTUxJRnJhbWVFbGVtZW50O1xuXG4gICAgLy92YXJpw6F2ZWlzIGRlIGNvbnRyb2xlIGxvY2FsXG4gICAgcHJpdmF0ZSBfY29sOm51bWJlcjtcbiAgICBwcml2YXRlIF9jb2xzOm51bWJlcjtcbiAgICBwcml2YXRlIF91c2VyVmFyVmFsdWVzPXt9O1xuICAgIHByaXZhdGUgX3VzZXJWYXJOYW1lcz08YW55PltdOyAgICAgLy9saXN0YSBkZSBub21lcyBkZSB2YXJpw6F2ZWlzIGRlZmluaWRhcyBwZWxvIHVzdcOhcmlvXG4gICAgcHJpdmF0ZSBfaW50ZXJuYWxWYXJWYWx1ZXM6YW55PXt9O1xuICAgIHByaXZhdGUgX2ludGVybmFsVmFyTmFtZXM9PGFueT5bJyNwYWdlJywgJyNwYWdlcyddOyAvL2xpc3RhIGRlIHZhcmnDoXZlaWEgaW50ZXJuYXNcbiAgICBwcml2YXRlIF9maWVsZHM9e307XG4gICAgcHJpdmF0ZSBfZXZlbnRzPXt9O1xuICAgIHByaXZhdGUgX2dyb3VwczpbYW55XTtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6SFRNTEVsZW1lbnQpe1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9pZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgdGhpcy5fcGFnZUluZm8gPSA8SVBhZ2VJbmZvPnt9O1xuXG4gICAgICAgIHRoaXMuX2lmcmFtZS5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlcjpub25lO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCUnO1xuICAgICAgICBkaXYuc3R5bGUuY3NzVGV4dCAgICAgICAgICA9ICdwb3NpdGlvbjpyZWxhdGl2ZTtib3JkZXI6c29saWQgMXB4ICNjMGMwYzA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJSc7XG4gICAgICAgIFxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5faWZyYW1lKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTpzdHJpbmcpe1xuICAgICAgICBGVXRpbHMuZGlzcGF0Y2godGhpcywgdGhpcy5fZXZlbnRzLCBldmVudE5hbWUsIHRoaXMuX2RhdGFSb3csIHRoaXMuX3VzZXJWYXJWYWx1ZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlSW50ZXJuYWxWYXJzKCl7XG4gICAgICAgIHRoaXMuX2ludGVybmFsVmFyVmFsdWVzWycjcGFnZSddID0gdGhpcy5fcGFnZUluZm8uYWN0aXZlUGFnZU51bWJlcjtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxWYXJWYWx1ZXNbJyNwYWdlcyddID0gdGhpcy5fcGFnZUluZm8uYWN0aXZlUGFnZU51bWJlcjtcbiAgICB9XG5cbiAgICBkZWZpbml0aW9uKGRlZmluaXRpb246YW55KTpGUmVwb3J0e1xuICAgICAgICBsZXQgaSwgZywgZ28sIHAsXG4gICAgICAgICAgICBzaXplcyA9IHtcbiAgICAgICAgICAgICAgICAnQTQnOlsyMSwgMjkuN10gLy83OTRweCA9IDIxY20gLyAxMTIzcHggPSAyOS43Y21cbiAgICAgICAgICAgIH07O1xuXG4gICAgICAgIHAgPSAoPGFueT5zaXplcylbZGVmaW5pdGlvbi5wYWdlLnBhcGVyXTtcblxuICAgICAgICBkZWZpbml0aW9uLnBhZ2UubWFyZ2luTGVmdCAgID0gZGVmaW5pdGlvbi5wYWdlLm1hcmdpbkxlZnQgICB8fCAwO1xuICAgICAgICBkZWZpbml0aW9uLnBhZ2UubWFyZ2luUmlnaHQgID0gZGVmaW5pdGlvbi5wYWdlLm1hcmdpblJpZ2h0ICB8fCAwO1xuICAgICAgICBkZWZpbml0aW9uLnBhZ2UubWFyZ2luVG9wICAgID0gZGVmaW5pdGlvbi5wYWdlLm1hcmdpblRvcCAgICB8fCAwO1xuICAgICAgICBkZWZpbml0aW9uLnBhZ2UubWFyZ2luQm90dG9tID0gZGVmaW5pdGlvbi5wYWdlLm1hcmdpbkJvdHRvbSB8fCAwO1xuXG4gICAgICAgIHRoaXMuX3VzZXJWYXJWYWx1ZXMgPSBkZWZpbml0aW9uLnZhcnMgfHwge307XG4gICAgICAgIHRoaXMuX3VzZXJWYXJOYW1lcyA9IE9iamVjdC5rZXlzKGRlZmluaXRpb24udmFycyB8fCB7fSk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IGRlZmluaXRpb24ub24gfHwge307XG4gICAgICAgIHRoaXMuX2h0bWwgPSAnJztcbiAgICAgICAgdGhpcy5fY29sID0gMTtcbiAgICAgICAgdGhpcy5fY29scyA9IGRlZmluaXRpb24ucGFnZS5jb2xsdW1ucztcblxuICAgICAgICB0aGlzLl9wYWdlSW5mby5hY3RpdmVQYWdlWCA9IDA7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLmFjdGl2ZVBhZ2VZID0gMDtcbiAgICAgICAgdGhpcy5fcGFnZUluZm8uYWN0aXZlUGFnZU51bWJlciA9IDA7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLm9yaWVudGF0aW9uID0gZGVmaW5pdGlvbi5wYWdlLm9yaWVudGF0aW9uIHx8ICdwb3J0cmFpdCc7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLndpZHRoID0gcCA/IHBbZGVmaW5pdGlvbi5wYWdlLm9yaWVudGF0aW9uPT0nbGFkc2NhcGUnPzE6MF0gOiBkZWZpbml0aW9uLnBhZ2Uud2lkdGg7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLmhlaWdodD0gcCA/IHBbZGVmaW5pdGlvbi5wYWdlLm9yaWVudGF0aW9uPT0nbGFkc2NhcGUnPzA6MV0gOiBkZWZpbml0aW9uLnBhZ2UuaGVpZ2h0O1xuICAgICAgICB0aGlzLl9wYWdlSW5mby5tYXJnaW5MZWZ0ICA9IEZVdGlscy5jbTJweChkZWZpbml0aW9uLnBhZ2UubWFyZ2luTGVmdCk7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLm1hcmdpblJpZ2h0ID0gRlV0aWxzLmNtMnB4KGRlZmluaXRpb24ucGFnZS5tYXJnaW5SaWdodCk7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLm1hcmdpblRvcCAgID0gRlV0aWxzLmNtMnB4KGRlZmluaXRpb24ucGFnZS5tYXJnaW5Ub3ApO1xuICAgICAgICB0aGlzLl9wYWdlSW5mby5tYXJnaW5Cb3R0b209IEZVdGlscy5jbTJweChkZWZpbml0aW9uLnBhZ2UubWFyZ2luQm90dG9tKTtcbiAgICAgICAgdGhpcy5fcGFnZUluZm8uYWN0aXZlQ2xpZW50SGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFnZUluZm8uYWN0aXZlQ2xpZW50V2lkdGggPSBGVXRpbHMuY20ycHgodGhpcy5fcGFnZUluZm8ud2lkdGgpIC0gdGhpcy5fcGFnZUluZm8ubWFyZ2luTGVmdCAtIHRoaXMuX3BhZ2VJbmZvLm1hcmdpblJpZ2h0O1xuICAgICAgICB0aGlzLl9wYWdlSW5mby5hY3RpdmVGb290ZXJZID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9kYXRhUm93cyA9IDxbYW55XT5bXTtcbiAgICAgICAgdGhpcy5fZGF0YVJvdyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2RhdGFSb3dJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2dyb3VwcyA9IDxbYW55XT5bXTtcbiAgICAgICAgdGhpcy5fc190aXRsZSAgPSBuZXcgRlNlY3Rpb24odGhpcywgZGVmaW5pdGlvbi5zZWN0aW9ucy50aXRsZSwgICd0aXRsZScpOyAgLy9jYWJlw6dhbGhvIGRvIHJlbGF0w7NyaW9cbiAgICAgICAgdGhpcy5fc19oZWFkZXIgPSBuZXcgRlNlY3Rpb24odGhpcywgZGVmaW5pdGlvbi5zZWN0aW9ucy5oZWFkZXIsICdoZWFkZXInKTsgLy9jYWJlw6dhbGhvIGRhIHDDoWdpbmFcbiAgICAgICAgdGhpcy5fc19kZXRhaWwgPSBuZXcgRlNlY3Rpb24odGhpcywgZGVmaW5pdGlvbi5zZWN0aW9ucy5kZXRhaWwsICdkZXRhaWwnKTsgLy9kZXRhbGhlcyBkYSBww6FnaW5hXG4gICAgICAgIHRoaXMuX3NfZm9vdGVyID0gbmV3IEZTZWN0aW9uKHRoaXMsIGRlZmluaXRpb24uc2VjdGlvbnMuZm9vdGVyLCAnZm9vdGVyJyk7IC8vcm9kYXDDqSBkYSBww6FnaW5hXG4gICAgICAgIHRoaXMuX3Nfc3VtbWFyeT0gbmV3IEZTZWN0aW9uKHRoaXMsIGRlZmluaXRpb24uc2VjdGlvbnMuc3VtbWFyeSwnc3VtbWFyeScpOy8vcm9kYXDDqSBkbyByZWxhdMOzcmlvXG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZUludGVybmFsVmFycygpO1xuXG4gICAgICAgIGlmIChkZWZpbml0aW9uLmdyb3Vwcyl7XG4gICAgICAgICAgICBmb3IgKGk9MDsgaTxkZWZpbml0aW9uLmdyb3Vwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgZyA9IGRlZmluaXRpb24uZ3JvdXBzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChnLmhlYWRlciB8fCBnLmZvb3Rlcil7XG4gICAgICAgICAgICAgICAgICAgIGdvID0ge2dyb3VwQnk6Zy5ncm91cEJ5LCBoZWFkZXI6bnVsbCwgZm9vdGVyOm51bGx9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZy5oZWFkZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ28uaGVhZGVyID0gbmV3IEZTZWN0aW9uKHRoaXMsIGcuaGVhZGVyLCAnc2hlYWRlcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChnLmZvb3Rlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBnby5mb290ZXIgPSBuZXcgRlNlY3Rpb24odGhpcywgZy5mb290ZXIsICdzZm9vdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3JvdXBzLnB1c2goZ28pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHpvb20ocGVyY2VudDpudW1iZXIpe1xuICAgICAgICB0aGlzLl9pZnJhbWUuY29udGVudERvY3VtZW50LmJvZHkuc3R5bGVbJ3pvb20nXSA9IHBlcmNlbnQgKyAnJSc7XG4gICAgfVxuXG4gICAgZ2V0RG9jdW1lbnQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lmcmFtZS5jb250ZW50RG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpbnQoKXtcbiAgICAgICAgdGhpcy5faWZyYW1lLmNvbnRlbnRXaW5kb3cucHJpbnQoKTtcbiAgICB9XG5cbiAgICBhZGRQYWdlKGRyYXdQYWdlSGVhZGVyPzpib29sZWFuLCBjaGVja0NvbGx1bW4/OmJvb2xlYW4pe1xuICAgICAgICB0aGlzLl9wYWdlSW5mby5hY3RpdmVQYWdlWSA9IHRoaXMuX3BhZ2VJbmZvLm1hcmdpblRvcDtcbiAgICAgICAgXG4gICAgICAgIC8vVE9ETzogaW1wbGVtZW50YXIgY29sdW5hc1xuICAgICAgICBpZiAoY2hlY2tDb2xsdW1uPT09dHJ1ZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29sPHRoaXMuX2NvbHMpe1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ3N0YXJ0UGFnZScpO1xuICAgICAgICBcbiAgICAgICAgLy9lbmNlcnJhIGEgcMOhZ2luYSBhbnRlcmlvclxuICAgICAgICBpZiAoIHRoaXMuX3BhZ2VJbmZvLmFjdGl2ZVBhZ2VOdW1iZXI+MCApe1xuICAgICAgICAgICAgdGhpcy5lbmRQYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9odG1sICs9ICc8ZGl2IGNsYXNzPVwicGFnZS1icmVha1wiPjwvZGl2Pic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wYWdlSW5mby5hY3RpdmVQYWdlTnVtYmVyKys7XG4gICAgICAgIHRoaXMudXBkYXRlSW50ZXJuYWxWYXJzKCk7XG4gICAgICAgIHRoaXMuX2h0bWwgKz0gYDxkaXYgY2xhc3M9XCJwYWdlXCIgc3R5bGU9XCJ3aWR0aDoke3RoaXMuX3BhZ2VJbmZvLndpZHRofWNtO2hlaWdodDoke3RoaXMuX3BhZ2VJbmZvLmhlaWdodH1jbVwiPmA7XG4gICAgICAgIFxuICAgICAgICAvL2Rlc2VuaGEgbyBjYWJlw6dhbGhvIGRhIHDDoWdpbmFcbiAgICAgICAgaWYgKGRyYXdQYWdlSGVhZGVyIT09ZmFsc2Upe1xuICAgICAgICAgICAgdGhpcy5fc19oZWFkZXIuZHJhdyh0aGlzLl9kYXRhUm93KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuZFBhZ2UoKXtcbiAgICAgICAgdGhpcy5fcGFnZUluZm8uYWN0aXZlUGFnZVggPSB0aGlzLl9wYWdlSW5mby5tYXJnaW5MZWZ0O1xuICAgICAgICB0aGlzLl9jb2wgPSAxO1xuXG4gICAgICAgIC8vZGVzZW5oYSBvIHJvZGFww6kgZGEgcMOhZ2luYVxuICAgICAgICB0aGlzLl9zX2Zvb3Rlci5kcmF3KHRoaXMuX2RhdGFSb3cpOy8vKCR0aGlzLT5hdHRyaWJ1dGVzWydwYWdlRm9vdGVyVG9wJ10gKTtcbiAgICAgICAgXG4gICAgICAgIC8vcmV0b3JuYSBhbyB0b3BvIGRhIHDDoWdpbmFcbiAgICAgICAgdGhpcy5fcGFnZUluZm8uYWN0aXZlUGFnZVkgPSB0aGlzLl9wYWdlSW5mby5tYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMuX2h0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2VuZFBhZ2UnKTtcbiAgICB9XG5cbiAgICBnZXRIVE1MKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9odG1sO1xuICAgIH1cblxuICAgIHNldEhUTUwoaHRtbDpzdHJpbmcpe1xuICAgICAgICB0aGlzLl9odG1sID0gaHRtbDtcbiAgICB9XG5cbiAgICBnZXRQYWdlSW5mbygpOklQYWdlSW5mb3tcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VJbmZvO1xuICAgIH1cblxuICAgIGdldFJvdygpe1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVJvdztcbiAgICB9XG5cbiAgICBnZXRVc2VyVmFycygpe1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZhclZhbHVlcztcbiAgICB9XG5cbiAgICBnZXRJbnRlcm5hbFZhcnMoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsVmFyVmFsdWVzO1xuICAgIH1cblxuICAgIGdldElkZW50aWZpZXJzKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnRlcm5hbDogdGhpcy5faW50ZXJuYWxWYXJOYW1lcyxcbiAgICAgICAgICAgIHVzZXJEZWYgOiB0aGlzLl91c2VyVmFyTmFtZXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcocm93czpbYW55XSl7XG4gICAgICAgIGxldCBpLCBoLCBvcmllbnRhdGlvbjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2lmcmFtZS5jb250ZW50RG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgXG4gICAgICAgIGlmICghcm93cyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGggPSBGVXRpbHMuY20ycHgodGhpcy5fcGFnZUluZm8uaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLl9kYXRhUm93cyA9IHJvd3M7XG4gICAgICAgIHRoaXMuX2RhdGFSb3cgPSB0aGlzLl9kYXRhUm93c1swXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnc3RhcnQnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLmFjdGl2ZUNsaWVudEhlaWdodCA9IGggLSB0aGlzLl9wYWdlSW5mby5tYXJnaW5Cb3R0b20gLSB0aGlzLl9wYWdlSW5mby5tYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLmFjdGl2ZUZvb3RlclkgICAgICA9IGggLSB0aGlzLl9wYWdlSW5mby5tYXJnaW5Cb3R0b20gLSB0aGlzLl9zX2Zvb3Rlci5nZXRIZWlnaHQoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWRkUGFnZShmYWxzZSwgZmFsc2UpOyAgICAvL2NyaWEgYSBwcmltZWlyYSBww6FnaW5hIGRvIHJlbGF0w7NyaW8sIHNlbSBjYWJlw6dhbGhvIGRlIHDDoWdpbmFcbiAgICAgICAgICAgIHRoaXMuX3NfdGl0bGUuZHJhdyh0aGlzLl9kYXRhUm93KTsgICAgICAvL2Rlc2VuaGEgbyBjYWJlw6dhbGhvIGRvIHJlbGF0w7NyaW9cbiAgICAgICAgICAgIHRoaXMuX3NfaGVhZGVyLmRyYXcodGhpcy5fZGF0YVJvdyk7ICAgICAvL2Rlc2VuaGEgbyBjYWJlw6dhbGhvIGRhIHByaW1laXJhIHDDoWdpbmFcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9kZXNlbmhhIG8gY29ycG8gZG8gcmVsYXTDs3Jpb1xuICAgICAgICAgICAgaWYgKHRoaXMuX2dyb3Vwcy5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R3JvdXAocm93cywgMCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBmb3IgKGk9MDsgaTxyb3dzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YVJvdyA9IHJvd3NbaV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NfZGV0YWlsLmRyYXcodGhpcy5fZGF0YVJvdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9wYWdlSW5mby5hY3RpdmVQYWdlWCA9IHRoaXMuX3BhZ2VJbmZvLm1hcmdpbkxlZnQ7XG4gICAgICAgICAgICB0aGlzLl9zX3N1bW1hcnkuZHJhdyh0aGlzLl9kYXRhUm93KTsgLy9kZXNlbmhhIG8gcm9kYXDDqSBkbyByZWxhdMOzcmlvc1xuICAgICAgICB0aGlzLmVuZFBhZ2UoKTsgICAgICAgICAvL2ZpbmFsaXphIGEgcMOhZ2luYVxuICAgICAgICBcbiAgICAgICAgb3JpZW50YXRpb24gPSB0aGlzLl9wYWdlSW5mby5vcmllbnRhdGlvbj09J2xhbmRzY2FwZScgPyAnQG1lZGlhIHByaW50e0BwYWdlIHtzaXplOiBsYW5kc2NhcGV9fScgOiAnJztcblxuICAgICAgICB0aGlzLl9pZnJhbWUuY29udGVudERvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gXG4gICAgICAgIGA8c3R5bGU+XG4gICAgICAgICAgICAqe1xuICAgICAgICAgICAgICAgIC13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O1xuICAgICAgICAgICAgICAgIGJveC1zaXppbmc6Ym9yZGVyLWJveDtcbiAgICAgICAgICAgICAgICBmb250OjEycHQgc2Fucy1zZXJpZiwgR2VvcmdpYSwgXCJUaW1lcyBOZXcgUm9tYW5cIiwgVGltZXMsIHNlcmlmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keXtwYWRkaW5nOjA7bWFyZ2luOjA7fVxuICAgICAgICAgICAgLnBhZ2V7cG9zaXRpb246cmVsYXRpdmU7IG92ZXJmbG93OmhpZGRlbjsgYmFja2dyb3VuZDojZmZmO31cbiAgICAgICAgICAgIC5wYWdlLWJyZWFre3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoxcHg7d2lkdGg6MTBweDtvdmVyZmxvdzpoaWRkZW47bWFyZ2luLXRvcDotMXB4O3BhZ2UtYnJlYWstYWZ0ZXI6IGFsd2F5czt9XG4gICAgICAgICAgICAuc2VjdGlvbntwb3NpdGlvbjphYnNvbHV0ZTsgb3ZlcmZsb3c6aGlkZGVufVxuICAgICAgICAgICAgLnNlY3Rpb24tZGVzaWdlcntwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MDt0b3A6MDtib3R0b206MDtib3JkZXI6ZGFzaGVkIDFweCAjYzBjMGMwO31cbiAgICAgICAgICAgIC5zZWN0aW9uLWRlc2lnZXItdGl0bGV7Ym9yZGVyLWNvbG9yOnJlZH1cbiAgICAgICAgICAgIC5zZWN0aW9uLWRlc2lnZXItaGVhZGVye2JvcmRlci1jb2xvcjpibHVlfVxuICAgICAgICAgICAgLnNlY3Rpb24tZGVzaWdlci10aXRsZXtib3JkZXItY29sb3I6Z3JlZW59XG4gICAgICAgICAgICAuc2VjdGlvbi1kZXNpZ2VyLWRldGFpbHtib3JkZXItY29sb3I6cmdiKDEwLCAxNjUsIDE1OSl9XG4gICAgICAgICAgICAuc2VjdGlvbi1kZXNpZ2VyLWZvb3Rlcntib3JkZXItY29sb3I6cmdiKDE4OSwgMjQsIDI1Myl9XG4gICAgICAgICAgICAuc2VjdGlvbi1kZXNpZ2VyLXN1bW1hcnl7Ym9yZGVyLWNvbG9yOnJnYigxMTQsIDIsIDQ3KX1cbiAgICAgICAgICAgIC5lbGVtZW50e3Bvc2l0aW9uOmFic29sdXRlfVxuICAgICAgICAgICAgLnJlY3R7Ym9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDA7IGJvcmRlci1zdHlsZTpzb2xpZDsgd2lkdGg6MTAwcHg7IGhlaWdodDo0MHB4fVxuXG4gICAgICAgICAgICBAbWVkaWEgc2NyZWVuIHtcbiAgICAgICAgICAgICAgICBib2R5e1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOnJnYigyNDQsIDI0NCwgMjQ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLnBhZ2V7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6MTBweDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OjEwcHg7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OjEwcHg7XG4gICAgICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6MXB4IDFweCA0cHggcmdiYSgxNjEsIDE2MSwgMTYxLCAwLjcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEBwYWdlIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDBjbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICR7b3JpZW50YXRpb259XG4gICAgICAgIDwvc3R5bGU+XG4gICAgICAgICR7dGhpcy5faHRtbH1gO1xuXG4gICAgICAgIHRoaXMuX3NfdGl0bGUub25Db21wbGV0ZSgpO1xuICAgICAgICB0aGlzLl9zX2hlYWRlci5vbkNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuX2dyb3Vwcy5mb3JFYWNoKChncm91cDphbnkpPT57aWYgKGdyb3VwLmhlYWRlcikgZ3JvdXAuaGVhZGVyLm9uQ29tcGxldGUoKTt9KTtcbiAgICAgICAgdGhpcy5fc19kZXRhaWwub25Db21wbGV0ZSgpO1xuICAgICAgICB0aGlzLl9zX2Zvb3Rlci5vbkNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuX2dyb3Vwcy5mb3JFYWNoKChncm91cDphbnkpPT57aWYgKGdyb3VwLmZvb3RlcikgZ3JvdXAuZm9vdGVyLm9uQ29tcGxldGUoKTt9KTtcbiAgICAgICAgdGhpcy5fc19zdW1tYXJ5Lm9uQ29tcGxldGUoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnZW5kJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0bWw7XG4gICAgfVxuXG4gICAgZHJhd0dyb3VwKHJvd3M6W2FueV0sIGdyb3VwSW5kZXg6bnVtYmVyKXtcbiAgICAgICAgbGV0IGksIGdyb3VwcywgZ3JvdXBCeUZpZWxkTmFtZSwgZ3JvdXBCeUZpZWxkVmFsdWUsIHZhcnM7XG4gICAgICAgIFxuICAgICAgICBncm91cHMgPSB0aGlzLl9ncm91cHNbZ3JvdXBJbmRleF07XG4gICAgICAgIFxuICAgICAgICBpZiAoZ3JvdXBzKXtcbiAgICAgICAgICAgIGdyb3VwQnlGaWVsZE5hbWUgPSBncm91cHMuZ3JvdXBCeTtcbiAgICAgICAgICAgIHZhcnMgPSB0aGlzLmdldFVzZXJWYXJzKCk7XG5cbiAgICAgICAgICAgIGZvciAoaT0wOyBpPHJvd3MubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFSb3cgPSByb3dzW2ldO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnZ3JvdXBTdGFydCcpO1xuICAgICAgICAgICAgICAgIGlmIChncm91cHMuaGVhZGVyKSBncm91cHMuaGVhZGVyLmRyYXcodGhpcy5fZGF0YVJvdyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBkZXNlbmhhciBzdWJncnVwb3NcbiAgICAgICAgICAgICAgICAvL3RoaXMuZHJhd0dyb3VwKHJvd3MpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9kZXNlbmhhIG8gZGV0YWxoZSBlbnF1YW5kbyBlc3RpdmVyIGRlbnRybyBkbyBtZXNtbyBncnVwb1xuICAgICAgICAgICAgICAgIGdyb3VwQnlGaWVsZFZhbHVlID0gdGhpcy5fZGF0YVJvd1tncm91cEJ5RmllbGROYW1lXTtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5fZGF0YVJvd1tncm91cEJ5RmllbGROYW1lXT09PWdyb3VwQnlGaWVsZFZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc19kZXRhaWwuZHJhdyh0aGlzLl9kYXRhUm93KTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vcHLDs3hpbW8gcmVnaXN0cm9cbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaTxyb3dzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhUm93ID0gcm93c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL2RlaXhhIG8gcG9udGVpcm8gbm8gw7psdGltbyByZWdpc3RybyBkZXNlbmhhZG9cbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVJvdyA9IHJvd3NbaV07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGdyb3Vwcy5mb290ZXIpIGdyb3Vwcy5mb290ZXIuZHJhdyh0aGlzLl9kYXRhUm93KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2dyb3VwRW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VJbmZve1xuICAgIG9yaWVudGF0aW9uICAgICAgIDogc3RyaW5nO1xuICAgIHdpZHRoICAgICAgICAgICAgIDogbnVtYmVyO1xuICAgIGhlaWdodCAgICAgICAgICAgIDogbnVtYmVyO1xuICAgIG1hcmdpblJpZ2h0ICAgICAgIDogbnVtYmVyO1xuICAgIG1hcmdpblRvcCAgICAgICAgIDogbnVtYmVyO1xuICAgIG1hcmdpbkxlZnQgICAgICAgIDogbnVtYmVyO1xuICAgIG1hcmdpbkJvdHRvbSAgICAgIDogbnVtYmVyO1xuICAgIGFjdGl2ZUNsaWVudEhlaWdodDogbnVtYmVyOyAvL2FsdHVyYSBkYSDDoXJlYSBkZSBpbXByZXNzw6NvIGRhIHDDoWdpbmFcbiAgICBhY3RpdmVDbGllbnRXaWR0aCA6IG51bWJlcjsgLy9sYXJndXJhIGRhIMOhcmVhIGRlIGltcHJlc3PDo28gZGEgcMOhZ2luYVxuICAgIGFjdGl2ZUZvb3RlclkgICAgIDogbnVtYmVyOyAvL3ZhbG9yIHkgZGEgc2XDp8OjbyhGU2VjdGlvbikgX3NfZm9vdGVyXG4gICAgYWN0aXZlUGFnZVggICAgICAgOiBudW1iZXI7XG4gICAgYWN0aXZlUGFnZVkgICAgICAgOiBudW1iZXI7XG4gICAgYWN0aXZlUGFnZU51bWJlciAgOiBudW1iZXI7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElGUmVwb3J0IGV4dGVuZHMgRlJlcG9ydHt9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRlJlcG9ydC50cyIsIi8vIGluZGV4LnRzXG5cbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9GVXRpbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL0ZFbGVtZW50JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9GUmVwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9GU2VjdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvRlRleHQnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL0ZJbWFnZSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXgudHMiXSwic291cmNlUm9vdCI6IiJ9