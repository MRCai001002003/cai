define(function() {

    function Pagination() {
        this.html = '';
        this.pages = 0;
        this.currentPage = 1;
        this.first = '<li><a href="javascript:;">首页</li>';
        this.last = '<li><a href="javascript:;">尾页</li>';
        this.prev = '<li><a href="javascript:;">上一页</li>';
        this.next = '<li><a href="javascript:;">下一页</li>';
        this.disabled = '<li><a href="javascript:;" class="disabled">…</a></li>';
    };
    Pagination.prototype.reset = function() {
        this.currentPage = 1;
        this.pages = 1;
        return Pagination.init.call(this);
    };
    Pagination.prototype.getCurrentPage = function() {
        return this.currentPage;
    };
    Pagination.prototype.init = function(currentPage, pages) {
        if (pages < 1) pages = 1;
        if (currentPage > pages) currentPage = pages;
        this.currentPage = currentPage;
        this.pages = pages;
        return Pagination.init.call(this);
    };
    Pagination.init = function() {
        var _this = this;
        this.html = '';
        if (this.pages < 2) return;
        if (this.currentPage != 1 && this.pages > 1) {
            this.html += this.first;
            this.html += this.prev;
        }
        var small = this.pages <= 10 ? 1 : this.pages - this.currentPage >= 9 ? this.currentPage - 4 : this.pages - (this.pages - this.currentPage > 4 ? this.pages - this.currentPage : 4) - 4;
        var big = this.pages <= 10 ? this.pages : this.currentPage + 4;
        if (small < 1) {
            big = big - small;
            small = 1;
        }
        if (big > this.pages) big = this.pages;
        var bCreate = true;
        for (; small < big + 1; small++) {
            (function(small) {
                if (_this.currentPage > 5 && bCreate && _this.pages > 10) {
                    _this.html += _this.disabled;
                    bCreate = false;
                }
                if (small == _this.currentPage) {
                    _this.html += '<li class="active"><a href="javascript:;">' + small + '</a></li>';
                } else {
                    _this.html += '<li><a href="javascript:;">' + small + '</a></li>';
                }
            })(small)
        }
        if (this.pages > 10 && this.pages - this.currentPage > 4) {
            this.html += this.disabled;
        }
        if (this.pages > 1 && this.currentPage < this.pages) {
            this.html += this.next;
            this.html += this.last;
        }
        return this.html;
    };
    return Pagination;
})
