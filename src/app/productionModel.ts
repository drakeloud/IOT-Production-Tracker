export class ProductionItem {
    constructor(
        readonly id: string,
        readonly timestamp: string,
        readonly clickType: string,
    ) { }


    static deserialize(result) {
        if (!result) {
            return null;
        }

        const productionItem = new ProductionItem(
            result.id,
            result.timestamp,
            result.payload.clickType
        );

        return productionItem;
    }
}
