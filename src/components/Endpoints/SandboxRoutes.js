const SandboxRoutes=({endpoint})=>{
    
    const SandBoxRoutesCall=async ()=>{
        try {
            const response = await fetch(`http://localhost:9002/sandbox${endpoint.endpoint}`, {
              method: endpoint.method,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({}),
            });
            console.log(response.ok)
            console.log(requestBody)
            //console.log(description);
            if (response.ok) {
              onClose();
              const r=await response.json()
              console.log(r)
              onData(r)
              console.log((description));
            } else {
              throw new Error('Network response was not ok.');
              //console.log(description);
            }
          } catch (error) {
            console.error(error);
          }
    }
}