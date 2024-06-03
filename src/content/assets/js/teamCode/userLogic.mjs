import {getUser} from "./ServerClient/serverClient.mjs";

getUser("test@gmail.com", (us, error) => {
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(us);
    }
});