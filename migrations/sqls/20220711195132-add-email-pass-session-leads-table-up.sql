/* Replace with your SQL commands */
ALTER TABLE IF EXISTS session_leads
    ADD COLUMN email VARCHAR(150) UNIQUE,
    ADD COLUMN password VARCHAR(150)