# Central Point PTA Backend

.env file needed to run the project | ask for this credentials to the project owner | juan.leandro@ingubu.ui

Var name | Description
--|--
LEX_ACCESSKEYID | Amazon lex access key id
LEX_SECRETACCESSKEY | Amazon lex secret
GPT_KEY | GPT3 Access Key
NEO4J_HOST | Neo4J ip ex: 15.236.64.162
NEO4J_PORT | Neo4J port ex: 7687
NEO4J_USER | Neo4J User
NEO4J_PASSWORD | Neo4J Password

Start dev with: `npm run start:dev`
Start docker with : 
1. `docker build -t cpoint-pta-backend . `
2. `docker run -p 3000:3000 cpoint-pta-backend:latest`