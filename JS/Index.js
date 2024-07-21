window.onload = () => {
    getTelephones();
    getCatalogsToTelephones();
    getCityToTelephones();
}

const getTelephones = () => {
    const url='http://localhost:5114/api/Telephone';
    $.get(url, function(response) {
        response.forEach(product => createProductIndex(product))
        response.forEach(product => addToSelectTelephone(product))
    })
}

const getCatalogsToTelephones = () => {
    const url='http://localhost:5114/api/Catalog/GetAllCatalogs';
    $.get(url, function(response) {
        response.forEach(product => addToSelectCatalogToTelephone(product))
    })
}

const getCityToTelephones = () => {
    const url='http://localhost:5114/api/Cities/GetAllCities';
    $.get(url, function(response) {
        response.forEach(product => addToSelectCityToTelephone(product))
    })
}

const addToSelectTelephone = (data) => {
    let updateTelephone = document.querySelector('.selectTelephoneUpdate');
    let deleteTelephone = document.querySelector('.selectTelephoneDelete');
    let addCityToTelephoneUpdate = document.querySelector('.addCityToTelephoneUpdate');
    let deleteCityTelephone = document.querySelector('.selectDeleteCityFromTelephone');
    let readyString = '<option value='+data.id+'>'+data.name+'</option>';

    updateTelephone.innerHTML += readyString;
    deleteTelephone.innerHTML += readyString;
    deleteCityTelephone.innerHTML += readyString;
    addCityToTelephoneUpdate.innerHTML += readyString;
}

const addToSelectCatalogToTelephone = (data) => {
    let createCatalog = document.querySelector('.newSelectTelephoneCatalogCreate');
    let updateCatalog = document.querySelector('.newSelectTelephoneCatalogUpdate');
    let readyString = '<option value='+data.id+'>'+data.name+'</option>';
    createCatalog.innerHTML += readyString;
    updateCatalog.innerHTML += readyString;
}

const addToSelectCityToTelephone = (data) => {
    let createTelephone = document.querySelector('.newSelectTelephoneCityCreate');
    let telephoneCity = document.querySelector('.addCityToTelephoneSelect');
    let readyString = '<option value='+data.id+'>'+data.name+'</option>';
    createTelephone.innerHTML += readyString;
    telephoneCity.innerHTML += readyString;
}

const createTelephoneRequest = () => {
    const url='http://localhost:5114/api/Telephone/CreateTelephone';
    let newName = document.querySelector("#createTelephoneInput").value;
    let newDescription = document.querySelector("#createTelephoneDescriptionInput").value;
    let newCatalog = $(".newSelectTelephoneCatalogCreate option:selected").val();
    let newCity = $(".newSelectTelephoneCityCreate option:selected").val();
    let newCost = document.querySelector("#newSelectTelephoneCityCostCreate").value;

    let json = 
    {
        name: newName,
        description: newDescription,
        catalog: newCatalog,
        cttCost: [
            {
                city: newCity,
                cost: newCost,
            }
        ]
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

const updateTelephoneRequest = () => {
    const url='http://localhost:5114/api/Telephone/UpdateTelephone';
    let idTelephone = $("#selectTelephoneUpdate");
    let nameTelephone = document.querySelector("#updateTelephoneInput").value;
    let descriptionTelephone = document.querySelector("#updateTelephoneDescriptionInput").value;
    let catalogTelephone = $(".newSelectTelephoneCatalogUpdate option:selected");
    let sityCostCatalog = document.querySelectorAll(".oneCityCost");
    let telephoneId = idTelephone.val();
    let newCatalogId = catalogTelephone.val();

    if(telephoneId === "null"){
        alert("Choose Telephone");
        return;
    }

    let arrayCityCost = [];
    sityCostCatalog.forEach(element => {
        let cityCost = {
            cityId: element.querySelector(".updateCityCostCity").id,
            cost: element.querySelector(".updateCityCostCost").value,
        }
        arrayCityCost.push(cityCost)
    });

    let json = {
        id : telephoneId,
        name : nameTelephone,
        description : descriptionTelephone,
        catalogId : newCatalogId,
        cityCost : arrayCityCost
    }
    
    jQuery.ajax ({
        url: url,
        type: "PUT",
        data: JSON.stringify(json),
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

const deleteTelephoneRequest = () => {
    const url='http://localhost:5114/api/Telephone/DeleteTelephone';
    let deletedCatalog = $(".selectTelephoneDelete option:selected");
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

const dynamicCityCost = () => {
    let divToRemove = document.querySelector('.dynamicCityCost');
    while (divToRemove.firstChild) {
        divToRemove.removeChild(divToRemove.lastChild);
    }

    let updatedTelephone = $(".selectTelephoneUpdate option:selected");
    let id = updatedTelephone.val();

    if(id === "null"){
        return;
    }

    const url='http://localhost:5114/api/Telephone/'+id+'/Telephone';

    $.get(url, function(response) {
        response.cityCost.forEach(product => createCityCost(product))
    })
}

const createCityCost = (data) => {
    let createTelephone = document.querySelector('.dynamicCityCost');
    let readyString = '\
        <div class="oneCityCost">\
            <label for="updateCityCostCity">City:</label>\
            <input type="text" class="updateCityCostCity" id="'+data.cityId+'" name="updateCityCostCity" value="'+data.city+'" readonly>\
            <label for="updateCityCostCost">cost:</label>\
            <input type="number" class="updateCityCostCost" id="'+data.cityId+'" name="updateCityCostCost" value="'+data.cost+'">\
            <br></br>\
        </div>'
    createTelephone.innerHTML += readyString;
}

const changeVisibilityTelephone = (data) => {
    let createTelephone = document.querySelector('.createTelephone');
    let updateTelephone = document.querySelector('.updateTelephone');
    let deleteTelephone = document.querySelector('.deleteTelephone');
    let addCityToTelephone = document.querySelector('.addCityToTelephone');
    let deleteCityFromTelephone = document.querySelector('.deleteCityFromTelephone');

    createTelephone.style.display = 'none'
    updateTelephone.style.display = 'none'
    deleteTelephone.style.display = 'none'
    addCityToTelephone.style.display = 'none'
    deleteCityFromTelephone.style.display = 'none'

    switch(data){
        case 'create':
            createTelephone.style.display = 'block'
            break;
        case 'update':
            updateTelephone.style.display = 'block'
            break;
        case 'delete':
            deleteTelephone.style.display = 'block'
            break;
        case 'addCity':
            addCityToTelephone.style.display = 'block'
            break;
        case 'deleteCity':
            deleteCityFromTelephone.style.display = 'block'
            break;
    }   
    
    return true;
}

const setCities = () => {
    let telephoneId = $('.selectDeleteCityFromTelephone option:selected');
    let id = telephoneId.val();

    if(id === "null"){
        return;
    }

    let telephoneCity = document.querySelector('.selectDeleteCityFromCity');

    while (telephoneCity.firstChild) {
        telephoneCity.removeChild(telephoneCity.lastChild);
    }

    const url='http://localhost:5114/api/Telephone/'+id+'/Telephone';

    $.get(url, function(response) {
        response.cityCost.forEach(product => {
            let readyString = '<option value='+product.cityId+'>'+product.city+'</option>';
            telephoneCity.innerHTML += readyString;
        })
    })
}

const addCityTelephoneRequest = () => {
    let selectedTelephone = $(".addCityToTelephone option:selected");
    let id = selectedTelephone.val();
    const url='http://localhost:5114/api/Telephone/AddCityToTelephone';
    let citiesJSON = []
    let newCityId = $(".addCityToTelephoneSelect option:selected").val();
    let cost = document.querySelector('#addCityToTelephoneCosts').value;

    citiesJSON.push({cityId: newCityId, cost: cost})

    json = {
        telephoneId: id,
        cities : citiesJSON
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

const deleteCityTelephoneRequest = () => {
    let selectedTelephone = $(".selectDeleteCityFromTelephone option:selected");
    let id = selectedTelephone.val();
    if(id === "null"){
        alert("Choose Telephone");
        return;
    }
    const url='http://localhost:5114/api/Telephone/DeleteCityFromTelephone';
    let citiesJSON = []
    let newCityId = $(".selectDeleteCityFromCity option:selected").val();

    citiesJSON.push(newCityId)

    json = {
        telephoneId: id,
        cityIds : citiesJSON
    }

    jQuery.ajax ({
        url: url,
        type: "DELETE",
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