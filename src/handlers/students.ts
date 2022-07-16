import {StudentsModel,Student } from "../models/students";
import express, { Request, Response } from 'express';
import { verifyAuthToken } from './../middleware/verifyAuthToken';

const students = new StudentsModel();


const index = async (req: Request, res: Response) => {
    try {
      const users = await students.index();
      res.send(users);
    } catch (error) {
        res.status(500).json(error);
      }
  };
  

  const show = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const user = await students.show(id);
      res.send(user);
    } catch (error) {
      const e = error as Error;
      if (e.message.includes('Failed to get the student')) {
        res.status(500).json(e.message);
      } else {
        res.status(401).json(e.message);
      }
    }
  };
  const create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newUser = await students.create(name);
      res.send(newUser);
    } catch (error) {
      const e = error as Error;
      if (e.message.includes('Failed to add the student')) {
        res.status(500).json(e.message);
      } else {
        res.status(401).json(e.message);
      }
    }
  };

const update = async (req: Request, res: Response) => {
    try {
      const { id, name } = req.body;
      const student: Student = { id, name };
      const updatedUser = await students.update(student);
      res.send(updatedUser);
    } catch (error) {
      const e = error as Error;
      if (e.message.includes('Failed to update student')) {
        res.status(500).json(e.message);
      } else {
        res.status(401).json(e.message);
      }
    }
  };

  const destroy = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const deletedUser = await students.delete(id);
      res.send(deletedUser);
    } catch (error) {
      const e = error as Error;
      if (e.message.includes('Failed to delete student')) {
        res.status(500).json(e.message);
      } else {
        res.status(401).json(e.message);
      }
    }
  };

  const students_routes = (app: express.Application) => {
    app.get('/students',verifyAuthToken, index);
    app.get('/students/:id', verifyAuthToken, show);
    app.post('/students', verifyAuthToken, create);
    app.put('/students', verifyAuthToken, update);
    app.delete('/students', verifyAuthToken, destroy);
  };
  
  export default students_routes;