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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// FElement.ts
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FUtils_1) {
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FElement_1) {
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

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FElement_1) {
    "use strict";
    var FLine = (function (_super) {
        __extends(FLine, _super);
        function FLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FLine.prototype.draw = function (data) {
            var s = this._definition['stroke'] || '#000', sw = this._definition['stroke-width'] || 1;
            return "<div class=\"element line\" " + this.getStyleAttribute() + ">\n                    <svg style=\"position:absolute\" height=\"100%\" width=\"100%\">\n                        <line x1=\"0\" y1=\"0\" x2=\"100%\" y2=\"100%\" style=\"stroke:" + s + "; stroke-width:" + sw + "px;\"/>\n                    </svg>\n                </div>";
        };
        return FLine;
    }(FElement_1.FElement));
    exports.FLine = FLine;
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
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FElement_1) {
    "use strict";
    var FRect = (function (_super) {
        __extends(FRect, _super);
        function FRect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FRect.prototype.draw = function (data) {
            return "<div class=\"element rect\" " + this.getStyleAttribute() + "></div>";
        };
        return FRect;
    }(FElement_1.FElement));
    exports.FRect = FRect;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// FSection.ts
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(6), __webpack_require__(2), __webpack_require__(4), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FUtils_1, FText_1, FImage_1, FRect_1, FLine_1) {
    "use strict";
    //import {FElipse} from "./FElipse";
    //import {FBreak} from "./FBreak";
    var FElements = {
        "Text": FText_1.FText,
        "Image": FImage_1.FImage,
        "Line": FLine_1.FLine,
        "Rect": FRect_1.FRect
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FElement_1) {
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FUtils_1, FSection_1) {
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// index.ts
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(0), __webpack_require__(7), __webpack_require__(5), __webpack_require__(6), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, FUtils_1, FElement_1, FReport_1, FSection_1, FText_1, FImage_1, FLine_1, FRect_1) {
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
    __export(FLine_1);
    __export(FRect_1);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5ZjFhZDI2MmQyZWIzNzZmMTI4MSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9GRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9GVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRkltYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0ZMaW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0ZSZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0ZTZWN0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0ZUZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0ZSZXBvcnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hF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QVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXhCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFDTCxjQUFDO0lBQUQsQ0FBQztJQWpWWSwwQkFBTztJQWlXbkIsQ0FBQzs7Ozs7Ozs7O0FDcldGLDJFQUFXOzs7Ozs7SUFFWCxtQkFBb0M7SUFDcEMscUJBQXNDO0lBQ3RDLG9CQUFxQztJQUNyQyxxQkFBc0M7SUFDdEMsa0JBQW1DO0lBQ25DLG1CQUFvQztJQUNwQyxrQkFBbUM7SUFDbkMsa0JBQW1DIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZnJlcG9ydFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJmcmVwb3J0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDlmMWFkMjYyZDJlYjM3NmYxMjgxIiwiLy8gRkVsZW1lbnQudHNcblxuaW1wb3J0IHtJRlJlcG9ydCwgSVBhZ2VJbmZvfSBmcm9tICcuL0ZSZXBvcnQnO1xuaW1wb3J0IHtJRlNlY3Rpb259IGZyb20gJy4vRlNlY3Rpb24nO1xuaW1wb3J0IHtGVXRpbHN9IGZyb20gJy4vRlV0aWxzJztcblxuZXhwb3J0IGNsYXNzIEZFbGVtZW50e1xuICAgIHByb3RlY3RlZCBfcmVwb3J0OklGUmVwb3J0O1xuICAgIHByaXZhdGUgX3NlY3Rpb246SUZTZWN0aW9uO1xuICAgIHByaXZhdGUgX3BhZ2VJbmZvOklQYWdlSW5mbztcbiAgICBwcml2YXRlIF9maWVsZHM6W3N0cmluZ10gPSA8W3N0cmluZ10+W107XG4gICAgcHJpdmF0ZSBfa2V5OmFueTtcbiAgICBwcml2YXRlIF9hdXRvV3JhcDphbnk7XG4gICAgcHJpdmF0ZSBfb25CZWZvcmVQcmludDphbnk7XG4gICAgcHJpdmF0ZSBfdmlzaWJsZTphbnk7XG4gICAgcHJpdmF0ZSBfdmFsdWU6c3RyaW5nO1xuICAgIFxuICAgIHByb3RlY3RlZCBfaWRlbnRpZmllcnM6YW55O1xuICAgIHByb3RlY3RlZCBfZGVmaW5pdGlvbjphbnk7XG4gICAgcHJvdGVjdGVkIF9zdHlsZTphbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihkZWZpbml0aW9uOmFueSl7XG4gICAgfVxuXG4gICAgaW5pdCAocmVwb3J0OklGUmVwb3J0LCBzZWN0aW9uOklGU2VjdGlvbiwgZGVmaW5pdGlvbjphbnkpe1xuICAgICAgICBsZXQgYSwgazpzdHJpbmcsIGk6bnVtYmVyLCBmbjpGdW5jdGlvbiwgc3R5bGU6c3RyaW5nLCBjb2RlPScnOyAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBzdHlsZSA9IChkZWZpbml0aW9uLng9PT11bmRlZmluZWQgICAgICA/ICcnIDogYGxlZnQ6JHtkZWZpbml0aW9uLnh9cHg7YCkgK1xuICAgICAgICAgICAgICAgIChkZWZpbml0aW9uLnk9PT11bmRlZmluZWQgICAgICA/ICcnIDogYHRvcDoke2RlZmluaXRpb24ueX1weDtgKSArXG4gICAgICAgICAgICAgICAgKGRlZmluaXRpb24ud2lkdGg9PT11bmRlZmluZWQgID8gJycgOiBgd2lkdGg6JHtkZWZpbml0aW9uLndpZHRofXB4O2ApICtcbiAgICAgICAgICAgICAgICAoZGVmaW5pdGlvbi5oZWlnaHQ9PT11bmRlZmluZWQgPyAnJyA6IGBoZWlnaHQ6JHtkZWZpbml0aW9uLmhlaWdodH1weDtgKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAoayBpbiBkZWZpbml0aW9uKXtcbiAgICAgICAgICAgIGZuID0gKDxhbnk+Q3NzUHJvcGVydGllc0NvbnZlcnRlcilba107XG4gICAgICAgICAgICBpZiAoZm4pe1xuICAgICAgICAgICAgICAgIHN0eWxlICs9IChmbihkZWZpbml0aW9uW2tdKSArICc7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChkZWZpbml0aW9uLnZhbHVlKXtcbiAgICAgICAgICAgIHRoaXMuX2lkZW50aWZpZXJzICA9IHJlcG9ydC5nZXRJZGVudGlmaWVycygpO1xuXG4gICAgICAgICAgICAvL2NyaWEgZGVmaW5pdGlvbi4kZmllbGRzXG4gICAgICAgICAgICBkZWZpbml0aW9uLiRmaWVsZHMgPSB7fTtcbiAgICAgICAgICAgIChkZWZpbml0aW9uLnZhbHVlLm1hdGNoKC9cXCR7W159XSt9L2cpIHx8IFtdKS5mb3JFYWNoKChmaWVsZDpzdHJpbmcpPT57ZGVmaW5pdGlvbi4kZmllbGRzW2ZpZWxkXT0xO30pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWZpbml0aW9uLnZhbHVlID0gZGVmaW5pdGlvbi52YWx1ZS5yZXBsYWNlKCckeyNwYWdlc30nLCAnX19wYWdlc19fJyk7XG5cbiAgICAgICAgICAgIC8vY3JpYSBkZWZpbml0aW9uLiRnZXRWYWx1ZVxuICAgICAgICAgICAgZGVmaW5pdGlvbi4kZ2V0VmFsdWUgPSBGVXRpbHMuY29tcGlsZXJUZW1wbGF0ZShkZWZpbml0aW9uLnZhbHVlLCB0aGlzLl9pZGVudGlmaWVycy5pbnRlcm5hbCwgdGhpcy5faWRlbnRpZmllcnMudXNlckRlZik7XG4gICAgICAgICAgICAoZGVmaW5pdGlvbi52YWx1ZS5tYXRjaCgvXFwke1tefV0rfS9nKSB8fCBbXSkuZm9yRWFjaCgoZmllbGQ6c3RyaW5nKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpZWxkcy5wdXNoKGZpZWxkLnJlcGxhY2UoJyR7JywgJycpLnJlcGxhY2UoJ30nLCcnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlcG9ydCA9IHJlcG9ydDtcbiAgICAgICAgdGhpcy5fc2VjdGlvbj0gc2VjdGlvbjtcblxuICAgICAgICB0aGlzLl9wYWdlSW5mbyAgICAgID0gcmVwb3J0LmdldFBhZ2VJbmZvKCk7XG4gICAgICAgIHRoaXMuX2RlZmluaXRpb24gICAgPSBkZWZpbml0aW9uO1xuICAgICAgICB0aGlzLl9rZXkgICAgICAgICAgID0gZGVmaW5pdGlvbi5rZXk7XG4gICAgICAgIHRoaXMuX2F1dG9XcmFwICAgICAgPSBkZWZpbml0aW9uLmF1dG9XcmFwO1xuICAgICAgICB0aGlzLl9vbkJlZm9yZVByaW50ID0gZGVmaW5pdGlvbi5vbkJlZm9yZVByaW50O1xuICAgICAgICB0aGlzLl92aXNpYmxlICAgICAgID0gZGVmaW5pdGlvbi52aXNpYmxlO1xuICAgICAgICB0aGlzLl92YWx1ZSAgICAgICAgID0gZGVmaW5pdGlvbi52YWx1ZSB8fCAnJztcbiAgICAgICAgdGhpcy5fc3R5bGUgICAgICAgICA9IHN0eWxlICsgKGRlZmluaXRpb24uc3R5bGUgPyAoJzsnK2RlZmluaXRpb24uc3R5bGUpIDogJycpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdmFsdWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb24uJGdldFZhbHVlID8gXG4gICAgICAgICAgICAgICB0aGlzLl9kZWZpbml0aW9uLiRnZXRWYWx1ZSggdGhpcy5fcmVwb3J0LmdldEludGVybmFsVmFycygpLCB0aGlzLl9yZXBvcnQuZ2V0VXNlclZhcnMoKSwgdGhpcy5fcmVwb3J0LmdldFJvdygpKSA6IFxuICAgICAgICAgICAgICAgdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgZHJhdyhyb3c6W2FueV0pe1xuICAgICAgICByZXR1cm4gJzxwcmU+ZHJhdyBub3QgaW1wbGVtZW50ZWQ8L3ByZT4nO1xuICAgIH1cblxuICAgIGdldFN0eWxlQXR0cmlidXRlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZSA/IGBzdHlsZT1cIiR7dGhpcy5fc3R5bGV9XCJgIDogJyc7XG4gICAgfVxuXG4gICAgb25Db21wbGV0ZSgpe31cbn1cbiAgICBcbmxldCBDc3NQcm9wZXJ0aWVzQ29udmVydGVyID0ge1xuICAgIFwiZm9udEJvbGRcIjogZnVuY3Rpb24odmFsdWU6c3RyaW5nKTpzdHJpbmd7XG4gICAgICAgIHJldHVybiBcImZvbnQtd2VpZ2h0OlwiICsgKHZhbHVlID8gXCJib2xkXCIgOiBcIm5vcm1hbFwiKTtcbiAgICB9LFxuICAgIFwiZm9udFNpemVcIjogZnVuY3Rpb24odmFsdWU6c3RyaW5nKTpzdHJpbmd7XG4gICAgICAgIHJldHVybiBcImZvbnQtc2l6ZTpcIiArICh2YWx1ZSArIFwicHhcIik7XG4gICAgfSxcbiAgICBcImZvbnRVbmRlcmxpbmVcIjogZnVuY3Rpb24odmFsdWU6c3RyaW5nKTpzdHJpbmd7XG4gICAgICAgIHJldHVybiBcInRleHQtZGVjb3JhdGlvbjpcIiArICh2YWx1ZSA/IFwidW5kZXJsaW5lXCIgOiBcIm5vcm1hbFwiKTtcbiAgICB9LFxuICAgIFwiZm9udEl0YWxpY1wiOiBmdW5jdGlvbih2YWx1ZTpzdHJpbmcpOnN0cmluZ3tcbiAgICAgICAgcmV0dXJuIFwiZm9udC1zdHlsZTpcIiArICh2YWx1ZSA/IFwiaXRhbGljXCIgOiBcIlwiKTtcbiAgICB9LFxuICAgIFwidGV4dEFsaWduXCI6IGZ1bmN0aW9uKHZhbHVlOnN0cmluZyk6c3RyaW5ne1xuICAgICAgICByZXR1cm4gXCJ0ZXh0LWFsaWduOlwiICsgKHZhbHVlKTtcbiAgICB9LFxuICAgIFwiYmFja2dyb3VuZFwiOiBmdW5jdGlvbih2YWx1ZTpzdHJpbmcpOnN0cmluZ3tcbiAgICAgICAgcmV0dXJuIFwiYmFja2dyb3VuZC1jb2xvcjpcIiArIHZhbHVlO1xuICAgIH0sXG4gICAgXCJib3JkZXJTdHlsZVwiOiBmdW5jdGlvbih2YWx1ZTpzdHJpbmcpOnN0cmluZ3tcbiAgICAgICAgcmV0dXJuIFwiYm9yZGVyLXN0eWxlOlwiICsgdmFsdWU7XG4gICAgfSxcbiAgICBcImJvcmRlcldpZHRoXCI6IGZ1bmN0aW9uKHZhbHVlOnN0cmluZyk6c3RyaW5ne1xuICAgICAgICByZXR1cm4gXCJib3JkZXItd2lkdGg6XCIgKyAodmFsdWUgKyBcInB4XCIpO1xuICAgIH0sXG4gICAgXCJib3JkZXJDb2xvclwiOiBmdW5jdGlvbih2YWx1ZTpzdHJpbmcpOnN0cmluZ3tcbiAgICAgICAgcmV0dXJuIFwiYm9yZGVyLWNvbG9yOlwiICsgdmFsdWU7XG4gICAgfVxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9GRWxlbWVudC50cyIsImxldCBweFBlckNtOm51bWJlcjtcblxuZXhwb3J0IGNsYXNzIEZVdGlsc3tcbiAgICBcbiAgICBzdGF0aWMgcHgyY20ocHg6bnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBweCAvIEZVdGlscy5nZXRQeFBlckNtKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNtMnB4KGNtOm51bWJlcikge1xuICAgICAgICByZXR1cm4gY20gKiBGVXRpbHMuZ2V0UHhQZXJDbSgpO1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0UHhQZXJDbSgpe1xuICAgICAgICBsZXQgZDtcbiAgICAgICAgICAgIFxuICAgICAgICBpZiAocHhQZXJDbT09PXVuZGVmaW5lZCl7XG4gICAgICAgICAgICBkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkLnN0eWxlLmNzc1RleHQgPSBcInBvc2l0aW9uOmFic29sdXRlO3RvcDotMTAwMGNtO2xlZnQ6LTEwMDBjbTtoZWlnaHQ6MTAwMGNtO3dpZHRoOjEwMDBjbTtcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZCk7XG4gICAgICAgICAgICBweFBlckNtID0gZC5vZmZzZXRIZWlnaHQgLyAxMDAwO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHB4UGVyQ207XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BhdGNoKGNvbnRleHQ6YW55LCBldmVudHM6YW55LCBldmVudDpzdHJpbmcsIHAxPzphbnksIHAyPzphbnksIHAzPzphbnkpe1xuICAgICAgICBsZXQgZiA9IDxGdW5jdGlvbj5ldmVudHNbZXZlbnRdO1xuICAgICAgICBcbiAgICAgICAgaWYgKGYpe1xuICAgICAgICAgICAgZi5jYWxsKGNvbnRleHQscDEsIHAyLCBwMyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0UHJvcGVydGllcyhlbDpIVE1MRWxlbWVudCl7XG4gICAgICAgIHJldHVybiAgW1xuICAgICAgICAgICAge25hbWU6XCJoZWlnaHRcIiwgdHlwZTonaW50JywgdmFsdWU6IGVsLm9mZnNldEhlaWdodH1cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29tcGlsZXJUZW1wbGF0ZSh0ZW1wbGF0ZTpzdHJpbmcsIGludGVybmFsSWRlbnRpZmllcnM6W3N0cmluZ10sIHVzZXJJZGVudGlmaWVyczpbc3RyaW5nXSkge1xuICAgICAgICB2YXIgaSwgcGFyYW1zOlthbnldLCBwID0gJycsIHBhcnRzMSwgcGFydHMyLCBjb2RlID0gJycsIHY7XG5cbiAgICAgICAgcGFydHMxID0gdGVtcGxhdGUuc3BsaXQoJ30nKTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGFydHMyID0gcGFydHMxW2ldLnNwbGl0KCckeycpO1xuICAgICAgICAgICAgaWYgKHBhcnRzMi5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICB2ID0gaW50ZXJuYWxJZGVudGlmaWVycy5pbmRleE9mKHBhcnRzMlsxXSkhPS0xICA/IGBpbnRlcm5hbElkZW50aWZpZXJzW1wiJHtwYXJ0czJbMV19XCJdYCAgOiBcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkZW50aWZpZXJzLmluZGV4T2YocGFydHMyWzFdKSE9LTEgPyBgdXNlcklkZW50aWZpZXJzW1wiJHtwYXJ0czJbMV19XCJdYCA6IFxuICAgICAgICAgICAgICAgICAgICBgZGF0YVtcIiR7cGFydHMyWzFdfVwiXWA7XG5cbiAgICAgICAgICAgICAgICBjb2RlICs9IChgJHtwfScke3BhcnRzMlswXX0nKygke3Z9KWApOyAgLy8ocCArIFwiJ1wiICsgcGFydHMyWzBdICsgXCInKyhcIiArIHYgKyBcIilcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvZGUgKz0gKGAke3B9JyR7cGFydHMyWzBdfSdgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAgPSAnKyc7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXMgPSBbJ2ludGVybmFsSWRlbnRpZmllcnMnLCd1c2VySWRlbnRpZmllcnMnLCAnZGF0YScsICdyZXR1cm4gJyArIGNvZGUgKyAnOyddO1xuXG4gICAgICAgIHJldHVybiBGdW5jdGlvbi5hcHBseShudWxsLCBwYXJhbXMpO1xuICAgIH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRlV0aWxzLnRzIiwiaW1wb3J0IHtGRWxlbWVudH0gZnJvbSBcIi4vRkVsZW1lbnRcIjtcblxuZXhwb3J0IGNsYXNzIEZJbWFnZSBleHRlbmRzIEZFbGVtZW50e1xuICAgIGRyYXcoZGF0YTpbYW55XSl7ICAgICBcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZWxlbWVudCBpbWFnZVwiICR7dGhpcy5nZXRTdHlsZUF0dHJpYnV0ZSgpfT5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3RoaXMudmFsdWUoKX1cIiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjEwMCVcIi8+XG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICB9XG59IFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRkltYWdlLnRzIiwiaW1wb3J0IHtGRWxlbWVudH0gZnJvbSBcIi4vRkVsZW1lbnRcIjtcblxuZXhwb3J0IGNsYXNzIEZMaW5lIGV4dGVuZHMgRkVsZW1lbnR7XG4gICAgZHJhdyhkYXRhOlthbnldKXsgICAgIFxuICAgICAgICBsZXQgcyA9IHRoaXMuX2RlZmluaXRpb25bJ3N0cm9rZSddIHx8ICcjMDAwJyxcbiAgICAgICAgICAgIHN3PSB0aGlzLl9kZWZpbml0aW9uWydzdHJva2Utd2lkdGgnXSB8fCAxO1xuXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImVsZW1lbnQgbGluZVwiICR7dGhpcy5nZXRTdHlsZUF0dHJpYnV0ZSgpfT5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlXCIgaGVpZ2h0PVwiMTAwJVwiIHdpZHRoPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxMDAlXCIgeTI9XCIxMDAlXCIgc3R5bGU9XCJzdHJva2U6JHtzfTsgc3Ryb2tlLXdpZHRoOiR7c3d9cHg7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgIH1cbn0gXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0ZMaW5lLnRzIiwiaW1wb3J0IHtGRWxlbWVudH0gZnJvbSBcIi4vRkVsZW1lbnRcIjtcblxuZXhwb3J0IGNsYXNzIEZSZWN0IGV4dGVuZHMgRkVsZW1lbnR7XG4gICAgZHJhdyhkYXRhOlthbnldKXtcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZWxlbWVudCByZWN0XCIgJHt0aGlzLmdldFN0eWxlQXR0cmlidXRlKCl9PjwvZGl2PmA7XG4gICAgfVxufSBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0ZSZWN0LnRzIiwiLy8gRlNlY3Rpb24udHNcblxuaW1wb3J0IHtGVXRpbHN9IGZyb20gXCIuL0ZVdGlsc1wiO1xuaW1wb3J0IHtGUmVwb3J0fSBmcm9tIFwiLi9GUmVwb3J0XCI7XG5pbXBvcnQge0ZFbGVtZW50fSBmcm9tIFwiLi9GRWxlbWVudFwiO1xuaW1wb3J0IHtGVGV4dH0gZnJvbSBcIi4vRlRleHRcIjtcbmltcG9ydCB7RkltYWdlfSBmcm9tIFwiLi9GSW1hZ2VcIjtcbmltcG9ydCB7RlJlY3R9IGZyb20gXCIuL0ZSZWN0XCI7XG5pbXBvcnQge0ZMaW5lfSBmcm9tIFwiLi9GTGluZVwiO1xuLy9pbXBvcnQge0ZFbGlwc2V9IGZyb20gXCIuL0ZFbGlwc2VcIjtcbi8vaW1wb3J0IHtGQnJlYWt9IGZyb20gXCIuL0ZCcmVha1wiO1xuXG5sZXQgRkVsZW1lbnRzID0ge1xuICAgIFwiVGV4dFwiICA6IEZUZXh0LFxuICAgIFwiSW1hZ2VcIiA6IEZJbWFnZSxcbiAgICBcIkxpbmVcIiAgOiBGTGluZSxcbiAgICBcIlJlY3RcIiAgOiBGUmVjdFxuICAgIC8vXCJFbGlwc2VcIjogRkVsaXBzZSxcbiAgICAvL1wiQnJlYWtcIiA6IEZCcmVha1xufTtcblxuZXhwb3J0IGNsYXNzIEZTZWN0aW9ue1xuICAgIHByaXZhdGUgX2V2ZW50czphbnk7XG4gICAgcHJpdmF0ZSBfcmVwb3J0OkZSZXBvcnQ7XG4gICAgcHJpdmF0ZSBfdHlwZTpzdHJpbmc7XG4gICAgcHJpdmF0ZSBfd2lkdGg6bnVtYmVyO1xuICAgIHByaXZhdGUgX3g6bnVtYmVyO1xuICAgIHByaXZhdGUgX3k6bnVtYmVyO1xuICAgIHByaXZhdGUgX2RlZmluaXRpb246YW55O1xuICAgIHByaXZhdGUgX2NoaWxkcmVuOltGRWxlbWVudF07XG4gICAgXG4gICAgY29uc3RydWN0b3IocmVwb3J0OkZSZXBvcnQsIGRlZmluaXRpb246YW55LCB0eXBlOnN0cmluZyl7XG4gICAgICAgIGxldCBpLCBqLCB0LFxuICAgICAgICAgICAgZmVsZW1lbnQ6RkVsZW1lbnQsXG4gICAgICAgICAgICBURkVsZW1lbnQ6YW55LCBcbiAgICAgICAgICAgIGNoaWxkcmVuPVtdLCBcbiAgICAgICAgICAgIHBhZ2VJbmZvID0gcmVwb3J0LmdldFBhZ2VJbmZvKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcbiAgICAgICAgdGhpcy5fZXZlbnRzICAgICA9IHt9O1xuICAgICAgICB0aGlzLl9yZXBvcnQgICAgID0gcmVwb3J0O1xuICAgICAgICB0aGlzLl90eXBlICAgICAgID0gdHlwZTtcbiAgICAgICAgdGhpcy5fd2lkdGggICAgICA9IHBhZ2VJbmZvLmFjdGl2ZUNsaWVudFdpZHRoO1xuICAgICAgICB0aGlzLl94ICAgICAgICAgID0gcGFnZUluZm8ubWFyZ2luTGVmdDtcbiAgICAgICAgIFxuICAgICAgICBpZiAoIWRlZmluaXRpb24pIHJldHVybjtcblxuICAgICAgICBpZiAoZGVmaW5pdGlvbi5jaGlsZHJlbil7XG4gICAgICAgICAgICBmb3IgKGk9MDsgaTxkZWZpbml0aW9uLmNoaWxkcmVuLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0ICAgICAgICA9IGRlZmluaXRpb24uY2hpbGRyZW5baV0udHlwZTtcbiAgICAgICAgICAgICAgICBqICAgICAgICA9IGRlZmluaXRpb24uY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgZmVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIFRGRWxlbWVudD0gKDxhbnk+RkVsZW1lbnRzKVt0XTtcblxuICAgICAgICAgICAgICAgIGlmIChURkVsZW1lbnQpe1xuICAgICAgICAgICAgICAgICAgICBmZWxlbWVudCA9IG5ldyBURkVsZW1lbnQoaik7XG4gICAgICAgICAgICAgICAgICAgIGZlbGVtZW50LmluaXQocmVwb3J0LCB0aGlzLCBqKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKDxhbnk+ZmVsZW1lbnQpLm9uQ29tcGxldGUpe1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGZlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSA8W0ZFbGVtZW50XT5jaGlsZHJlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWZpbml0aW9uLm9uKXtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IGRlZmluaXRpb24ub247XG4gICAgICAgIH0gICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTpzdHJpbmcsIGRhdGE6YW55LCB2YXJzOmFueSl7XG4gICAgICAgIEZVdGlscy5kaXNwYXRjaCh0aGlzLCB0aGlzLl9ldmVudHMsIGV2ZW50TmFtZSwgZGF0YSwgdmFycyk7XG4gICAgfSAgIFxuXG4gICAgb25Db21wbGV0ZSgpe1xuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4pe1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudDpGRWxlbWVudCk9PntcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhkYXRhOlthbnldKXtcbiAgICAgICAgbGV0IGkseSxzLHZhcnMscHksXG4gICAgICAgICAgICBkZWZpbml0aW9uOmFueSAgID0gdGhpcy5fZGVmaW5pdGlvbixcbiAgICAgICAgICAgIHR5cGU6c3RyaW5nICAgICAgPSB0aGlzLl90eXBlLFxuICAgICAgICAgICAgc3R5bGU6c3RyaW5nICAgICA9ICcnLFxuICAgICAgICAgICAgaHRtbDE6c3RyaW5nICAgICA9ICcnLFxuICAgICAgICAgICAgaHRtbDI6c3RyaW5nICAgICA9ICcnLFxuICAgICAgICAgICAgaHRtbDM6c3RyaW5nICAgICA9ICcnLFxuICAgICAgICAgICAgcmVwb3J0OkZSZXBvcnQgPSB0aGlzLl9yZXBvcnQsXG4gICAgICAgICAgICBjaGlsZHJlbjpbRkVsZW1lbnRdID0gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgIFxuICAgICAgICBpZiAoZGVmaW5pdGlvbil7XG4gICAgICAgICAgICBsZXQgcGFnZUluZm8gPSByZXBvcnQuZ2V0UGFnZUluZm8oKTtcblxuICAgICAgICAgICAgLy9zZSBuw6NvIGNhYmUgbmEgcMOhZ2luYVxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpdEluUGFnZShkZWZpbml0aW9uLmhlaWdodCkpe1xuICAgICAgICAgICAgICAgIHJlcG9ydC5hZGRQYWdlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB5ICAgPSBwYWdlSW5mby5hY3RpdmVQYWdlWTtcbiAgICAgICAgICAgIHZhcnMgPSByZXBvcnQuZ2V0VXNlclZhcnMoKTtcblxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdzdGFydCcsIGRhdGEsIHZhcnMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZT09PSdmb290ZXInKXtcbiAgICAgICAgICAgICAgICB5ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gcGFnZUluZm8uYWN0aXZlRm9vdGVyWTtcbiAgICAgICAgICAgICAgICBzID0gJ3RvcDonICsgKHBhZ2VJbmZvLmFjdGl2ZUZvb3RlclkpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgeSA9IChkZWZpbml0aW9uID8gZGVmaW5pdGlvbi55IHx8IDAgOiAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gcHkgKyB5O1xuICAgICAgICAgICAgICAgIHMgPSAndG9wOicgKyAodGhpcy5feSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHN0eWxlID0gYHN0eWxlPVwiJHsoZGVmaW5pdGlvbi5zdHlsZSA/IGRlZmluaXRpb24uc3R5bGUrJzsnIDogJycpfWA7XG4gICAgICAgICAgICBodG1sMSA9IGA8ZGl2IGNsYXNzPVwic2VjdGlvbiAke3R5cGV9XCIgJHtzdHlsZX1gO1xuICAgICAgICAgICAgaHRtbDIgPSBgcHg7bGVmdDoke3RoaXMuX3h9cHg7aGVpZ2h0OiR7ZGVmaW5pdGlvbi5oZWlnaHR9cHg7d2lkdGg6JHt0aGlzLl93aWR0aH1weFwiPlxuICAgICAgICAgICAgICAgICAgICAkeyhyZXBvcnQuZGVzaWduZXJNb2RlID8gJzxkaXYgY2xhc3M9XCJzZWN0aW9uLWRlc2lnZXIgc2VjdGlvbi1kZXNpZ2VyLScgKyB0eXBlICsgJ1wiPjwvZGl2PicgOiAnJyl9YDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChpPTA7IGk8Y2hpbGRyZW4ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGh0bWwzICs9IGNoaWxkcmVuW2ldLmRyYXcoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vc2UgbsOjbyBjYWJlIG5hIHDDoWdpbmFcbiAgICAgICAgICAgIGlmICghdGhpcy5maXRJblBhZ2UoZGVmaW5pdGlvbi5oZWlnaHQreSkpe1xuICAgICAgICAgICAgICAgIHJlcG9ydC5hZGRQYWdlKCk7XG4gICAgICAgICAgICAgICAgcyA9ICd0b3A6JyArIChweSArIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXBvcnQuc2V0SFRNTCggcmVwb3J0LmdldEhUTUwoKSArIChodG1sMSArIHMgKyBodG1sMiArIGh0bWwzICsgJzwvZGl2PicpKTtcbiAgICAgICAgICAgIHBhZ2VJbmZvLmFjdGl2ZVBhZ2VZID0gcHkgKyAoZGVmaW5pdGlvbi5oZWlnaHQreSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnZW5kJywgZGF0YSwgdmFycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaXRJblBhZ2UoaGVpZ2h0Om51bWJlcil7XG4gICAgICAgIGxldCBwYWdlSW5mbyA9IHRoaXMuX3JlcG9ydC5nZXRQYWdlSW5mbygpO1xuICAgICAgICByZXR1cm4gKHBhZ2VJbmZvLmFjdGl2ZVBhZ2VZICsgaGVpZ2h0ID4gcGFnZUluZm8uYWN0aXZlRm9vdGVyWSA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0SGVpZ2h0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uID8gdGhpcy5fZGVmaW5pdGlvbi5oZWlnaHQgOiAwO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGU2VjdGlvbiBleHRlbmRzIEZTZWN0aW9ue31cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0ZTZWN0aW9uLnRzIiwiaW1wb3J0IHtGRWxlbWVudH0gZnJvbSBcIi4vRkVsZW1lbnRcIjtcblxubGV0IGlkSW5kZXggPSAwO1xuXG5leHBvcnQgY2xhc3MgRlRleHQgZXh0ZW5kcyBGRWxlbWVudHtcbiAgICBwcml2YXRlIF9pZHM6W251bWJlcl09PGFueT5bXTtcblxuICAgIGRyYXcoZGF0YTpbYW55XSl7XG4gICAgICAgIGxldCBpZD0nJztcblxuICAgICAgICBpZiAodGhpcy5fZGVmaW5pdGlvbi4kZmllbGRzWyckeyNwYWdlc30nXSl7XG4gICAgICAgICAgICB0aGlzLl9pZHMucHVzaCgrK2lkSW5kZXgpO1xuICAgICAgICAgICAgaWQgPSBgaWQ9XCJpZEluZGV4JHtpZEluZGV4fVwiIGA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYDxkaXYgJHtpZH1jbGFzcz1cImVsZW1lbnQgc3RhdGljdGV4dFwiIGRhdGEtZWxlbWVudD1cIlRleHRcIiAke3RoaXMuZ2V0U3R5bGVBdHRyaWJ1dGUoKX0+JHt0aGlzLnZhbHVlKCl9PC9kaXY+YDtcbiAgICB9XG5cbiAgICBvbkNvbXBsZXRlKCl7XG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9yZXBvcnQuZ2V0RG9jdW1lbnQoKTtcbiAgICAgICAgbGV0IG9iaiA9IHRoaXMuX3JlcG9ydC5nZXRJbnRlcm5hbFZhcnMoKTtcblxuICAgICAgICAvL3N1YnN0aXR1aSBhcyB2YXJpw6F2ZWlzIF9fcGFnZXNfXyBwZWxvIHNldSB2YWxvclxuICAgICAgICB0aGlzLl9pZHMuZm9yRWFjaCgoaTpudW1iZXIpPT57XG4gICAgICAgICAgICBsZXQgZT0gZG9jLmdldEVsZW1lbnRCeUlkKGBpZEluZGV4JHtpfWApO1xuICAgICAgICAgICAgZS5pbm5lckhUTUwgPSBlLmlubmVySFRNTC5yZXBsYWNlKCdfX3BhZ2VzX18nLCBvYmpbJyNwYWdlcyddKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0ZUZXh0LnRzIiwiaW1wb3J0IHtGVXRpbHN9IGZyb20gXCIuL0ZVdGlsc1wiO1xuaW1wb3J0IHtGU2VjdGlvbn0gZnJvbSBcIi4vRlNlY3Rpb25cIjtcbmltcG9ydCB7RkVsZW1lbnR9IGZyb20gXCIuL0ZFbGVtZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBGUmVwb3J0e1xuICAgIFxuICAgIHByaXZhdGUgX2h0bWw6c3RyaW5nO1xuICAgIHB1YmxpYyBkZXNpZ25lck1vZGU6Ym9vbGVhbjtcblxuICAgIC8vSVBhZ2VJbmZvXG4gICAgcHJpdmF0ZSBfcGFnZUluZm86SVBhZ2VJbmZvO1xuXG4gICAgLy9pbmZvcm1hw6fDtWVzIHNvYnJlIGRhZG9zXG4gICAgcHJpdmF0ZSBfZGF0YVJvd3M6W2FueV07ICAgICAgLy9hcnJheSBkZSBkYWRvc1xuICAgIHByaXZhdGUgX2RhdGFSb3c6YW55OyAgICAgICAgIC8vbGluaGEgYXR1YWwgZGUgZGFkb3NcbiAgICBwcml2YXRlIF9kYXRhUm93SW5kZXg6bnVtYmVyOyAvL8OtbmRpY2UgZGEgbGluaGEgYXR1YWwgZGUgZGFkb3NcblxuICAgIC8vc2XDp8O1ZXNcbiAgICBwcml2YXRlIF9zX3RpdGxlICA6IEZTZWN0aW9uOyAvL2NhYmXDp2FsaG8gZG8gcmVsYXTDs3Jpb1xuICAgIHByaXZhdGUgX3NfaGVhZGVyIDogRlNlY3Rpb247IC8vY2FiZcOnYWxobyBkYSBww6FnaW5hXG4gICAgcHJpdmF0ZSBfc19kZXRhaWwgOiBGU2VjdGlvbjsgLy9kZXRhbGhlcyBkYSBww6FnaW5hXG4gICAgcHJpdmF0ZSBfc19mb290ZXIgOiBGU2VjdGlvbjsgLy9yb2RhcMOpIGRhIHDDoWdpbmFcbiAgICBwcml2YXRlIF9zX3N1bW1hcnk6IEZTZWN0aW9uOyAvL3JvZGFww6kgZG8gcmVsYXTDs3Jpb1xuXG4gICAgcHJpdmF0ZSBfaWZyYW1lOkhUTUxJRnJhbWVFbGVtZW50O1xuXG4gICAgLy92YXJpw6F2ZWlzIGRlIGNvbnRyb2xlIGxvY2FsXG4gICAgcHJpdmF0ZSBfY29sOm51bWJlcjtcbiAgICBwcml2YXRlIF9jb2xzOm51bWJlcjtcbiAgICBwcml2YXRlIF91c2VyVmFyVmFsdWVzPXt9O1xuICAgIHByaXZhdGUgX3VzZXJWYXJOYW1lcz08YW55PltdOyAgICAgLy9saXN0YSBkZSBub21lcyBkZSB2YXJpw6F2ZWlzIGRlZmluaWRhcyBwZWxvIHVzdcOhcmlvXG4gICAgcHJpdmF0ZSBfaW50ZXJuYWxWYXJWYWx1ZXM6YW55PXt9O1xuICAgIHByaXZhdGUgX2ludGVybmFsVmFyTmFtZXM9PGFueT5bJyNwYWdlJywgJyNwYWdlcyddOyAvL2xpc3RhIGRlIHZhcmnDoXZlaWEgaW50ZXJuYXNcbiAgICBwcml2YXRlIF9maWVsZHM9e307XG4gICAgcHJpdmF0ZSBfZXZlbnRzPXt9O1xuICAgIHByaXZhdGUgX2dyb3VwczpbYW55XTtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6SFRNTEVsZW1lbnQpe1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9pZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgdGhpcy5fcGFnZUluZm8gPSA8SVBhZ2VJbmZvPnt9O1xuXG4gICAgICAgIHRoaXMuX2lmcmFtZS5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlcjpub25lO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCUnO1xuICAgICAgICBkaXYuc3R5bGUuY3NzVGV4dCAgICAgICAgICA9ICdwb3NpdGlvbjpyZWxhdGl2ZTtib3JkZXI6c29saWQgMXB4ICNjMGMwYzA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJSc7XG4gICAgICAgIFxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5faWZyYW1lKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTpzdHJpbmcpe1xuICAgICAgICBGVXRpbHMuZGlzcGF0Y2godGhpcywgdGhpcy5fZXZlbnRzLCBldmVudE5hbWUsIHRoaXMuX2RhdGFSb3csIHRoaXMuX3VzZXJWYXJWYWx1ZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlSW50ZXJuYWxWYXJzKCl7XG4gICAgICAgIHRoaXMuX2ludGVybmFsVmFyVmFsdWVzWycjcGFnZSddID0gdGhpcy5fcGFnZUluZm8uYWN0aXZlUGFnZU51bWJlcjtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxWYXJWYWx1ZXNbJyNwYWdlcyddID0gdGhpcy5fcGFnZUluZm8uYWN0aXZlUGFnZU51bWJlcjtcbiAgICB9XG5cbiAgICBkZWZpbml0aW9uKGRlZmluaXRpb246YW55KTpGUmVwb3J0e1xuICAgICAgICBsZXQgaSwgZywgZ28sIHAsXG4gICAgICAgICAgICBzaXplcyA9IHtcbiAgICAgICAgICAgICAgICAnQTQnOlsyMSwgMjkuN10gLy83OTRweCA9IDIxY20gLyAxMTIzcHggPSAyOS43Y21cbiAgICAgICAgICAgIH07O1xuXG4gICAgICAgIHAgPSAoPGFueT5zaXplcylbZGVmaW5pdGlvbi5wYWdlLnBhcGVyXTtcblxuICAgICAgICBkZWZpbml0aW9uLnBhZ2UubWFyZ2luTGVmdCAgID0gZGVmaW5pdGlvbi5wYWdlLm1hcmdpbkxlZnQgICB8fCAwO1xuICAgICAgICBkZWZpbml0aW9uLnBhZ2UubWFyZ2luUmlnaHQgID0gZGVmaW5pdGlvbi5wYWdlLm1hcmdpblJpZ2h0ICB8fCAwO1xuICAgICAgICBkZWZpbml0aW9uLnBhZ2UubWFyZ2luVG9wICAgID0gZGVmaW5pdGlvbi5wYWdlLm1hcmdpblRvcCAgICB8fCAwO1xuICAgICAgICBkZWZpbml0aW9uLnBhZ2UubWFyZ2luQm90dG9tID0gZGVmaW5pdGlvbi5wYWdlLm1hcmdpbkJvdHRvbSB8fCAwO1xuXG4gICAgICAgIHRoaXMuX3VzZXJWYXJWYWx1ZXMgPSBkZWZpbml0aW9uLnZhcnMgfHwge307XG4gICAgICAgIHRoaXMuX3VzZXJWYXJOYW1lcyA9IE9iamVjdC5rZXlzKGRlZmluaXRpb24udmFycyB8fCB7fSk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IGRlZmluaXRpb24ub24gfHwge307XG4gICAgICAgIHRoaXMuX2h0bWwgPSAnJztcbiAgICAgICAgdGhpcy5fY29sID0gMTtcbiAgICAgICAgdGhpcy5fY29scyA9IGRlZmluaXRpb24ucGFnZS5jb2xsdW1ucztcblxuICAgICAgICB0aGlzLl9wYWdlSW5mby5hY3RpdmVQYWdlWCA9IDA7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLmFjdGl2ZVBhZ2VZID0gMDtcbiAgICAgICAgdGhpcy5fcGFnZUluZm8uYWN0aXZlUGFnZU51bWJlciA9IDA7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLm9yaWVudGF0aW9uID0gZGVmaW5pdGlvbi5wYWdlLm9yaWVudGF0aW9uIHx8ICdwb3J0cmFpdCc7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLndpZHRoID0gcCA/IHBbZGVmaW5pdGlvbi5wYWdlLm9yaWVudGF0aW9uPT0nbGFkc2NhcGUnPzE6MF0gOiBkZWZpbml0aW9uLnBhZ2Uud2lkdGg7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLmhlaWdodD0gcCA/IHBbZGVmaW5pdGlvbi5wYWdlLm9yaWVudGF0aW9uPT0nbGFkc2NhcGUnPzA6MV0gOiBkZWZpbml0aW9uLnBhZ2UuaGVpZ2h0O1xuICAgICAgICB0aGlzLl9wYWdlSW5mby5tYXJnaW5MZWZ0ICA9IEZVdGlscy5jbTJweChkZWZpbml0aW9uLnBhZ2UubWFyZ2luTGVmdCk7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLm1hcmdpblJpZ2h0ID0gRlV0aWxzLmNtMnB4KGRlZmluaXRpb24ucGFnZS5tYXJnaW5SaWdodCk7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLm1hcmdpblRvcCAgID0gRlV0aWxzLmNtMnB4KGRlZmluaXRpb24ucGFnZS5tYXJnaW5Ub3ApO1xuICAgICAgICB0aGlzLl9wYWdlSW5mby5tYXJnaW5Cb3R0b209IEZVdGlscy5jbTJweChkZWZpbml0aW9uLnBhZ2UubWFyZ2luQm90dG9tKTtcbiAgICAgICAgdGhpcy5fcGFnZUluZm8uYWN0aXZlQ2xpZW50SGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFnZUluZm8uYWN0aXZlQ2xpZW50V2lkdGggPSBGVXRpbHMuY20ycHgodGhpcy5fcGFnZUluZm8ud2lkdGgpIC0gdGhpcy5fcGFnZUluZm8ubWFyZ2luTGVmdCAtIHRoaXMuX3BhZ2VJbmZvLm1hcmdpblJpZ2h0O1xuICAgICAgICB0aGlzLl9wYWdlSW5mby5hY3RpdmVGb290ZXJZID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9kYXRhUm93cyA9IDxbYW55XT5bXTtcbiAgICAgICAgdGhpcy5fZGF0YVJvdyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2RhdGFSb3dJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2dyb3VwcyA9IDxbYW55XT5bXTtcbiAgICAgICAgdGhpcy5fc190aXRsZSAgPSBuZXcgRlNlY3Rpb24odGhpcywgZGVmaW5pdGlvbi5zZWN0aW9ucy50aXRsZSwgICd0aXRsZScpOyAgLy9jYWJlw6dhbGhvIGRvIHJlbGF0w7NyaW9cbiAgICAgICAgdGhpcy5fc19oZWFkZXIgPSBuZXcgRlNlY3Rpb24odGhpcywgZGVmaW5pdGlvbi5zZWN0aW9ucy5oZWFkZXIsICdoZWFkZXInKTsgLy9jYWJlw6dhbGhvIGRhIHDDoWdpbmFcbiAgICAgICAgdGhpcy5fc19kZXRhaWwgPSBuZXcgRlNlY3Rpb24odGhpcywgZGVmaW5pdGlvbi5zZWN0aW9ucy5kZXRhaWwsICdkZXRhaWwnKTsgLy9kZXRhbGhlcyBkYSBww6FnaW5hXG4gICAgICAgIHRoaXMuX3NfZm9vdGVyID0gbmV3IEZTZWN0aW9uKHRoaXMsIGRlZmluaXRpb24uc2VjdGlvbnMuZm9vdGVyLCAnZm9vdGVyJyk7IC8vcm9kYXDDqSBkYSBww6FnaW5hXG4gICAgICAgIHRoaXMuX3Nfc3VtbWFyeT0gbmV3IEZTZWN0aW9uKHRoaXMsIGRlZmluaXRpb24uc2VjdGlvbnMuc3VtbWFyeSwnc3VtbWFyeScpOy8vcm9kYXDDqSBkbyByZWxhdMOzcmlvXG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZUludGVybmFsVmFycygpO1xuXG4gICAgICAgIGlmIChkZWZpbml0aW9uLmdyb3Vwcyl7XG4gICAgICAgICAgICBmb3IgKGk9MDsgaTxkZWZpbml0aW9uLmdyb3Vwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgZyA9IGRlZmluaXRpb24uZ3JvdXBzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChnLmhlYWRlciB8fCBnLmZvb3Rlcil7XG4gICAgICAgICAgICAgICAgICAgIGdvID0ge2dyb3VwQnk6Zy5ncm91cEJ5LCBoZWFkZXI6bnVsbCwgZm9vdGVyOm51bGx9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZy5oZWFkZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ28uaGVhZGVyID0gbmV3IEZTZWN0aW9uKHRoaXMsIGcuaGVhZGVyLCAnc2hlYWRlcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChnLmZvb3Rlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBnby5mb290ZXIgPSBuZXcgRlNlY3Rpb24odGhpcywgZy5mb290ZXIsICdzZm9vdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3JvdXBzLnB1c2goZ28pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHpvb20ocGVyY2VudDpudW1iZXIpe1xuICAgICAgICB0aGlzLl9pZnJhbWUuY29udGVudERvY3VtZW50LmJvZHkuc3R5bGVbJ3pvb20nXSA9IHBlcmNlbnQgKyAnJSc7XG4gICAgfVxuXG4gICAgZ2V0RG9jdW1lbnQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lmcmFtZS5jb250ZW50RG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpbnQoKXtcbiAgICAgICAgdGhpcy5faWZyYW1lLmNvbnRlbnRXaW5kb3cucHJpbnQoKTtcbiAgICB9XG5cbiAgICBhZGRQYWdlKGRyYXdQYWdlSGVhZGVyPzpib29sZWFuLCBjaGVja0NvbGx1bW4/OmJvb2xlYW4pe1xuICAgICAgICB0aGlzLl9wYWdlSW5mby5hY3RpdmVQYWdlWSA9IHRoaXMuX3BhZ2VJbmZvLm1hcmdpblRvcDtcbiAgICAgICAgXG4gICAgICAgIC8vVE9ETzogaW1wbGVtZW50YXIgY29sdW5hc1xuICAgICAgICBpZiAoY2hlY2tDb2xsdW1uPT09dHJ1ZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29sPHRoaXMuX2NvbHMpe1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ3N0YXJ0UGFnZScpO1xuICAgICAgICBcbiAgICAgICAgLy9lbmNlcnJhIGEgcMOhZ2luYSBhbnRlcmlvclxuICAgICAgICBpZiAoIHRoaXMuX3BhZ2VJbmZvLmFjdGl2ZVBhZ2VOdW1iZXI+MCApe1xuICAgICAgICAgICAgdGhpcy5lbmRQYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9odG1sICs9ICc8ZGl2IGNsYXNzPVwicGFnZS1icmVha1wiPjwvZGl2Pic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wYWdlSW5mby5hY3RpdmVQYWdlTnVtYmVyKys7XG4gICAgICAgIHRoaXMudXBkYXRlSW50ZXJuYWxWYXJzKCk7XG4gICAgICAgIHRoaXMuX2h0bWwgKz0gYDxkaXYgY2xhc3M9XCJwYWdlXCIgc3R5bGU9XCJ3aWR0aDoke3RoaXMuX3BhZ2VJbmZvLndpZHRofWNtO2hlaWdodDoke3RoaXMuX3BhZ2VJbmZvLmhlaWdodH1jbVwiPmA7XG4gICAgICAgIFxuICAgICAgICAvL2Rlc2VuaGEgbyBjYWJlw6dhbGhvIGRhIHDDoWdpbmFcbiAgICAgICAgaWYgKGRyYXdQYWdlSGVhZGVyIT09ZmFsc2Upe1xuICAgICAgICAgICAgdGhpcy5fc19oZWFkZXIuZHJhdyh0aGlzLl9kYXRhUm93KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuZFBhZ2UoKXtcbiAgICAgICAgdGhpcy5fcGFnZUluZm8uYWN0aXZlUGFnZVggPSB0aGlzLl9wYWdlSW5mby5tYXJnaW5MZWZ0O1xuICAgICAgICB0aGlzLl9jb2wgPSAxO1xuXG4gICAgICAgIC8vZGVzZW5oYSBvIHJvZGFww6kgZGEgcMOhZ2luYVxuICAgICAgICB0aGlzLl9zX2Zvb3Rlci5kcmF3KHRoaXMuX2RhdGFSb3cpOy8vKCR0aGlzLT5hdHRyaWJ1dGVzWydwYWdlRm9vdGVyVG9wJ10gKTtcbiAgICAgICAgXG4gICAgICAgIC8vcmV0b3JuYSBhbyB0b3BvIGRhIHDDoWdpbmFcbiAgICAgICAgdGhpcy5fcGFnZUluZm8uYWN0aXZlUGFnZVkgPSB0aGlzLl9wYWdlSW5mby5tYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMuX2h0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2VuZFBhZ2UnKTtcbiAgICB9XG5cbiAgICBnZXRIVE1MKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9odG1sO1xuICAgIH1cblxuICAgIHNldEhUTUwoaHRtbDpzdHJpbmcpe1xuICAgICAgICB0aGlzLl9odG1sID0gaHRtbDtcbiAgICB9XG5cbiAgICBnZXRQYWdlSW5mbygpOklQYWdlSW5mb3tcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VJbmZvO1xuICAgIH1cblxuICAgIGdldFJvdygpe1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVJvdztcbiAgICB9XG5cbiAgICBnZXRVc2VyVmFycygpe1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZhclZhbHVlcztcbiAgICB9XG5cbiAgICBnZXRJbnRlcm5hbFZhcnMoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsVmFyVmFsdWVzO1xuICAgIH1cblxuICAgIGdldElkZW50aWZpZXJzKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnRlcm5hbDogdGhpcy5faW50ZXJuYWxWYXJOYW1lcyxcbiAgICAgICAgICAgIHVzZXJEZWYgOiB0aGlzLl91c2VyVmFyTmFtZXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcocm93czpbYW55XSl7XG4gICAgICAgIGxldCBpLCBoLCBvcmllbnRhdGlvbjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2lmcmFtZS5jb250ZW50RG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgXG4gICAgICAgIGlmICghcm93cyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGggPSBGVXRpbHMuY20ycHgodGhpcy5fcGFnZUluZm8uaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLl9kYXRhUm93cyA9IHJvd3M7XG4gICAgICAgIHRoaXMuX2RhdGFSb3cgPSB0aGlzLl9kYXRhUm93c1swXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnc3RhcnQnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLmFjdGl2ZUNsaWVudEhlaWdodCA9IGggLSB0aGlzLl9wYWdlSW5mby5tYXJnaW5Cb3R0b20gLSB0aGlzLl9wYWdlSW5mby5tYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMuX3BhZ2VJbmZvLmFjdGl2ZUZvb3RlclkgICAgICA9IGggLSB0aGlzLl9wYWdlSW5mby5tYXJnaW5Cb3R0b20gLSB0aGlzLl9zX2Zvb3Rlci5nZXRIZWlnaHQoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWRkUGFnZShmYWxzZSwgZmFsc2UpOyAgICAvL2NyaWEgYSBwcmltZWlyYSBww6FnaW5hIGRvIHJlbGF0w7NyaW8sIHNlbSBjYWJlw6dhbGhvIGRlIHDDoWdpbmFcbiAgICAgICAgICAgIHRoaXMuX3NfdGl0bGUuZHJhdyh0aGlzLl9kYXRhUm93KTsgICAgICAvL2Rlc2VuaGEgbyBjYWJlw6dhbGhvIGRvIHJlbGF0w7NyaW9cbiAgICAgICAgICAgIHRoaXMuX3NfaGVhZGVyLmRyYXcodGhpcy5fZGF0YVJvdyk7ICAgICAvL2Rlc2VuaGEgbyBjYWJlw6dhbGhvIGRhIHByaW1laXJhIHDDoWdpbmFcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9kZXNlbmhhIG8gY29ycG8gZG8gcmVsYXTDs3Jpb1xuICAgICAgICAgICAgaWYgKHRoaXMuX2dyb3Vwcy5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R3JvdXAocm93cywgMCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBmb3IgKGk9MDsgaTxyb3dzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YVJvdyA9IHJvd3NbaV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NfZGV0YWlsLmRyYXcodGhpcy5fZGF0YVJvdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9wYWdlSW5mby5hY3RpdmVQYWdlWCA9IHRoaXMuX3BhZ2VJbmZvLm1hcmdpbkxlZnQ7XG4gICAgICAgICAgICB0aGlzLl9zX3N1bW1hcnkuZHJhdyh0aGlzLl9kYXRhUm93KTsgLy9kZXNlbmhhIG8gcm9kYXDDqSBkbyByZWxhdMOzcmlvc1xuICAgICAgICB0aGlzLmVuZFBhZ2UoKTsgICAgICAgICAvL2ZpbmFsaXphIGEgcMOhZ2luYVxuICAgICAgICBcbiAgICAgICAgb3JpZW50YXRpb24gPSB0aGlzLl9wYWdlSW5mby5vcmllbnRhdGlvbj09J2xhbmRzY2FwZScgPyAnQG1lZGlhIHByaW50e0BwYWdlIHtzaXplOiBsYW5kc2NhcGV9fScgOiAnJztcblxuICAgICAgICB0aGlzLl9pZnJhbWUuY29udGVudERvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gXG4gICAgICAgIGA8c3R5bGU+XG4gICAgICAgICAgICAqe1xuICAgICAgICAgICAgICAgIC13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O1xuICAgICAgICAgICAgICAgIGJveC1zaXppbmc6Ym9yZGVyLWJveDtcbiAgICAgICAgICAgICAgICBmb250OjEycHQgc2Fucy1zZXJpZiwgR2VvcmdpYSwgXCJUaW1lcyBOZXcgUm9tYW5cIiwgVGltZXMsIHNlcmlmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keXtwYWRkaW5nOjA7bWFyZ2luOjA7fVxuICAgICAgICAgICAgLnBhZ2V7cG9zaXRpb246cmVsYXRpdmU7IG92ZXJmbG93OmhpZGRlbjsgYmFja2dyb3VuZDojZmZmO31cbiAgICAgICAgICAgIC5wYWdlLWJyZWFre3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoxcHg7d2lkdGg6MTBweDtvdmVyZmxvdzpoaWRkZW47bWFyZ2luLXRvcDotMXB4O3BhZ2UtYnJlYWstYWZ0ZXI6IGFsd2F5czt9XG4gICAgICAgICAgICAuc2VjdGlvbntwb3NpdGlvbjphYnNvbHV0ZTsgb3ZlcmZsb3c6aGlkZGVufVxuICAgICAgICAgICAgLnNlY3Rpb24tZGVzaWdlcntwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MDt0b3A6MDtib3R0b206MDtib3JkZXI6ZGFzaGVkIDFweCAjYzBjMGMwO31cbiAgICAgICAgICAgIC5zZWN0aW9uLWRlc2lnZXItdGl0bGV7Ym9yZGVyLWNvbG9yOnJlZH1cbiAgICAgICAgICAgIC5zZWN0aW9uLWRlc2lnZXItaGVhZGVye2JvcmRlci1jb2xvcjpibHVlfVxuICAgICAgICAgICAgLnNlY3Rpb24tZGVzaWdlci10aXRsZXtib3JkZXItY29sb3I6Z3JlZW59XG4gICAgICAgICAgICAuc2VjdGlvbi1kZXNpZ2VyLWRldGFpbHtib3JkZXItY29sb3I6cmdiKDEwLCAxNjUsIDE1OSl9XG4gICAgICAgICAgICAuc2VjdGlvbi1kZXNpZ2VyLWZvb3Rlcntib3JkZXItY29sb3I6cmdiKDE4OSwgMjQsIDI1Myl9XG4gICAgICAgICAgICAuc2VjdGlvbi1kZXNpZ2VyLXN1bW1hcnl7Ym9yZGVyLWNvbG9yOnJnYigxMTQsIDIsIDQ3KX1cbiAgICAgICAgICAgIC5lbGVtZW50e3Bvc2l0aW9uOmFic29sdXRlfVxuICAgICAgICAgICAgLnJlY3R7Ym9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDA7IGJvcmRlci1zdHlsZTpzb2xpZDsgd2lkdGg6MTAwcHg7IGhlaWdodDo0MHB4fVxuXG4gICAgICAgICAgICBAbWVkaWEgc2NyZWVuIHtcbiAgICAgICAgICAgICAgICBib2R5e1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOnJnYigyNDQsIDI0NCwgMjQ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLnBhZ2V7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6MTBweDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OjEwcHg7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OjEwcHg7XG4gICAgICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6MXB4IDFweCA0cHggcmdiYSgxNjEsIDE2MSwgMTYxLCAwLjcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEBwYWdlIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDBjbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICR7b3JpZW50YXRpb259XG4gICAgICAgIDwvc3R5bGU+XG4gICAgICAgICR7dGhpcy5faHRtbH1gO1xuXG4gICAgICAgIHRoaXMuX3NfdGl0bGUub25Db21wbGV0ZSgpO1xuICAgICAgICB0aGlzLl9zX2hlYWRlci5vbkNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuX2dyb3Vwcy5mb3JFYWNoKChncm91cDphbnkpPT57aWYgKGdyb3VwLmhlYWRlcikgZ3JvdXAuaGVhZGVyLm9uQ29tcGxldGUoKTt9KTtcbiAgICAgICAgdGhpcy5fc19kZXRhaWwub25Db21wbGV0ZSgpO1xuICAgICAgICB0aGlzLl9zX2Zvb3Rlci5vbkNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuX2dyb3Vwcy5mb3JFYWNoKChncm91cDphbnkpPT57aWYgKGdyb3VwLmZvb3RlcikgZ3JvdXAuZm9vdGVyLm9uQ29tcGxldGUoKTt9KTtcbiAgICAgICAgdGhpcy5fc19zdW1tYXJ5Lm9uQ29tcGxldGUoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnZW5kJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0bWw7XG4gICAgfVxuXG4gICAgZHJhd0dyb3VwKHJvd3M6W2FueV0sIGdyb3VwSW5kZXg6bnVtYmVyKXtcbiAgICAgICAgbGV0IGksIGdyb3VwcywgZ3JvdXBCeUZpZWxkTmFtZSwgZ3JvdXBCeUZpZWxkVmFsdWUsIHZhcnM7XG4gICAgICAgIFxuICAgICAgICBncm91cHMgPSB0aGlzLl9ncm91cHNbZ3JvdXBJbmRleF07XG4gICAgICAgIFxuICAgICAgICBpZiAoZ3JvdXBzKXtcbiAgICAgICAgICAgIGdyb3VwQnlGaWVsZE5hbWUgPSBncm91cHMuZ3JvdXBCeTtcbiAgICAgICAgICAgIHZhcnMgPSB0aGlzLmdldFVzZXJWYXJzKCk7XG5cbiAgICAgICAgICAgIGZvciAoaT0wOyBpPHJvd3MubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFSb3cgPSByb3dzW2ldO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnZ3JvdXBTdGFydCcpO1xuICAgICAgICAgICAgICAgIGlmIChncm91cHMuaGVhZGVyKSBncm91cHMuaGVhZGVyLmRyYXcodGhpcy5fZGF0YVJvdyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBkZXNlbmhhciBzdWJncnVwb3NcbiAgICAgICAgICAgICAgICAvL3RoaXMuZHJhd0dyb3VwKHJvd3MpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9kZXNlbmhhIG8gZGV0YWxoZSBlbnF1YW5kbyBlc3RpdmVyIGRlbnRybyBkbyBtZXNtbyBncnVwb1xuICAgICAgICAgICAgICAgIGdyb3VwQnlGaWVsZFZhbHVlID0gdGhpcy5fZGF0YVJvd1tncm91cEJ5RmllbGROYW1lXTtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5fZGF0YVJvd1tncm91cEJ5RmllbGROYW1lXT09PWdyb3VwQnlGaWVsZFZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc19kZXRhaWwuZHJhdyh0aGlzLl9kYXRhUm93KTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vcHLDs3hpbW8gcmVnaXN0cm9cbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaTxyb3dzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhUm93ID0gcm93c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL2RlaXhhIG8gcG9udGVpcm8gbm8gw7psdGltbyByZWdpc3RybyBkZXNlbmhhZG9cbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVJvdyA9IHJvd3NbaV07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGdyb3Vwcy5mb290ZXIpIGdyb3Vwcy5mb290ZXIuZHJhdyh0aGlzLl9kYXRhUm93KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2dyb3VwRW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VJbmZve1xuICAgIG9yaWVudGF0aW9uICAgICAgIDogc3RyaW5nO1xuICAgIHdpZHRoICAgICAgICAgICAgIDogbnVtYmVyO1xuICAgIGhlaWdodCAgICAgICAgICAgIDogbnVtYmVyO1xuICAgIG1hcmdpblJpZ2h0ICAgICAgIDogbnVtYmVyO1xuICAgIG1hcmdpblRvcCAgICAgICAgIDogbnVtYmVyO1xuICAgIG1hcmdpbkxlZnQgICAgICAgIDogbnVtYmVyO1xuICAgIG1hcmdpbkJvdHRvbSAgICAgIDogbnVtYmVyO1xuICAgIGFjdGl2ZUNsaWVudEhlaWdodDogbnVtYmVyOyAvL2FsdHVyYSBkYSDDoXJlYSBkZSBpbXByZXNzw6NvIGRhIHDDoWdpbmFcbiAgICBhY3RpdmVDbGllbnRXaWR0aCA6IG51bWJlcjsgLy9sYXJndXJhIGRhIMOhcmVhIGRlIGltcHJlc3PDo28gZGEgcMOhZ2luYVxuICAgIGFjdGl2ZUZvb3RlclkgICAgIDogbnVtYmVyOyAvL3ZhbG9yIHkgZGEgc2XDp8OjbyhGU2VjdGlvbikgX3NfZm9vdGVyXG4gICAgYWN0aXZlUGFnZVggICAgICAgOiBudW1iZXI7XG4gICAgYWN0aXZlUGFnZVkgICAgICAgOiBudW1iZXI7XG4gICAgYWN0aXZlUGFnZU51bWJlciAgOiBudW1iZXI7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElGUmVwb3J0IGV4dGVuZHMgRlJlcG9ydHt9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRlJlcG9ydC50cyIsIi8vIGluZGV4LnRzXG5cbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9GVXRpbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL0ZFbGVtZW50JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9GUmVwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9GU2VjdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvRlRleHQnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL0ZJbWFnZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvRkxpbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL0ZSZWN0JztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyJdLCJzb3VyY2VSb290IjoiIn0=