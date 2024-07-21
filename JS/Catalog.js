window.onload = () => {
    getCatalogs();
}

const getCatalogs = () => {
    const url='http://localhost:5114/api/Catalog/GetAllCatalogs';
    $.get(url, function(response) {
        console.log(response);
        response.forEach(product => createCatalog(product))
        response.forEach(product => addToSelectCatalog(product))
    })
}

const addToSelectCatalog = (data) => {
    let updateCatalog = document.querySelector('.selectCatalogUpdate');
    let deleteCatalog = document.querySelector('.selectCatalogDelete');
    let newUpdateParentCatalog = document.querySelector('.newSelectCatalogUpdate');
    let newCreateParentCatalog = document.querySelector('.newSelectCatalogCreate');
    let readyString = '<option value='+data.id+'>'+data.name+'</option>';
    updateCatalog.innerHTML += readyString;
    deleteCatalog.innerHTML += readyString;
    newUpdateParentCatalog.innerHTML += readyString;
    newCreateParentCatalog.innerHTML += readyString;
}

const changeVisibilityCatalog = (data) => {
    let createCatalog = document.querySelector('.createCatalog');
    let updateCatalog = document.querySelector('.updateCatalog');
    let deleteCatalog = document.querySelector('.deleteCatalog');

    createCatalog.style.display = "none"
    updateCatalog.style.display = "none"
    deleteCatalog.style.display = "none"

    switch(data){
        case 'create':
            createCatalog.style.display = "block"
            break;
        case 'update':
            updateCatalog.style.display = "block"
            break;
        case 'delete':
            deleteCatalog.style.display = "block"
            break;
    }     
}


const createCatalogRequest = () => {
    const url='http://localhost:5114/api/Catalog/CreateCatalog';
    let newCatalog = document.querySelector("#createCatalogInput").value;
    let newDescription = document.querySelector("#createCatalogDescriptionInput").value;
    let newParentCatalog = $(".newSelectCatalogCreate option:selected").val();

    let json = {
        name: newCatalog,
        description: newDescription
    }

    if(newParentCatalog !== 'null'){
        json = {
            name: newCatalog,
            description: newDescription,
            parentCatalog: newParentCatalog
        }
    }

    jQuery.ajax ({
        url: url,
        type: "POST",
        data: JSON.stringify(json),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data, status){
            window.location.reload()
        },
        error: function(jqXHR, exception){
            if(jqXHR.status == 200){
                window.location.reload()
            }
            else{
                alert(jqXHR.responseText)
            }
        }
    });
}

const updateCatalogRequest = () => {
    const url='http://localhost:5114/api/Catalog/UpdateCatalog';
    let updateCatalog = $(".selectCatalogUpdate option:selected");
    let updateParentCatalog = $(".newSelectCatalogUpdate option:selected");
    let id = updateCatalog.val();
    let catalogParentId = updateParentCatalog.val();
    let nameCatalog = document.querySelector("#updateCatalogInput").value;
    let descriptionCatalog = document.querySelector("#updateCatalogDescriptionInput").value;

    jQuery.ajax ({
        url: url,
        type: "PUT",
        data: JSON.stringify({id: id, name: nameCatalog, description: descriptionCatalog, parentCatalog: catalogParentId}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function(data, status){
            window.location.reload()
        },
        error: function(jqXHR, exception){
            if(jqXHR.status == 200){
                window.location.reload()
            }
            else{
                alert(jqXHR.responseText)
            }
        }
    });
}

const deleteCatalogRequest = () => {
    const url='http://localhost:5114/api/Catalog/DeleteCatalog';
    let deletedCatalog = $(".selectCatalogDelete option:selected");
    let id = deletedCatalog.val();
    jQuery.ajax ({
        url: url+'?id='+id,
        type: "DELETE",
        success: function(data, status){
            window.location.reload()
        },
        error: function(jqXHR, exception){
            if(jqXHR.status == 200){
                window.location.reload()
            }
            else{
                alert(jqXHR.responseText)
            }
        }
    });
}
