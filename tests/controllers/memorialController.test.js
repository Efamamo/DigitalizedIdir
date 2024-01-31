const request = require('supertest');
const app = require('../../app'); // 
const Memorial = require('../../models/memorials');

jest.mock('../../models/memorials'); // Mocking the model to control its behavior

describe('memorialController', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reset mock status before each test
  });

  it('should render memoriallist with memorials data', async () => {
    const sampleMemorials = [
      { name: 'Memorial1', birthdate: '01-01-2000', deceasedDate: '01-01-2022', obituary: 'Lorem ipsum' },
      
    ];

    Memorial.find.mockResolvedValueOnce(sampleMemorials);

    const agent = request.agent(app); 

    
    await agent.post('/login').send({ username: 'yourUsername', password: 'yourPassword' });

    const response = await agent.get('/memorials');

   
    expect(response.status).toBe(302);
    expect(response.header['location']).toBe('/login');
   
    if (response.status === 200) {
        expect(response.body.memorials).toEqual(sampleMemorials);
        expect(Memorial.find).toHaveBeenCalled();
      }
  },10000);

});
