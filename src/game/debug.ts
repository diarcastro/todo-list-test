class Debug {

    log(...args:any[]) {
        console.log(args);
    }

    warning(...args:any[]) {
        console.warn(args);
    }

    info(...args:any[]) {
        console.info(args);
    }
}

const debug = new Debug();

export default debug;