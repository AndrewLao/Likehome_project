use likehome_data;

CREATE TABLE Users (
    id varchar(255) NOT NULL,
    fname varchar(255),
    lname varchar(255),
    email varchar(255),
    savedHotels text(255),
    points int DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE Hotels (
    id int NOT NULL auto_increment,
    hotelname varchar(255),
    details text(255),
    price int,
    addr varchar(255),
    facilities text(255),
    amenities text(255),
    ratingVal double,
    numRatings int DEFAULT 0,
    imglink text(255),
    PRIMARY KEY (id)
);

CREATE TABLE Reservations (
    reserveid int primary key auto_increment,
    userid varchar(255) NOT NULL, 
    hotelid int NOT NULL,
    reserveDateStart date,
    reserveDateEnd date, 
    guests int, 
    totalprice int, 
    cancelFee int, 
    FOREIGN KEY (userid) REFERENCES Users(id),
    FOREIGN KEY (hotelid) REFERENCES Hotels(id)
);