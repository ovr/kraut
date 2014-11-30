fs = require('fs');
vm = require('vm');

function include(path) {
    var code = fs.readFileSync(path, 'utf-8');
    vm.runInThisContext(code, path);
}

include('matrix.js');

var test = require('unit.js');
test.value(matrixDet([
    [1, 2, 2],
    [5, 5, 3],
    [6, 2, 1]
], 3)).isEqualTo(-15);

test.value(matrixDet([
    [1, 2, 3],
    [2, 4, 6],
    [4, 8, 9]
], 3)).isEqualTo(0);