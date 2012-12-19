(function(){

// Initialize Brass Monkey
bm.init({
  // The Name that will be displayed on phone when
  // trying to connect to the game to control it.
  name: "Spelunky",
  
  // This game is single player, set it's max players accordingly
  bmMaxPlayers:1,
  
  // Use this appID for now. We are building our developer portal
  // back end as we speak.
  bmAppId:"dfbc9769ef641e415aac8ee86224c9fa",
  
  // Location of the brassmonkey.swf the SDK depends on.
  // Coming soon this dependency will be removed for platforms
  // like Mobile Safari that don't support flash.
  swfURL:"controller/brassmonkey.swf",
  
  // Describe the controller's design/layout
  design: {
    // Which orientation is your controller designed for
    orientation: "landscape",
    
    // Disable touch/accelerometer if you aren't using it
    // to improve network performance.
    touchEnabled: false,
    accelerometerEnabled: false,
    
    // List of images used for this controller
    images:[
      'controller/images/background.png',
      'controller/images/left-up.png',
      'controller/images/left-down.png',
      'controller/images/right-up.png',
      'controller/images/right-down.png',
      'controller/images/up-up.png',
      'controller/images/up-down.png',
      'controller/images/down-up.png',
      'controller/images/down-down.png',
      'controller/images/x-up.png',
      'controller/images/x-down.png',
      'controller/images/z-up.png',
      'controller/images/z-down.png',
      'controller/images/c-up.png',
      'controller/images/c-down.png'
    ],
    
    // List of all the images/buttons in the controller layout
      // Attributes
      //  Images and Buttons
      //    type                    | 'image' or 'button'
      //    x,y,width, and height   | Position of elements (in pixels)
      //  Images only
      //    image                   | zero based index of the image to display
      //                            | from the 'images' list
      //  Buttons only
      
    layout:[{
        type:       "image",
        image:      0,
        x:          0,
        y:          0,
        width:      480,
        height:     320
      }, {
        type:       "button",
        handler:    "left",
        imageUp:    1,
        imageDown:  2,
        x:          0,
        y:          40,
        width:      100,
        height:     240
      }, {
        type:       "button",
        handler:    "right",
        imageUp:    3,
        imageDown:  4,
        x:          140,
        y:          40,
        width:      100,
        height:     240
      }, {
        type:       "button",
        handler:    "up",
        imageUp:    5,
        imageDown:  6,
        x:          0,
        y:          40,
        width:      240,
        height:     100
      }, {
        type:       "button",
        handler:    "down",
        imageUp:    7,
        imageDown:  8,
        x:          0,
        y:          180,
        width:      240,
        height:     100
      }, {
        type:       "button",
        handler:    "x",
        imageUp:    9,
        imageDown:  10,
        x:          240,
        y:          160,
        width:      120,
        height:     120
      }, {
        type:       "button",
        handler:    "z",
        imageUp:    11,
        imageDown:  12,
        x:          360,
        y:          160,
        width:      120,
        height:     120
      }, {
        type:       "button",
        handler:    "c",
        imageUp:    13,
        imageDown:  14,
        x:          360,
        y:          40,
        width:      120,
        height:     120
      }]
  }
});

// Once the device becomes available set it GamePad Mode to
// show us our custom game controller
bm.onDeviceAvailable(function(device){  		
	device.controlMode=bm.MODE_GAMEPAD;
	return device;
});


// Listen for button events 
bm.onInvocation(function(invoke, deviceId){
  // Is the button up or down now
  var isDown  = invoke.parameters[0].Value=="down";
  
  // Which button was it? ('left', 'right', or 'flip')
  var button  = invoke.methodName;
      
  var keyMap = {
        left: 37,
        right: 39,
        up: 38,
        down: 40,
        z: 90,
        x: 88,
        c: 67
      };
  
  
      
  // Button Down  
  if(isDown){
    emulateKeyDown(keyMap[button]);
    
  } else {

    // Button Up
    emulateKeyUp(keyMap[button]);
  }
});


bm.onShowSlot(function(color){
  // Todo: Display the slot color somewhere on the game's screen. 
  // This is the color that shows up in the device list on the controller for
  // selecting what game/pc to connect to in order to control it.
  // It's a CSS hex style color (ie. #ff0000)
});


// Intercept registration of keyboard handlers to jQuery so we can trick the game
// into thinking that a key was pressed instead of a controller's virtual buttons

function noop(){}

function emulateKeyDown(keyCode){
  window.event = {which:keyCode,target:"nottext",type:"keydown",preventDefault:noop}
  keyDownCB.call(window);
}

function emulateKeyUp(keyCode){
  window.event = {which:keyCode,target:"nottext",type:"keyup",preventDefault:noop};
  keyUpCB.call(window);
}

})();