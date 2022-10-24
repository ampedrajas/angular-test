import packageJson from "../../package.json";


export const ENV = {
    production: true,
    envName: "pro",
    api: {
        url: '',
        version: ''
    },
    version: packageJson.version
};
