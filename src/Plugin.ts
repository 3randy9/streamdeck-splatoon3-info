import { Streamdeck } from '@rweich/streamdeck-ts';
import format from 'date-fns/format';

import { API_URL, areaImage64, asariImage64, hokoImage64, yaguraImage64 } from './Constants';

type RuleKey = 'AREA' | 'LOFT' | 'GOAL' | 'CLAM';
type ApiData = {
  results: {
    start_time: string; // datetime
    end_time: string; // datetime
    rule: {
      key: RuleKey;
      name: string;
    };
    stages: {
      id: number;
      name: string;
      image: string;
    }[];

    is_fest: boolean;
  }[];
};

const RULE_IMAGES: { [key in RuleKey]: string } = {
  AREA: areaImage64,
  CLAM: asariImage64,
  GOAL: hokoImage64,
  LOFT: yaguraImage64,
};

const plugin = new Streamdeck().plugin();

plugin.on('keyDown', ({ context }) => {
  // 別の情報見たくなったらURLいい感じにする
  fetch(`${API_URL}/x/now`)
    .then((response) => response.json())
    .then((data: ApiData) => {
      const currentXRule = data.results[0].rule.key;

      plugin.setImage(RULE_IMAGES[currentXRule], context);
      return;
    })
    .finally(() => {
      const now = new Date();
      const currentTime = format(now, 'HH:mm:ss');

      plugin.setTitle(currentTime, context);
    })
    .catch(() => plugin.setTitle('NG', context));
});

export default plugin;
