const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 
    
    let name = 'my star!'
    let starStory = '2143123'
    let dec = "dec_0021.453"
    let mag = "mag_201.001"
    let cent = "cent_123"
    let tokenId = 1

    let defaultAccount = accounts[0];
    let account1 = accounts[1];
    let account2 = accounts[2];
    let to = accounts[1];
    let starPrice = web3.toWei(.01, "ether");

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: defaultAccount})
    });

    //create new star
    describe('creating  a new  star', () => { 
        it('create new star', async function () {             
            await this.contract.createStar(name, starStory, dec, mag, cent, tokenId, {from: defaultAccount});
            let output = await this.contract.tokenIdToStarInfo(tokenId);
            assert.deepEqual(output, [name, starStory, dec, mag, cent]);
        });

        it('check if star exist', async function () {
            assert.equal(await this.contract.checkIfStarExist(dec, mag, cent), true)
        });

        it('Stars with same coordinates cannot be created', async function () {

            try {
                await this.contract.createStar(name, starStory, dec, mag, cent, tokenId, {from: defaultAccount});
            } catch (error) {
                console.log(error, '====')
                assert.ok(error instanceof Error);
            }
        });
    });

    // test ownerOf star
    describe('test a star ownership', () => {
        it('star origianl owner', async function () {
            await this.contract.createStar(name, starStory, dec, mag, cent, tokenId, {from: defaultAccount})
            var owner = await this.contract.ownerOf(1, {from: defaultAccount})

            assert.equal(owner, defaultAccount)
        })
    })
    
    
    // test mint() method
    describe('test mint function', () => {
        beforeEach(async function() {
            let tx = await this.contract.mint(tokenId, {from: defaultAccount})
        })

        it(' mint token is of the original owner', async function () {
            const owner = await this.contract.ownerOf(tokenId, {from: defaultAccount})
            assert.equal(owner, defaultAccount)
        })

    })

    describe('test to buy a star', () => { 

        beforeEach(async function () { 
            await this.contract.createStar(name, starStory, dec, mag, cent, tokenId, {from: account1})    
        })

            it('after account2 buys then it is the owner of star', async function() {
                
                await this.contract.putStarUpForSale(tokenId, starPrice, {from: account1})
                assert.equal(await this.contract.starsForSale(tokenId), starPrice)

                await this.contract.buyStar(tokenId, {from: account2, value: starPrice, gasPrice: 0})
                assert.equal(await this.contract.ownerOf(tokenId), account2)
            });        
    });

    describe('testing approval', () =>{
        let tokenId = 1
        beforeEach(async function() {
            await this.contract.createStar(name, starStory, dec, mag, cent, tokenId, {from: defaultAccount})     
        })

        it('test getApproved function', async function() { 
            await this.contract.approve(to, tokenId, {from: defaultAccount})
            assert.equal(await this.contract.getApproved(tokenId, {from: defaultAccount}), to)
        })
    })
    
    describe('testing setApprovalForAll function', () => {
        let approved = true;   
        beforeEach(async function() {
            await this.contract.createStar(name, starStory, dec, mag, cent, tokenId, {from: defaultAccount})
            
        })

        it('isApprovedForAll test', async function() {
            await this.contract.setApprovalForAll(to, tokenId);
            assert.equal(await this.contract.isApprovedForAll(defaultAccount, to, {from: defaultAccount}), approved);        
        })
       
    })
    
    describe('testing safeTransferFrom function', () => {
        
        beforeEach(async function() {
            await this.contract.createStar(name, starStory, dec, mag, cent, tokenId, {from: defaultAccount})
            await this.contract.safeTransferFrom(defaultAccount, to, tokenId)
        })

        it('token owner ', async function() {
            assert.equal(await this.contract.ownerOf(tokenId, {from: defaultAccount}), to)
        })

        it('not token owner', async function() {
            assert.notEqual(await this.contract.ownerOf(tokenId, {from: defaultAccount}), defaultAccount)
        })

    })
})