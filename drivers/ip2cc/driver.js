
const Homey = require('homey')
const ITachDriver = require('../itachdriver')

class ITachIP2CCDriver extends ITachDriver {
  onInit () {
    super.onInit()

    this.actionSendCmd = new Homey.FlowCardAction('send_relay_command')
    this.actionSendCmd
      .register()
      .registerRunListener(this._executeCommand.bind(this))
      .getArgument('connectoraddress')
      .registerAutocompleteListener((query, args) => { return args.device.onAutoCompleteConnectorAddress(query, args) })

    this.actionSendCmd
      .register()
      .registerRunListener(this._executeCommand.bind(this))
      .getArgument('outputstate')
      .registerAutocompleteListener((query, args) => { return args.device.onAutoCompleteOutputState(query, args) })
  }

  supportedModuleType () {
    return 'RELAY'
  }

  isSupported (iTachDeviceName) {
    return iTachDeviceName === 'iTachIP2CC' || iTachDeviceName === 'iTachWF2CC'
  }
}

module.exports = ITachIP2CCDriver
