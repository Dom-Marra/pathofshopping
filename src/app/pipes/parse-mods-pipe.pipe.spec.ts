import { parsedModData } from '../models/parsedModData';
import { ParseModsPipePipe } from './parse-mods-pipe.pipe';

describe('ParseModsPipePipe', () => {

  const mockItem = {
    mockMods: [
      "Mock Mod Value\nSecondaryText"
    ],
    extended: {
      mods: {
        mock: [
          {
            name: "of mocking",
            tier: "M1",
            magnitudes: [
              {
                hash: "mock.mockstat",
                min: 0,
                max: 0
              },
              {
                hash: "mock.mockstat",
                min: 11,
                max: 20
              }
            ]
          }
        ]
      },
      hashes : {
        mock: [
          ["mock.mockstat", [0]]
        ]
      }
    }
  };

  const mockDelveItem = {
    mockDelveMod: [
      "Mock Delve Mod"
    ],
    extended: {
      mods: {
        delve: [
          {
            name: "Mock Delve",
            tier: '',
            magnitudes: null
          }
        ]
      },
      hashes : {
        delve: [
          ["mock.delve", [0]]
        ]
      }
    }
  }

  const pipe = new ParseModsPipePipe();

  it('returns expected data back for non delve items', () => {
    const expectedData: Array<parsedModData> = [
      {
        text: "Mock Mod Value<br>SecondaryText",
        name: "of mocking",
        tiers: [{
          tier: "M1",
          ranges: [
            {
              min: 11,
              max: 20

            }
          ]
        }],
        hash: "mock.mockstat"
      }
    ];

    expect(pipe.transform(mockItem, 'mockMods', 'mock')).toEqual(expectedData);
  });

  it('returns expected data back for delve items', () => {
    const expectedData: Array<parsedModData> = [
      {
        text: "Mock Delve Mod",
        name: "Mock Delve",
        tiers: [{
          tier: '',
          ranges: []
        }],
        hash: "mock.delve"
      }
    ];

    expect(pipe.transform(mockDelveItem, 'mockDelveMod', 'delve')).toEqual(expectedData);
  });

  it('returns null when the mod list is empty or null', () => {
    expect(pipe.transform(mockDelveItem, 'null', 'delve')).toEqual(null);
  });
});
