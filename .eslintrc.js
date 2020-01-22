module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "standard",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",

    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-unused-vars": ["error", { "argsIgnorePattern": "next", }],
        "semi": [2, "always"],
        "eqeqeq": 1,
        "arrow-spacing":1,
        "space-before-blocks" : 1,
        "padded-blocks" : 1,
        "indent" : 1,
        "no-multi-spaces" : 1,
        "comma-spacing":1,
        "keyword-spacing" : 1,
        "quotes" : 0,
        "comma-dangle" : 1,
        "object-curly-spacing":1,
        "no-multiple-empty-lines":1,
        "space-before-function-paren":1,
        "key-spacing":1,
        "brace-style":1,







    }
};
