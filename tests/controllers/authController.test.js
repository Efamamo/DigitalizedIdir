const request = require('supertest');
const app = require('../../app'); 
const User = require('../../models/users');

describe('Auth Controller', () => {
  it('GET /signup should return status 200 for signup page', async () => {
    const response = await request(app).get('/signup');
    expect(response.status).toBe(200);
  });

  it('GET /login should return status 200 for login page', async () => {
    const response = await request(app).get('/login');
    expect(response.status).toBe(200);
  });

  it('POST /login should return status 200 and a user ID for valid login credentials', async () => {
    // Generate a unique email using the current timestamp
    const uniqueEmail = `testuser-${Date.now()}@example.com`;

    const user = new User({
      email: uniqueEmail,
      password: 'testpassword',
      username: 'test',
      address: 'testaddress',
      role: 'user',
      phone: '1234567890',
    });

    await user.save();

    const response = await request(app)
      .post('/login')
      .send({
        email: uniqueEmail,
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
  });

  it('POST /signup should create a new user and return status 200', async () => {
    const uniqueEmail = `testuser-${Date.now()}@example.com`;

    const response = await request(app)
      .post('/signup')
      .send({
        email: uniqueEmail,
        password: 'testpassword',
        username: 'tests',
        address: 'testaddress',
        role: 'user',
        phone: '1234567890',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
  });

  it('POST /signup should return status 400 for invalid signup data', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        // Invalid data (e.g., missing required fields)
      });

    expect(response.status).toBe(400);
    
  });

  // Test case for POST /login route with invalid credentials
  it('POST /login should return status 400 for invalid login credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'invalidpassword',
      });

    expect(response.status).toBe(400);
   
  });

  

  afterAll(async () => {
    // Remove test users from the database
    await User.deleteMany({
      email: { $regex: /^testuser-\d+@example.com/ },
    });
  });
})
