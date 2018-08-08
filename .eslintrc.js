module.exports = {
    'parser': 'babel-eslint',
    'env': {
        'node': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'ecmaFeatures': {
        'modules': true,
    },
    'rules': {
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-console': 'off'
    }
};
