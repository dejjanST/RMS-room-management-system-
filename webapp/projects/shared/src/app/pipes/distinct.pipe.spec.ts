import { DistinctPipe } from './distinct.pipe';

describe('DistinctPipe', () => {
  let distinctPipe: DistinctPipe;

  beforeEach(() => {
    distinctPipe = new DistinctPipe();
  });

  it('create an instance', () => {
    expect(distinctPipe).toBeTruthy();
  });

  it('should distinct array by specific propertie and return array of that propertie', () => {
    const equipmentMock: any[] = [
      { id: 1, name: 'name1', time: 232321321321 },
      { id: 1, name: 'name2', time: 232321321321 },
      { id: 1, name: 'name2', time: 232321321321 },
      { id: 1, name: 'name2', time: 232321321321 },
      { id: 1, name: 'name3', time: 232321321321 },

    ];

    expect(distinctPipe.transform(equipmentMock, ['name'])).toEqual(['name1', 'name2', 'name3']);

  });
});
