import packageJson from "../../package.json";


export const ENV = {
    production: false,
    envName: 'pre',
    api: {
        url: '',
        version: ''
    },
    version: packageJson.version
};
