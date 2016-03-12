export default class EventEmitter {
  _events = {}

  on ( types, listener ) {
    types = Array.isArray( types ) ? types : [types]
    types.forEach( type => {
      this._events[type] = this._events[type] || []
      this._events[type].push( listener )
    } )
    return this
  }

  emit ( type ) {
    if ( this._events[type] ) {
      const args = arguments
      this._events[type].forEach( listener => listener.apply( null, args ) )
    }
  }

  removeListener ( types, listener ) {
    ( Array.isArray( types ) ? types : [types] ).forEach( type => {
      if ( this._events[type] ) {
        this._events[type].splice( this._events[type].indexOf( listener ), 1 )
      }
      return this
    } )
  }
}
