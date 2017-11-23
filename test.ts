
import { expect } from 'chai';
import 'mocha';
import {DistanceService, Direction} from './room';

describe('Super basic test', () => {
  it('should return hello world', () => {
    const result = 'Hello World!';
    expect(result).to.equal('Hello World!');
  });
});

describe('Super basic test', () => {
  const room = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  it('should return hello world', () => {
    const service = new DistanceService(room);
    console.log(service.getWallDistance({m: 1, n: 2}, Direction.top));
    // console.log(service.getWallDistance({m: 1, n: 3}, Direction.top));
    // expect(result).to.equal('Hello World!');
  });
});