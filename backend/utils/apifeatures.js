class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            $or: [
                { jobtitle: { $regex: this.queryStr.keyword, $options: "i" } },
                { description: { $regex: this.queryStr.keyword, $options: "i" } },
                { requirements: { $regex: this.queryStr.keyword, $options: "i" } }
            ]
        } : {};
       
        this.query = this.query.find({...keyword});
        return this;
    }
     filter(){
         const querycopy= { ...this.queryStr }
         // removing some fields for category
         const removeField = ["keyword","page","limit"];
         removeField.forEach((key)=>delete querycopy[key]);
         this.query = this.query.find(querycopy);

         let queryStr = JSON.stringify(querycopy);
          queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

         this.query = this.query.find(JSON.parse(queryStr));

     return this;
     }
};
module.exports =  ApiFeatures;