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
    const traveler0 = new Traveler(travelersData.travelers[0]);

    expect(traveler0).to.be.an.instanceof(Traveler);
  });

    it('should get Traveler name', function() {
    const traveler0 = new Traveler(travelersData.travelers[0]);

    expect(traveler0.getName()).to.equal('Ham')
  });

});