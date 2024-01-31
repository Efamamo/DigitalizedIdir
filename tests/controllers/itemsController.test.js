

  const {
    getItems,
    getAddItems,
    verifyDelete,
    contactAdmin,
    getSingleItem,
    deleteItem,
    updateItem,
    addItem,
  } = require('../../controllers/itemsController'); 
  
  // Mocking the necessary modules
  const Items = require('../../models/items'); 
  const Users = require('../../models/users');
  jest.mock('../../models/users', () => ({
    find: jest.fn(),
  }));

  jest.mock('../../models/items', () => ({
    find: jest.fn(),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
    create: jest.fn(),
  }));
  
  describe('itemsController', () => {
    beforeEach(() => {
      // Reset the mocks before each test
      jest.clearAllMocks();
    });
  
    it('should render member-items template with items', async () => {
      const mockItems = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
      Items.find.mockResolvedValue(mockItems);
  
      const mockRender = jest.fn();
      const mockRes = { render: mockRender };
  
      await getItems({}, mockRes);
  
      expect(mockRender).toHaveBeenCalledWith('member-items', { items: mockItems });
    });
  
  
    it('should create an item and redirect to /items', async () => {
        const mockItemData = {
          imageUrl: 'mock-image-url',
          name: 'Mock Item',
          amount: 10,
          price: 20,
        };
      
        const mockReq = { body: mockItemData };
        const mockRes = { redirect: jest.fn() };
      
        Items.create.mockResolvedValue({});
      
        await addItem(mockReq, mockRes);
      
        expect(Items.create).toHaveBeenCalledWith({
          imageUrl: undefined,
          name: 'Mock Item',
          amount: 10,
          price: 20,
        });
        expect(mockRes.redirect).toHaveBeenCalledWith('/items');
      });
    })