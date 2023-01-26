const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProducts } = require('./mocks/productsMock');

describe('Testa camada service referente à rota de produtos', function () {
  describe('Testa função findAll e findById', function () {
    it('testa função findAll', async function () {
      sinon.stub(productsModel, 'findAll').resolves(allProducts);

      const expectedResult = { type: null, message: allProducts };

      const result = await productsService.findAll();

      expect(result).to.be.deep.equal(expectedResult);

    })
    it('testa caso de falha da função findById', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);
      
      const expectedResult = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

      const result = await productsService.findById(1)

      expect(result).to.be.deep.equal(expectedResult);
    })
    it('testa caso de sucesso da função findById', async function () {
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);

      const expectedResult = { type: null, message: allProducts[0] }

      const result = await productsService.findById(1);

      expect(result).to.be.deep.equal(expectedResult);
    })
  })
  afterEach(() => {
    sinon.restore()
  });
})