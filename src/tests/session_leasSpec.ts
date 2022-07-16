import { Lead, LeadModel } from './../models/session_leads';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../index';




const leadModel = new LeadModel();

const request = supertest(app);

const baseLead: Lead = {
  name: 'R2-D2',
  email: 'R2@D2.com',
  password: 'beep-boop',
};
let lead: Lead;
const token = jwt.sign(baseLead, process.env.TOKEN_SECRET as string);

describe('Testing Model: session_leads', () => {
  it('Must have a create method', () => {
    expect(leadModel.create).toBeDefined();
  });
  it('Must have an index method', () => {
    expect(leadModel.index).toBeDefined();
  });

  it('Must have a show method', () => {
    expect(leadModel.show).toBeDefined();
  });

  it('Must have an update method', () => {
    expect(leadModel.update).toBeDefined();
  });


  it('Must have a delete method', () => {
    expect(leadModel.delete).toBeDefined();
  });
});



describe('Testing Endpoint: /leads', () => {
    
    it('Testing the create endpoint ', async () => {
     const response = await request
        .post('/leads')
        .send({
          name: 'R2-D2',
          email: 'R2@D2.com',
          password: 'beep-boop'})
        expect(response.status).toBe(200);

    });

  
    it('Testing the index endpoint with valid token', async () => {
      await request
        .get('/leads')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  
    it('Testing the index endpoint with invalid token', async () => {
      await request
        .get('/leads')
        .set('Authorization', 'Bearer heyIamafaketoken')
        .expect(401);
    });
  
    it('Testing the read endpoint with valid token and valid lead ID', async () => {
      await request
        .get(`/leads/1`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  
    it('Testing the read endpoint with invalid token and invalid lead ID', async () => {
      await request
        .get('/leads/999')
        .set('Authorization', 'Bearer heyIamafaketoken')
        .expect(401);
    });
  
    it('Testing the update endpoint without token', async () => {
      await request
        .put('/leads')
        .send({
          id: 1,
          password: 'update'
        })
        .expect(401);
    });
  

    /////////////////////////////////////////////
    // it('Testing the update endpoint with lead ID', async () => {
    //   await request
    //     .put('/leads')
    //     .send({
    //       id: 1,
    //       password: 'update'
    //     })
    //     .set('Authorization', `Bearer ${token}`)
        
    //     .expect(200);
    // });
  
    it('Testing the delete endpoint with valid token and valid lead ID', async () => {
      await request
        .delete('/leads')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: 1 })
        .expect(200);
    });
  });