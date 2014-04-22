
//实现继承护具方法
function extend(subClass, parentClass, extendMethod){

    //检查是否为空对象
    if (!subClass || !parentClass) {
        throw Error('extend failed, verify dependencies');
    }

    //利用空对象作为中介实现原型继承
    var f = function () { };
    f.prototype = parentClass.prototype;
    subClass.prototype = new f();
    subClass.prototype.constructor = subClass;
    //subClass.superclass = parentClass.prototype; //?
    if (extendMethod) { // extend class implements
        for (var k in extendMethod) {
            if (extendMethod.hasOwnProperty(k)) subClass.prototype[k] = extendMethod[k];
        }
    }

    return subClass;
}
