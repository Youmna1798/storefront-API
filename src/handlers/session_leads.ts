import { Lead, LeadModel } from '../models/session_leads';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from './../middleware/verifyAuthToken';

const sessionLeads = new LeadModel();

const index = async (req: Request, res: Response) => {
  try {
    const users = await sessionLeads.index();
    res.send(users);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to get the session leads')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const lead = await sessionLeads.show(id);
    res.send(lead);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to get the session lead')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const lead: Lead = { name, email, password };
    const newLead = await sessionLeads.create(lead);
    const token = jwt.sign(newLead, process.env.TOKEN_SECRET as string);
    res.send(token);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to create session lead')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const updatedLead = await sessionLeads.update(id, password);
    res.send(updatedLead);
  }  catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to update session lead')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    
    const deletedLead = await sessionLeads.delete(id);
    res.send(deletedLead);
  } catch (error) {
      res.status(500).json(error);
    
  }

};



const leads_routes = (app: express.Application) => {
  app.get('/leads', verifyAuthToken, index);
  app.get('/leads/:id', verifyAuthToken, show);
  app.post('/leads', create);
  app.put('/leads', verifyAuthToken, update);
  app.delete('/leads', verifyAuthToken, destroy);
};

export default leads_routes;