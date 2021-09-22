import {app} from "./app"

const PORT = process.env.PORT || 8001; // first is for heroku, second is for local 

app.listen(PORT, () => {
	console.log(`app is running on port ${PORT} 😊`);
});
