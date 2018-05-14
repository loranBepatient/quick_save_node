const lib = require('../lib');

describe('absolute', () => {

    it('shoult return a postive number  if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    })
    it('shoult return a postive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    })
    it('shoult return 0 is input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    })

})
