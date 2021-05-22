# API_content_shower
Server side: Tornado, PostgreSQL  
Client side: React, Bootstrap

## Launch requrements
Install python dependencies from requrements.txt   
Install npm dependencies from package.json

To lauch server you need: 
1) PostgreSQL server running 
2) Create .env file and fill the field listed in the .env.example file
3) Initialize a table by running <code>python3 -m api.scripts.initializedb</code>
4) Start the server by <code>python3 -m api.__init__</code>

To lauch client you need:  
1) Go to frontend directory
2) Start npm by <code>npm start</code>
