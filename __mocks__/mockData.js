import jwt from 'jsonwebtoken';

const secret = 'onyinye';

export const userToken = `Bearer ${jwt.sign(
  {
    id: 1,
    email: 'example@gmail.com',
    role: 'user',
    status: 'verified'
  },
  secret,
  { expiresIn: '1 hour' }
)}`;

export const expiredToken = `Bearer ${jwt.sign(
  {
    id: 1,
    email: 'example@gmail.com',
    role: 'admin',
    status: 'verified'
  },
  secret,
  { expiresIn: -1 }
)}`;

export default {
  authResponse: {
    data: {
      id: 1,
      username: 'Onyimatics',
      email: 'onyimatics@andela.com',
      role: 'user',
      status: 'verified',
      token: userToken
    }
  }
};

export const mockStoreData = {
  allAccountsData: {
    data: {
      rows: [
        {
          Balance: 2000,
          accountNumber: 1102345718,
          createdOn: "2019-08-29T00:43:11.908Z",
          status: "active",
          type: "savings"
        }
      ],
      accounts: { type: 'savings', openingBalance: 1000 }
    }
  },
  newAccountData: {
    data: {
      articleId: 55,
      content: 'good',
      createdAt: '2019-08-26T05:14:27.383Z',
      id: 72,
      updatedAt: '2019-08-26T05:14:27.383Z',
      userId: 162
    }
  },
  errorData: {
    message: 'Unable to create account'
  }
};
