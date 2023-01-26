const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSalesProducts, salesById } = require('./mocks/salesMock');

describe('Testes da camada service referentes à rota de sales', function () {
  describe('testa função findAll e findById', function () {
    it('testa função findAll', async function () {
      sinon.stub(salesModel, 'getAll').resolves(allSalesProducts);

      const expectedResult = { type: null, message: allSalesProducts };

      const result = await salesService.getAll();

      expect(result).to.be.deep.equal(expectedResult);

    })
    it('testa caso de falha da função findById', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const expectedResult = { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' }
      
      const result = await salesService.findById(9);

      expect(result).to.be.deep.equal(expectedResult);

    })
    it('testa caso de sucesso da função findById', async function () {
      sinon.stub(salesModel, 'findById').resolves(salesById);

      const expectedResult = { type: null, message: salesById }

      const result = await salesService.findById(1);

      expect(result).to.be.deep.equal(expectedResult);

    })
    
  })
  afterEach(() => {
    sinon.restore()
  })
})