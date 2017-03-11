import { expect } from 'chai';

import * as constants from '../src/redux/constants';

describe('constants', () => {
  Object.keys(constants).forEach((name) => {
    it(`${name} is not undefined`, () => {
      expect(constants[name]).to.not.be.undefined;
    });
  });
});
