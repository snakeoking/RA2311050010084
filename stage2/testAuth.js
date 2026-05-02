const data = {
  "email":"sk4170@srmist.edu.in",
  "name":"Shreyansh Kumar",
  "rollNo":"RA2311050010084",
  "accessCode":"QkbpxH",
  "clientId":"2facf43a-9ad9-4b91-aafa-78cc7a69d87c",
  "clientSecret":"ZSveRgmuTjCFNBHQ"
};

async function test(path, bodyObj) {
  try {
    const res = await fetch(`http://20.207.122.201/evaluation-service/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyObj)
    });
    const text = await res.text();
    console.log(`Payload keys: ${Object.keys(bodyObj).join(', ')} -> status ${res.status}: ${text}`);
  } catch (e) {
    console.error(e.message);
  }
}

async function main() {
  await test('auth', {
    email: data.email,
    name: data.name,
    rollNo: data.rollNo,
    accessCode: data.accessCode,
    clientID: data.clientId,
    clientSecret: data.clientSecret
  });

main();
