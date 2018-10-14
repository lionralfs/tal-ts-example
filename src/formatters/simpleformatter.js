// @ts-check

import { Button, Formatter, Image, Label } from '../../../tal-ts';

export class SimpleFormatter extends Formatter {
  format(iterator) {
    const item = iterator.next();
    const button = new Button('fruit' + item.id);
    button.appendChildWidget(
      new Image('img-item.id', item.img, { width: 200, height: 200 })
    );
    button.appendChildWidget(new Label(item.title));
    return button;
  }
}
