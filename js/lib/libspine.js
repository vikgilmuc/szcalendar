define(["jquery"],
    function($){
    
        var assert = function(value, msg) {
              if ( !value )
                throw(msg || (value + " does not equal true"));
            };
        
            var assertEqual = function(val1, val2, msg) {
              if (val1 !== val2)
                throw(msg || (val1 + " does not equal " + val2));
            };
            
        
        var Class = function(){
            var klass = function(){
                this.init.apply(this, arguments);
            };
            
            // Change klass' prototype
            if (parent) {
                var subclass = function() { };
                subclass.prototype = parent.prototype;
                klass.prototype = new subclass;
            };
                
            
            klass.prototype.init = function(){};
            
            // Shortcut to access prototype
            klass.fn = klass.prototype;
            
            klass.proxy = function(func){
                var self = this;
                return(function(){
                    return func.apply(self, arguments);
                });};
            // Add the function on instances too
            klass.fn.proxy = klass.proxy;
            // Shortcut to access class
            klass.fn.parent = klass;
            
            klass._super = klass.__proto__;
            
            // Adding class properties
            klass.extend = function(obj){
                var extended = obj.extended;
                for(var i in obj){
                    klass[i] = obj[i];
                }
                if (extended) extended(klass)
            };
            
            // Adding instance properties
            klass.include = function(obj){
                var included = obj.included;
                for(var i in obj){
                    klass.fn[i] = obj[i];
                }
                if (included) included(klass)
            };
            return klass;
        };
        
        if (typeof Object.create !== "function")
        Object.create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
        };
        
        
        
        var Model = {
            inherited: function(){},
            created: function(){},
            
            prototype: {
                init: function(){}
            },
            create: function(){
                var object = Object.create(this);
                object.parent = this;
                object.prototype = object.fn = Object.create(this.prototype);
                object.created();
                this.inherited(object);
                return object;
            },
            
            init: function(){
                var instance = Object.create(this.prototype);
                instance.parent = this;
                instance.init.apply(instance, arguments);
                return instance;
            },
            
            extend: function(o){
                var extended = o.extended;
                jQuery.extend(this, o);
                if (extended) extended(this);
            },
            include: function(o){
                var included = o.included;
                jQuery.extend(this.prototype, o);
                if (included) included(this);
            }
        };
           
           
           // An object of saved assets
        
           Model.extend({
            created: function(){
                this.records = {};
                this.attributes=[];
                },
                find: function(id){
                    var record = this.records[id];
                    if ( !record ) throw("Unknown record");
                    return record.dup();},
                  
                 populate: function(values){
                    // Reset model & records
                    this.records = {};
                    
                    for (var i=0, il = values.length; i < il; i++) {
                    var record = this.init(values[i]);
                    record.newRecord = false;
                    this.records[record.id] = record;
                    
                    }
                } 
              });
              
              
        // Add instance properties
            Model.include({
                attributes: function(){
                    var result = {};
                    for(var i in this.parent.attributes) {
                        var attr = this.parent.attributes[i];
                        result[attr] = this[attr];
                    }
                    result.id = this.id;
                    return result;
                },
                toJSON: function(){
                    return(this.attributes());
               },
                newRecord: true,
                create: function(){
                   
                    if ( !this.id ) this.id = Math.guid();
                    this.newRecord = false;
                    this.parent.records[this.id] = this.dup();
                      },
                destroy: function(){
                    delete this.parent.records[this.id];},
                init: function(atts) { if (atts) this.load(atts);},
                load: function(attributes){ for(var name in attributes)
                    this[name] = attributes[name]; },
                update: function(){
                    this.parent.records[this.id] = this.dup();
                },
                save: function(){
                    this.newRecord ? this.create() : this.update();
                },
                dup: function(){
                    return jQuery.extend(true, {}, this);
                }
                
        }); 
        
        Model.LocalStorage = {
            saveLocal: function(name){
            // Turn records into an array
                var result = [];
                for (var i in this.records)
                    result.push(this.records[i])
                localStorage[name] = JSON.stringify(result);
            },
                
            loadLocal: function(name){
                var result = JSON.parse(localStorage[name]);
                this.populate(result);
            }
        };
        
        
        Model.include({
            createRemote: function(url, callback){
            $.post(url, this.attributes(), callback);
            },
            updateRemote: function(url, callback){
                $.ajax({
                url: url,
                data: this.attributes(),
                success: callback,
                type: "PUT"
            });
            }
            });
        
        
        Math.guid = function(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                 return v.toString(16);
            }).toUpperCase();
        };  
         
         
         var PubSub = {
                subscribe: function(ev, callback) {
                // Create _callbacks object, unless it already exists
                var calls = this._callbacks || (this._callbacks = {});
                // Create an array for the given event key, unless it exists, then
                // append the callback to the array
                (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
                return this;
                },
                publish: function() {
                // Turn arguments object into a real array
                var args = Array.prototype.slice.call(arguments, 0);
                // Extract the first argument, the event name
                var ev = args.shift();
                // Return if there isn't a _callbacks object, or
                // if it doesn't contain an array for the given event
                var list, calls, i, l;
                if (!(calls = this._callbacks)) return this;
                if (!(list = this._callbacks[ev])) return this;
                // Invoke the callbacks
                for (i = 0, l = list.length; i < l; i++)
                list[i].apply(this, args);
                return this;
                }
        };
            
         
        /*-----------------Controller ----------------*/ 
         
         var exports = this;
        
       
        
        (function($){
            var mod = {};
            mod.create = function(includes){
                var result = function(){
                  this.initializer.apply(this, arguments);
                  this.init.apply(this, arguments);
                };
                
            result.fn= result.prototype;
            result.fn.init= function(){};
            
            result.proxy = function(func){ return $.proxy(func, this); };
            result.fn.proxy = result.proxy;
            result.include = function(ob){ $.extend(this.fn, ob); };
            result.extend = function(ob){ $.extend(this, ob); };
            
            result.include({
                initializer: function(options){
                    this.options = options;
                    for (var key in this.options)
                      this[key] = this.options[key];
                    if (this.events) this.delegateEvents();
                    if (this.elements) this.refreshElements();
                },
                
                    //Private  
                    
                $: function(selector){
                    return $(selector, this.el);
                 },
                 refreshElements: function(){   
                    for (var key in this.elements) {
                        this[this.elements[key]] = this.$(key);
                    }
                 },
                 eventSplitter: /^(\w+)\s*(.*)$/,
                
                   delegateEvents: function(){
                    for (var key in this.events) {
                        var methodName = this.events[key];
                        var method = this.proxy(this[methodName]);
                        var match = key.match(this.eventSplitter);
                        var eventName = match[1], selector = match[2];
                        if (selector === '') {
                            this.el.bind(eventName, method);
                        } else {
                           
                            this.el.delegate(selector, eventName, method);
                        }
                    }
                    },
            
             });
                
            if (includes) result.include(includes)
            return result;
            };
             exports.Controller = mod;
             
             })(jQuery);
            /* --------------end controller .-----------*/
            
            var StateMachine = function(){};
                StateMachine.fn = StateMachine.prototype;
                // Add event binding/triggering
                $.extend(StateMachine.fn, Events);
                StateMachine.fn.add = function(controller){
                    this.bind("change", function(e, current){
                     if (controller == current)
                         controller.activate();
                     else
                        controller.deactivate();
                    });
                    controller.active = $.proxy(function(){
                        this.trigger("change", controller);
                }, this);
                };
            
            var Events = {
                bind: function(){
                if ( !this.o ) this.o = $({});
                    this.o.bind.apply(this.o, arguments);
                },
                trigger: function(){
                if ( !this.o ) this.o = $({});
                    this.o.trigger.apply(this.o, arguments);}
            };
          
         return {
        assert:assert,
        Model:Model,
        PubSub:PubSub
        };
  
        
        }
    
  
  
)









