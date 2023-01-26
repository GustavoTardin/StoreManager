const chai = require('chai');
const camelize = require('camelize')
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/productModelMock');

describe('Testa funções da Model referente a rota de produtos', function () {
  describe('testa funções findAll e findById', function () {
    it('testa função findAll', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);

      const result = await productsModel.findAll();

      expect(result).to.be.deep.equal(camelize(allProducts));
    })
  })
  afterEach(() => {
    sinon.restore()
  })
})