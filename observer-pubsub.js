/**
 * Created by userr on 18/11/2016.
 */
var SubscriptionManager = (function(){
    var subscribers = {};
    function subscribe(type,fn){
        if (!subscribers[type]){
            subscribers[type] = []
        }
        if (subscribers[type].indexOf(fn) === -1){
            subscribers[type].push(fn)
        }
    }
    function unsubscribe(type,fn){
        var listeners = subscribers[type];
        if(!listeners){
            return;
        }
        var indexOfFunction = listeners.indexOf(fn);
        if (indexOfFunction > -1){
            listeners.splice(indexOfFunction,1);
        }
    }
    function publish(type,eventObject){
        if (!subscribers[type]){
            return;
        }
        if (!eventObject.type){
            eventObject.type = type;
        }

        var listeners = subscribers[type];

        for (var i=0; i < listeners.length;i++){
            listeners[i](eventObject);
        }
    }
    return {
        subscribe:subscribe,
        unsubscribe:unsubscribe,
        publish:publish,

    }
})();

var zooPopulation = (function(){
    var animals = [];
    function addAnimal(animal){
        console.log("added",animal);
        animals.push(animal);
        console.log(animals);
    }
    function removeAnimal(animal){
        console.log("removed",animal);
        animals.splice(animals.indexOf(animal),1);
        console.log(animals);
    }

    SubscriptionManager.subscribe("cheapAnimal",addAnimal);
    SubscriptionManager.subscribe("expensiveAnimal",removeAnimal);

    return {
        addAnimal:addAnimal,
        removeAnimal:removeAnimal,
    }
})();



SubscriptionManager.publish("cheapAnimal","Elephant");
SubscriptionManager.publish("expensiveAnimal","Elephant");

