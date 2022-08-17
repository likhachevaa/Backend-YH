create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);


create TABLE role(
    value VARCHAR(255)
);



create TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    role VARCHAR(255),
    FOREIGN KEY (role) REFERENCES role (value)
);

create TABLE usersMain(
    id SERIAL PRIMARY KEY,
    password CHAR(64),
    username VARCHAR(255),
    UNIQUE (username),
    role VARCHAR(255),
    FOREIGN KEY (role) REFERENCES role (value)
);