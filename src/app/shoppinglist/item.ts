export class Item {

    private name: string = 'New Item';

    constructor(name: string) {
        if (name != null) {
            this.name = name;
        }
    }

    /**
     * Sets the name of the item
     * 
     * @param name 
     *        String: name of the item
     */
    public setName(name: string) {
        this.name = name;
    }

    /**
     * Returns the name of the item
     * 
     * @returns
     *          string: name of the item
     */
    public getName(): string {
        return this.name;
    }
}
