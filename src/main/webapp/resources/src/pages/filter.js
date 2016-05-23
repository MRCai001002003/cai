define(function() {
    return function(app) {
        app.filter('companyNameFilter', function() {
            return function(data, key) {
                return data.replace(new RegExp('(' + key + ')', 'g'), '<span class="text-red">$1</span>');
            }
        });
        app.filter('dateFormat', function() {
            return function(timeNo, sRequired) {
                if (!timeNo) return '';
                sRequired = sRequired || 'yyyy-MM-dd';

                function toDouble(n) {
                    return n > 9 ? '' + n : '0' + n;
                }
                var weekArr = ['日', '一', '二', '三', '四', '五', '六'];
                var oDate = new Date();
                oDate.setTime(timeNo);
                var year = oDate.getFullYear();
                var month = toDouble(oDate.getMonth() + 1);
                var day = toDouble(oDate.getDate());
                var week = weekArr[oDate.getDay()];
                var h = toDouble(oDate.getHours());
                var m = toDouble(oDate.getMinutes());
                var s = toDouble(oDate.getSeconds());
                switch (sRequired) {
                    case 'yyyy-MM-dd':
                        return year + '-' + month + '-' + day;
                    case 'yyyy':
                        return year;
                    case 'MM':
                        return month;
                    case 'dd':
                        return day;
                    case 'yyyy-MM':
                        return year + '-' + month;
                    case 'MM-dd':
                        return month + '-' + day;
                    case 'hh:mm:ss':
                        return h + ':' + m + ':' + s;
                    case 'hh:mm':
                        return h + ':' + m;
                    case '年月日':
                        return year + '年' + month + '月' + day + '日';
                }
            }
        });
        app.filter('companyContact', function() {
            return function(value) {
                if (!value) return value;
                if (typeof value === 'string') {
                    return value.replace(/^\s*\[['"]|['"]\]\s*$/g, '');
                } else if (value.length && value[0]) {
                    return value[0];
                }
            }
        });
        app.filter('round', function() {
            return function(value) {
                return Math.round(+value) || 0;
            }
        });
        app.filter('splitTime', function() {
            return function(value) {
                return value.replace(/\s.*$/, '');
            }
        })
    }
})
