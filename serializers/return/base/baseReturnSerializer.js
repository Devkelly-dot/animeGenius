class BaseReturnSerializer {
    constructor(data) {
        this.data = data;

        this.fields = [];
    }

    async do() {
        let serialized_data = [];
        if(Array.isArray(this.data)) {
            const new_data = this.serializeMany(this.data);
            serialized_data = [...new_data];
        } else {
            const new_data = this.serialize(this.data);
            serialized_data = new_data;
        }

        return serialized_data;
    } 

    serializeMany(data) {
        let serialized = [];
        data.forEach((obj)=>{
            const serialized_obj = this.serialize(obj);
            serialized.push(serialized_obj);
        });

        return serialized;
    }

    serialize(data) {
        let serialized = {};
        this.fields.forEach((f)=>{
            serialized[f] = data[f];
        });

        return serialized; 
    }
}

module.exports = {
    BaseReturnSerializer
}