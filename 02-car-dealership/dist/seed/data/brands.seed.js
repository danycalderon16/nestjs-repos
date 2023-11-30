"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BRANDS_SEED = void 0;
const uuid_1 = require("uuid");
exports.BRANDS_SEED = [
    {
        id: (0, uuid_1.v4)(),
        name: 'Toyota',
        createdAt: new Date().getTime()
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'Honda',
        createdAt: new Date().getTime()
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'Jeep',
        createdAt: new Date().getTime()
    }
];
//# sourceMappingURL=brands.seed.js.map