// @ts-check
import { Application, Container, Device } from 'tal-ts';
import { SimplePage } from './components/simplepage';

class SampleApp extends Application {
  constructor(appDiv, styleDir, imgDir, readyHandler) {
    super(appDiv, styleDir, imgDir, readyHandler);

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
    this.addComponentContainer('maincontainer', new SimplePage());
  }

  route() {
    //
  }
}

const rootEl = document.getElementById('root');
const test = new SampleApp(rootEl, '', '', () => console.log('app is ready'));
