import { Session, SessionModel } from './../models/sessions';
import { LeadModel } from './../models/session_leads';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../index'

const sessionModel = new SessionModel();
const leadModel = new LeadModel();
const request = supertest(app);

const baseSession: Session = {
  
  date: '12/12/2012',
  title: 'Test Session',
  sl_id: 1,
};
const token = jwt.sign(baseSession, process.env.TOKEN_SECRET as string);

let session: Session;

describe('Testing Model: session', () => {
  it('Must have a create method', () => {
    expect(sessionModel.create).toBeDefined();
  });
  
//   it('should create a user', async () => {
//     const result = await sessionModel.create({
//         date: '12/12/2012',
//         title: 'Test Session',
//         sl_id: 1,
//     })
//     expect(result.title).toEqual('Test Session')
// })

  it('Must have an index method', () => {
    expect(sessionModel.index).toBeDefined();
  });

  it('Must have a show method', () => {
    expect(sessionModel.show).toBeDefined();
  });

  it('Must have an update method', () => {
    expect(sessionModel.update).toBeDefined();
  });

  it('Must have a delete method', () => {
    expect(sessionModel.delete).toBeDefined();
  });
  
  it('Testing the delete model to return the deleted session', async () => {
    const deletedSession = await sessionModel.delete(session.id as number);
    expect(deletedSession.id).toEqual(session.id);
  });
});


//endpoint

describe('Testing Endpoint: /sessions', () => {


    it('Testing the create endpoint with an valid token and name', async () => {
     const response = await request
        .post('/students')
        .send({ name: 'marchel' })
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });
  
    it('Testing the create endpoint with an invalid token', async () => {
     const response = await request
        .post('/sessions')
        .send(session)
        .set('Authorization', 'Bearer heyIamafaketoken')
        expect(response.status).toBe(401);
    });

  
    it('Testing the index endpoint with an invalid token', async () => {
     const response = await request
        .get('/sessions')
        .set('Authorization', 'Bearer heyIamafaketoken')
        expect(response.status).toBe(401);
    });
  
    it('Testing the index endpoint with a valid token', async () => {
     const response = await request
        .get('/sessions')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });
  
    it('Testing the read endpoint with valid session ID', async () => {
      const response = await request
        .get(`/sessions/1`)
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });
  
    it('Testing the add session endpoint with invalid token', async () => {
     const response = await request
        .post(`/sessions/999/student`)
        .set('Authorization', 'Bearer heyIamafaketoken')
        .send({ student_id: 999 })
        expect(response.status).toBe(401);
    });
  //////////////////////////////////////////////////////////////////
    // it('Testing the add session endpoint with valid token', async () => {
    //  const response = await request
    //     .post(`/sessions/1/student`)
    //     .send({ student_id: 1 })
    //     .set('Authorization', `Bearer ${token}`)
    //     expect(response.status).toBe(200);
    // });
  ///////////////////////////////////////////////////////////
    it('Testing the update endpoint with an invalid token', async () => {
     const response = await request
        .put('/sessions')
        .set('Authorization', 'Bearer heyIamafaketoken')
        .send({
          id: 1,
          title: 'Updated Session',
          date: '22/2/2022',
          sl_id: 1,
        })
        expect(response.status).toBe(401);
    });
  //////////////////////////////////////////////////////
    it('Testing the update endpoint with a valid token', async () => {
     const response = await request
        .put('/sessions')
        .send({
          id: 1,
          title: 'Updated Session',
          date: '12/12/2012',
          sl_id: 1,
        })
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });
    ////////////////////////////////////////////////////
  
    it('Testing the delete endpoint with valid token and invalid session ID', async () => {
     const response = await request
        .delete('/sessions')
        .set('Authorization', 'Bearer heyIamafaketoken')
        .send({ id: 10000 })
        expect(response.status).toBe(401);
    });
  
    it('Testing the delete endpoint with valid token and valid session ID', async () => {
     const response = await request
        .delete('/sessions')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: 1 })
        expect(response.status).toBe(200);
    });
});