import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();
  });


  it('testing transform()', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe.transform(90061)).toEqual('1 days 1 hours 1 minutes 1 seconds ');
    expect(pipe.transform(75)).toEqual('1 minutes 15 seconds ');
    expect(pipe.transform(0)).toEqual('');

  });

});
