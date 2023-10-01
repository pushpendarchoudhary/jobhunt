const  DataUriParser = require( "datauri/parser");
const path = require("path") ;
const getDataUri = (file)=> {
    const parser = new DataUriParser();
    const extName = file && file.originalName ? path.extname(file.originalName).toString():'';
    return parser.format(extName, file.buffer);
}

module.exports = getDataUri;
