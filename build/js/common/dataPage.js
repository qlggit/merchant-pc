$.showDataPage = function(options){
    var autoData,totalElements,totalPages,showData;
    var $table = options.showTable ||　$('.show-data-table');
    var $searchForm = options.searchForm ||$('.search-form');
    var autoPage = options.autoPage || 0;
    options.getSearchData = options.getSearchData || function(){return $searchForm.__serializeJSON()};
    $searchForm.submit(function(){
        doSearch();
        return false;
    });
    function doSearch(page){
        if(options.localStorage){
            page = 1;
        }
        else{
            page = page == null?autoPage : page+(autoPage?0:-1);
        }
        var data = options.getSearchData();
        data.page = page;
        data.pageSize = resJson.usePageSize;
        $.get(options.url , data , function(a){
            autoData = a.data.content || a.data;
            totalElements = a.data.totalElements;
            totalPages = a.data.totalPages;
            setPage(page);
        });
    }
    var $page;
    function setPage(page){
        if(options.localStorage){
            page -= 1;
            page = page || 0;
            totalElements = autoData.length;
            totalPages = Math.ceil(autoData.length / resJson.usePageSize);
            showData = autoData.slice(page * usePageSize , (page + 1) * usePageSize);
        }else{
            if(totalPages == null)totalPages = Math.ceil(totalElements / resJson.usePageSize);
            showData = autoData;
        }
        $table.find('.data-list').remove();
        $.each(showData , function(i , o){
            $table.append(options.createTr(i , o));
        });
        if(totalElements){
            if(!$page){
                $table.after($page = $('<div>').addClass('table-page mt-30'));
            }
            $page.show();
            $page.dataTablePage({
                page:autoPage?page:page+1,
                allNumber:totalElements,
                allPage:totalPages,
                done:options.localStorage?setPage:doSearch
            });
        }else{
            if($page)$page.hide();
        }
        if(options.done)options.done(autoData , showData);
    }
    doSearch();
    return {
        doSearch:doSearch
    };
};