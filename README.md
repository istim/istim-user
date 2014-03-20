[![Stories in Ready](https://badge.waffle.io/istim/istim-user.png?label=ready&title=Ready)](https://waffle.io/istim/istim-user)

#Istim-user

##API

- http://istim-user.jit.su/

##Interface

- http://istim-user-gui.jit.su/

##Model

- <b> User </b>
	
	* id
	* email
	* password
	* firstName
	* lastName
	* birthDate

##Rotas:
- <b> Create:</b> Cria um novo usuário
   
   >     user 
   >      req.method = 'POST'
   >     user/create 
   >      req.method = 'POST'

- <b> Destroy:</b> Deleta um usuário

   >     user 
   >      req.method = 'DELETE'
   >     user/destroy/:id 

- <b> Update:</b> Atualiza um usuário

   >     user 
   >      req.method = 'PUT'  
   >     user/update/:id
   >      req.method = 'POST'

- <b> Find:</b> Procura por um usuário ou todos

   >     user 
   >      req.method = 'GET'   
   >     user/find/:id
   >     user/find

- <b> Auth:</b> Autenticação
 - login:
   >     auth/login
   >      req.method = 'POST'

 - logout:
   >     auth/logout/:id

