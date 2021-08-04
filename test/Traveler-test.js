import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/Traveler.js';
import travelersData from './test-data/travelersData.js';

describe('Traveler', () => {
  // beforeEach(() => {
  // });

  it('is a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', function() {
    const traveler = new Traveler(travelersData.travelers[0]);

    expect(traveler).to.be.an.instanceof(Traveler);
  });

});