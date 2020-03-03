export class LoaderError extends Error {

    /**
     * @param {String} src 
     */
    constructor(src) {
        super(`"${src || "Asset"}" Not Loaded`);
        this.name = this.constructor.name;
    }

}
