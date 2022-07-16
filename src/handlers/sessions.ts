import {Session , SessionModel } from "../models/sessions";
import express, { Request, Response } from 'express';
import { verifyAuthToken } from './../middleware/verifyAuthToken';

const sessions = new SessionModel();

const index = async (req: Request, res: Response) => {
  try {
    const session = await sessions.index();
    res.send(session);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to get the sessions')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const session = await sessions.show(id);
    res.send(session);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to get the session')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { date, title, sl_id } = req.body;
    const session: Session = { date, title, sl_id };
    const newLead = await sessions.create(session);
    res.send(newLead);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to add the session')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id, date, title, sl_id } = req.body;

    const session: Session = { id, date, title, sl_id };
    const updatedSession = await sessions.update(session);
    res.send(updatedSession);
  } catch (error) {
    
    res.status(500).json(error);
    
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id);

    const session = await sessions.show(id);
    const deletedSession = await sessions.delete(id);
    res.send(deletedSession);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to delete session')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const addStudent = async (req: Request, res: Response) => {
  try {
    const sessionId = Number(req.params.id);
    const studentId = req.body.student_id;
    const session = await sessions.show(sessionId);
    const studentSession = await sessions.addStudent(studentId, sessionId);
    res.json(studentSession);
  } catch (error) {
      res.status(400);
      res.json(error);
    }
};

const sessions_routes = (app: express.Application) => {
  app.get('/sessions', verifyAuthToken, index);
  app.get('/sessions/:id', verifyAuthToken, show);
  app.post('/sessions', verifyAuthToken, create);
  app.put('/sessions',verifyAuthToken, update);
  app.delete('/sessions', verifyAuthToken, destroy);
  app.post('/sessions/:id/student', verifyAuthToken, addStudent);
};

export default sessions_routes;