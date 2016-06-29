$(function() {
    var lodash = _.noConflict();
    var underscore = _.noConflict();

    var index = 1;

    var dataSize = 40000;
    var dupRate = dataSize * 0.011;

    // console.log(lodash);
    // console.log(underscore);

    testDifference();

    return void(0);

    function testDifference() {
        var differences = [
            myEs5Difference,
            myEs6Difference,
            lodash.difference,
            underscore.difference
        ];
        var data = createData();

        console.log(data);

        for(let diff of differences) {
            logProfileInfo(function() {
                var diffData = diff(data[0], data[1]);
                console.log(diffData.length);
            });
        }
    }

    function logProfileInfo(cb) {
        var cbName = cb.Name || index++;

        console.group(cbName);
        // console.profile(cbName);
        console.time(cbName);

        cb();

        console.timeEnd(cbName);
        // console.profileEnd(cbName);
        console.groupEnd(cbName);
    }

    function createData() {
        var data2 = [];
        var data1 = lodash.range(dataSize)
            .map(function(n) {
                var id = guid();
                data2.push(n % dupRate ? guid() : id);
                return id;
            });
        return [data1, data2];
    }

    function guid() {
        var id = 'xxxxxxxx-xxxx-xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function(c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }
        );

        // return new String(id);
        return id;
    }

    function myEs6Difference(arr1, arr2) {
        // var set = new WeakSet(arr1);
        var set = new Set(arr1);

        return arr2.filter(function(id) {
            return !set.has(id);
        });
    }

    function myEs5Difference(arr1, arr2) {
        var set = Object.create(null);

        arr1.map(function(id) {
            set[id] = true;
        });

        return arr2.filter(function(id) {
            return set[id] !== true;
        });
    }
});
