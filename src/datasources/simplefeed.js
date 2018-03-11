// @ts-check

export class SimpleFeed {
  loadData(callbacks) {
    callbacks.onSuccess([
      {
        id: '1',
        title: 'Apple',
        img: 'img/fruit/apple.png'
      },
      {
        id: '2',
        title: 'Banana',
        img: 'img/fruit/banana.png'
      },
      {
        id: '3',
        title: 'Grapes',
        img: 'img/fruit/grapes.png'
      },
      {
        id: '4',
        title: 'Orange',
        img: 'img/fruit/orange.png'
      },
      {
        id: '5',
        title: 'Peach',
        img: 'img/fruit/peach.png'
      },
      {
        id: '6',
        title: 'Pear',
        img: 'img/fruit/pear.png'
      }
    ]);
  }
}
