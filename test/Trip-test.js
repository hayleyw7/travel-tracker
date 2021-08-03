import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/Trip.js';

describe('Trip', () => {
  // beforeEach(() => {
  // });

  it('is a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', function() {
    expect(trip).to.be.an.instanceof(Trip);
  });

});