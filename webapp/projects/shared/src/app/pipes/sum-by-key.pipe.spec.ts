import { SumByKeyPipe } from './sum-by-key.pipe';

describe('SumByKeyPipe', () => {
  it('create an instance', () => {
    const pipe = new SumByKeyPipe();
    expect(pipe).toBeTruthy();
  });
});
