function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = function ( types, listener ) {
  types = Array.isArray(types) ? types : [ types ]
  types.forEach(( type ) => {
    this._events[ type ] = this._events[ type ] || [];
    this._events[ type ].push(listener);
  })
  return this;
};

EventEmitter.prototype.emit = function ( type ) {
  if ( this._events[ type ] ) {
    var args = arguments;
    this._events[ type ].forEach(function ( listener ) {
      listener.apply(null, args);
    });
  }
};

EventEmitter.prototype.removeListener = function ( types, listener ) {
  types = Array.isArray(types) ? types : [ types ]
  types.forEach(( type ) => {
    if ( this._events[ type ] ) {
      this._events[ type ].splice(this._events[ type ].indexOf(listener), 1);
    }
    return this;
  })
};

export default EventEmitter;
