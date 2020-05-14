let utils = require("./utils.js");
rows1 = '010900052'.split('');
rows2 = '000026300'.split('');
rows3 = '049500000'.split('');
rows4 = '008370400'.split('');
rows5 = '600800070'.split('');
rows6 = '700002900'.split('');
rows7 = '401008705'.split('');
rows8 = '080061040'.split('');
rows9 = '000030081'.split('');
nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
rowTotal = rows1.concat(rows2, rows3, rows4, rows5, rows6, rows7, rows8, rows9);

rowTotal = '050070600106008020000001300000000039038090005500040800000000706019700000002106090'.split('');
if (rowTotal.length != 81) {
    console.log("数组长度出错:", rowTotal.length);
    exit();
}
function getColume() {
    colume1 = []; colume2 = []; colume3 = []; colume4 = []; colume5 = []; colume5 = []; colume6 = []; colume7 = []; colume8 = []; colume9 = [];
    rowTotal.forEach((value, index) => {
        switch (index % 9) {
            case 0:
                colume1.push(value);
                break;
            case 1://
                colume2.push(value);
                break;
            case 2://
                colume3.push(value);
                break;
            case 3://
                colume4.push(value);
                break;
            case 4://
                colume5.push(value);
                break;
            case 5://
                colume6.push(value);
                break;
            case 6://
                colume7.push(value);
                break;
            case 7://
                colume8.push(value);
                break;
            case 8://
                colume9.push(value);
                break;
            default:
                break;

        }
    })
}
function getKuai() {
    kuai1 = []; kuai2 = []; kuai3 = []; kuai4 = []; kuai5 = []; kuai5 = []; kuai6 = []; kuai7 = []; kuai8 = []; kuai9 = [];
    rowTotal.forEach((value, index) => {
        if (Math.floor(index / 9) < 3 && index % 9 < 3) {
            kuai1.push(value);
        } else if (Math.floor(index / 9) < 3 && index % 9 < 6) {
            kuai2.push(value);
        } else if (Math.floor(index / 9) < 3 && index % 9 < 9) {
            kuai3.push(value);
        } else if (Math.floor(index / 9) < 6 && index % 9 < 3) {
            kuai4.push(value);
        } else if (Math.floor(index / 9) < 6 && index % 9 < 6) {
            kuai5.push(value);
        } else if (Math.floor(index / 9) < 6 && index % 9 < 9) {
            kuai6.push(value);
        } else if (Math.floor(index / 9) < 9 && index % 9 < 3) {
            kuai7.push(value);
        } else if (Math.floor(index / 9) < 9 && index % 9 < 6) {
            kuai8.push(value);
        } else if (Math.floor(index / 9) < 9 && index % 9 < 9) {
            kuai9.push(value);
        }

    })
}
function getRow() {
    row1 = []; row2 = []; row3 = []; row4 = []; row5 = []; row5 = []; row6 = []; row7 = []; row8 = []; row9 = [];
    rowTotal.forEach((value, index) => {
        switch (Math.floor(index / 9)) {
            case 0://rows1
                row1.push(value);
                break;
            case 1://rows2
                row2.push(value);
                break;
            case 2://rows3
                row3.push(value);
                break;
            case 3://rows4
                row4.push(value);
                break;
            case 4://
                row5.push(value);
                break;
            case 5://
                row6.push(value);
                break;
            case 6://
                row7.push(value);
                break;
            case 7://
                row8.push(value);
                break;
            case 8://
                row9.push(value);
                break;
            default:
                break;

        }
    })
}
function getLeftNums(index) {//得到可填数字的数组 rowTotal[3]
    let result = [];

    switch (Math.floor(index / 9)) {
        case 0://rows1
            result = testArray(nums, row1);
            break;
        case 1://row2
            result = testArray(nums, row2);
            break;
        case 2://row3
            result = testArray(nums, row3);
            break;
        case 3://row4
            result = testArray(nums, row4);
            break;
        case 4://
            result = testArray(nums, row5);
            break;
        case 5://
            result = testArray(nums, row6);
            break;
        case 6://
            result = testArray(nums, row7);
            break;
        case 7://
            result = testArray(nums, row8);
            break;
        case 8://
            result = testArray(nums, row9);
            break;
        default:
            break;

    }
    switch (index % 9) {
        case 0:
            result = testArray(result, colume1);
            break;
        case 1://
            result = testArray(result, colume2);
            break;
        case 2://
            result = testArray(result, colume3);
            break;
        case 3://
            result = testArray(result, colume4);
            break;
        case 4://
            result = testArray(result, colume5);
            break;
        case 5://
            result = testArray(result, colume6);
            break;
        case 6://
            result = testArray(result, colume7);
            break;
        case 7://
            result = testArray(result, colume8);
            break;
        case 8://
            result = testArray(result, colume9);
            break;
        default:
            break;

    }
    if (Math.floor(index / 9) < 3 && index % 9 < 3) {
        result = testArray(result, kuai1);
    } else if (Math.floor(index / 9) < 3 && index % 9 < 6) {
        result = testArray(result, kuai2);
    } else if (Math.floor(index / 9) < 3 && index % 9 < 9) {
        result = testArray(result, kuai3);
    } else if (Math.floor(index / 9) < 6 && index % 9 < 3) {
        result = testArray(result, kuai4);
    } else if (Math.floor(index / 9) < 6 && index % 9 < 6) {
        result = testArray(result, kuai5);
    } else if (Math.floor(index / 9) < 6 && index % 9 < 9) {
        result = testArray(result, kuai6);
    } else if (Math.floor(index / 9) < 9 && index % 9 < 3) {
        result = testArray(result, kuai7);
    } else if (Math.floor(index / 9) < 9 && index % 9 < 6) {
        result = testArray(result, kuai8);
    } else if (Math.floor(index / 9) < 9 && index % 9 < 9) {
        result = testArray(result, kuai9);
    }
    return result;
}
function testArray(left, arr) {//
    var res = [];
    for (let index = 0; index < left.length; index++) {
        if (arr.indexOf(left[index]) == -1) {
            res.push(left[index]);
        }

    }
    return res;
}
function start() {
    getColume();
    getKuai();
    getRow();
    for (let index = 0; index < rowTotal.length; index++) {
        if (rowTotal[index] == "0") {
            let leftNums = getLeftNums(index);
            // console.log('角标:' + index, leftNums);

            if (leftNums.length == 1) {
                rowTotal[index] = leftNums[0];
                console.log('排除  修改rowTotal' + index + '的值为:', leftNums[0])
                start();
                // break;
            }
        } else {
            // console.log('角标:' + index + '当前值:', rowTotal[index]);
        }
    }
    testRow()
    testColume()
    if (rowTotal.indexOf('0') != -1 && count++ < 80) {
        start();
    }

}
var count = 0;
// start()
// getColume();
// getKuai();
// getRow();

// testColume()
// testRow()
// console.log('最终结果:\n', rowTotal.join(''));
// getRow();
// console.log(row1);
// console.log(row2);
// console.log(row3);
// console.log(row4);
// console.log(row5);
// console.log(row6);
// console.log(row7);
// console.log(row8);
// console.log(row9);

function testRow() {
    for (let index = 0; index < rowTotal.length; index++) {
        if (index % 3 == 0) {
            tempArr = rowTotal.slice(index, index + 3);
            if (tempArr.indexOf('0') != -1 && tempArr.indexOf('0') == tempArr.lastIndexOf('0')) {
                // console.log(index, tempArr, rowTotal.indexOf('0', index));
                pos = rowTotal.indexOf('0', index);
                var v = '0';
                switch (Math.floor(pos / 9)) {
                    case 0:
                        v = getValue(getLeftNums(pos), row2, row3);
                        break;
                    case 1:
                        v = getValue(getLeftNums(pos), row1, row3);
                        break;
                    case 2:
                        v = getValue(getLeftNums(pos), row2, row1);
                        break;
                    case 3:
                        v = getValue(getLeftNums(pos), row4, row6);
                        break;
                    case 4:
                        v = getValue(getLeftNums(pos), row4, row6);
                        break;
                    case 5:
                        v = getValue(getLeftNums(pos), row4, row5);
                        break;
                    case 6:
                        v = getValue(getLeftNums(pos), row8, row9);
                        break;
                    case 7:
                        v = getValue(getLeftNums(pos), row7, row9);
                        break;
                    case 8:
                        v = getValue(getLeftNums(pos), row7, row8);
                        break;

                    default:
                        break;
                }
                rowTotal[pos] = v;

                v != '0' && console.log('行 修改rowTotal=' + pos + '的值为:', v)
            }
        }
    }
}

function testColume() {
    for (let index = 0; index < rowTotal.length; index++) {
        if (Math.floor(index / 9) % 3 == 0) {
            tempArr = [rowTotal[index], rowTotal[index + 9], rowTotal[index + 18]];
            if (tempArr.indexOf('0') != -1 && tempArr.indexOf('0') == tempArr.lastIndexOf('0')) {
                // console.log(index, tempArr);
                pos = index + 9 * tempArr.indexOf('0');
                var v = '0';
                switch (pos % 9) {
                    case 0:
                        v = getValue(getLeftNums(pos), colume2, colume3);
                        break;
                    case 1:
                        v = getValue(getLeftNums(pos), colume1, colume3);
                        break;
                    case 2:
                        v = getValue(getLeftNums(pos), colume2, colume1);
                        break;
                    case 3:
                        v = getValue(getLeftNums(pos), colume4, colume6);
                        break;
                    case 4:
                        v = getValue(getLeftNums(pos), colume4, colume6);
                        break;
                    case 5:
                        v = getValue(getLeftNums(pos), colume4, colume5);
                        break;
                    case 6:
                        v = getValue(getLeftNums(pos), colume8, colume9);
                        break;
                    case 7:
                        v = getValue(getLeftNums(pos), colume7, colume9);
                        break;
                    case 8:
                        v = getValue(getLeftNums(pos), colume7, colume8);
                        break;

                    default:
                        break;
                }
                rowTotal[pos] = v;

                v != '0' && console.log('列  修改rowTotal==' + pos + '的值为:', v)
            }
        }
    }

}
function getValue(arr, arr1, arr2) {
    for (let index = 0; index < arr.length; index++) {
        if (arr1.indexOf(arr[index]) != -1 && arr2.indexOf(arr[index]) != -1) {
            return arr[index];
        }
    }
    return '0';
}
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}
str = utils.ocrText(810, 1755, 152, 150);
console.log(str);
