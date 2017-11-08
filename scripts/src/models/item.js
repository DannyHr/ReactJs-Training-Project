export class Item {
    constructor(id, name, description, longDescription, price, imageSrc, dateCreated, dateModified, tags) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageSrc = imageSrc;
        this.longDescription = longDescription;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
        this.tags = tags;
    }
}