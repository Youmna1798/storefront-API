import { Student, StudentsModel } from '../models/students';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../index'
import { response, Response } from 'express';


const studentsModel = new StudentsModel();
let student: Student;

const request = supertest(app);

const studentName: string = 'John petter';
const token = jwt.sign(studentName, process.env.TOKEN_SECRET as string);

describe('Testing students Methods', () => {
    it('A method that get all users', () => {
      expect(studentsModel.index).toBeDefined();
    });
  
    it('A method that get a specific user', () => {
      expect(studentsModel.show).toBeDefined();
    });
  
    it('A method that create a new student', () => {
      expect(studentsModel.create).toBeDefined();
    });
    it('A method that update data of a student', () => {
      expect(studentsModel.update).toBeDefined();
    });
    it('A method that delete a student', () => {
      expect(studentsModel.delete).toBeDefined();
    });
  });
  

//endpoint
describe('Testing Endpoint: /students', () => {
    it('Testing the create endpoint with an invalid token', async () => {
      const response = await request.post('/students')
        .send(student)
        .set('Authorization', 'Bearer heyIamafaketoken')
        expect(response.status).toBe(401);
    });
  
    it('Testing the create endpoint with a valid token', async () => {
     const response = await request
        .post('/students')
        .send({name:'hady'})
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
        });
    });
  
    it('Testing the index endpoint with valid token', async () => {
      const response = await request
        .get('/students')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });
  
    it('Testing the index endpoint with invalid token', async () => {
     const response = await request
        .get('/students')
        .set('Authorization', 'Bearer heyIamafaketoken')
        expect(response.status).toBe(401);
    });


    it('Testing the read endpoint with valid token and valid student ID', async () => {
     const response = await request
        .get(`/students/1`)
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });
  
    it('Testing the update endpoint with an invalid token', async () => {
     const response = await request
        .put('/students')
        .send({ ...student, name: 'david h' })
        .set('Authorization', 'Bearer heyIamafaketoken')
        expect(response.status).toBe(401);
    });
  
    it('Testing the update endpoint with a valid token', async () => {
     const response = await request
        .put('/students')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...student, name: 'david h' })
        expect(response.status).toBe(200);
    });
  
    it('Testing the delete endpoint with valid token and valid student ID', async () => {
     const response = await request
        .delete('/students')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: 1 })
        expect(response.status).toBe(200);
    });