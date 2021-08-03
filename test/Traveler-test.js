import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/Traveler.js';

describe('Traveler', () => {
  // beforeEach(() => {
  // });

  it('is a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

});