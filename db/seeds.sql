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
    ('Astro-Logistics Officer', 92000.00, 1),
    ('Quantum Programmer', 105000.00, 2),
    ('Cyber-Human Mediator', 88000.00, 3),
    ('Galactic Ambassador', 120000.00, 4),
    ('Terraform Engineer', 95000.00, 5),
    ('Telepathy Specialist', 86000.00, 6),
    ('Time-Travel Coordinator', 112000.00, 7),
    ('Bio-Enhancement Scientist', 98000.00, 8),
    ('Virtual World Architect', 90000.00, 9),
    ('Zero-Energy Innovator', 115000.00, 10);

-- Insert initial employees
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES
   ('Aria', 'Martinez', NULL, 1),
    ('Dylan', 'Roberts', NULL, 2),
    ('Nina', 'Jenkins', NULL, 3),
    ('Dax', 'Thompson', NULL, 4),
    ('Tess', 'Lynn', NULL, 5),
    ('Alan', 'Peterson', 1, 6),  -- Managed by Aria Martinez
    ('Chris', 'Walker', 2, 7),  -- Managed by Dylan Roberts
    ('Lynda', 'Baxter', 3, 8),  -- Managed by Nina Jenkins
    ('Victor', 'Immanuel', 4, 9), -- Managed by Dax Thompson
    ('Sara', 'Bennett', 5, 10);  -- Managed by Tess Lynn