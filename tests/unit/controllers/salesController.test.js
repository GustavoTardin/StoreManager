const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { allSalesProducts } = require('../services/mocks/salesMock')

chai.use(sinonChai)

describe('Testa camada controller referente à rota de sales', function () {

  describe('testa funções findAll e findById', function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    })

    it('testa função findAll', async function () {
      sinon.stub(salesService, 'getAll').resolves({ type: null, message: allSalesProducts });

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(allSalesProducts);
    
    })
    it('testa caso de falha da função findById', async function () {
      req.params = { id: 9 }
      sinon.stub(salesService, 'findById').resolves(
        { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' }
      );

      await salesController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWithExactly({ message: 'Sale not found' })

    })
    it('testa caso de sucesso da função findById', async function () {
      
    })
})
 })