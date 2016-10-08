(function(){

  "use strict";

  // --------------- BEGIN MODULE SCOPE VARIABLES -----------------
  var
    configMap, stateMap, elemMap,
    hasClass, addClass, removeClass,
    addEventHandler, onKeydown,
    showPrevSlide, showNextSlide, setSlideNumber,
    getIndexOf, 
    setElems, setEvents, initModule,

    configMap = {
      elem_class_list : {
        slide        : 'slide',
        active_slide : 'active',
        slide_number : 'slide-number'
      }
    },

    stateMap = {
      active_slide : null
    },
    
    elemMap = {
      slides       : null,
      slide_number : null
    };
  // ----------------- END MODULE SCOPE VARIABLES -----------------
  
  
  // -------------------- BEGIN DOM METHODS -----------------------
  setElems = function () {
    var elem_class_list = configMap.elem_class_list;

    elemMap.slides = document
      .getElementsByClassName( elem_class_list.slide );
    stateMap.active_slide = document
      .getElementsByClassName( elem_class_list.active_slide )[0];
    elemMap.slide_number = document
      .getElementsByClassName( elem_class_list.slide_number )[0];
  }
  
  hasClass = function ( elem, class_name ) {
    return !( elem.className.split(' ').indexOf( class_name ) < 0 );
  }
  
  addClass = function ( elem, class_name ) {
    if ( hasClass( elem, class_name ) ) { return false; }
    return elem.className += ' ' + class_name;
  }
  
  removeClass = function ( elem, class_name ) {
  var class_list;
    if ( ! hasClass( elem, class_name ) ) { return false; }
    class_list = elem.className.split( ' ' );
    class_list.splice( class_list.indexOf( class_name ), 1 );
    return elem.className = class_list.join( ' ' );
  }
  
  showPrevSlide = function () {
    var 
      slide_elems, curr_index, prop_index, slides_len,
      prop_active_slide, active_slide_class;

    slide_elems = elemMap.slides;
    slides_len = slide_elems.length;
    curr_index = getIndexOf( slide_elems, stateMap.active_slide );
    active_slide_class = configMap.elem_class_list.active_slide;

    if ( curr_index === 0 ) { return false; }

    prop_index = curr_index - 1;
    removeClass( stateMap.active_slide, active_slide_class );
    prop_active_slide = slide_elems[ prop_index ];
    addClass( prop_active_slide, active_slide_class );

    setSlideNumber( prop_index + 1, slides_len );

    return stateMap.active_slide = prop_active_slide;
  }
  
  showNextSlide = function () {
    var 
      slide_elems, curr_index, prop_index, slides_len, 
      prop_active_slide, active_slide_class;

    slide_elems = elemMap.slides;
    slides_len = slide_elems.length;
    curr_index = getIndexOf( slide_elems, stateMap.active_slide );
    active_slide_class = configMap.elem_class_list.active_slide;

    if ( curr_index === slides_len - 1 ) { return false; }

    prop_index = curr_index + 1;
    removeClass( stateMap.active_slide, active_slide_class );
    prop_active_slide = slide_elems[ prop_index ];
    addClass( prop_active_slide, active_slide_class );

    setSlideNumber( prop_index + 1, slides_len );

    return stateMap.active_slide = prop_active_slide;
  }
  
  setSlideNumber = function ( curr_num, last_num ) {
    elemMap.slide_number.innerHTML = curr_num + ' / ' + last_num ;
  }
  // --------------------- END DOM METHODS ------------------------

  // ------------------- BEGIN EVENT METHODS ----------------------
  setEvents = function () {
    addEventHandler( 'keydown', window, onKeydown );
  }
  
  addEventHandler = function ( type, elem, handler ) {
    if ( elem.addEventListener ) {
      elem.addEventListener( type, handler, false );
    }
    else if ( elem.attachEvent ) {
      elem.attachEvent( 'on' + type, handler );
    }
  }
  
  onKeydown = function ( evt ) {
    var evt = evt || window.event;
    evt.preventDefault();
    switch ( evt.keyCode ) {
      case 37:
        showPrevSlide();
        break;
      case 39:
        showNextSlide();
        break;
    }
  }
  // -------------------- END EVENT METHODS -----------------------

  // ------------------ BEGIN UTILITY METHODS ---------------------

  getIndexOf = function ( arr, item ) {
    return Array.prototype.indexOf.call( arr, item );
  }

  // ------------------- END UTILITY METHODS ----------------------

  initModule = function() {
    setElems();
    setEvents();
    setSlideNumber( 
      getIndexOf( elemMap.slides, stateMap.active_slide ) + 1,
      elemMap.slides.length );
  }

  initModule();

}());