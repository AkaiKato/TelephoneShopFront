window.onload = () => {
    getCities();
}

const getCities = () => {
    const url='http://localhost:5114/api/Cities/GetAllCities';
    $.get(url, function(response) {
        console.log(response);
        response.forEach(product => createCity(product))
        response.forEach(product => addToSelectCity(product))
    })
}

const changeVisibilityCity = (data) => {
    let createCity = document.querySelector('.createCity');
    let updateCity = document.querySelector('.updateCity');
    let deleteCity = document.querySelector('.deleteCity');

    createCity.style.display = "none"
    updateCity.style.display = "none"
    deleteCity.style.display = "none"

    switch(data){
        case 'create':
            createCity.style.display = "block"
            break;
        case 'update':
            updateCity.style.display = "block"
            break;
        case 'delete':
            deleteCity.style.display = "block"
            break;
    } 
    
}

const addToSelectCity = (data) => {
    let updateCity = document.querySelector('.selectCityUpdate');
    let deleteCity = document.querySelector('.selectCityDelete');
    let readyString = '<option value='+data.id+'>'+data.name+'</option>';
    updateCity.innerHTML += readyString;
    deleteCity.innerHTML += readyString;
}

const createCityRequest = () => {
    const url='http://localhost:5114/api/Cities/CreateCity';
    let newCity = document.querySelector("#createCityInput").value;
    jQuery.ajax ({
        url: url,
        type: "POST",
        data: JSON.stringify({name: newCity}),
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

const updateCityRequest = () => {
    const url='http://localhost:5114/api/Cities/UpdateCity';
    let updateCity = $(".selectCityUpdate option:selected");
    let id = updateCity.val();
    let text = document.querySelector("#updateCityInput").value;
    jQuery.ajax ({
        url: url,
        type: "PUT",
        data: JSON.stringify({id: id,name: text}),
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

const deleteCityRequest = () => {
    const url='http://localhost:5114/api/Cities/DeleteCity';
    let deleteCity = $(".selectCityDelete option:selected");
    let id = deleteCity.val();
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

