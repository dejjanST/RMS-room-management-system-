import { ByKeyValuePipe } from './by-key-value.pipe';

describe('ByKeyValuePipe', () => {
  let byKeyValuePipe: ByKeyValuePipe;

  beforeEach(() => {
    byKeyValuePipe = new ByKeyValuePipe();

  });

  it('create an instance', () => {
    expect(byKeyValuePipe).toBeTruthy();
  });

  it('should filter array by specific propertie and return array of filtered', () => {
    const equipmentMock: any[] = [
      { id: 1, name: 'name1', time: 232321321321 },
      { id: 1, name: 'name2', time: 232321321321 },
      { id: 2, name: 'name2', time: 232321321321 },
      { id: 3, name: 'name2', time: 232321321321 },
      { id: 4, name: 'name3', time: 232321321321 },

    ];
    // should return array with 1 element
    expect(byKeyValuePipe.transform(equipmentMock, 'id', 3)).toEqual([{ id: 3, name: 'name2', time: 232321321321 }]);

    // should return array with 2 element
    expect(byKeyValuePipe.transform(equipmentMock, 'id', 1))
      .toEqual(
        [
          { id: 1, name: 'name1', time: 232321321321 },
          { id: 1, name: 'name2', time: 232321321321 }
        ]
      );


  });

});
