// @ts-check
import {
  Component,
  Button,
  Label,
  Carousel,
  ActivateFirstHandler,
  Binder
} from '../../../tal-ts';

export class CarouselComponent extends Component {
  constructor() {
    super('carouselComponent');

    this.lengths = [];
    this.description = new Label();
    this.description.addClass('description');
    this.appendChildWidget(this.description);

    this.onBeforeShow = this.onBeforeShow.bind(this);
    this.onDataBound = this.onDataBound.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onAfterHide = this.onAfterHide.bind(this);
    this.addEventListener('beforeshow', this.onBeforeShow);
    this.addEventListener('select', this.onSelect);
    this.addEventListener('afterhide', this.onAfterHide);
  }

  onSelect() {
    this.goBack();
  }

  onBeforeShow(evt) {
    this.initialItem = evt.args.initialItem || 0;
    this.dontShowYet(evt);
    this.setDescription(evt.args.description || '');
    this.createCarousel(evt.args);
    this.appendChildWidget(this.carousel);
    this.addCarouselListeners();
    this.setCarouselAlignPoints(evt);
    this.saveCarouselLengths(evt);
    this.startCarouselDataBinding(evt);
  }

  onAfterHide() {
    this.tearDownCarousel();
    this.removeChildWidget(this.carousel);
    this.carousel = null;
  }

  /**
   * possibly over cautious but should prevent memory leakage.
   * stops running animations,
   * removes all items individually (rather then via removeChildWidgets
   * as this way clears down widget listeners) then removes any listeners
   * added to the carousel.
   */
  tearDownCarousel() {
    this.carousel.completeAlignment();
    this.removeCarouselItems();
    this.removeCarouselListeners();
  }

  removeCarouselItems() {
    let items;
    while (this.carousel.getChildWidgetCount() > 0) {
      items = this.carousel.getChildWidgets();
      this.carousel.removeChildWidget(items[0]);
    }
  }

  removeCarouselListeners() {
    this.carousel.removeEventListener('databound', this.onDataBound);
  }

  dontShowYet(showEvt) {
    showEvt.preventDefault();
  }

  setDescription(titleText) {
    this.description.setText(titleText);
  }

  createCarousel(args) {
    this.carousel = new Carousel(args.carouselId, args.orientation);
    this.setCarouselNavigatorAndWidgetStrip(args);

    this.attachCarouselHandler(args.animOptions);
  }

  setCarouselNavigatorAndWidgetStrip(args) {
    // switch (args.type) {
    //   case 'WRAPPING':
    //     this.carousel.setWidgetStrip(WrappingStrip);
    //     this.carousel.setNavigator(WrappingNavigator);
    //     break;
    //   case 'CULLING':
    //     this.carousel.setWidgetStrip(CullingStrip);
    //     break;
    //   case 'HIDING':
    //     this.carousel.setWidgetStrip(HidingStrip);
    //     break;
    // }
  }

  attachCarouselHandler(animOptions) {
    const handler = new ActivateFirstHandler();
    handler.setAnimationOptions(animOptions);
    handler.attach(this.carousel);
  }

  addCarouselListeners() {
    this.carousel.addEventListener('databound', this.onDataBound);
  }

  onDataBound(evt) {
    // In practice you might set widget lengths from data source rather then component args
    // and do it during a bind per widget (on append), however if you're doing it in a block
    // this is where it needs to happen (post bind, pre align)
    if (this.lengths) {
      this.carousel.setWidgetLengths(this.lengths);
    }

    // tell wrapping strips to generate clones now binding is finished
    this.carousel.recalculate();

    // could set initial/aligned item from data source
    this.setCarouselAlignedAndActiveItems(this.initialItem, this.initialItem);
    this.show({});
  }

  setCarouselAlignedAndActiveItems(alignedIndex, activeIndex) {
    this.carousel.alignToIndex(alignedIndex);
    this.carousel.setActiveChildIndex(activeIndex);
    this.carousel.getChildWidgets()[activeIndex].focus();
  }

  goBack() {
    this.parentWidget.back();
  }

  setCarouselAlignPoints(evt) {
    if (evt.args && evt.args.alignment) {
      var alignPoint = evt.args.alignment.alignPoint;
      var normalisedAlignPoint = evt.args.alignment.normalisedAlignPoint;
      var normalisedWidgetAlignPoint =
        evt.args.alignment.normalisedWidgetAlignPoint;

      if (normalisedAlignPoint) {
        this.carousel.setNormalisedAlignPoint(normalisedAlignPoint);
      }

      if (normalisedWidgetAlignPoint) {
        this.carousel.setNormalisedWidgetAlignPoint(normalisedWidgetAlignPoint);
      }

      if (alignPoint) {
        this.carousel.setAlignPoint(alignPoint);
      }
    }
  }

  saveCarouselLengths(evt) {
    this.lengths = evt.args.lengths;
  }

  startCarouselDataBinding(evt) {
    // disabling auto calc is to prevent wrapping strips from
    // creating clones multiple times during a large data bind
    this.carousel.setAutoCalculate(false);
    const dataSource = evt.args.dataSource;
    const formatter = evt.args.formatter;
    const binder = new Binder(formatter, dataSource);
    binder.appendAllTo(this.carousel);
  }
}
