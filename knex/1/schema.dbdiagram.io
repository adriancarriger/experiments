// ERD: https://dbdiagram.io/d/5c6f5e95f7c5bb70c72f16d3
Table movie {
  id int PK
  title varchar
  director varchar
  year_released varchar
  cateogory_id int
}

Table cateogory {
  id int PK
  name varchar
}

Table rental {
  id int PK
  rental_date varchar
  return_date varchar
  customer_id int
  movie_id int
}

Table customer {
  id int PK
  first_name varchar
  last_name varchar
}

Ref: rental.customer_id > customer.id
Ref: movie.cateogory_id > cateogory.id
Ref: rental.movie_id > movie.id
