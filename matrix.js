Number.prototype.compareTo = function (obj) {
    if (!obj instanceof Number) {
        console.log("param type is error!");
        return false;
    }

    v = obj.valueOf();
    thisValue = obj.valueOf();

    return this.valueOf() == v ? 0 : (this.valueOf() < v ? -1 : 1);
};

Number.prototype.divide = function (divisor, scale, type) {
    if (type == 6) {
        if (scale == 0) {
            return Math.round((this.valueOf() / divisor));
        }

        return Math.round((this.valueOf() / divisor) * scale) / scale;
    }
};

Number.prototype.multiply = function (obj) {
    return this.valueOf() * obj.valueOf();
};

/**
 *
 * @param matrix
 * @param n
 * @returns {*}
 */
function matrixDet(matrix, n) {
    var i, j;

    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            if (matrix[i][j] == 0) {
                /**
                 * Матрицу хоть с 1 нулевым числом нельзя использовать для данного алгоритма
                 */
                return false;
            }
        }
    }

    var scaling = new Array(n);

    var tmp;

    for (i = 0; i < n; i++) {
        tmp = 0;

        for (j = 0; j < n; j++) {
            if (Math.abs(matrix[i][j]) > tmp) {
                tmp = Math.abs(matrix[i][j]);
            }
        }

        /**
         * @todo Проверить долбаеб ли я?
         * @type {number}
         */
        scaling[i] = Number(1).divide(tmp, 100, 6);
    }

    var sign = 1;
    var summ;

    for (j = 0; j < n; j++) {
        for (i = 0; i < j; i++) {
            summ = matrix[i][j];

            for (k = 0; k < i; k++) {
                console.log("Worflow SUMM matrix[" + i + "][" + k + "] = " + matrix[i][k]);
                summ -= matrix[i][k] * matrix[k][j];
            }

            console.log("1 Workflow j = " + j + " i = " + i + " summ = " + summ);
            matrix[i][j] = summ;
        }
        console.log("Matrix round A " + matrix);

        tmp = 0;
        var imax = -1;

        for (i = j; i < n; i++) {
            summ = matrix[i][j];
            console.log("Summ!! matrix[" + i + "][" + j + "] = " + summ);

            for (k = 0; k < j; k++) {
                console.log("summ!! " + matrix[i][k] + " * " + matrix[k][j] + " = " + matrix[i][k] * matrix[k][j]);

                /**
                 * Это округление все равно не поможет :))))
                 * @type {number}
                 */
                summ -= Math.round((matrix[i][k] * matrix[k][j])*100)/100;
            }

            console.log("Summ matrix[" + i + "][" + j + "] = " + summ);
            matrix[i][j] = summ;

            var cur = Math.abs(summ);
            cur *= scaling[i];

            console.log(cur + "compareTo(" + tmp + ") = " + cur.compareTo(tmp));
            if (cur.compareTo(tmp) >= 0) {
                tmp = cur;
                imax = i;
            }
        }
        console.log("Matrix round B " + matrix);

        console.log("Imax = " + imax);
        if (j != imax) {
            var t;

            for (k = 0; k < n; k++) {
                t = matrix[j][k];
                matrix[j][k] = matrix[imax][k];
                matrix[imax][k] = t;
            }

            t = scaling[imax];
            scaling[imax] = scaling[j];
            scaling[j] = t;

            sign = -sign;
        }

        console.log("Matrix round " + matrix);
        if (j != n - 1) {
            for (i = j + 1; i < n; i++) {
                console.log("DIVIDE " + matrix[i][j] + " [" + i + "][" + j + "].devide(" + matrix[j][j] + ", 100, 6) = " + matrix[i][j].divide(matrix[j][j], 100, 6));
                matrix[i][j] = matrix[i][j].divide(matrix[j][j], 100, 6);
            }
        }

        console.log("\n\n");
    }

    console.log("\n\n");
    console.log("Sign = " + sign);

    var result = 1;
    if (sign == -1) {
        result = -1;
    }

    console.log("Result before multiple " + result);
    for (i = 0; i < n; i++) {
        console.log("Multiple i = " + i + " value = " + matrix[i][i]);
        result *= matrix[i][i];
    }

    console.log("Result before devide " + result);
    if (isNaN(result)) {
        return 0;
    }

    return result.divide(1, 0, 6);
}