const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const color = require('../../util/color');
const log = require('../../util/log');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const iconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+d2VkbzItYmxvY2staWNvbjwvdGl0bGU+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzUuMzEzIDEwLjQ2N0gzMi4wOVY4Ljg2NWMwLS4yMjMuMTgtLjQwNC40MDUtLjQwNGgyLjQxMmMuMjI0IDAgLjQwNi4xODIuNDA2LjQwNXYxLjYwMnpNMzAuNDc3IDEwLjQ2N2gtMy4yMjRWOC44NjVjMC0uMjIzLjE4My0uNDA0LjQwNy0uNDA0aDIuNDFjLjIyNiAwIC40MDcuMTgyLjQwNy40MDV2MS42MDJ6TTI1LjY0IDEwLjQ2N0gyMi40MlY4Ljg2NWMwLS4yMjMuMTgyLS40MDQuNDA2LS40MDRoMi40MWMuMjI2IDAgLjQwNy4xODIuNDA3LjQwNXYxLjYwMnpNMjAuODA2IDEwLjQ2N2gtMy4yMjRWOC44NjVjMC0uMjIzLjE4Mi0uNDA0LjQwNi0uNDA0SDIwLjRjLjIyNCAwIC40MDYuMTgyLjQwNi40MDV2MS42MDJ6TTE1Ljk3IDEwLjQ2N2gtMy4yMjRWOC44NjVjMC0uMjIzLjE4Mi0uNDA0LjQwNy0uNDA0aDIuNDFjLjIyNiAwIC40MDcuMTgyLjQwNy40MDV2MS42MDJ6TTExLjEzNSAxMC40NjdINy45MVY4Ljg2NWMwLS4yMjMuMTgzLS40MDQuNDA3LS40MDRoMi40MTJjLjIyMyAwIC40MDUuMTgyLjQwNS40MDV2MS42MDJ6IiBzdHJva2U9IiM2Rjc4OTMiIGZpbGw9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zNy43MyAxMC40NjdINi4zYy0yLjY3IDAtNC44MzYgMi4xNTMtNC44MzYgNC44MDh2My4yMDVoMzcuMDczdi03LjIxYzAtLjQ0NC0uMzYyLS44MDMtLjgwNy0uODAzeiIgc3Ryb2tlPSIjNkY3ODkzIiBmaWxsPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMzguMTM0IDMwLjk4SDEuODY3Yy0uMjI0IDAtLjQwMy0uMTgtLjQwMy0uNFYxNi4yMzZoMzIuNzFjLjczIDAgMS40My4yODcgMS45NDUuOC41MTUuNTE0IDEuMjE1LjgwMiAxLjk0NC44MDJoLjQ3M3YxMi43NGMwIC4yMi0uMTguNC0uNDAzLjR6IiBzdHJva2U9IiM2Rjc4OTMiIGZpbGw9IiNFNkU3RTgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIHN0cm9rZT0iIzZGNzg5MyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMzQuODMgMTYuMjM3bC40ODMtMi41NjVoMy4yMjMiLz48cGF0aCBkPSJNMzguNTM2IDExLjI2OFYzMC41OGMwIC4yMi0uMTguNC0uNDAzLjRIMS44NjZjLS4yMiAwLS40MDMtLjE4LS40MDMtLjR2LTEuMjAzaDM0LjI4MmMuNjUgMCAxLjE4LS41MjQgMS4xOC0xLjE3M1YxMC40NjdoLjgwNWMuNDQ2IDAgLjgwNi4zNi44MDYuOHoiIHN0cm9rZT0iIzZGNzg5MyIgZmlsbD0iIzZGNzg5MyIgb3BhY2l0eT0iLjE1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTEuNTM4IDE2LjI4aDIwLjE0OGMuMjIyIDAgLjQwMy4xOC40MDMuNHY2LjUyN2MwIC4yMjItLjE4Mi40LS40MDQuNEgxMS41MzhjLS4yMjMgMC0uNDA0LS4xNzgtLjQwNC0uNFYxNi42OGMwLS4yMi4xOC0uNC40MDQtLjQiIGZpbGw9IiNFNkU3RTgiLz48cGF0aCBkPSJNMTEuNTM4IDE2LjI4aDIwLjE0OGMuMjIyIDAgLjQwMy4xOC40MDMuNHY2LjUyN2MwIC4yMjItLjE4Mi40LS40MDQuNEgxMS41MzhjLS4yMjMgMC0uNDA0LS4xNzgtLjQwNC0uNFYxNi42OGMwLS4yMi4xOC0uNC40MDQtLjR6IiBzdHJva2U9IiM2Rjc4OTMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMi4wOSAxNi4yOHY2LjkyN2MwIC4yMjItLjE4LjQtLjQwNC40aC0yMC4xNWMtLjIyIDAtLjQtLjE4LS40LS40di0xLjJoMTguMTZjLjY1MyAwIDEuMTgtLjUyNiAxLjE4LTEuMTc0VjE2LjI4aDEuNjEzeiIgc3Ryb2tlPSIjNkY3ODkzIiBmaWxsPSIjNkU3NzkyIiBvcGFjaXR5PSIuMTUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMC40NzcgMTYuMjhoLTMuMjI0di0xLjYwNGMwLS4yMjMuMTgzLS40MDQuNDA3LS40MDRoMi40MWMuMjI2IDAgLjQwNy4xOC40MDcuNDA0djEuNjAzek0xNS45NyAxNi4yOGgtMy4yMjR2LTEuNjA0YzAtLjIyMy4xODItLjQwNC40MDctLjQwNGgyLjQxYy4yMjYgMCAuNDA3LjE4LjQwNy40MDR2MS42MDN6TTI1LjY0IDE2LjI4SDIyLjQydi0xLjYwNGMwLS4yMjMuMTgyLS40MDQuNDA2LS40MDRoMi40MWMuMjI2IDAgLjQwNy4xOC40MDcuNDA0djEuNjAzek0yMC44MDYgMTYuMjhoLTMuMjI0di0xLjYwNGMwLS4yMjMuMTgyLS40MDQuNDA2LS40MDRIMjAuNGMuMjI0IDAgLjQwNi4xOC40MDYuNDA0djEuNjAzeiIgc3Ryb2tlPSIjNkY3ODkzIiBmaWxsPSIjRTZFN0U4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTguNTU3IDE5LjkxYzAgMS4wMjUtLjgzNyAxLjg1Ny0xLjg3IDEuODU3LTEuMDMgMC0xLjg2Ny0uODMyLTEuODY3LTEuODU4IDAtMS4wMjcuODM3LTEuODU4IDEuODY4LTEuODU4IDEuMDMyIDAgMS44Ny44MyAxLjg3IDEuODU3ek0yMy40OCAxOS45MWMwIDEuMDI1LS44MzYgMS44NTctMS44NjggMS44NTdzLTEuODctLjgzMi0xLjg3LTEuODU4YzAtMS4wMjcuODM4LTEuODU4IDEuODctMS44NThzMS44NjguODMgMS44NjggMS44NTd6TTI4LjQwNCAxOS45MWMwIDEuMDI1LS44MzcgMS44NTctMS44NjggMS44NTctMS4wMzIgMC0xLjg3LS44MzItMS44Ny0xLjg1OCAwLTEuMDI3LjgzOC0xLjg1OCAxLjg3LTEuODU4IDEuMDMgMCAxLjg2OC44MyAxLjg2OCAxLjg1N3oiIHN0cm9rZT0iIzZGNzg5MyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTE4LjU1NyAxOS45MjJjMCAxLjAyNi0uODM3IDEuODU4LTEuODcgMS44NTgtMS4wMyAwLTEuODY3LS44MzItMS44NjctMS44NTggMC0xLjAyNS44MzctMS44NTcgMS44NjgtMS44NTcgMS4wMzIgMCAxLjg3LjgzMiAxLjg3IDEuODU3TTIzLjQ4IDE5LjkyMmMwIDEuMDI2LS44MzYgMS44NTgtMS44NjggMS44NThzLTEuODctLjgzMi0xLjg3LTEuODU4YzAtMS4wMjUuODM4LTEuODU3IDEuODctMS44NTdzMS44NjguODMyIDEuODY4IDEuODU3TTI4LjQwNCAxOS45MjJjMCAxLjAyNi0uODM3IDEuODU4LTEuODY4IDEuODU4LTEuMDMyIDAtMS44Ny0uODMyLTEuODctMS44NTggMC0xLjAyNS44MzgtMS44NTcgMS44Ny0xLjg1NyAxLjAzIDAgMS44NjguODMyIDEuODY4IDEuODU3IiBmaWxsPSIjNkY3ODkzIiBvcGFjaXR5PSIuNSIvPjwvZz48L3N2Zz4=';


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
    LED_0: 'LED 0',
    LED_1: 'LED 1',
    LED_2: 'LED 2',
    LED_3: 'LED 3'
};

const wcConnector = {
    A: 'Connector A',
    B: 'Connector B',
    C: 'Connector C',
    D: 'Connector D'
};

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

        //TODO WeDo 'connects', maybe look into handshaking with firmtata
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
                    opcode: 'isButtonPressed',
                    text: '[BUTTON_ID] pressed',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        BUTTON_ID: {
                            type: ArgumentType.STRING,
                            menu: 'buttonSelect',
                            defaultValue: wcButton.B_1
                        }
                    }
                },
                {
                    opcode: 'isLight',
                    text: 'light sensed: [CONNECTOR_ID]',
                    blockType: BlockType.BOOLEAN,
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
                    text: 'temperature: [CONNECTOR_ID]',
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
                    opcode: 'ledOnOff',
                    text: 'turn [LED_ID] [ON_OFF]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        LED_ID: {
                            type: ArgumentType.STRING,
                            menu: 'ledSelect',
                            defaultValue: wcLED.LED_0
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
                    text: 'turn buzzer [ON_OFF]: [CONNECTOR_ID]',
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
                    opcode: 'setServoPosition',
                    text: 'set servo to [DIRECTION]: [CONNECTOR_ID]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CONNECTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'connectorSelect',
                            defaultValue: wcConnector.A
                        },
                        DIRECTION: {
                          type: ArgumentType.NUMBER,
                          defaultValue: 0
                        }
                    }
                }
            ],
            menus: {
                buttonSelect:
                    [wcButton.B_1, wcButton.B_2],
                ledSelect:
                    [wcLED.LED_0, wcLED.LED_1, wcLED.LED_2, wcLED.LED_3],
                connectorSelect:
                    [wcConnector.A, wcConnector.B, wcConnector.C, wcConnector.D],
                onOff:
                    ['On', 'Off'],
            }
        };
    }

    isButtonPressed () {
        // TODO return boolean if button is pressed
        // will we have to continually monitor the buttons status?
    }

    isLight () {
        // TODO returns true is light is present
    }

    getTemperature () {
        // TODO get temp reading, should probably timeout if nothing is connected
    }

    ledOnOff () {
        // TODO send command to turn LED on
    }

    buzzerOnOff () {
        // TODO send command to turn buzzer on
    }

    setServoPosition () {
        // TODO send servo position command
    }



}

module.exports = Scratch3WildCardsBlocks;
