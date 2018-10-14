// @ts-check
import { Application, Container, Device } from '../../tal-ts';
// import { WebkitDevice } from '../../tal-ts/dist/devices/webkit';
import { SimplePage } from './components/simplepage';

class SampleApp extends Application {
  constructor(appDiv, deviceConstructor, styleDir, imgDir, readyHandler) {
    super(appDiv, deviceConstructor, styleDir, imgDir, readyHandler);

    this.appDiv = appDiv;

    this.setRootContainer = () => {
      const container = new Container();
      container.outputElement = appDiv;
      this.setRootWidget(container);
      readyHandler();
    };
  }

  run() {
    this.setRootContainer();

    // Launch our custom 'page' component
    // this.addComponentContainer('maincontainer', new SimplePage());
  }

  route() {
    //
  }
}

const rootEl = document.getElementById('root');

import('../../tal-ts/dist/devices/webkit' /* webpackChunkName: "webkit-device" */)
  .then(({ WebkitDevice }) => {
    const test = new SampleApp(rootEl, WebkitDevice, '', '', () => {
      console.log('app is ready');
    });
  })
  .catch(console.error);
