import { Streamdeck } from '@rweich/streamdeck-ts';

import { API_URL, areaImage64, asariImage64, hokoImage64, yaguraImage64 } from './Constants';

// 型書く
// type ApiData = {};

const plugin = new Streamdeck().plugin();

// your code here..
// plugin.on('willAppear', ({ context }) => {
//   plugin.setTitle('test', context);
// });

plugin.on('keyDown', ({ context }) => {
  fetch(`${API_URL}/x/now`)
    .then((response) => response.json())
    .then((data) => {
      const currentXRule = data.results[0].rule.name;

      switch (currentXRule) {
        case 'ガチエリア': {
          plugin.setImage(areaImage64, context);
          return;
        }
        case 'ガチヤグラ': {
          plugin.setImage(yaguraImage64, context);
          return;
        }
        case 'ガチホコ': {
          plugin.setImage(hokoImage64, context);
          return;
        }
        case 'ガチアサリ': {
          plugin.setImage(asariImage64, context);
          return;
        }
        default: {
          plugin.setTitle('??', context);
          return;
        }
      }
    })
    .catch(() => plugin.setTitle('NG', context));
});

export default plugin;
