import dotenv from "dotenv"

const result = dotenv.config()

export let config: Record<string, any>|undefined;

if(!("error" in result)){
	config = result.parsed; // env is local/dev
} else {
	config = {}
	for (const [key, val] of Object.entries(process.env)){
		config[key] = val;
	}
}

// export config;