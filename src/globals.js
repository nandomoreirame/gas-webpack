import GasWebpack from './gas-webpack'

/**
 * @global
 * @desc Calls the init() function inside AppController
 * @since 1.0.0
 */
global.onOpen = e =>
  GasWebpack.AppController.init()

/**
 * @global
 * @desc Calls the init() function inside AppController
 * @since 1.0.0
 * */
global.onInstall = e =>
  GasWebpack.AppController.init()
