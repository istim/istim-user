istim-user
============
[![Stories in Ready](https://badge.waffle.io/istim/istim-user.png?label=ready&title=Ready)](https://waffle.io/istim/istim-user)

User manager API for the Istim Gaming Platform.

## Server URL

http://istim-user.nodejitsu.com
 

## Services
### User
  - Publish user
    - ```POST to user/create```
  - Edit user info
     - ```PUT to user/:id```
  - Remove user
    - ```DELETE to user/:id```
  - Get all available users
    - ```GET to user```
  - Get a user
    - ```GET to user/:id```
 
### Auth
  - Login
    - ```POST to auth/login```
  - Logout
    - ```GET to auth/logout```
  

## Example of use

``` 
   var user = {
    username: 'lemonjuice',
    password: 'DLNmq|{9T+%09@&-c5|@([074$="lE',
    email: lemonjuice@gmail.com,
    id: 1,
  };
``` 
