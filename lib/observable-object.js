
/**
 * observer callback for when a property changes on an ObservableObject
 * @callback observableObjectObserver
 * @param {string} value - the value of the property that changed on the ObservableObject
 * @param {string} propertyChanged - the name of the property that changed on the ObservableObject
 * @param {object} object - the containing object which had the change
 */

/**
 * observer callback for an object which either changed or a child of which changed
 * @callback rootObservedChangeHandler
 * @param {object} root - the root object with which a change ocurred underneath
 * @param {string} value - the value of the property that changed
 * @param {string} propertyChanged - the name of the property that changed
 * @param {object} directObjectChanged - the containing object which had the change
 */


// This line is needed because Proxy is not designed to be an extendable object
// hopefully this never comes back to bite us in the butt
Proxy.prototype = Proxy.prototype || Proxy.__proto__;

/**
 * @description An object which adding/changing/removing values fires and observer.
 * @param {observableObjectObserver} observer - An observer function that fires when an immediate or child property changes.
 * @param {object} [initialData] - Initialize ObservableObject with a POJO
 */
class ObservableObject extends Proxy {
  constructor (observer, initialData = {}) {
    if (typeof observer !== 'function') {
      throw new Error (`new ObservableObject(<observer>, <[initialData]>) :: \`observer\` is a required callback, got "${observer}"`)
    }
    
    // recursively map through children to ensure we are listening to them if they change
    const baseObj = Array.isArray(initialData) ? initialData : Object.fromEntries(Object.entries(initialData).map(([key, value]) => {
      if (value instanceof Object && !(value instanceof Function)) {
        return [key, new ObservableObject(observer, value)]
      }
      return [key, value]
    }));
    
    super(baseObj, {
      get: function (obj, prop) {
        return obj[prop];
      },
      
      set: function (obj, prop, value) {
        let old = obj[prop];
        if (old !== value) {
          obj[prop] = value;
          if (value instanceof Object && !(value instanceof Function)) {
            obj[prop] = new ObservableObject(observer, value)
          } else {
            obj[prop] = value;
          }
          observer(value, prop, obj)
        }
        return obj[prop];
      }
    });
  }
};

/**
 * @function createObservedObject
 * @description - create a root-observed ObservableObject
 * @param {rootObservedChangeHandler} observer - callback 
 * @param {object} [initialData]
 * @returns {ObservableObject} - a root object to which a single observer fire
 */
function createObservedObject (observer, initialData = {}) {
  var observed = new ObservableObject(
    (...args) => observer(observed, ...args),
    initialData
  )
  return observed
}


module.exports = {
  ObservableObject,
  createObservedObject,
}
