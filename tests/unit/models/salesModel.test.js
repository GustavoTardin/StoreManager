const chai = require('chai');
const camelize = require('camelize')
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { normalGetAllResponse, findByIdResponse } = require('./mocks/saleModelMock')

describe('Testa arquivo de Sales da camada Model', function () {
  describe('Testa funções de encontrar todas as sales e buscar sale por Id', function () {
    it('função getAll', async function () {
      sinon.stub(connection, 'execute').resolves([normalGetAllResponse]);
      
      const result = await salesModel.getAll();
      
      expect(result).to.be.deep.equal(camelize(normalGetAllResponse))
    })
    it('testa função findById', async function () {
      sinon.stub(connection, 'execute').resolves(findByIdResponse);

      const result = await salesModel.findById(1);

      expect(result).to.be.deep.equal(camelize(findByIdResponse[0]))

    })
  })
  afterEach(() => {
    sinon.restore()
  })
})

