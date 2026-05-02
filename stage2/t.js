const data = {
  "email":"sk4170@srmist.edu.in",
  "name":"Shreyansh Kumar",
  "rollNo":"RA2311050010084",
  "accessCode":"QkbpxH",
  "clientID":"2facf43a-9ad9-4b91-aafa-78cc7a69d87c",
  "clientSecret":"ZSveRgmuTjCFNBHQ"
};
fetch("http://20.207.122.201/evaluation-service/notifications", {
  method: "GET", 
  headers: data
})
.then(r => r.text())
.then(console.log);
