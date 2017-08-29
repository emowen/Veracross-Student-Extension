'use strict';

const getValue = function (val, func) {
    if (func === undefined || func === null || typeof (func) !== 'function')
        chrome.storage.sync.get(val, function () {});
    else
        chrome.storage.sync.get(val, func);
}
const setValue = function (val, func) {
    if (func === undefined || func === null || typeof (func) !== 'function')
        chrome.storage.sync.set(val, function () {
            if (chrome.runtime.lastError) console.log(chrome.runtime.lastError.message);
        });
    else
        chrome.storage.sync.set(val, func);
}

function debug() {
    (function () {
        getValue(null, function (items) {
            console.log(items);
        });
    })();
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (var key in changes) {
            var storageChange = changes[key];
            console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
        }
    });
}

//debug(); // Only use this function when debugging

var firstTimeInstall;

getValue('firstTimeInstall', function (items) {
    if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError.message);
    else
        firstTimeInstall = items['firstTimeInstall'];
    if (firstTimeInstall === undefined || firstTimeInstall === null)
        firstTimeInstall = true;
    if (firstTimeInstall)
        console.log('First time install. Initing the extension settings.');
        setValue({'firstTimeInstall': false});
});
