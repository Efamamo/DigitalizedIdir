const membersController = require('../../controllers/membersControler');
const Users = require('../../models/users');

jest.mock('../../models/users', () => ({
  find: jest.fn(),
  deleteOne: jest.fn(),
}));

describe('membersController', () => {
  describe('getMembers', () => {
    it('should render members with user data', async () => {
      // Mock the find function to resolve with a sample value
      Users.find.mockResolvedValueOnce([
        { _id: '1', username: 'User1', role: 'User' },
        { _id: '2', username: 'User2', role: 'User' },
      ]);

      const mockRequest = {};
      const mockResponse = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Call the actual getMembers function
      await membersController.getMembers(mockRequest, mockResponse);

      
      expect(mockResponse.render).toHaveBeenCalled();

      // Check if render was called with the correct arguments
      expect(mockResponse.render).toHaveBeenCalledWith('members', { members: expect.any(Array) });
    });

    it('should handle case when no users are found', async () => {
      // Mock the find function to resolve with an empty array
      Users.find.mockResolvedValueOnce([]);

      const mockRequest = {};
      const mockResponse = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Call the actual getMembers function
      await membersController.getMembers(mockRequest, mockResponse);

  
      expect(mockResponse.render).toHaveBeenCalled();

     
      expect(mockResponse.render).toHaveBeenCalledWith('members', { members: [] });
    });
  });

  
});
