export class LoaderError extends Error {

    constructor(src) {
        super(`${ src || "Asset" } Not Loaded`);
        this.name = this.constructor.name;
    }

}
