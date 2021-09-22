import dotenv from "dotenv"

const result = dotenv.config()


export const config = (() => {
	if(!("error" in result)){
		return result.parsed; // env is local/dev
	} else {
		let envVariables: Record<string,any> = {}
		for (const [key, val] of Object.entries(process.env)){
			envVariables[key] = val;
		}
		return envVariables
	}
})();


