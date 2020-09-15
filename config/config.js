const envs = {
    default: {
        "host": "localhost",
        "port": 3030,
        "mongodb": {
            "url": "mongodb://localhost:27017/inventory"
        },
        "categories": ["Beauty","Clothing","Footwear","Electronics","Furniture"],
        "products": {
            "Beauty": ["Ponds Facewash","Bath Soap", "Sandal Talc", "Body Lotion"],
            "Clothing": ["Kids Shirt","Tracks", "Trousers"],
            "Footwear": ["Kids Shoes","Flip Flops", "Formal Shoes", "Casual Shoes"],
            "Electronics": ["Samsung Mobile","Mi TV", "Sony Speakers", "Bluetooth Headsets", "Pendrive"],
            "Furniture": ["Sofa", "Bed", "Park Bench", "Chair", "Waiting room"]
          }
    },
    production: {
        "host": "", // we can have server url here
        "port": 3000,
        "mongodb": {
            "url": "" // we can have server DB url here
        }
    }
}

exports.get = function get(env) {
    return envs[env] || envs.default;
}