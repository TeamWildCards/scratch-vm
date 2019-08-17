const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const color = require('../../util/color');
const log = require('../../util/log');
const Swal = require('./sweetalert2.all.min.js');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI =
'data:image/png;base64,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';

//need to map:
//this..button2 = ""????
//from
//Button1Pressed


var inputMode = "0";
var outputMode = "1";
var analogMode = "2";
var pwmMode = "3";
var servoMode = "4";
var i2cMode = "6";
var stepperMode = "8";
var toneMode = "10";
var sonarMode = "11";
var pullupMode = "13";
var ignoreMode = "127";
var noModeSet = "126";
//Firmata mostly ignores an unrecognized pin mode like 126.
//Technically, Firmata emits a string message saying "Unknown pin mode"


//const io = require('socket.io-client/dist/socket.io');
// connect to the server

var ipAddress = "localhost";
var ipPort = "9000";
var mysocket;

function socketconnect() {
    return new Promise(function(resolve, reject) {
                       mysocket = new WebSocket('ws://' + ipAddress + ':' + ipPort);
                       mysocket.onopen = function() {
                           resolve(mysocket);
                       };
                       mysocket.onerror = function(err) {
                       Swal.fire({
                                 title: '<b>Wildcards Link not connected!</b>',
                                 html:
                                 'Plug your board. Launch Wildcards Link. Reload the page.' +
                                 'You can use Wildcards GUI without the board by clicking OK.',
                                 type: 'error',
                                 confirmButtonText: 'Ok',
                                 allowOutsideClick: false,
                                 showCancelButton: true,
                                 cancelButtonText: 'Reload',
                                 cancelButtonColor: '#3085d6',
                                 focusCancel: true
                                 }).then(
                                         function (result) {
                                             if (result.dismiss === 'cancel') {
                                                 location.assign('.')
                                             }
                                         }
                                 );
                                 reject(err);
                       };
                       mysocket.onclose = function() {}
    });
}


//Placeholder sockets.io implementation
//////////////////////////////////////////////////////////////////////////////starts here
// const tempsocket = io('http://' + ipAddress + ':' + ipPort, {
//     transports: ['websocket']
//   });

// tempsocket.on('open', (data) => {
//     console.log('PyMata IoT Has Successfully Connected  ' +  data);
// });


// tempsocket.on('close', (data) => {
//     console.log("The socket has closed!  " +  data);
// });
// */

// //Placeholder websockets implementation
// /*
// tempsocket.onopen = function (event) {
//     console.log('PyMata IoT Has Successfully Connected');

// };

// tempsocket.onclose = function (event) {
//     console.log("The socket has closed!");
// };

// tempsocket.onmessage = function (message) {
//     //console.log('got message' + message.data);
//     //console.log(message.data);
//     var msg = JSON.parse(message.data);
//     var method = msg["method"];
//     //console.log(method);
//     var params = msg["params"];
//     //console.log(params);

//     //var out = data;
//     //console.log(out)
//     switch (method) {
//         case "analog_message_reply":
//         {
//             //console.log('analog');
//             var pin = params[0];
//             ////console.log(a)
//             var out = params[1];
//             //console.log("out: " + out);
//             switch (pin) {
//                 case 0:
//                 //    document.getElementById("ia0").value = out;
//                     break;
//                 case 1:
//                 //    document.getElementById("ia1").value = out;
//                     break;
//                 case 2:
//                 //    document.getElementById("ia2").value = out;
//                     break;
//                 case 3:
//                 //    document.getElementById("ia3").value = out;
//                     break;
//                 case 4:
//                 //    document.getElementById("ia4").value = out;
//                     break;
//                 case 5:
//                 //    document.getElementById("ia5").value = out;
//                     break;
//                 default:
//                     alert("unknown analog pin")


//             }
//             break;
//         }

//         case "digital_message_reply":
//         {
//             //console.log('digital message');

//             pin = params[0];
//             ////console.log(a)
//             out = params[1];
//             //console.log('digital message');
//             //console.log('pin: ' + pin);
//             //console.log('value =' + out);
//             switch (pin) {

//                 case 2:
//                 //    document.getElementById("ip2").value = out;
//                     break;
//                 case 3:
//                 //    document.getElementById("ip3").value = out;
//                     break;
//                 case 4:
//                 //    document.getElementById("ip4").value = out;
//                     Button1Pressed();
//                     break;
//                 case 5:
//                 //    document.getElementById("ip5").value = out;
//                     break;
//                 case 6:
//                 //    document.getElementById("ip6").value = out;
//                     break;
//                 case 7:
//                 //    document.getElementById("ip7").value = out;
//                     break;
//                 case 8:
//                 //    document.getElementById("ip8").value = out;
//                     break;
//                 case 9:
//                 //    document.getElementById("ip9").value = out;
//                     break;
//                 case 10:
//                 //    document.getElementById("ip10").value = out;
//                     break;
//                 case 11:
//                 //    document.getElementById("ip11").value = out;
//                     break;
//                 case 12:
//                 //    document.getElementById("ip12").value = out;
//                     break;
//                 case 13:
//                 //    document.getElementById("ip13").value = out;
//                     break;
//                 case 14:
//                 //    document.getElementById("ip14").value = out;
//                     break;
//                 case 15:
//                 //    document.getElementById("ip15").value = out;
//                     break;
//                 case 16:
//                     Button2Pressed();
//                 //    document.getElementById("ip16").value = out;
//                     break;
//                 case 17:
//                 //    document.getElementById("ip17").value = out;
//                     break;
//                 case 18:
//                 //    document.getElementById("ip18").value = out;
//                     break;
//                 case 19:
//                 //    document.getElementById("ip19").value = out;
//                     break;
//                 default:
//                     alert("unknown digital pin");
//                 //console.log('unknown digital pin: ' + pin);
//             }
//         }
//             break;
//         case "i2c_read_request_reply":
//             console.log('i2c_request_result' + params);
//             /**
//             TemperatureSum = (params[1] << 8 | params[2]) >> 4

//             celsius = TemperatureSum * 0.0625
//             console.log(celsius)

//             fahrenheit = (1.8 * celsius) + 32
//             console.log(fahrenheit)
//             document.getElementById("i2cRequestResult").value = params
//             document.getElementById("i2cRequestResultf").value = fahrenheit
//             document.getElementById("i2cRequestResultc").value = celsius
//             **/
//             break;

//         case "i2c_read_data_reply":
//             console.log('i2c_read_result');
//                 console.log(params);
//             //    document.getElementById("i2cReadResult").value = params
//             break;

//         case "encoder_data_reply":
//             console.log('received encoder data');
//             console.log(params);
//             //document.getElementById("encoderValue").value = params[1];
//             break;
//         case "encoder_read_reply":
//             console.log('encoder_read_reply  ' + params);
//             //document.getElementById("encoderValue2").value = params[1];
//             break;
//         case "sonar_data_reply":
//             console.log('received sonar data');
//             console.log(params[1]);
//             //document.getElementById("sonarValue").value = params[1];
//             break;
//         case "sonar_read_reply":
//             console.log('sonar_read_reply  ' + params);
//             //document.getElementById("sonarValue2").value = params[1];
//             break;
//         case "analog_map_reply":
//         case "capability_report_reply":
//         case "firmware_version_reply":
//         case "protocol_version_reply":
//         case "pymata_version_reply":
//         case "pin_state_reply":
//                 console.log(params);
//             //document.getElementById("reports").value = params;
//             break;
//         case "digital_latch_data_reply":
//             //console.log('digital_latch_callback');
//             /**
//             pin = params[0].slice(1);
//             var id = 'dlevent' + pin;
//             **/

//             //console.log(id)

//             /**
//             document.getElementById(id).value = params;
//             id = 'dlatch' + pin;
//             **/
//             console.log('al: ' + id);
//             //console.log(document.getElementyById(id).value);
//             //document.getElementyById(id).value = '1';
//         //    document.getElementById(id).selectedIndex = "0";

//             //console.log(message.data);

//             break;
//         case "analog_latch_data_reply":
//             //console.log('analog_latch_callback');
//         //    pin = params[0].slice(1);
//         //    id = 'alevent' + pin;
//             //console.log(id);

//         //    document.getElementById(id).value = params;
//         //    id = 'alatch' + pin;
//             console.log('al: ' + id);
//             //console.log(document.getElementyById(id).value);
//             //document.getElementyById(id).value = '1';
//         //    document.getElementById(id).selectedIndex = "0";
//             break;

//         case "digital_read_reply":
//         //    document.getElementById('ddata').value = params[1];
//             break;

//         case "analog_read_reply":
//         //    document.getElementById('adata').value = params[1];
//             break;
//         case "get_digital_latch_data_reply":
//             console.log(params);
//             /**
//             if (params[1] == null) {
//                 document.getElementById('dlatchdata').value = "No Latch Set"
//             }
//             else {

//                 document.getElementById('dlatchdata').value = params[1]
//             }
//             break;
//             **/
//         case "get_analog_latch_data_reply":
//             console.log('get_analog_latch_data_reply' + params);
//             /**
//             if (params[1] == null) {
//                 document.getElementById('alatchdata').value = "No Latch Set"
//             }
//             else {

//                 document.getElementById('alatchdata').value = params[1]
//             }
//             break;
//             **/
//         default:
//             break;
//     }
//     //document.getElementById("ain").value = out;
// };

//////////////////////////////////////////////////////////////////////////////ends here




// document.addEventListener('DOMContentLoaded', function () {
//     initialiseWebSocket("ws://localhost:9000");
//     });

// function initialiseWebSocket(url){
//     websocket = new WebSocket(url);
//     websocket.onopen = function(ev) { // connection is open
//     alert('sucessful connected');
// };


/**
 * Enum for wildcard buttons.
 * @readonly
 * @enum {string}
 */
const wcButton = {
B_1: 'Button 1',
B_2: 'Button 2',
B_3: 'Button 3',
B_4: 'Button 4',
};

const wcLED = {
LED_1: 'LED 1',
LED_2: 'LED 2',
LED_3: 'LED 3',
LED_4: 'LED 4'
};

const wcSensor = {
LIGHT: "light sensed",
SOUND: "sound sensed",
TOUCH: "touch sensed",
BUTTON: "button pressed",
Onboard: "Onboard"
};
const wcConnector = {
A: 'Connector A',
B: 'Connector B',
C: 'Connector C',
D: 'Connector D',
Onboard: "Onboard"
};

const wcPin = {
pin1: 'Pin1',
pin2: 'Pin2'
};

const wcOnOff = {
ON: 'On',
OFF: 'Off'
}

const wcPressedReleased = {
PRESSED: 'pressed',
RELEASED: 'released'
}


/**
 * Manage WC pins, connection status, and state
 */
class WildcardsPin {
    /**
     * Construct a Wildcards pin instance.
     * @param {WildConnector} parent - the connector (or WildButton or WildLED or WildBuzzer) to which this pin belongs
     * @param {int} pinNum - the Arduino-equivalent pin number
     * @param {wcPin} wcpinNum - the Wildcards connector pin number (wcPin1 or wcPin2), ignored for non-connector pins like the on board LEDs/Buttons/Buzzer
     */
    constructor (parent, pinNum, wcpinNum = wcPin.pin1) {
        this._parent = parent;
        this._wcpinNum = wcpinNum;
        this._pinNum = pinNum;
        console.log("Created pin " + this._pinNum + " on connector " + this._parent._connector)
        
        //pinNum is used for Digital Read/Writes and Analog Writes (PWM), but for Analog Reads, a different
        //pin numbering scheme is used (mapping to ADC0, ADC1, etc. for Arduinos)
        switch (pinNum) {
            case 14:  //ADC0 maps to Arduino pin 14, and Wildcards connector C pin 2
                this._pinNumAnalogInput = 0;
                break;
            case 15:  //ADC1 maps to Arduino pin 15, and Wildcards connector D pin 2
                this._pinNumAnalogInput = 1;
                break;n
            case 16:  //ADC2 maps to Arduino pin 16
                //this analog input is not connected for Wildcards
                this._pinNumAnalogInput = 2;
                break;
            case 17:  //ADC3 maps to Arduino pin 17, and Wildcards connector A pin 2
                this._pinNumAnalogInput = 3;
                break;
            case 18:  //ADC4 maps to Arduino pin 18, and Wildcards connector B pin 2
                this._pinNumAnalogInput = 4;
                break;
            case 19:  //ADC5 maps to Arduino pin 19, and Wildcards connector B pin 1
                this._pinNumAnalogInput = 5;
                break;
            default:
                this._pinNumAnalogInput = 0;  //unsure if defaulting to ADC0 is the best to do here, or to make it something invalid?
                break;
        }
        
        //Default pin mode to noModeSet so it forces every pin to send pymata pinmode method at least once
        this._pinMode = noModeSet;
        
        //Default pin value to 0
        this._state = 0;
    }
    
    /**
     * Gets the Arduino-equivalent pin number for this pin object
     * @return {int} - The Arduino-equivalent pin number
     */
    get pinNum () {
        return this._pinNum;
    }
    
    /**
     * Set the Wildcards pin mode
     * @param {int} newPinMode - the pinmode to set
     */
    set pinMode (newPinMode) {
        this._setPinMode(newPinMode);
    }
    
    /**
     * Get the Wildcards pin mode
     * @return {int} - The mode of the pin
     */
    get pinMode () {
        return this._pinMode;
    }
    
    /**
     * Set the Wildcards pin value
     * @param {int} value - the value to set the pin
     */
    set state (value) {
        this._state = value;
    }
    
    /**
     * Get the Wildcards pin value
     * @return {int} value - the value the pin is set to
     */
    get state () {
        return this._state;
    }
    
    /**
     * Set the Wildcards pin mode.
     * @param {int} pinMode - sets the mode of the pin (e.g. input, output)
     */
    setPinMode (pinMode) {
        if (this._pinMode == pinMode) {
            //nothing to do, we're already set to the correct mode
            //console.log("pin " + this._pinNum + " already set to " + this._pinMode);
        }
        else {
            if (pinMode == servoMode) {
                this.configureServo (this._min_pulse, this._max_pulse)
            }
            //else if (pinMode == analogMode) {
            //    var msg = JSON.stringify({"method": "set_pin_mode", "params": [this._pinNumAnalogInput, pinMode]});
            //    console.log(msg);
            //    this._pinMode = pinMode;
            //    this._parent._sendmessage(msg);
            //}
            else {
                if (pinMode == inputMode) {
                    this.digitalWrite("0"); //disable the internal pull-up
                }
                var msg = JSON.stringify({"method": "set_pin_mode", "params": [this._pinNum, pinMode]});
                console.log(msg);
                this._pinMode = pinMode;
                this._parent._sendmessage(msg);
            }
        }
    }
    
    /**
     * Update the Wildcards pin mode by setting it again. Can be used to recover from a disconnect, for example. For ANALOG and INPUT, this forces Firmata to send the current analog measurement now.
     */
    refreshPinMode () {
        if (this._pinMode == servoMode) {
            this.configureServo(this._min_pulse, this._max_pulse);
        }
        else {
            var msg = JSON.stringify({"method": "set_pin_mode", "params": [this._pinNum, this._pinMode]});
            console.log(msg);
            this._pinMode = this._pinMode;
            this._parent._sendmessage(msg);
        }
    }
    
    /**
     * Configure a Wildcards connector for a servo
     * Pymata uses this instead of set_pin_mode for servos
     * @param {int} min_pulse - the min pulse setting for the servo, default to 600, as this is tested at the factory (note: was 544)
     * @param {int} max_pulse - the max pulse setting for the servo, default to 2400
     */
    configureServo (min_pulse = 600, max_pulse = 2400) {
        this._min_pulse = min_pulse;
        this._max_pulse = max_pulse;
        var msg = JSON.stringify({"method": "servo_config", "params": [this._pinNum, min_pulse, max_pulse]});
        console.log(msg);
        this._pinMode = servoMode;
        this._parent._sendmessage(msg);
    }
    
    /**
     * Force a reading of the Wildcards digital Pin state
     */
    digitalRead () {
        var msg = JSON.stringify({"method": "digital_read", "params": [this._pinNum]});
        console.log(msg);
        this._parent._sendmessage(msg);
    }
    
    /**
     * Set the Wildcards pin high or low.
     * @param {number} highlow - write high = 1 or low = 0 to pin
     */
    digitalWrite (highlow) {
        var msg = JSON.stringify({"method": "digital_pin_write", "params": [this._pinNum, highlow]});
        console.log(msg);
        this._parent._sendmessage(msg);
    }
    
    /**
     * Write and analog (PWM) value to a pin
     * @param {number} value - PWM duty cycle to write to pin 0 -255 TODO: verify this
     */
    analogWrite (value) {
        var msg = JSON.stringify({"method": "analog_write", "params": [this._pinNum, value]});
        console.log(msg);
        this._parent._sendmessage(msg);
    }
    
    /**
     * Read analog value from pin2 aka analog input
     */
    analogRead () {
        var msg = JSON.stringify({"method": "analog_read", "params": [this._pinNumAnalogInput]});
        console.log(msg);
        this._parent._sendmessage(msg);
    }
    
    
    /**
     * Play a tone on a pin
     * @param {number} tone_command - either "TONE_TONE" to play, "TONE_NO_TONE" to stop playing.
     * @param {number} frequency - Tone frequency in Hz
     * @param {number} duration - Tone duration in ms
     */
    playTone (tone_command, frequency, duration) {
        var msg = JSON.stringify({"method": "play_tone", "params": [this._pinNum, tone_command, frequency, duration]});
        console.log(msg);
        this._parent._sendmessage(msg);
    }
    
    /**
     * Read an analog value from a pymata, retransmit to wildmodules.
     * @param {number} value - analog value of the pin to read TODO: add range/mapping in
     */
    analog_message_reply (value) {
        this._state = value;
        ////////////////////////////////////////////////////////////Why was this commented out?
        //this._parent.wildModule().analog_message_reply(this._pinNum, value);
    }
    
    /**
     * Read an digital value from a pymata, retransmit to wildmodules.
     * @param {number} value - state of pin, 1 = high 0 = low
     */
    digital_message_reply (value) {
        this._state = value;
        ////////////////////////////////////////////////////////////Why was this commented out?
        //this._parent.wildModule().digital_message_reply(this._pinNum, value);
    }
    
}


/**
 * Object representing a Button on a Wildcards board
 */
class WildButton {
    /**
     * Set up a WildButton object
     * @param {wcButton} BUTTON_ID - the ID of this button
     * @param {int} pinNum - the Arduino-equivalent pin number
     */
    constructor(parent, BUTTON_ID, pinNum) {
        this._parent = parent;
        this._button = BUTTON_ID;
        this._connector = wcConnector.Onboard;
        this._pin = new WildcardsPin(this, pinNum);
        this._wildModule = new WildModule(this._connector);
        //this._pin.state = 1
        this._pin.digitalRead();
    }
    
    get button () {
        return this._button;
    }
    
    get pin () {
        return this._pin;
    }
    
    get ispressed () {
        return (this._pin.state == 0) ? true : false;      //button state = 0 means button is pressed
    }
    
    /**
     * Set the WildButton (pin) value
     * @param {int} value - the value to set the pin
     */
    set state (value) {
        this._pin.state = value;
    }
    
    /**
     * Get the WildButton (pin) value
     * @return {int} value - the value the pin is set to
     */
    get state () {
        return this._pin.state;
    }
    
    
    _sendmessage (message) {
        this._parent._sendmessage(message);
    }
    
}


/**
 * Object representing a LED on a Wildcards board
 */
class WildLED {
    /**
     * Set up a WildLED object
     * @param {wcLED} LED_ID - the ID of this LED
     * @param {int} pinNum - the Arduino-equivalent pin number
     */
    constructor(parent, LED_ID, pinNum) {
        this._parent = parent;
        this._led = LED_ID;
        this._connector = wcConnector.Onboard;
        this._pin = new WildcardsPin(this, pinNum);
        this._wildModule = new WildModule(this._connector);
    }
    
    get led () {
        return this._led;
    }
    
    get pin () {
        return this._pin;
    }
    
    get isOn () {
        return (this._pin.state == 0) ? false : true;      //LED state = 1 means LED is on
    }
    
    get isOff () {
        return (this._pin.state == 0) ? true : false;
    }
    
    
    /**
     * Set the value of this WildLED object
     * @param {wcOnOff} onoff - whether or not to turn on this LED
     */
    setLED (onoff) {
        this._pin.state = (onoff == wcOnOff.ON) ? 1 : 0;
        this._pin.digitalWrite(this._pin.state);
    }
    
    setLEDpwm (value) {
        this._pin.state = value;
        this._pin.analogWrite(value);
    }
    /**
     * Set the WildLED (pin) value
     * @param {int} value - the value to set the pin
     */
    set state (value) {
        this._pin.state = value;
    }
    
    /**
     * Get the WildLED (pin) value
     * @return {int} value - the value the pin is set to
     */
    get state () {
        return this._pin.state;
    }
    
    
    _sendmessage (message) {
        this._parent._sendmessage(message);
    }
    
}



/**
 * Object representing a connector, consisting of two WildModulePins and a WildModule (and a wcConnector identifying which connector this is )
 */
class WildConnector {
    /**
     * Set up a WildConnector object
     * @param {Wildcards} parent - the Wildcards board that is the parent of this connector
     * @param {wcConnector} connector - the connector ID to use for this connector
     * @param {int} pin1 - the Arduino digital pin number associated with Wildcards pin1 of this connector
     * @param {int} pin2 - the Arduino digital pin number associated with Wildcards pin2 of this connector
     */
    constructor(parent, connector, pin1, pin2) {
        this._parent = parent;
        this._connector = connector;
        //thisWildConnector = this;   //JS isnt liking this for some reason.   DH --not sure why you'd need to do this
        //because anywhere you could reference thisWildConnector, you can just reference "this". Also, thisWildConnector would
        //only exist in the function scope, so once you leave the constructor, you won't be able to find thisWildConnector anymore.
        this._pin1 = new WildcardsPin(this, pin1, wcPin.pin1);
        this._pin2 = new WildcardsPin(this, pin2, wcPin.pin2);
        this._wildModule = new WildModule(this._connector);
    }
    
    get connector () {
        return this._connector;
    }
    
    get pin1 () {
        return this._pin1;
    }
    
    get pin2 () {
        return this._pin2;
    }
    
    /**
     * Returns the WildcardsPin object for the specified wcPin
     * @param {wcPin} pinnum - the pin identifier for the pin being sought
     * @return {WildcardsPin} - the WildcardsPin object being sought
     */
    getPin (pinnum) {
        return (pinnum == wcPin.pin1) ? this._pin1 : this._pin2;
    }
    
    get wildModule () {
        return this._wildModule;
    }
    
    set wildModule (newModule) {
        this._wildModule = newModule;
    }
    
    _sendmessage (message) {
        
        this._parent._sendmessage(message);
        
    }
    
    
}

/**
 * An empty class to be extended for any WildModule, particularly for receiving information from PyMata.
 * This class resolves function calls to all functions that could be called on a WildModule
 * For any given module, simply extend this class and implement desired functionality in the functions
 * The WildModule object represents anything that can be plugged into the Wildcards board
 */
class WildModule {
    /**
     * Construct WildModule object as child of a WildConnector.
     * References to pins are available from this._connector._pin1 and this._connector._pin2
     * @param {WildConnector} connector
     */
    constructor(connector) {
        this._connector = connector
    }
    
    get connector () {
        return this._connector;
    }
    
    analog_message_reply(wcPinNum, value) {
        //handle module-level effects of this event here (if any). Will be called by the pin-level implementation.
    }
    
    digital_message_reply(wcPinNum, value) {
        //handle module-level effects of this event here (if any). Will be called by the pin-level implementation.
    }
    
    i2c_read_data_reply(value) {
        //i2c data only has effects at the module level, this will be called directly when the event occurs
    }
}

class ServoModule extends WildModule {
    constructor(connector) {
        super(connector);
    }
}

class ButtonModule extends WildModule {
    constructor(connector) {
        super(connector);
    }
    
    digital_message_reply(wcPinNum, value) {
        //handle module-level effects of this event here (if any). Will be called by the pin-level implementation.
    }
}

class TemperatureModule extends WildModule {
    constructor(connector) {
        super(connector);
        _temperature = 0;
    }
    
    i2c_read_data_reply(value) {
        //not sure how the temperature data shows up, or even if this is the right event. this is just a placeholder exaple of a module-level response
        _temperature = value
    }
}


class KnobModule extends WildModule {
    constructor(connector) {
        super(connector);
    }
    //I think all analog input  will need to exist at the module level, if we are to
    //allow use of either analog input on Connector B. This module will serve the purpose of deciding which of
    //the two pins is the real/changing/dynamic analog input and point to the correct pin.
    //Basically, we look at the default ADC input pin level; if they're both there, it doesn't matter
    //but if one is ever NOT the default value, it will be the presumed analog input.
    //Note that something that actually uses two analog inputs (e.g. the joystick module) will have a
    //different module implementation wherein both are used.
}

/**
 * Manage communication with a Wildcards device over a Device Manager client socket.
 */
class Wildcards {
    
    /**
     * @return {string} - the type of Device Manager device socket that this class will handle.
     */
    static get DEVICE_TYPE () {
        return 'wildcards';
    }
    
    /**
     * Construct a Wildcards communication object.
     * @param {Socket} socket - the socket for a Wildcards device, as provided by a Device Manager client.
     */
    constructor (socket) {
        /**
         * The socket-IO socket used to communicate with the Device Manager about this device.
         * @type {Socket}
         * @private
         */
        this._socket = socket;
        
        // Connection closed listener
        this._socket.addEventListener('close', function (event) {
                                      Swal.fire({
                                                title: '<b>Wildcards Link disconnected! </b>',
                                                html:
                                                'Save your work. Re-Launch Wildcards Link. Reload the page.',
                                                type: 'warning',
                                                confirmButtonText: 'Ok',
                                                allowOutsideClick: false,
                                                
                                                });
                                      });
        
        //***** Create all the WC Pins ******//
        console.log("creating wildcards pins")
        /*
         // On board pins for buttons
         this._button1 = new WildcardsPin(this, 4);
         this._button2 = new WildcardsPin(this, 16);
         
         // On board pins for LEDs
         this._led1 = new WildcardsPin(this, 6);
         this._led2 = new WildcardsPin(this, 7);
         this._led3 = new WildcardsPin(this, 8);
         this._led4 = new WildcardsPin(this, 9);
         */
        
        //these two don't represent any real wildmodule or wildconnector, it merely exists at the board level so calls to connector.wildmodule.etc... from the pin level have a place to go
        //DH 4/17/2018 we may just remove these two lines if we don't access pins directly from this level. WildButton, WildLED, WildConnector, etc. can each route calls to a (dead) wildmodule object
        //this._internal_connector__does_not_exist = new WildConnector(wcConnector.A, 1, 2);
        //this._wildModule = new WildModule(this._internal_connector__does_not_exist);
        
        this._button1 = new WildButton(this, wcButton.B_1, 4);
        this._button2 = new WildButton(this, wcButton.B_2, 16);
        this._button3 = new WildButton(this, wcButton.B_3, 6);
        this._button4 = new WildButton(this, wcButton.B_4, 7);
        
        this._led1 = new WildLED(this, wcLED.LED_1, 11);
        this._led2 = new WildLED(this, wcLED.LED_2, 12);
        this._led3 = new WildLED(this, wcLED.LED_3, 2);
        this._led4 = new WildLED(this, wcLED.LED_4, 8);
        
        
        //Map Arduino digital pins to connectors
        this._connectorA = new WildConnector(this, wcConnector.A, 9, 17);
        this._connectorB = new WildConnector(this, wcConnector.B, 19, 18);
        this._connectorC = new WildConnector(this, wcConnector.C, 5, 14);
        this._connectorD = new WildConnector(this, wcConnector.D, 10, 15);
        
        this._onboardbuzzer = new WildConnector(this, wcConnector.Onboard, 3, 3);  //2nd pin won't be used, can be anything
        
        this._socket.onmessage = function (message) {
            console.log('got message' + message.data);
            console.log(message.data);
            var msg = JSON.parse(message.data);
            var method = msg["method"];
            console.log(method);
            var params = msg["params"];
            console.log(params);
            
            switch (method) {
                case "analog_message_reply":
                {
                    //console.log('analog');
                    var pin = params[0];
                    ////console.log(a)
                    var out = params[1];
                    //console.log("out: " + out);
                    switch (pin) {
                        case 0:  //ADC0 maps to Arduino pin 14, and Wildcards connector C pin 2
                            this._connectorC.pin2.analog_message_reply(out);
                            break;
                        case 1:  //ADC1 maps to Arduino pin 15, and Wildcards connector D pin 2
                            this._connectorD.pin2.analog_message_reply(out);
                            break;
                        case 2:  //ADC2 maps to Arduino pin 16
                            //this analog input is not connected for Wildcards
                            break;
                        case 3:  //ADC3 maps to Arduino pin 17, and Wildcards connector A pin 2
                            this._connectorA.pin2.analog_message_reply(out);
                            break;
                        case 4:  //ADC4 maps to Arduino pin 18, and Wildcards connector B pin 2
                            this._connectorB.pin2.analog_message_reply(out);
                            break;
                        case 5:  //ADC5 maps to Arduino pin 19, and Wildcards connector B pin 1
                            this._connectorB.pin1.analog_message_reply(out);
                            break;
                        default:
                            console.log("unknown analog pin")
                    }
                    break;
                }
                    
                case "digital_message_reply":
                {
                    console.log('digital message');
                    
                    pin = params[0];
                    out = params[1];
                    console.log('digital message');
                    console.log('pin: ' + pin);
                    console.log('value =' + out);
                    switch (pin) {
                            
                        case 2:  //maps to Arduino pin 2
                            //this digital input is not connected for Wildcards
                            break;
                        case 3:  //maps to Arduino pin 3, and Wildcards connector A pin 1
                            
                            //this._pin3.state = out;
                            break;
                        case 4:  //maps to Arduino pin 4, and Wildcards button1
                            //    document.getElementById("ip4").value = out;
                            this._button1.pin.state = out;
                            break;
                        case 5:  //maps to Arduino pin 5, and Wildcards connector C pin 1
                            this._connectorC._pin1.digital_message_reply(out);
                            //    document.getElementById("ip11").value = out;
                            //this._pin5.state = out;
                            break;
                        case 6:  //maps to Arduino pin 6, and Wildcards button3
                            this._button3.pin.state = out;
                            //    document.getElementById("ip6").value = out;
                            break;
                        case 7:  //maps to Arduino pin 7, and Wildcards button4
                            this._button4.pin.state = out;
                            //    document.getElementById("ip7").value = out;
                            break;
                        case 8:  //maps to Arduino pin 8
                            //    document.getElementById("ip8").value = out;
                            break;
                        case 9:  //maps to Arduino pin 9
                            this._connectorA._pin1.digital_message_reply(out);
                            //    document.getElementById("ip9").value = out;
                            break;
                        case 10:  //maps to Arduino pin 10, and Wildcards connector D pin 1
                            this._connectorD._pin1.digital_message_reply(out);
                            //    document.getElementById("ip11").value = out;
                            //this._pin10.state = out;
                            break;
                        case 11:  //maps to Arduino pin 11
                            //    document.getElementById("ip11").value = out;
                            break;
                        case 12:  //maps to Arduino pin 12
                            //    document.getElementById("ip12").value = out;
                            break;
                        case 13:  //maps to Arduino pin 13
                            //    document.getElementById("ip13").value = out;
                            break;
                        case 14:  //maps to Arduino pin 14, and Wildcards connector C pin 2
                            this._connectorC._pin2.digital_message_reply(out);
                            //    document.getElementById("ip14").value = out;
                            break;
                        case 15:  //maps to Arduino pin 15, and Wildcards connector D pin 2
                            this._connectorD._pin2.digital_message_reply(out);
                            //    document.getElementById("ip15").value = out;
                            break;
                        case 16:  //maps to Arduino pin 16, and Wildcards button2
                            this._button2.pin.state = out;
                            //    document.getElementById("ip16").value = out;
                            break;
                        case 17:  //maps to Arduino pin 17, and Wildcards connector A pin 2
                            this._connectorA._pin2.digital_message_reply(out);
                            //    document.getElementById("ip17").value = out;
                            break;
                        case 18:  //maps to Arduino pin 18, and Wildcards connector B pin 2
                            this._connectorB._pin2.digital_message_reply(out);
                            //    document.getElementById("ip18").value = out;
                            break;
                        case 19:  //maps to Arduino pin 19, and Wildcards connector B pin 1
                            this._connectorB._pin1.digital_message_reply(out);
                            //    document.getElementById("ip19").value = out;
                            break;
                        default:
                            //alert("Unknown digital pin " + pin);
                            console.log('unknown digital pin: ' + pin);
                    }
                }
                    break;
                case "i2c_read_request_reply":
                    console.log('i2c_request_result' + params);
                    /**
                     TemperatureSum = (params[1] << 8 | params[2]) >> 4
                     
                     celsius = TemperatureSum * 0.0625
                     console.log(celsius)
                     
                     fahrenheit = (1.8 * celsius) + 32
                     console.log(fahrenheit)
                     document.getElementById("i2cRequestResult").value = params
                     document.getElementById("i2cRequestResultf").value = fahrenheit
                     document.getElementById("i2cRequestResultc").value = celsius
                     **/
                    break;
                    
                case "i2c_read_data_reply":
                    console.log('i2c_read_result');
                    console.log(params);
                    //    document.getElementById("i2cReadResult").value = params
                    break;
                    
                case "encoder_data_reply":
                    console.log('received encoder data');
                    console.log(params);
                    //document.getElementById("encoderValue").value = params[1];
                    break;
                case "encoder_read_reply":
                    console.log('encoder_read_reply  ' + params);
                    //document.getElementById("encoderValue2").value = params[1];
                    break;
                case "sonar_data_reply":
                    console.log('received sonar data');
                    console.log(params[1]);
                    //document.getElementById("sonarValue").value = params[1];
                    break;
                case "sonar_read_reply":
                    console.log('sonar_read_reply  ' + params);
                    //document.getElementById("sonarValue2").value = params[1];
                    break;
                case "analog_map_reply":
                case "capability_report_reply":
                case "firmware_version_reply":
                case "protocol_version_reply":
                case "pymata_version_reply":
                case "pin_state_reply":
                    console.log(params);
                    //document.getElementById("reports").value = params;
                    break;
                case "digital_latch_data_reply":
                    //console.log('digital_latch_callback');
                    /**
                     pin = params[0].slice(1);
                     var id = 'dlevent' + pin;
                     **/
                    
                    //console.log(id)
                    
                    /**
                     document.getElementById(id).value = params;
                     id = 'dlatch' + pin;
                     **/
                    console.log('al: ' + id);
                    //console.log(document.getElementyById(id).value);
                    //document.getElementyById(id).value = '1';
                    //    document.getElementById(id).selectedIndex = "0";
                    
                    //console.log(message.data);
                    
                    break;
                case "analog_latch_data_reply":
                    //console.log('analog_latch_callback');
                    //    pin = params[0].slice(1);
                    //    id = 'alevent' + pin;
                    //console.log(id);
                    
                    //    document.getElementById(id).value = params;
                    //    id = 'alatch' + pin;
                    console.log('al: ' + id);
                    //console.log(document.getElementyById(id).value);
                    //document.getElementyById(id).value = '1';
                    //    document.getElementById(id).selectedIndex = "0";
                    break;
                    
                case "digital_read_reply":
                    //    document.getElementById('ddata').value = params[1];
                    break;
                    
                case "analog_read_reply":
                    //    document.getElementById('adata').value = params[1];
                    break;
                case "get_digital_latch_data_reply":
                    console.log(params);
                    /**
                     if (params[1] == null) {
                     document.getElementById('dlatchdata').value = "No Latch Set"
                     }
                     else {
                     
                     document.getElementById('dlatchdata').value = params[1]
                     }
                     break;
                     **/
                case "get_analog_latch_data_reply":
                    console.log('get_analog_latch_data_reply' + params);
                    /**
                     if (params[1] == null) {
                     document.getElementById('alatchdata').value = "No Latch Set"
                     }
                     else {
                     
                     document.getElementById('alatchdata').value = params[1]
                     }
                     break;
                     **/
                default:
                    break;
            }
            //document.getElementById("ain").value = out;
        }.bind(this);     //ensures that "this" points to the device object within the onmessage function
        
        
        
        this._socket.onopen = function (event) {
            console.log('PyMata IoT Has Successfully Connected');
            
        };
        
        this._socket.onclose = function (event) {
            console.log("The socket has closed!");
        };
        
        // Set pin modes for static board level buttons and LEDS
        
        this._button1.pin.setPinMode(inputMode);
        this._button1.pin.refreshPinMode();
        this._button2.pin.setPinMode(inputMode);
        this._button2.pin.refreshPinMode();
        this._button3.pin.setPinMode(inputMode);
        this._button3.pin.refreshPinMode();
        this._button4.pin.setPinMode(inputMode);
        this._button4.pin.refreshPinMode();
        this._led1.pin.setPinMode(outputMode);
        this._led2.pin.setPinMode(outputMode);
        this._led3.pin.setPinMode(outputMode);
        this._led4.pin.setPinMode(outputMode);
        
        this._onSensorChanged = this._onSensorChanged.bind(this);
        //this._onDisconnect = this._onDisconnect.bind(this);
        
        //this._connectEvents();
    }
    
    /**
     * Manually dispose of this object.
     */
    dispose () {
        this._disconnectEvents();
    }
    
    /**
     * Return the specified WildConnector object for this Wildcards device
     * @param {wcConnector} CONNECTOR_ID - ID of the WildConnector that is being sought.
     * @return {WildConnector} - The WildConnector object being sought.
     */
    getConnector (CONNECTOR_ID) {
        switch (CONNECTOR_ID) {
            case wcConnector.A:
                return this._connectorA;
                break;
            case wcConnector.B:
                return this._connectorB;
                break;
            case wcConnector.C:
                return this._connectorC;
                break;
            case wcConnector.D:
                return this._connectorD;
                break;
            case wcConnector.Onboard:
                return this._onboardbuzzer;
                break;
            default:
                //do nothing
        }
    }
    
    
    
    /**
     * Return the specified Button object for this Wildcards device
     * @param {wcButton} BUTTON_ID - ID of the WildButton that is being sought.
     * @return {WildButton} - The WildButton object being sought.
     */
    getButton (BUTTON_ID) {
        switch (BUTTON_ID) {
            case wcButton.B_1:
                return this._button1;
                break;
            case wcButton.B_2:
                return this._button2;
                break;
            case wcButton.B_3:
                return this._button3;
                break;
            case wcButton.B_4:
                return this._button4;
            default:
                //do nothing
        }
    }
    
    
    /**
     * Return the specified WildLED object for this Wildcards device
     * @param {wcLED} LED_ID - ID of the WildLED that is being sought.
     * @return {WildLED} - The WildLED object being sought.
     */
    getLED (LED_ID) {
        switch (LED_ID) {
            case wcLED.LED_1:
                return this._led1;
                break;
            case wcLED.LED_2:
                return this._led2;
                break;
            case wcLED.LED_3:
                return this._led3;
                break;
            case wcLED.LED_4:
                return this._led4;
                break;
            default:
                //do nothing
        }
    }
    
    /**
     * Attach event handlers to the device socket.
     * @private
     */
    _connectEvents () {
        //     this._socket.on('sensorChanged', this._onSensorChanged);
        //     this._socket.on('deviceWasClosed', this._onDisconnect);
        //     this._socket.on('disconnect', this._onDisconnect);
        
        
        
    }
    
    /**
     * Detach event handlers from the device connect
     * @private
     */
    _disconnectEvents () {
        //     this._socket.off('sensorChanged', this._onSensorChanged);
        //     this._socket.off('deviceWasClosed', this._onDisconnect);
        //     this._socket.off('disconnect', this._onDisconnect);
    }
    
    /**
     * Store the sensor value from an incoming 'sensorChanged' event.
     * @param {object} event - the 'sensorChanged' event.
     * @property {string} sensorName - the name of the sensor which changed.
     * @property {number} sensorValue - the new value of the sensor.
     * @private
     */
    _onSensorChanged (event) {
        this._sensors[event.sensorName] = event.sensorValue;
    }
    
    /**
     * React to device disconnection. May be called more than once.
     * @private
     */
    _onDisconnect () {
        this._disconnectEvents();
    }
    
    /**
     * Send a message to the device socket.
     * @param {string} message - the name of the message, such as 'playTone'.
     * @param {object} [details] - optional additional details for the message.
     * @private
     */
    _send (message, details) {
        this._socket.emit(message, details);
    }
    
    /**
     * Send a message to the device socket. The message will be sent as a "message" event
     * @param {object} [message] - the message to be sent
     * @private
     */
    _sendmessage (message) {
        
        this._socket.send(message);
        
    }
}

/**
 * Scratch 3.0 blocks to interact with a Wildcards device.
 */
class Scratch3WildcardsBlocks {
    
    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'wildcards';
    }
    
    /**
     * Construct a set of WildCard blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;
        
        //this.deviceManager = new DeviceManager();
        //this.connect();
        console.log("creating wildcards device")
        socketconnect().then((socket) => {this._device = new Wildcards(socket);});
    }
    
    
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
        id: Scratch3WildcardsBlocks.EXTENSION_ID,
        name: 'Wildcards',
        blockIconURI: blockIconURI,
        blocks: [
                 {
                 opcode: 'isButtonPressedReleased',
                 text: '[BUTTON_ID] [PRESSED_RELEASED]',
                 blockType: BlockType.BOOLEAN,
                 arguments: {
                 BUTTON_ID: {
                 type: ArgumentType.STRING,
                 menu: 'buttonSelect',
                 defaultValue: wcButton.B_1
                 },
                 PRESSED_RELEASED: {
                 type: ArgumentType.STRING,
                 menu: 'pressedReleased',
                 defaultValue: 'pressed'
                 }
                 }
                 },
                 {
                 opcode: 'whenButtonPressedReleased',
                 text: 'when [BUTTON_ID] [PRESSED_RELEASED]',
                 blockType: BlockType.HAT,
                 arguments: {
                 BUTTON_ID: {
                 type: ArgumentType.STRING,
                 menu: 'buttonSelect',
                 defaultValue: wcButton.B_1
                 },
                 PRESSED_RELEASED: {
                 type: ArgumentType.STRING,
                 menu: 'pressedReleased',
                 defaultValue: 'pressed'
                 }
                 }
                 },
                 {
                 opcode: 'ledOnOff',
                 text: 'turn [LED_ID] [ON_OFF]',
                 blockType: BlockType.COMMAND,
                 arguments: {
                 LED_ID: {
                 type: ArgumentType.STRING,
                 menu: 'ledSelect',
                 defaultValue: wcLED.LED_1
                 },
                 ON_OFF: {
                 type: ArgumentType.STRING,
                 menu: 'onOff',
                 defaultValue: 'On'
                 }
                 }
                 },
                 //{
                 //opcode: 'setLED1Brightness',
                 //text: 'set LED1 to [PERCENTAGE]%',
                 //blockType: BlockType.COMMAND,
                 //arguments: {
                 //PERCENTAGE: {
                 //type: ArgumentType.NUMBER,
                 //defaultValue: 50
                 //}
                 //}
                 //},
                 {
                 opcode: 'isDigitalHigh',
                 text: '[DIGITAL_SENSOR]: [CONNECTOR_ID]',
                 blockType: BlockType.BOOLEAN,
                 arguments: {
                 DIGITAL_SENSOR: {
                 type: ArgumentType.STRING,
                 menu: 'sensorSelect',
                 defaultValue: wcSensor.LIGHT
                 },
                 CONNECTOR_ID: {
                 type: ArgumentType.STRING,
                 menu: 'connectorSelect',
                 defaultValue: wcConnector.A
                 }
                 }
                 },
                 {
                 opcode: 'whenDigitalHigh',
                 text: 'when [DIGITAL_SENSOR]: [CONNECTOR_ID]',
                 blockType: BlockType.HAT,
                 arguments: {
                 DIGITAL_SENSOR: {
                 type: ArgumentType.STRING,
                 menu: 'sensorSelect',
                 defaultValue: wcSensor.LIGHT
                 },
                 CONNECTOR_ID: {
                 type: ArgumentType.STRING,
                 menu: 'pwm_connectorSelect',
                 defaultValue: wcConnector.A
                 }
                 }
                 },
                 {
                 opcode: 'setServoPosition',
                 text: 'set servo to [PERCENTAGE]%: [CONNECTOR_ID]',
                 blockType: BlockType.COMMAND,
                 arguments: {
                 CONNECTOR_ID: {
                 type: ArgumentType.STRING,
                 menu: 'connectorSelect',
                 defaultValue: wcConnector.A
                 },
                 PERCENTAGE: {
                 type: ArgumentType.NUMBER,
                 defaultValue: 50
                 }
                 }
                 },
                 {
                 opcode: 'vibrateOnOff',
                 text: 'set vibration [CONNECTOR_ID] [ON_OFF]',
                 blockType: BlockType.COMMAND,
                 arguments: {
                 CONNECTOR_ID: {
                 type: ArgumentType.STRING,
                 menu: 'connectorSelect',
                 defaultValue: wcConnector.A
                 },
                 ON_OFF: {
                 type: ArgumentType.STRING,
                 menu: 'onOff',
                 defaultValue: 'On'
                 }
                 }
                 },
                 {
                 opcode: 'buzzerOnOff',
                 text: 'buzz at [FREQUENCY]Hz for [DURATION]ms',
                 //text: '[CONNECTOR_ID] buzz at [FREQUENCY]Hz for [DURATION]ms',
                 blockType: BlockType.COMMAND,
                 arguments: {
            /*                         CONNECTOR_ID: {
             type: ArgumentType.STRING,
             menu: 'connectorOrOnboardSelect',
             defaultValue: wcConnector.Onboard
             }, */
                 FREQUENCY: {
                 type: ArgumentType.NUMBER,
                 defaultValue: 440
                 },
                 DURATION: {
                 type: ArgumentType.NUMBER,
                 defaultValue: 300
                 }
                 }
                 },
                 {
                 opcode: 'getKnobPosition',
                 text: 'knob position: [CONNECTOR_ID]',
                 blockType: BlockType.REPORTER,
                 arguments: {
                 CONNECTOR_ID: {
                 type: ArgumentType.STRING,
                 menu: 'connectorSelect',
                 defaultValue: wcConnector.A
                 }
                 }
                 }//,
                 //{
                 //    opcode: 'getTemperature',
                 //    text: 'temperature: [CONNECTOR_ID] [TEMP_TYPE]',
                 //    blockType: BlockType.REPORTER,
                 //    arguments: {
                 //        CONNECTOR_ID: {
                 //            type: ArgumentType.STRING,
                 //            menu: 'connectorSelect',
                 //            defaultValue: wcConnector.A
                 //        },
                 //        TEMP_TYPE: {
                 //            type: ArgumentType.STRING,
                 //            menu: 'tempSelect',
                 //            defaultValue: "Fahrenheit"
                 //        }
                 //    }
                 //}
                 ],
        menus: {
        buttonSelect:
            [wcButton.B_1, wcButton.B_2, wcButton.B_3, wcButton.B_4],
        ledSelect:
            [wcLED.LED_1, wcLED.LED_2, wcLED.LED_3, wcLED.LED_4],
        sensorSelect:
            [wcSensor.LIGHT, wcSensor.SOUND, wcSensor.TOUCH, wcSensor.BUTTON],
        connectorSelect:
            [wcConnector.A, wcConnector.B, wcConnector.C, wcConnector.D],
        connectorOrOnboardSelect:
            [wcConnector.Onboard, wcConnector.A, wcConnector.B, wcConnector.C, wcConnector.D],
        pwm_connectorSelect:
            [wcConnector.A, wcConnector.C, wcConnector.D],
        i2c_connectorSelect:
            [wcConnector.B],
        onOff:
            [wcOnOff.ON, wcOnOff.OFF],
        pressedReleased:
            [wcPressedReleased.PRESSED, wcPressedReleased.RELEASED],
        tempSelect:
            ["Celsius", "Fahrenheit"],
        }
        };
    }
    
    
    /**
     * Use the Device Manager client to attempt to connect to a Wildcards board.
     */
    connect () {
        console.log("trying connect")
        if (this._device || this._finder) {
            return;
        }
        console.log("creating wildcards device")
        this._device = new Wildcards(tempsocket);
        //TODO:    Get DeviceManager stuff working
        
        // const deviceManager = this.deviceManager;
        // deviceManager._serverURL = "ws://localhost:9000";
        // const finder = this._finder =
        //     deviceManager.searchAndConnect(Scratch3WildcardsBlocks.EXTENSION_ID, "");
        // /*
        // *    const finder = this._finder =
        // *    deviceManager.searchAndConnect(Scratch3WildcardsBlocks.EXTENSION_ID, Wildcards.DEVICE_TYPE);
        // */
        // this._finder.promise.then(
        //     socket => {
        //         if (this._finder === finder) {
        //             this._finder = null;
        //             this._device = new Wildcards(socket);
        //         } else {
        //             log.warn('Ignoring success from stale Wildcards connection attempt');
        //         }
        //     },
        //     reason => {
        //         if (this._finder === finder) {
        //             this._finder = null;
        //             log.warn(`Wildcards connection failed: ${reason}`);
        //         } else {
        //             log.warn('Ignoring failure from stale Wildcards connection attempt');
        //         }
        //     }
        // );
    }
    
    /**
     * Test whether a button is currently pressed.
     * @param {object} args - the block's arguments.
     * @property {wcButton} BUTTON_ID - the button to test (button 1 or button2).
     * @property {string} PRESSED_RELEASED - the state of the button to check for (pressed or released).
     * @return {boolean} - true if the specified button is pressed.
     */
    isButtonPressedReleased (args) {
        return this._isButtonPressedReleased(args.BUTTON_ID, args.PRESSED_RELEASED);
    }
    
    /**
     * Test whether a button is currently pressed.
     * @param {object} args - the block's arguments.
     * @property {wcButton} BUTTON_ID - the button to test (button 1 or button2).
     * @property {string} PRESSED_RELEASED - the state of the button to check for (pressed or released).
     * @return {boolean} - true if the specified button is pressed.
     */
    whenButtonPressedReleased (args) {
        return this._isButtonPressedReleased(args.BUTTON_ID, args.PRESSED_RELEASED);
    }
    
    /**
     * Test whether a button is currently pressed.
     * @property {wcButton} BUTTON_ID - the button to test (button 1 or button2).
     * @property {string} PRESSED_RELEASED - the state of the button to check for (pressed or released).
     * @return {boolean} - true if the specified button is pressed.
     * @private
     */
    _isButtonPressedReleased (button_id, pressedreleased) {
        switch (pressedreleased) {
            case 'pressed':
                return ((this._device.getButton(button_id).state == '0') ? 1 : 0);
                break;
            case 'released':
                return ((this._device.getButton(button_id).state == '1') ? 1 : 0);
        };
    }
    
    /**
     * Test whether a light sensor is asserted.
     * @param {object} args - the block's arguments.
     * @property {wcConnector} CONNECTOR_ID - the connector to test.
     * @return {boolean} - true if sensor value is true.
     */
    isDigitalHigh (args) {
        var sensor = args.DIGITAL_SENSOR;   //this isnt used now other than to provide a means to track what is on each connector from the user's standpoint
        var pin = this._device.getConnector(args.CONNECTOR_ID).getPin(wcPin.pin1);
        pin.setPinMode(inputMode);
        return ((pin.state == '1') ? 1 : 0);
    }
    
    /**
     * Test whether a light sensor is asserted.
     * @param {object} args - the block's arguments.
     * @property {wcConnector} CONNECTOR_ID - the connector to test.
     * @return {boolean} - true if sensor value is true.
     */
    whenDigitalHigh(args) {
        var sensor = args.DIGITAL_SENSOR;   //this isnt used now other than to provide a means to track what is on each connector from the user's standpoint
        var pin = this._device.getConnector(args.CONNECTOR_ID).getPin(wcPin.pin1)
        pin.setPinMode(inputMode);
        return ((pin.state == '1') ? 1 : 0);
    }
    
    /**
     * Get the temperature readings from an external analog temp sensor.
     * @param {object} args - the block's arguments.
     * @property {wcConnector} CONNECTOR_ID - the connector to test.
     * @property {wcConnector} CONNECTOR_ID - the connector to test.
     */
    getTemperature (args) {
        
        const b_coeff = parseFloat(4275);               // B value of the thermistor
        const series_resistance = parseFloat(100000);            // R0 = 100k
        var resistance = parseFloat(0);
        var steinhart = parseFloat(0);
        
        //Get data from sensor
        var pin = this._device.getConnector(args.CONNECTOR_ID).getPin(wcPin.pin2);
        pin.setPinMode(analogMode);   // Setting to analogMode automatically triggers analog readbacks
        var adc_value = parseFloat(pin.state);
        
        if (adc_value == 0) {
            console.log("Initializing temperature sensor....")     //aka ignore the first reading if it outputs a zero
            return 0;
        }
        else {
            console.log("A: " + adc_value)
            //Convert adc resistance to a temperature readings in Kelvin via Steinhart-Hart Formula
            //1.0/(log(R/R0)/B+1/298.15);
            resistance = (1023.0/adc_value)-1.0;
            resistance = series_resistance / resistance;
            console.log("resistance: " + resistance +" ohms")
            steinhart = (resistance/series_resistance);
            steinhart = Math.log(steinhart);
            steinhart = steinhart / b_coeff;
            steinhart = steinhart + (1/298.15);
            var temperature_k = 1/steinhart;
            var temperature_c = (temperature_k-273.15);
            var temperature_f = temperature_c * 9/5 + 32;
            
            if (args.TEMP_TYPE == "Celsius") {
                console.log(args.TEMP_TYPE + ": " + temperature_c);
                return temperature_c;
            }
            else if (args.TEMP_TYPE == "Fahrenheit") {
                console.log(args.TEMP_TYPE + ": " + temperature_f);
                return temperature_f;
            }
        }
    }
    
    /**
     * Get the position from an external potentiometer aka knob.
     * @param {object} args - the block's arguments.
     * @property {wcConnector} CONNECTOR_ID - the connector the knob is on.
     * @return {number} - number value representing knob position, range: 0-1023
     */
    getKnobPosition(args) {
        var pin = this._device.getConnector(args.CONNECTOR_ID).getPin(wcPin.pin2);
        pin.setPinMode(analogMode);   // Setting to analogMode automatically triggers analog readbacks
        console.log(pin.state*100/1024)
        return pin.state*100/1024;
    }
    /**
     * Set the Wildcards LEDs on or off
     * @param {object} args - the block's arguments.
     * @property {wcConnector} LED_ID- the connector to test.
     * @property {string} ON_OFF - whether to turn the LED on or off.
     */
    ledOnOff (args) {
        var LED = this._device.getLED(args.LED_ID)
        LED.pin.setPinMode(outputMode);
        LED.setLED(args.ON_OFF);
    }
    
    /**
     * Set the connected servo to the specified direction (percentage)
     * @param {object} args - the block's arguments.
     * @property {wcConnector} CONNECTOR_ID- the connector that the servo is connected to.
     * @property {number} PERCENTAGE - the direction to set the servo to.
     */
    setServoPosition (args) {
        const maxpulse = 2400  //maxpulse/minpulse should be changed also in pin.servo_config method
        const minpulse = 600
        var percentage  = parseInt(args.PERCENTAGE) //parse for Int in case leading/trailing space character is present
        var milliseconds = 1500
        
        if (percentage < 0) {
            percentage = 0
        }
        
        if (percentage > 100) {
            percentage = 100
        }
        milliseconds = (percentage/100)*(maxpulse-minpulse)+minpulse
        var pin = this._device.getConnector(args.CONNECTOR_ID).getPin(wcPin.pin1)
        pin.setPinMode(servoMode);
        pin.analogWrite(milliseconds);
    }
    
    /**
     * Set LED1 to a specified brightness (percentage)
     * @param {object} args - the block's arguments.
     * @property {number} PERCENTAGE - the brightness to set LED1.
     */
    setLED1Brightness (args) {
        const maxbright = 255  //maxpulse/minpulse should be changed also in pin.servo_config method
        const minbright = 0
        var percentage  = parseInt(args.PERCENTAGE) //parse for Int in case leading/trailing space character is present
        var pwmValue = 0
        
        
        if (percentage < 0) {
            percentage = 0
        }
        
        if (percentage > 100) {
            percentage = 100
        }
        pwmValue = (percentage/100)*(maxbright-minbright)+minbright
        var pin = this._device.getLED(wcLED.LED_1).pin
        pin.setPinMode(pwmMode);
        pin.analogWrite(pwmValue);
        this._device.getLED(wcLED.LED_1).setLEDpwm(pwmValue);
    }
    
    
    /**
     * Turn a WildModules buzzer on for a specified duration at a specified frequency
     * @param {object} args - the block's arguments.
     * @property {wcConnector} CONNECTOR_ID- the connector that the buzzer is connected to.
     * @property {number} FREQUENCY- the pitch to play the buzzer at in Hz. Valid range is between 31Hz and 16384Hz
     * @property {number} DURATION- how long to play the buzzer in ms. Set to zero to turn off immediately. Maximum recognized value is 16384ms.
     */
    buzzerOnOff (args) {
        //var pin = this._device.getConnector(args.CONNECTOR_ID).getPin(wcPin.pin1)
        var pin = this._device.getConnector(wcConnector.Onboard).getPin(wcPin.pin1)
        pin.setPinMode(toneMode);
        if (args.DURATION <= 0) {
            //shut off the tone
            pin.playTone("TONE_NO_TONE", 0, 0)
        }
        else {
            //play the tone for the specified duration
            pin.playTone("TONE_TONE", args.FREQUENCY, args.DURATION)
        }
    }
    
    
    /**
     * Turn a WildModules vibration motor on or off
     * @param {object} args - the block's arguments.
     * @property {wcConnector} CONNECTOR_ID- the connector that the buzzer is connected to.
     * @property {string} ON_OFF - whether to turn the vibration motor on or off.
     */
    vibrateOnOff (args) {
        var pin = this._device.getConnector(args.CONNECTOR_ID).getPin(wcPin.pin1);
        var onoff = args.ON_OFF;
        pin.setPinMode(outputMode);
        pin.state = (onoff == wcOnOff.ON) ? 1 : 0;
        pin.digitalWrite(pin.state);
    }
}


module.exports = Scratch3WildcardsBlocks;
