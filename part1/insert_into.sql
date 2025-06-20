`
    Five walk requests:
        A request for Max at 2025-06-10 08:00:00 for 30 minutes at Parklands, with status open.
        A request for Bella at 2025-06-10 09:30:00 for 45 minutes at Beachside Ave, with status accepted.
        Three more walk requests with details of your choosing.
`

INSERT INTO Users
	(username, email, password_hash, role)
VALUES
	(alice123, alice@example.com, hashed123, 'owner'),
	(bobwalker, bob@example.com, hashed456, 'walker'),
	(carol123, carol@example.com, hashed789, 'owner'),
	(sploot, spoot@example.com, supersecure, 'walker'),
	(edgar, edgar@allen.poe, raven333, 'walker');
INSERT INTO
	Dogs (owner_id, name, size)
VALUES
	((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
	((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
	((SELECT user_id FROM Users WHERE username = 'sploot'), 'Tom', 'small'),
	((SELECT user_id FROM Users WHERE username = 'sploot'), 'Jerry', 'medium'),
	((SELECT user_id FROM Users WHERE username = 'sploot'), 'Sanders', 'large');
INSERT INTO WalkRequests
	(dog_id, requested_time, duration_minutes, location, status)
VALUES
	(LAST_INSERT_ID(), '2025-06-10T09:30:00', 30, 'Parklands', 'open'),
	(LAST_INSERT_ID(), '2025-06-10T09:30:00', 30, 'Parklands', 'open'),
	(LAST_INSERT_ID(), '2025-06-10T09:30:00', 30, 'Parklands', 'open'),
	(LAST_INSERT_ID(), '2025-06-10T09:30:00', 30, 'Parklands', 'open'),
	(LAST_INSERT_ID(), '2025-06-10T09:30:00', 30, 'Parklands', 'open');
COMMIT;

