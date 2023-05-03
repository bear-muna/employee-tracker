# Employee Tracker

## Description
Welcome to the Employee Tracker! Here you will be able to add manage your employees using a databse. This application consisted of Node.js and mySQL. In order to communicate between both the client and the database, I had to link the two using mysql npm packages. This project came with many challenges, one of which being how to properly create, read, update, and delete database items with node.js. Much of the syntax for operating mySQL database was SQL language that I had to hardcode into node.js. This became tedious and sometimes confusing. Another obstacle was understanding asynchronous functions. Querying from a database such as SQL runs asynchronously, which means that the queries would not run sequentially with JavaScript. To solve this, I had to ensure to use the right callback functions and use several 'async/await' syntax so that my JavaScript would not run unless the asynchronous function was run to completion.
Completing this application has solidfied my understanding of using a SQL database and performing basic CRUD operations on that database.

## Installation
In order to install this application, you will need to install the necessary npm packages within your terminal. To install, execute 'npm install' into your terminal. 

## Usage
This application requires several steps before you can actually use it. After installing the necessary npm packages, you will need to open navigate into the db folder within your terminal and open mysql. Once you open mysql, you will need to execute the following: 'source schema.sql;' then 'source seeds.sql;'. You can now redirect to the main folder of this application and execute 'node index' to begin the program.
You will be given several options once you start the program, such as viewing departments, roles, employees, and adding employees. Input the necessary values into the terminal and the database should create/read/update/delete depending on your choice. Once you are done using the application, select 'Quit'.

## Screen Recording
![Demonstration of Application](./screenrecording/Untitled_%20May%202%2C%202023%2010_43%20PM.gif)

## Links
GitHub Repository: https://github.com/bear-muna/employee-tracker