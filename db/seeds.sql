-- Insert initial departments
INSERT INTO departments (dept_name) VALUES
    ('Astro-Logistics'),
    ('Quantum Computing'),
    ('Cybernetic Relations'),
    ('Galactic Diplomacy'),
    ('Exoplanetary Development'),
    ('Telepathic Communications'),
    ('Temporal Affairs'),
    ('Bio-Enhancement'),
    ('Virtual Realities'),
    ('Zero-Energy Systems');

-- Insert initial roles
INSERT INTO roles (title, salary, department_id) VALUES
    ('Captain', 120000.00, 1),
    ('Chief Engineer', 95000.00, 2),
    ('Science Officer', 90000.00, 3),
    ('Intelligence Officer', 93000.00, 4),
    ('Diplomatic Envoy', 91000.00, 5),
    ('Chief Medical Officer', 95000.00, 6),
    ('Communications Officer', 88000.00, 7),
    ('Tactical Officer', 92000.00, 8),
    ('Helmsman', 89000.00, 2),  -- Helmsman is also part of Operations
    ('Academy Instructor', 87000.00, 10);

-- Insert initial employees
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES
    ('Aria', 'Martinez', NULL, 1),
    ('Dylan', 'Roberts', NULL, 2),
    ('Nina', 'Jenkins', NULL, 3),
    ('Dax', 'Thompson', NULL, 4),
    ('Tess', 'Lynn', NULL, 5),  
    ('Alan', 'Peterson', NULL, 6),
    ('Chris', 'Walker', NULL, 7),  
    ('Lynda', 'Baxter', NULL, 8),
    ('Victor', 'Immanuel', NULL, 9),
    ('Sara', 'Bennett', NULL, 10); 