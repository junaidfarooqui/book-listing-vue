const { config } = require('@vue/test-utils');
config.global.warnHandler = (msg, vm, trace) => {
    // Filter out specific repeated and benign warnings
    const ignoredWarnings = [
        'App already provides property with key "Symbol(router)"',
        'App already provides property with key "Symbol(route location)"',
        'App already provides property with key "Symbol(router view location)"'
    ];

    if (ignoredWarnings.some(ignoredMsg => msg.includes(ignoredMsg))) {
        return;
    }

    // Default behavior for all other warnings
    console.warn("[Vue warn - custom]: " + msg + trace);
};