import { parsedDivData } from '../models/parsedDivData';
import { ParseDivsPipePipe } from './parse-divs-pipe.pipe';

describe('ParseDivsPipePipe', () => {
  const mods = [
    "<uniqueitem>{Daresso's Salute}",
    "<size:31>{<magicitem>{Bloodthirsty Eternal Sword}\r\n<default>{Item Level:} <normal>{66}}"
  ]
  
  const pipe = new ParseDivsPipePipe();

  it('returns expected data back', () => {
    const expectedData: Array<parsedDivData> = [
      {
        values: [{
          text: 'Daresso\'s Salute',
          display: 'uniqueitem'
        }]
      },
      {
        values: [
          {
            text: "Bloodthirsty Eternal Sword",
            display: "magicitem"
          }
        ]
      },
      {
        values: [
          {
            text: "Item Level:",
            display: "default"
          },
          {
            text: ' 66',
            display: "normal"
          }
        ]
      }
    ];

    expect(pipe.transform(mods)).toEqual(expectedData);
  });
});
