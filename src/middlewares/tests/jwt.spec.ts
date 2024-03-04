import { Request, Response } from 'express';
import verifyAuthToken from '../jwt';

describe('Test jwt responses', () => {
  it('it should test verifyAuthToken not throw error', async () => {
    const req = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwibGFzdF9uYW1lIjoiRG9lIiwiZmlyc3RfbmFtZSI6IkpvaG4iLCJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiIkMmIkMTAkaXlLRmN4ZC80RGloMC5XUEFEUWhqdWc5aGJSbXkuVmpkV1ZZdlpjMkZIeG4zYkxoTzRoVTIifSwiaWF0IjoxNzA5NTUyNzMwfQ.aHzH_E8UHDN7Mn68ZNFf2Aiaq9PQSmld-XUgUQ78BkU',
      },
    } as Request;
    const res = {} as Response;
    const next = () => {};

    expect(async () => {
      verifyAuthToken(req, res, next);
    }).not.toThrow();
  });

  it('it should test verifyAuthToken throw error', async () => {
    const req = {} as Request;
    const res = {} as Response;

    let status = 0;
    let response = '';

    res.status = (data) => {
      status = data;
      return res;
    };
    res.json = (data) => {
      response = data;
      return res;
    };
    const next = () => {};
    await verifyAuthToken(req, res, next);
    expect(status).toEqual(401);
    expect(response).toEqual('Unauthorized');
  });
});
