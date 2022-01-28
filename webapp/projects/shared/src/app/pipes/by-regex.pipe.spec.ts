import { ByRegexPipe } from './by-regex.pipe';

describe('ByRegexPipe', () => {
  it('create an instance', () => {
    const pipe = new ByRegexPipe();
    expect(pipe).toBeTruthy();
  });
});
