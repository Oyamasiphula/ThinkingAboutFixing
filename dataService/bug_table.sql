create table issues (
  id int not null auto_increment,
  heading char(100) not null,
  description text,
  primary key(id)
);