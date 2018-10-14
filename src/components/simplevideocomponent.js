// @ts-check

import {
  Button,
  Component,
  Label,
  HorizontalList,
  RuntimeContext,
  MediaPlayer
} from '../../../tal-ts';

export class SimpleVideoComponent extends Component {
  constructor() {
    // It is important to call the constructor of the superclass
    super('simplevideocomponent');

    // Get a reference to the current application and device objects
    this.application = this.getCurrentApplication();
    this.device = this.application.getDevice();

    // Create a a label add a class to it, this class can be used as a CSS selector
    const description = new Label('Simple Video Component.');
    description.addClass('description');
    this.appendChildWidget(description);

    // Create a horizontal list that contains buttons to control the video
    const playerControlButtons = new HorizontalList('playerButtons');

    const play = new Button('play');
    play.appendChildWidget(new Label('PLAY'));
    playerControlButtons.appendChildWidget(play);
    play.addEventListener('select', evt => {
      this.getPlayer().resume();
    });

    const pause = new Button('pause');
    pause.appendChildWidget(new Label('PAUSE'));
    playerControlButtons.appendChildWidget(pause);
    pause.addEventListener('select', evt => {
      this.getPlayer().pause();
    });

    const rewind = new Button('rewind');
    rewind.appendChildWidget(new Label('-5s'));
    playerControlButtons.appendChildWidget(rewind);
    rewind.addEventListener('select', evt => {
      const currentTime = this.getPlayer().getCurrentTime();
      this.getPlayer().playFrom(currentTime - 5);
    });

    const fastForward = new Button('fastForward');
    fastForward.appendChildWidget(new Label('+5s'));
    playerControlButtons.appendChildWidget(fastForward);
    fastForward.addEventListener('select', evt => {
      const currentTime = this.getPlayer().getCurrentTime();
      this.getPlayer().playFrom(currentTime + 5);
    });

    const back = new Button('back');
    back.appendChildWidget(new Label('BACK'));
    playerControlButtons.appendChildWidget(back);
    back.addEventListener('select', evt => {
      // Make sure we destroy the player before exiting
      this.destroyPlayer();
      this.parentWidget.back();
    });

    // Append the player control buttons to the component
    this.appendChildWidget(playerControlButtons);

    // Add a 'beforerender' event listener to the component that takes care of video instantiation
    this.addEventListener('beforerender', evt => {
      this.onBeforeRender(evt);
    });
  }

  onBeforeRender(ev) {
    // Create the device's video object, set the media sources and start loading the media
    const player = this.getPlayer();
    player.setSource(
      MediaPlayer.TYPE.VIDEO,
      'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_2160p_60fps_normal.mp4',
      'video/mp4'
    );
    player.beginPlayback();
  }

  getPlayer() {
    return RuntimeContext.getDevice().getMediaPlayer();
  }

  destroyPlayer() {
    this.getPlayer().stop();
    this.getPlayer().reset();
  }

  showBackground() {
    // if (this.device.getPlayerEmbedMode() === Media.EMBED_MODE_BACKGROUND) {
    //   this.device.removeClassFromElement(document.body, 'background-none');
    //   this.application.getRootWidget().removeClass('background-none');
    // }
  }
}
