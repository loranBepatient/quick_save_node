const lib = require('../lib');

describe('___ Absolute ___', () => {

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

describe('Greet ---', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('loran');
        expect(result).toMatch(/loran/)
    })
})

describe('___ Get Currency ___', () => {
    it("should return an array of currencies", () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']))
    })
})

describe('__ Get Product___', () => {
    it('should return a product with an id and price', () => {
        const result = lib.getProduct(1);
        expect(result).toHaveProperty('id', 1)
        expect(result).toMatchObject({
            id: 1,
            price: 10
        })
    })
})

describe('__ registerUser ___', () => {
    const args = [
        null,
        undefined,
        NaN,
        '',
        0,
        false
    ];
    for (arg of args) {
        it('should throw if username is falsy', () => {
            expect(() => lib.registerUser(arg)).toThrow();
        })
    }

    it('should return a user object if valid username is passed ', () => { 
        const result = lib.registerUser('loran');
        expect(result).toMatchObject({
            id: new Date().getTime(),
            username: 'loran'
        })
    })
})
