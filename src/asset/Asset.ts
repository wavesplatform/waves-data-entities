import { IAsset, IAssetObject, TPrecision } from './interface';


export class Asset implements IAsset {

    public readonly id: string;
    public readonly name: string;
    public readonly precision: TPrecision;
    public readonly description: string;

    constructor(assetObject: IAssetObject) {
        this.id = assetObject.id;
        this.name = assetObject.name;
        this.precision = assetObject.precision;
        this.description = assetObject.description;
    }

    public toJSON(): IAssetObject {
        return {
            id: this.id,
            name: this.name,
            precision: this.precision,
            description: this.description
        };
    }

    public toString(): string {
        return this.id;
    }

    public static isAsset(object: object): object is IAsset {
        return object instanceof Asset;
    }

}
