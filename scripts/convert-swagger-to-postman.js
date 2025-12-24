const fs = require('fs');
const path = require('path');
const Converter = require('openapi-to-postmanv2');
const { generateSwaggerSpec } = require('../src/swagger/index');

const convert = () => {
    try {
        console.log('Generating Swagger Spec...');
        const swaggerSpec = generateSwaggerSpec();
        
        // Save swagger.json for reference is useful
        const swaggerPath = path.join(__dirname, '../swagger.json');
        fs.writeFileSync(swaggerPath, JSON.stringify(swaggerSpec, null, 2));
        console.log(`Swagger JSON saved to ${swaggerPath}`);

        console.log('Converting to Postman Collection...');
        Converter.convert({ type: 'json', data: swaggerSpec },
            {},
            (err, conversionResult) => {
                if (err) {
                    console.error('Error in conversion:', err);
                    process.exit(1);
                }
                if (!conversionResult.result) {
                    console.error('Could not convert:', conversionResult.reason);
                    process.exit(1);
                }
                
                const postmanCollection = conversionResult.output[0].data;
                const collectionPath = path.join(__dirname, '../postman_collection.json');
                fs.writeFileSync(collectionPath, JSON.stringify(postmanCollection, null, 2));
                console.log(`Postman Collection saved to ${collectionPath}`);
            }
        );
    } catch (error) {
        console.error('Error during execution:', error);
        process.exit(1);
    }
};

convert();
