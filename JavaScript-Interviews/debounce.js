function myDebounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

function myThrottle(func, wait) {
    let lastCall = 0;

    return function (...args) {
        let now = Date.now();
        if (now - lastCall >= wait) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}


