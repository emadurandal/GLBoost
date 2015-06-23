var requestAnimationFrame = ( function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){
                window.setTimeout( callback, 1000.0 / 60.0 );
            };
} )();

var now = window.performance && (
    performance.now || 
    performance.mozNow || 
    performance.msNow || 
    performance.oNow || 
    performance.webkitNow );

var getTime = function() {
    return ( now && now.call( performance ) ) || ( new Date().getTime() );
}
