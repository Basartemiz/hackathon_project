import sqlite3 #create sqlite 

con=sqlite3.connect("app.db") #connect to database

con.execute('''

CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    birth_city TEXT,
    date_of_birth DATE,
    email TEXT UNIQUE
); ''')
con.commit()

con.execute('''
CREATE TABLE accounts (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    account_type TEXT, -- e.g., savings, checking
    balance REAL DEFAULT 0,
    opened_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
''')
con.commit()


con.execute('''
CREATE TABLE loans (
    loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    loan_type TEXT, -- e.g., personal, mortgage
    amount REAL,
    interest_rate REAL,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
''')
con.commit()

con.execute('''
CREATE TABLE payments (
    payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    loan_id INTEGER,
    payment_date DATE,
    amount REAL,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
);''')
con.commit()


con.execute('''
CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER,
    transaction_date DATE,
    amount REAL,
    type TEXT, -- deposit or withdrawal
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);
''')
con.commit()




con.execute('''
INSERT INTO customers (name, birth_city, date_of_birth, email) VALUES
("Başar Temiz", "Istanbul", "2000-05-10", "basar@example.com"),
("Ayşe Yılmaz", "Ankara", "1992-03-15", "ayse@example.com"),
("Mehmet Kaya", "Izmir", "1985-07-22", "mehmet@example.com"),
("Elif Demir", "Bursa", "1998-11-30", "elif@example.com"),
("Can Öztürk", "Adana", "1990-01-05", "can@example.com"),
("Zeynep Şahin", "Antalya", "1995-09-12", "zeynep@example.com"),
("Ahmet Acar", "Trabzon", "1988-04-17", "ahmet@example.com"),
("Fatma Kılıç", "Konya", "1993-06-25", "fatma@example.com"),
("Emre Güneş", "Eskişehir", "1987-02-08", "emre@example.com"),
("Selin Çelik", "Gaziantep", "1999-12-19", "selin@example.com");

''')
con.commit()

con.execute('''
INSERT INTO accounts (customer_id, account_type, balance, opened_date) VALUES
(1, "savings", 1200.50, "2024-01-01"),
(2, "checking", 450.75, "2024-02-14"),
(3, "savings", 3200.00, "2024-03-10"),
(4, "checking", 980.25, "2024-04-05"),
(5, "savings", 15000.00, "2024-05-20"),
(6, "checking", 760.40, "2024-06-30"),
(7, "savings", 2200.10, "2024-07-15"),
(8, "checking", 400.00, "2024-08-01"),
(9, "savings", 8900.30, "2024-09-12"),
(10, "checking", 120.00, "2024-09-25");
''')

con.commit()

con.execute('''
INSERT INTO loans (customer_id, loan_type, amount, interest_rate, start_date, end_date) VALUES
(1, "personal", 5000, 12.5, "2024-01-10", "2026-01-10"),
(2, "mortgage", 200000, 8.2, "2023-05-15", "2033-05-15"),
(3, "auto", 35000, 9.5, "2024-03-20", "2029-03-20"),
(4, "personal", 7000, 13.0, "2024-04-12", "2027-04-12"),
(5, "business", 100000, 10.0, "2024-05-18", "2030-05-18"),
(6, "personal", 4000, 11.5, "2024-06-22", "2026-06-22"),
(7, "mortgage", 180000, 8.0, "2024-07-01", "2034-07-01"),
(8, "auto", 25000, 9.8, "2024-08-10", "2029-08-10"),
(9, "personal", 6000, 12.0, "2024-09-05", "2027-09-05"),
(10, "business", 50000, 10.5, "2024-10-01", "2029-10-01");
''')
con.commit()

con.execute('''
INSERT INTO payments (loan_id, payment_date, amount) VALUES
(1, "2024-02-01", 500),
(1, "2024-03-01", 500),
(2, "2024-02-10", 1500),
(3, "2024-04-05", 700),
(4, "2024-05-01", 600),
(5, "2024-06-15", 2000),
(6, "2024-07-01", 400),
(7, "2024-08-10", 1700),
(8, "2024-09-05", 800),
(9, "2024-09-20", 500);

''')
con.commit()

con.execute('''
INSERT INTO transactions (account_id, transaction_date, amount, type) VALUES
(1, "2024-02-01", 200, "deposit"),
(1, "2024-02-05", 100, "withdrawal"),
(2, "2024-02-10", 300, "deposit"),
(3, "2024-03-01", 400, "deposit"),
(4, "2024-03-15", 150, "withdrawal"),
(5, "2024-04-01", 500, "deposit"),
(6, "2024-04-10", 200, "deposit"),
(7, "2024-05-05", 100, "withdrawal"),
(8, "2024-05-15", 250, "deposit"),
(9, "2024-06-01", 1000, "deposit");
''')
con.commit()

con.close()

