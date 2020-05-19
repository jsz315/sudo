const listener = {

}

listener.on = function(type, callback){
    if(!listener[type]){
        listener[type] = [];
    }
    listener[type].push(callback);
}

listener.emit = function(){
    let args = [...arguments];
    let type = args.shift();
    listener[type] && listener[type].forEach(item => {
        item.apply(null, args);
    })
}


listener.make = function(dom, type, callback){
    dom.addEventListener(type, callback);
    return {
        destroy() {
            dom.removeEventListener(type, callback);
        },
    };
}

export default listener;