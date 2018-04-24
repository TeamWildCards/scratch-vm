const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const color = require('../../util/color');
const log = require('../../util/log');
const DeviceManager = require('../../io/deviceManager');
/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const iconURI = 'data:image/png;base64,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';

//need to map:
//this..button2 = ""????
//from
//Button1Pressed


var inputMode = "0";
var outputMode = "1";
var analogMode = "2";
var pwmMode = "3";
var servoMode = "4";
var i2cMode = '5';  // doesn't serve any purpose other than future use of keeping track of the current pin mode
var noModeSet = "10";  //TODO: investigate pymata/firmata behavior in this mode, although it important to note that we should never send this mode over


/** TODO: Fix this to use DeviceManager/DeviceFinder/DeviceOpener. Need to work on Pymata_aio (pymata_iot)
 *  to add support for both http requests (to provide a list of devices to Scratch) and websockets (for
 *  communications to/from an Arduino-type device like WildCards with Firmata loaded)
 */
const io = require('socket.io-client/dist/socket.io');
// connect to the server
var ipAddress = "localhost";
var ipPort = "9000";


var tempsocket = new WebSocket('ws://' + ipAddress + ':' + ipPort);


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
    B_2: 'Button 2'
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
    NoConnector: "Onboard, no connector"
};
const wcConnector = {
    A: 'Connector A',
    B: 'Connector B',
    C: 'Connector C',
    D: 'Connector D',
    NoConnector: "Onboard, no connector"
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
class WildCardsPin {
  /**
   * Construct a WildCards pin instance.
   * @param {WildConnector} parent - the connector (or WildButton or WildLED) to which this pin belongs
   * @param {int} pinNum - the Arduino-equivalent pin number
   * @param {wcPin} wcpinNum - the WildCards connector pin number (wcPin1 or wcPin2), ignored for non-connector pins like the on board LEDs/Buttons/Buzzer
   */
    constructor (parent, pinNum, wcpinNum = wcPin.pin1) {
        this._parent = parent;
        this._wcpinNum = wcpinNum;
        this._pinNum = pinNum;
        console.log("Created pin " + this._pinNum + " on connector " + this._parent._connector)

        //pinNum is used for Digital Read/Writes and Analog Writes (PWM), but for Analog Reads, a different
        //pin numbering scheme is used (mapping to ADC0, ADC1, etc. for Arduinos)
        switch (pinNum) {
        case 14:  //ADC0 maps to Arduino pin 14, and WildCards connector C pin 2
            this._pinNumAnalogInput = 0;
            break;
        case 15:  //ADC1 maps to Arduino pin 15, and WildCards connector D pin 2
            this._pinNumAnalogInput = 1;
            break;n
        case 16:  //ADC2 maps to Arduino pin 16
            //this analog input is not connected for WildCards
            this._pinNumAnalogInput = 2;
            break;
        case 17:  //ADC3 maps to Arduino pin 17, and WildCards connector A pin 2
            this._pinNumAnalogInput = 3;
            break;
        case 18:  //ADC4 maps to Arduino pin 18, and WildCards connector B pin 2
            this._pinNumAnalogInput = 4;
            break;
        case 19:  //ADC5 maps to Arduino pin 19, and WildCards connector B pin 1
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
     * @param {int} pinMode - sets the mode of the pin (e.g. input, output); for servo, use configureservo function instead
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
            else if (pinMode == analogMode) {
                var msg = JSON.stringify({"method": "set_pin_mode", "params": [this._pinNumAnalogInput, pinMode]});
                console.log(msg);
                this._pinMode = pinMode;
                this._parent._sendmessage(msg);
            }
            else {
                var msg = JSON.stringify({"method": "set_pin_mode", "params": [this._pinNum, pinMode]});
                console.log(msg);
                this._pinMode = pinMode;
                this._parent._sendmessage(msg);
            }
        }
    }

    /**
     * Update the Wildcards pin mode. Can be used to recover from a disconnect, for example.
     */
    refreshPinMode () {
        if (this._pinMode == servoMode) {
            this.onfigureServo(this._min_pulse, this._max_pulse);
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
     * @param {int} min_pulse - the min pulse setting for the servo, default to 4    TODO: make sure this parameter is correct for our servo
     * @param {int} max_pulse - the max pulse setting for the servo, default to 255  TODO: make sure this parameter is correct for our servo
     */
    configureServo (min_pulse = 4, max_pulse = 255) {
        this._min_pulse = min_pulse;
        this._max_pulse = max_pulse;
        var msg = JSON.stringify({"method": "servo_config", "params": [this._pinNum, min_pulse, max_pulse]});
        console.log(msg);
        this._pinMode = servoMode;
        this._parent._sendmessage(msg);
    }

    /**
     * Set the Wildcards pin high or low.
     * @param {number} highlow - write high = 1 or low = 0 to pin
     */
    digitalWrite (highlow) {
        var msg = JSON.stringify({"method": "digital_write", "params": [this._pinNum, highlow]});
        console.log(msg);
        this._parent._sendmessage(msg);
    }

    /**
     * Write and analog (PWM) value to a pin1
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
        this.state = value;
        ////////////////////////////////////////////////////////////Why was this commented out?
        //this._parent.wildModule().digital_message_reply(this._pinNum, value);
    }

    /**
     * Plays a tone of a specified frequecy for a secified amount of time
     * @param {number} tone_command - TONE_TONE to play, TONE_NO_TONE to stop playing.
     * @param {number} frequency - frequency to play in hZ.
     * @param {number} duration - length of time in mS.
     */
    play_tone (tone_command, frequency, duration) {
          var msg = JSON.stringify({"method": "play_tone", "params": [this._pinNum, tone_command, frequency, duration]});
          console.log(msg);
          this._parent._sendmessage(msg);
    }
}


/**
 * Object representing a Button on a WildCards board
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
        this._connector = wcConnector.NoConnector;
        this._pin = new WildCardsPin(this, pinNum);
        this._wildModule = new WildModule(this._connector);
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
        this._pin._state = value;
    }

    /**
     * Get the WildButton (pin) value
     * @return {int} value - the value the pin is set to
     */
    get state () {
        return this._pin._state;
    }


    _sendmessage (message) {
        this._parent._sendmessage(message);
    }

}


/**
 * Object representing a LED on a WildCards board
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
        this._connector = wcConnector.NoConnector;
        this._pin = new WildCardsPin(this, pinNum);
        this._wildModule = new WildModule(this._connector);
    }

    get led () {
        return this._led;
    }

    get pin () {
        return this._pin;
    }

    get isOn () {
        return (this._pin.state == 1) ? true : false;      //LED state = 1 means LED is on
    }

    get isOff () {
        return (this._pin.state == 0) ? true : false;
    }


    /**
     * Set the value of this WildLED object
     * @param {wcOnOff} onoff - whether or not to turn on this LED
     */
    setLED (onoff) {
        this._pin.state = (onoff == wcOnOff.ON) ? this._pin.state = 1 : this._pin.state = 0;
        this._pin.digitalWrite(this._pin.state);
    }
    /**
     * Set the WildLED (pin) value
     * @param {int} value - the value to set the pin
     */
    set state (value) {
        this._pin._state = value;
    }

    /**
     * Get the WildLED (pin) value
     * @return {int} value - the value the pin is set to
     */
    get state () {
        return this._pin._state;
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
     * @param {WildCards} parent - the WildCards board that is the parent of this connector
     * @param {wcConnector} connector - the connector ID to use for this connector
     * @param {int} pin1 - the Arduino digital pin number associated with WildCards pin1 of this connector
     * @param {int} pin2 - the Arduino digital pin number associated with WildCards pin2 of this connector
     */
    constructor(parent, connector, pin1, pin2) {
        this._parent = parent;
        this._connector = connector;
        //thisWildConnector = this;   //JS isnt liking this for some reason.   DH --not sure why you'd need to do this
        //because anywhere you could reference thisWildConnector, you can just reference "this". Also, thisWildConnector would
        //only exist in the function scope, so once you leave the constructor, you won't be able to find thisWildConnector anymore.
        this._pin1 = new WildCardsPin(this, pin1, wcPin.pin1);
        this._pin2 = new WildCardsPin(this, pin2, wcPin.pin2);
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
     * Returns the WildCardsPin object for the specified wcPin
     * @param {wcPin} pinnum - the pin identifier for the pin being sought
     * @return {WildCardsPin} - the WildCardsPin object being sought
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
 * The WildModule object represents anything that can be plugged into the WildCards board
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
 * Manage communication with a WildCards device over a Device Manager client socket.
 */
class WildCards {

    /**
     * @return {string} - the type of Device Manager device socket that this class will handle.
     */
    static get DEVICE_TYPE () {
        return 'wildcards';
    }


    /**
     * Construct a WildCards communication object.
     * @param {Socket} socket - the socket for a Wildcards device, as provided by a Device Manager client.
     */
    constructor (socket) {
        /**
         * The socket-IO socket used to communicate with the Device Manager about this device.
         * @type {Socket}
         * @private
         */
        this._socket = socket;

        //***** Create all the WC Pins ******//
        console.log("creating wildcards pins")
/*
        // On board pins for buttons
        this._button1 = new WildCardsPin(this, 4);
        this._button2 = new WildCardsPin(this, 16);

        // On board pins for LEDs
        this._led1 = new WildCardsPin(this, 6);
        this._led2 = new WildCardsPin(this, 7);
        this._led3 = new WildCardsPin(this, 8);
        this._led4 = new WildCardsPin(this, 9);
 */

        //these two don't represent any real wildmodule or wildconnector, it merely exists at the board level so calls to connector.wildmodule.etc... from the pin level have a place to go
        //DH 4/17/2018 we mayjust remove these two lines if we don't access pins directly from this level. WildButton, WildLED, WildConnector, etc. can each route calls to a (dead) wildmodule object
        //this._internal_connector__does_not_exist = new WildConnector(wcConnector.A, 1, 2);
        //this._wildModule = new WildModule(this._internal_connector__does_not_exist);

        this._button1 = new WildButton(this, wcButton.B_1, 4);
        this._button2 = new WildButton(this, wcButton.B_2, 16);

        this._led1 = new WildLED(this, wcLED.LED_1, 6);
        this._led2 = new WildLED(this, wcLED.LED_2, 7);
        this._led3 = new WildLED(this, wcLED.LED_3, 8);
        this._led4 = new WildLED(this, wcLED.LED_4, 9);


        //Map Arduino digital pins to connectors
        this._connectorA = new WildConnector(this, wcConnector.A, 3, 17);
        this._connectorB = new WildConnector(this, wcConnector.B, 19, 18);
        this._connectorC = new WildConnector(this, wcConnector.C, 5, 14);
        this._connectorD = new WildConnector(this, wcConnector.D, 10, 15);

        this._socket.onmessage = function (message) {
            //console.log('got message' + message.data);
            //console.log(message.data);
            var msg = JSON.parse(message.data);
            var method = msg["method"];
            //console.log(method);
            var params = msg["params"];
            //console.log(params);

            //var out = data;
            //console.log(out)
            switch (method) {
                case "analog_message_reply":
                {
                    //console.log('analog');
                    var pin = params[0];
                    ////console.log(a)
                    var out = params[1];
                    //console.log("out: " + out);
                    switch (pin) {
                        case 0:  //ADC0 maps to Arduino pin 14, and WildCards connector C pin 2
                            this._connectorC.pin2.analog_message_reply(out);
                            break;
                        case 1:  //ADC1 maps to Arduino pin 15, and WildCards connector D pin 2
                            this._connectorD.pin2.analog_message_reply(out);
                            break;
                        case 2:  //ADC2 maps to Arduino pin 16
                            //this analog input is not connected for WildCards
                            break;
                        case 3:  //ADC3 maps to Arduino pin 17, and WildCards connector A pin 2
                            this._connectorA.pin2.analog_message_reply(out);
                            break;
                        case 4:  //ADC4 maps to Arduino pin 18, and WildCards connector B pin 2
                            this._connectorB.pin2.analog_message_reply(out);
                            break;
                        case 5:  //ADC5 maps to Arduino pin 19, and WildCards connector B pin 1
                            this._connectorB.pin1.analog_message_reply(out);
                            break;
                        default:
                            console.log("unknown analog pin")
                    }
                    break;
                }

                case "digital_message_reply":
                {
                    //console.log('digital message');

                    pin = params[0];
                    ////console.log(a)
                    out = params[1];
                    //console.log('digital message');
                    //console.log('pin: ' + pin);
                    //console.log('value =' + out);
                    switch (pin) {

                        case 2:  //maps to Arduino pin 2
                            //this digital input is not connected for WildCards
                            break;
                        case 3:  //maps to Arduino pin 3, and WildCards connector A pin 1
                            this._connectorA._pin1.digital_message_reply(out);
                            //this._pin3.state = out;
                            break;
                        case 4:  //maps to Arduino pin 4, and WildCards button1
                        //    document.getElementById("ip4").value = out;
                            this._button1.pin.state = out;
                            break;
                        case 5:  //maps to Arduino pin 5, and WildCards connector C pin 1
                            this._connectorC._pin1.digital_message_reply(out);
                        //    document.getElementById("ip11").value = out;
                            //this._pin5.state = out;
                            break;
                        case 6:  //maps to Arduino pin 6
                        //    document.getElementById("ip6").value = out;
                            break;
                        case 7:  //maps to Arduino pin 7
                        //    document.getElementById("ip7").value = out;
                            break;
                        case 8:  //maps to Arduino pin 8
                        //    document.getElementById("ip8").value = out;
                            break;
                        case 9:  //maps to Arduino pin 9
                        //    document.getElementById("ip9").value = out;
                            break;
                        case 10:  //maps to Arduino pin 10, and WildCards connector D pin 1
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
                        case 14:  //maps to Arduino pin 14, and WildCards connector C pin 2
                            this._connectorC._pin2.digital_message_reply(out);
                        //    document.getElementById("ip14").value = out;
                            break;
                        case 15:  //maps to Arduino pin 15, and WildCards connector D pin 2
                            this._connectorD._pin2.digital_message_reply(out);
                        //    document.getElementById("ip15").value = out;
                            break;
                        case 16:  //maps to Arduino pin 16, and WildCards button2
                            this._button2.pin.state = out;
                        //    document.getElementById("ip16").value = out;
                            break;
                        case 17:  //maps to Arduino pin 17, and WildCards connector A pin 2
                            this._connectorA._pin2.digital_message_reply(out);
                        //    document.getElementById("ip17").value = out;
                            break;
                        case 18:  //maps to Arduino pin 18, and WildCards connector B pin 2
                            this._connectorB._pin2.digital_message_reply(out);
                        //    document.getElementById("ip18").value = out;
                            break;
                        case 19:  //maps to Arduino pin 19, and WildCards connector B pin 1
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
     * Return the specified WildConnector object for this WildCards device
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
            default:
                //do nothing
        }
    }



    /**
     * Return the specified Button object for this WildCards device
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
            default:
                //do nothing
        }
    }


    /**
     * Return the specified WildLED object for this WildCards device
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
 * Scratch 3.0 blocks to interact with a WildCards device.
 */
class Scratch3WildCardsBlocks {

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
        /**
         * A new Device Manager that points to localhost:9000.
         * @type {DeviceManager}
         */
        this.deviceManager = new DeviceManager();
        this.connect();
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: Scratch3WildCardsBlocks.EXTENSION_ID,
            name: 'WildCards',
            iconURI: iconURI,
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
                {
                    opcode: 'isDigitalHigh',
                    text: '[DIGITAL_SENSOR] [CONNECTOR_ID]',
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
                    text: 'when [DIGITAL_SENSOR] [CONNECTOR_ID]',
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
                    text: 'set servo to [DIRECTION]: [CONNECTOR_ID]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CONNECTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'pwm_connectorSelect',
                            defaultValue: wcConnector.A
                        },
                        DIRECTION: {
                          type: ArgumentType.NUMBER,
                          defaultValue: 90      //(maybe) TODO set servo limits to inputs; DH: value validation implemented in setServoPosition at least
                        }
                    }
                },
                {
                    opcode: 'buzzerTone',
                    text: '[PLAY_STOP] [NOTE] on buzzer for [DURATION] seconds: [CONNECTOR_ID]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CONNECTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'connectorSelect',
                            defaultValue: wcConnector.A
                        },
                        PLAY_STOP: {
                            type: ArgumentType.STRING,
                            menu: 'playStop',
                            defaultValue: 'Play'
                        },
                        NOTE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 290
                        },
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
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
                },
                {
                    opcode: 'getTemperature',
                    text: 'temperature: [CONNECTOR_ID] [TEMP_TYPE]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        CONNECTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'connectorSelect',
                            defaultValue: wcConnector.A
                        },
                        TEMP_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'tempSelect',
                            defaultValue: "Fahrenheit"
                        }
                    }
                }
            ],
            menus: {
                buttonSelect:
                    [wcButton.B_1, wcButton.B_2],
                ledSelect:
                    [wcLED.LED_1, wcLED.LED_2, wcLED.LED_3, wcLED.LED_4],
                sensorSelect:
                    [wcSensor.LIGHT, wcSensor.SOUND, wcSensor.TOUCH, wcSensor.BUTTON],
                connectorSelect:
                    [wcConnector.A, wcConnector.B, wcConnector.C, wcConnector.D],
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
                playStop:
                    ["Play", "Stop"],
                musicNote:
                    ["E1", "F1", "G", "A", "B", "C", "D", "E2", "F2"]
            }
        };
    }


    /**
     * Use the Device Manager client to attempt to connect to a WildCards board.
     */
    connect () {
        console.log("trying connect")
        if (this._device || this._finder) {
            return;
        }
        console.log("creating wildcards device")
        this._device = new WildCards(tempsocket);
///TODO:    Get DeviceManager stuff working

        // const deviceManager = this.deviceManager;
        // deviceManager._serverURL = "ws://localhost:9000";
        // const finder = this._finder =
        //     deviceManager.searchAndConnect(Scratch3WildCardsBlocks.EXTENSION_ID, "");
        // /*
        // *    const finder = this._finder =
        // *    deviceManager.searchAndConnect(Scratch3WildCardsBlocks.EXTENSION_ID, Wildcards.DEVICE_TYPE);
        // */
        // this._finder.promise.then(
        //     socket => {
        //         if (this._finder === finder) {
        //             this._finder = null;
        //             this._device = new Wildcards(socket);
        //         } else {
        //             log.warn('Ignoring success from stale WildCards connection attempt');
        //         }
        //     },
        //     reason => {
        //         if (this._finder === finder) {
        //             this._finder = null;
        //             log.warn(`WildCards connection failed: ${reason}`);
        //         } else {
        //             log.warn('Ignoring failure from stale WildCards connection attempt');
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
        console.log(pin.state)
        return pin.state;
    }
    /**
     * Set the WildCards LEDs on or off
     * @param {object} args - the block's arguments.
     * @property {wcConnector} LED_ID- the connector to test.
     * @property {string} ON_OFF - the connector to test.
    */
    ledOnOff (args) {
        this._device.getLED(args.LED_ID).setLED(args.ON_OFF);
    }

    /**
     * Set the connected servo to the specified direction
     * @param {object} args - the block's arguments.
     * @property {wcConnector} CONNECTOR_ID- the connector that the servo is connected to.
     * @property {number} DIRECTION - the direction to set the servo to.
    */
    setServoPosition (args) {
        var direction  = parseInt(args.DIRECTION) + 4  //offset by 4 to avoid servo jitter on edge values, parse for Int in case leading/trailing space character is present
        const maxpulse = 255  //maxpulse/minpulse should be changed also in pin.servo_config method
        const minpulse = 4

        // TODO: direction does not seem to be correct, ie input number to analogWrite differs from selection
        if (direction < minpulse) {
            direction = minpulse
        }

        if (direction > maxpulse) {
            direction = maxpulse
        }

        var pin = this._device.getConnector(args.CONNECTOR_ID).getPin(wcPin.pin1)
        pin.setPinMode(servoMode);
        pin.analogWrite(direction);
    }

    /**
     * Turn a WildModules buzzer on or off
     * @param {object} args - the block's arguments.
     * @property {wcConnector} CONNECTOR_ID- the connector that the buzzer is connected to.
     * @property {wcConnector} PLAY_STOP- PLAY or STOP PLAYING
     * @property {wcConnector} NOTE- Right now its set to everyone note on the Treble Clef
     * @property {wcConnector} DURATION- Durations in whole seconds
    */
    buzzerTone (args) {
      var tone_command = "TONE_TONE"; //TONE_TONE to play, TONE_NO_TONE to stop playing.
      var frequency = 0.0;   //In Hz
      var duration = 0;     // In mS

      if (args.PLAY_STOP == "Stop") {
          tone_command = "TONE_NO_TONE";
      }
      else {
          tone_command = "TONE_TONE";
      }
      /*
      switch(args.NOTE) {
          case "E1":
              frequency = 164.8;
              break;
          case "F1":
              frequency = 174.6;
              break;
          case "G":
              frequency = 195.9;
              break;
          case "A":
              frequency = 220.0;
              break;
          case "B":
              frequency = 246.9;
              break;
          case "C":
              frequency = 261.6;
              break;
          case "D":
              frequency = 293.6;
              break;
          case "E2":
              frequency = 329.6;
              break;
          case "F2":
              frequency = 349.2;
              break;
      }
      */

      frequency = args.NOTE;

      duration = args.DURATION * 1000;  // scale from S to mS

      var pin = this._device.getConnector(args.CONNECTOR_ID).getPin(wcPin.pin1)
      pin.play_tone(tone_command, frequency, duration)
    }
}

module.exports = Scratch3WildCardsBlocks;
