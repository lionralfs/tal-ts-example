// @ts-check
import {
  KeyEvent,
  Button,
  Component,
  Label,
  Carousel,
  ActivateFirstHandler,
  VerticalList,
  DataSource
} from '../../../tal-ts';
import { SimpleFeed } from '../datasources/simplefeed';
import { SimpleVideoComponent } from './simplevideocomponent';
import { SimpleFormatter } from '../formatters/simpleformatter';
import { CarouselComponent } from './carouselcomponent';

export class SimplePage extends Component {
  constructor() {
    // It is important to call the constructor of the superclass
    super('simplecomponent');

    // Add the labels to the component
    const helloWorldLabel = new Label('helloWorldLabel', 'Hello World');
    this.appendChildWidget(helloWorldLabel);

    const welcomeLabel = new Label(
      'welcomeLabel',
      'Welcome to your first TAL application!'
    );
    this.appendChildWidget(welcomeLabel);

    const newCarouselButton = this.createCarouselButton();

    const playerButton = new Button();
    playerButton.addEventListener('select', evt => {
      this.getCurrentApplication().pushComponent(
        'maincontainer',
        new SimpleVideoComponent()
      );
    });

    playerButton.appendChildWidget(new Label('Simple Video Player Example'));

    const horizontalProgressButton = new Button();
    horizontalProgressButton.appendChildWidget(
      new Label('Horizontal Progress Bar Example')
    );
    horizontalProgressButton.addEventListener('select', evt => {
      // this.getCurrentApplication().pushComponent(
      //   'maincontainer',
      //   'sampleapp/appui/components/horizontalprogresscomponent'
      // );
    });

    // Create a vertical list and append the buttons to navigate within the list
    const verticalListMenu = new VerticalList('mainMenuList');
    verticalListMenu.appendChildWidget(newCarouselButton);
    verticalListMenu.appendChildWidget(playerButton);
    verticalListMenu.appendChildWidget(horizontalProgressButton);
    this.appendChildWidget(verticalListMenu);
  }

  createCarouselButton() {
    const carouselExampleSelected = () => {
      this.getCurrentApplication().pushComponent(
        'maincontainer',
        new CarouselComponent(),
        this.getCarouselConfig()
      );
    };

    const button = new Button('carouselButton');
    button.appendChildWidget(new Label('Carousel Example'));
    button.addEventListener('select', carouselExampleSelected);
    return button;
  }

  getCarouselConfig() {
    return {
      description:
        'Carousel example, LEFT and RIGHT to navigate, SELECT to go back',
      dataSource: new DataSource(null, new SimpleFeed(), 'loadData'),
      formatter: new SimpleFormatter(),
      orientation: Carousel.orientations.HORIZONTAL,
      carouselId: 'verticalCullingCarousel',
      animOptions: {
        skipAnim: false
      },
      alignment: {
        normalisedAlignPoint: 0.5,
        normalisedWidgetAlignPoint: 0.5
      },
      initialItem: 4,
      type: 'CULLING',
      lengths: 264
    };
  }
}
