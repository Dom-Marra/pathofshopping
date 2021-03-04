import { parsedPropData } from '../models/parsedPropData';
import { ParsePropsPipePipe } from './parse-props-pipe.pipe';

describe('ParsePropsPipePipe', () => {

  const mockProps = [
    {
      name: "Mock Display 0 w/ values",
      values: [['10', "mock display"]],
      displayMode: 0,
      type: 0
    },
    {
      name: "Mock Display 0 w/ no values",
      displayMode: 0,
      values: [],
      type: 0
    },
    {
      name: "Mock Display 1",
      values: [['10', "mock display"]],
      displayMode: 1,
    },
    {
      name: "Mock Display 2",
      values:[["1\/100", "mock display"]],
      displayMode: 2,
      progress: 0,
      type:0
    },
    {
      name :"Mock {0} Display {1} 3",
      values: [
        [
            "15",
            0
        ],
        [
            "40",
            0
        ]
      ],
      displayMode: 3
    },
    {
      name: "Mock <unmet>{1} Display 0 w/ regex",
      displayMode: 0,
      values: []
   },
   {
     name: "Mock No Display",
     type: 0
   }
  ]
  
  const pipe = new ParsePropsPipePipe();

  it('returns expected data', () => {
    const expectedData: Array<parsedPropData> = [
      {
        values: [
          {
            text: "Mock Display 0 w/ values: "
          },
          {
            text: '10',
            display: "mock display"
          }
        ],
        type: 0
      },
      {
        values: [
          {
            text: "Mock Display 0 w/ no values",
            display: -1
          }
        ],
        type: 0
      },
      {
        values: [
          {
            text: "Mock Display 1: "
          },
          {
            text: '10',
            display: "mock display"
          }
        ],
        type: undefined
      },
      {
        values: [
          {
            text: "Mock Display 2: "
          },
          {
            text: '1/100',
            display: "mock display"
          }
        ],
        type: 0,
        progress: 0
      },
      {
        values: [
          {
            text: "Mock ",
            display: null
          },
          {
            text: '15',
            display: 0
          },
          {
            text: ' Display ',
            display: null
          },
          {
            text: '40',
            display: 0
          },
          {
            text: ' 3',
            display: null
          }
        ],
        type: undefined
      },
      {
        values: [
          {
            text: "Mock ",
            display: -1
          },
          {
            text: "1",
            display: 'unmet'
          },
          {
            text: " Display 0 w/ regex",
            display: -1
          }
        ],
        type: undefined
      },
      {
        values: [
          {text: "Mock No Display"}
        ],
        type: 0
      }
    ];

    expect(pipe.transform(mockProps)).toEqual(expectedData);
  });
});
