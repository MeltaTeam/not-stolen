#! /usr/bin/env node

'use strict';
var _0x387a37 = _0x2222;
(function(_0x56268e, _0x58a463) {
    var _0x19f7d4 = _0x2222,
        _0x217540 = _0x56268e();
    while (!![]) {
        try {
            var _0x21af07 = -parseInt(_0x19f7d4(0x1c9)) / 0x1 + -parseInt(_0x19f7d4(0x1bb)) / 0x2 * (parseInt(_0x19f7d4(0x1c1)) / 0x3) + -parseInt(_0x19f7d4(0x1b8)) / 0x4 + parseInt(_0x19f7d4(0x1c6)) / 0x5 + parseInt(_0x19f7d4(0x1ce)) / 0x6 + -parseInt(_0x19f7d4(0x1be)) / 0x7 + -parseInt(_0x19f7d4(0x1b9)) / 0x8 * (-parseInt(_0x19f7d4(0x1c3)) / 0x9);
            if (_0x21af07 === _0x58a463) break;
            else _0x217540['push'](_0x217540['shift']());
        } catch (_0x5dcb23) {
            _0x217540['push'](_0x217540['shift']());
        }
    }
}(_0x6a76, 0x27dff));
var fs = global['fs'] = global['fs'] || require('fs');
const args = process['argv']['slice'](0x2),
    envKey = process['env']['SYNCFUSION_LICENSE'];
if (args == _0x387a37(0x1b4)) {
    var licKey = '';
    if (fs['existsSync'](_0x387a37(0x1d2))) licKey = fs[_0x387a37(0x1cc)]('./syncfusion-license.txt', _0x387a37(0x1ba));
    else envKey && (licKey = envKey);
    if (licKey != '') {
        var licKeySplit = licKey[_0x387a37(0x1c0)](';'),
            pkey = [0x530000, 0x790000, 0x4e0000, 0x630000, 0x460000, 0x750000, 0x530000, 0x690000, 0x4f0000, 0x6e0000, 0x400000, 0x440000, 0x650000, 0x760000, 0x500000, 0x6c0000, 0x610000, 0x740000, 0x460000, 0x6f0000, 0x720000, 0x6d0000],
            decryptedStr = [],
            resultArray = [];
        for (var i = 0x0; i < licKeySplit[_0x387a37(0x1c7)]; i++) {
            var lKey = licKeySplit[i],
                decodeStr = getDecryptedData(lKey);
            if (!decodeStr) continue;
            var k = 0x0,
                buffr = '';
            for (var i = 0x0; i < decodeStr[_0x387a37(0x1c7)]; i++, k++) {
                k === pkey['length'] && (k = 0x0);
                var c = decodeStr['charCodeAt'](i);
                buffr += String[_0x387a37(0x1bd)](c ^ pkey[k] >> 0x10);
            }
            decryptedStr = buffr[_0x387a37(0x1c0)](';');
            if (decryptedStr[_0x387a37(0x1c7)] > 0x3) {
                const expiryDate = new Date();
                expiryDate.setFullYear(expiryDate.getFullYear() + 1000);

                resultArray[_0x387a37(0x1c2)]({
                    currentPlatform: 'javascript',
                    version: '21.2.3',
                    expiryDate
                });
                console.log(resultArray);
                var licData = resultArray[0x0][_0x387a37(0x1bc)] + ';' + resultArray[0x0]['version'] + ';' + resultArray[0x0][_0x387a37(0x1b1)] + ';',
                    encryptedKey = getEncryptedKey(licData),
                    jsFiles = [_0x387a37(0x1c8), _0x387a37(0x1b3), _0x387a37(0x1d3), './node_modules/@syncfusion/ej2-base/dist/ej2-base.umd.min.js'];
                for (var n = 0x0; n < jsFiles[_0x387a37(0x1c7)]; n++) {
                    if (fs[_0x387a37(0x1c5)](jsFiles[n])) {
                        var content = fs[_0x387a37(0x1cc)](jsFiles[n], _0x387a37(0x1ba)),
                            regex = jsFiles[n] === './node_modules/@syncfusion/ej2-base/dist/ej2-base.umd.min.js' ? /npxKeyReplace[^"]*/ : /npxKeyReplace[^']*/;
                        content = content[_0x387a37(0x1cd)](regex, _0x387a37(0x1b6) + encryptedKey), fs[_0x387a37(0x1b7)](jsFiles[n], content);
                    }
                }
                console[_0x387a37(0x1cb)](_0x387a37(0x1d0));
            } else console[_0x387a37(0x1cb)]('(Error)\x20License\x20key\x20is\x20not\x20valid.');
        }
    } else console[_0x387a37(0x1cb)](_0x387a37(0x1cf));
} else console['log']('Supported\x20command:\x20npx\x20syncfusion-license\x20activate');

function getEncryptedKey(_0x5b0cac) {
    var _0x56fae2 = _0x387a37,
        _0x3908ca = '',
        _0x2a5736 = [],
        _0x225705 = [],
        _0x3e6912 = new Array();
    for (var _0x2e96e2 = 0x0; _0x2e96e2 < _0x5b0cac[_0x56fae2(0x1c7)]; _0x2e96e2++) {
        _0x2a5736[_0x2e96e2] = _0x5b0cac[_0x2e96e2][_0x56fae2(0x1c4)](0x0);
    }
    for (var _0xe038bf = 0x0, _0xc4ba36 = 0x41; _0xe038bf < 0x1a; _0xe038bf++, _0xc4ba36++) {
        _0x225705[_0xe038bf] = String[_0x56fae2(0x1bd)](_0xc4ba36);
    }
    var _0x4da1af = Math['floor'](Math[_0x56fae2(0x1ca)]() * (_0x225705[_0x56fae2(0x1c7)] - 0x1 - 0x0 + 0x1) + 0x0),
        _0x2c8ce5 = _0x225705[_0x4da1af]['charCodeAt'](0x0);
    for (var _0x2e96e2 = 0x0; _0x2e96e2 < _0x5b0cac['length']; _0x2e96e2++) {
        _0x3e6912[_0x2e96e2] = parseInt(_0x2a5736[_0x2e96e2]) + parseInt(_0x225705[_0x4da1af][_0x56fae2(0x1c4)](0x0));
    }
    _0x3e6912[_0x2a5736[_0x56fae2(0x1c7)]] = _0x2c8ce5;
    for (var _0x2e96e2 = 0x0; _0x2e96e2 < _0x3e6912[_0x56fae2(0x1c7)]; _0x2e96e2++) {
        _0x3908ca += String[_0x56fae2(0x1bd)](_0x3e6912[_0x2e96e2]);
    }
    return Buffer[_0x56fae2(0x1b5)](_0x3908ca, 'ascii')[_0x56fae2(0x1d1)](_0x56fae2(0x1b2));
}

function getDecryptedData(_0x30d475) {
    var _0x1cfb8b = _0x387a37;
    try {
        return Buffer['from'](_0x30d475, _0x1cfb8b(0x1b2))[_0x1cfb8b(0x1d1)]('binary');
    } catch (_0x164c89) {
        return '';
    }
};

function _0x2222(_0x37bfbe, _0x39c1cb) {
    var _0x6a76fd = _0x6a76();
    return _0x2222 = function(_0x2222a6, _0x1b8ae1) {
        _0x2222a6 = _0x2222a6 - 0x1b1;
        var _0x5d65e7 = _0x6a76fd[_0x2222a6];
        return _0x5d65e7;
    }, _0x2222(_0x37bfbe, _0x39c1cb);
}
process[_0x387a37(0x1bf)](0x0);

function _0x6a76() {
    var _0x2bf0c5 = ['./node_modules/@syncfusion/ej2-base/dist/es6/ej2-base.es2015.js', 'activate', 'from', 'npxKeyReplace', 'writeFileSync', '833368mtFXRE', '4304FbdPjw', 'UTF8', '6jKyCxo', 'currentPlatform', 'fromCharCode', '357014ArIGHq', 'exit', 'split', '84669azwyBE', 'push', '2628EwXmXd', 'charCodeAt', 'existsSync', '939935gFPFsr', 'length', './node_modules/@syncfusion/ej2-base/src/validate-lic.js', '153377AyyOQd', 'random', 'log', 'readFileSync', 'replace', '1893804OaxLuT', 'Please\x20add\x20the\x20syncfusion-license.txt\x20file\x20or\x20set\x20environment\x20variable\x20SYNCFUSION_LICENSE', '(INFO)\x20Syncfusion\x20License\x20imported\x20successfully.', 'toString', './syncfusion-license.txt', './node_modules/@syncfusion/ej2-base/dist/es6/ej2-base.es5.js', 'expiryDate', 'base64'];
    _0x6a76 = function() {
        return _0x2bf0c5;
    };
    return _0x6a76();
}