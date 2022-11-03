"use strict";
// To parse this data:
//
//   import { Convert } from "./file";
//
//   const beer = Convert.toBeer(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Unit;
(function (Unit) {
    Unit["Celsius"] = "celsius";
    Unit["Grams"] = "grams";
    Unit["Kilograms"] = "kilograms";
    Unit["Litres"] = "litres";
})(Unit || (Unit = {}));
var ContributedBy;
(function (ContributedBy) {
    ContributedBy["AliSkinnerAliSkinner"] = "Ali Skinner <AliSkinner>";
    ContributedBy["SamMasonSamjbmason"] = "Sam Mason <samjbmason>";
})(ContributedBy || (ContributedBy = {}));
var Add;
(function (Add) {
    Add["DryHop"] = "dry hop";
    Add["End"] = "end";
    Add["Middle"] = "middle";
    Add["Start"] = "start";
})(Add || (Add = {}));
var Attribute;
(function (Attribute) {
    Attribute["Aroma"] = "aroma";
    Attribute["AttributeFlavour"] = "Flavour";
    Attribute["Bitter"] = "bitter";
    Attribute["Flavour"] = "flavour";
})(Attribute || (Attribute = {}));
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
class Convert {
    static toBeer(json) {
        return cast(JSON.parse(json), a(r("Beer")));
    }
    static beerToJson(value) {
        return JSON.stringify(uncast(value, a(r("Beer"))), null, 2);
    }
}
function invalidValue(typ, val, key = '') {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}
function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}
function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}
function transform(val, typ, getProps, key = '') {
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val)
            return val;
        return invalidValue(typ, val, key);
    }
    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            }
            catch (_) { }
        }
        return invalidValue(typs, val);
    }
    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1)
            return val;
        return invalidValue(cases, val);
    }
    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val))
            return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }
    function transformDate(val) {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }
    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }
    if (typ === "any")
        return val;
    if (typ === null) {
        if (val === null)
            return val;
        return invalidValue(typ, val);
    }
    if (typ === false)
        return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ))
        return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number")
        return transformDate(val);
    return transformPrimitive(typ, val);
}
function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}
function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}
function a(typ) {
    return { arrayItems: typ };
}
function u(...typs) {
    return { unionMembers: typs };
}
function o(props, additional) {
    return { props, additional };
}
function m(additional) {
    return { props: [], additional };
}
function r(name) {
    return { ref: name };
}
const typeMap = {
    "Beer": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "tagline", js: "tagline", typ: "" },
        { json: "first_brewed", js: "firstBrewed", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "image_url", js: "imageURL", typ: "" },
        { json: "abv", js: "abv", typ: 3.14 },
        { json: "ibu", js: "ibu", typ: u(3.14, null) },
        { json: "target_fg", js: "targetFg", typ: 0 },
        { json: "target_og", js: "targetOg", typ: 3.14 },
        { json: "ebc", js: "ebc", typ: u(0, null) },
        { json: "srm", js: "srm", typ: u(3.14, null) },
        { json: "ph", js: "ph", typ: u(3.14, null) },
        { json: "attenuation_level", js: "attenuationLevel", typ: 3.14 },
        { json: "volume", js: "volume", typ: r("BoilVolume") },
        { json: "boil_volume", js: "boilVolume", typ: r("BoilVolume") },
        { json: "method", js: "method", typ: r("Method") },
        { json: "ingredients", js: "ingredients", typ: r("Ingredients") },
        { json: "food_pairing", js: "foodPairing", typ: a("") },
        { json: "brewers_tips", js: "brewersTips", typ: "" },
        { json: "contributed_by", js: "contributedBy", typ: r("ContributedBy") },
    ], false),
    "BoilVolume": o([
        { json: "value", js: "value", typ: 3.14 },
        { json: "unit", js: "unit", typ: r("Unit") },
    ], false),
    "Ingredients": o([
        { json: "malt", js: "malt", typ: a(r("Malt")) },
        { json: "hops", js: "hops", typ: a(r("Hop")) },
        { json: "yeast", js: "yeast", typ: "" },
    ], false),
    "Hop": o([
        { json: "name", js: "name", typ: "" },
        { json: "amount", js: "amount", typ: r("BoilVolume") },
        { json: "add", js: "add", typ: r("Add") },
        { json: "attribute", js: "attribute", typ: r("Attribute") },
    ], false),
    "Malt": o([
        { json: "name", js: "name", typ: "" },
        { json: "amount", js: "amount", typ: r("BoilVolume") },
    ], false),
    "Method": o([
        { json: "mash_temp", js: "mashTemp", typ: a(r("MashTemp")) },
        { json: "fermentation", js: "fermentation", typ: r("Fermentation") },
        { json: "twist", js: "twist", typ: u(null, "") },
    ], false),
    "Fermentation": o([
        { json: "temp", js: "temp", typ: r("BoilVolume") },
    ], false),
    "MashTemp": o([
        { json: "temp", js: "temp", typ: r("BoilVolume") },
        { json: "duration", js: "duration", typ: u(0, null) },
    ], false),
    "Unit": [
        "celsius",
        "grams",
        "kilograms",
        "litres",
    ],
    "ContributedBy": [
        "Ali Skinner <AliSkinner>",
        "Sam Mason <samjbmason>",
    ],
    "Add": [
        "dry hop",
        "end",
        "middle",
        "start",
    ],
    "Attribute": [
        "aroma",
        "Flavour",
        "bitter",
        "flavour",
    ],
};
const conteiner = document.getElementById("conteiner");
const getBeers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://api.punkapi.com/v2/beers");
    const text = yield response.text();
    return text;
});
getBeers().then(result => {
    let beersArr = Convert.toBeer(result);
    beersArr.forEach(beer => {
        conteiner.innerHTML += `
        <div class ="cardbox_flexbox-card card"{ >
            <img src="${beer.imageURL}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${beer.name}</h5>
                <h6 class="card-title">${beer.tagline}</h6>
                <h6 class="card-title">First brewed: ${beer.firstBrewed}</h6>
                <p class="card-text">${beer.description}</p>
            </div>
         </div>
        `;
    });
});
