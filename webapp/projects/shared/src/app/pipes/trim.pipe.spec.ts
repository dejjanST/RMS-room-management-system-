import { TrimPipe } from './trim.pipe';

describe('TrimPipe', () => {
  it('create an instance', () => {
    const pipe = new TrimPipe();
    expect(pipe).toBeTruthy();
  });

  it('should remove spaces between words in string', () => {
    const pipe = new TrimPipe();
    expect(pipe.transform('test 1')).toEqual('test1');

  });
});
