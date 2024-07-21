const createProductIndex = (data) => {
    let mainTable = document.querySelector('.mainTable');
    let subTableCity = "";
    let subTableCost = "";

    data.cityCost.forEach(element => {
        subTableCity += createSubTrCity(element)
        subTableCost += createSubTrCost(element)
    })
    mainTable.innerHTML += '\
        <tr>\
            <td>'+data.name+'</td>\
            <td>'+data.description +'</td>\
            <td>'+data.catalogName+'</td>\
            <div class="tableTable">\
                <td>\
                    <table class="subTableCity">\
                    '+subTableCity+'\
                    </table>\
                </td>\
                <td>\
                    <table class="subTableCost">\
                    '+subTableCost+'\
                    </table>\
                </td>\
            </div>\
        </tr>\
    ';
}

const createSubTrCity = (data) => {
    return '\
    <tr class="subTr">\
        <td class="subTd" id="'+data.cityId+'">'+data.city+'</td>\
    </tr>'
}

const createSubTrCost = (data) => {
    return '\
    <tr class="subTr">\
            <td class="subTd">'+data.cost+'</td>\
    </tr>\
    ';
}

const createCity = (data) => {
    let mainTable = document.querySelector('.mainTable');
    mainTable.innerHTML += '\
        <tr>\
            <td>'+data.name+'</td>\
        </tr>\
    ';
}

const createCatalog = (data) => {
    let mainTable = document.querySelector('.mainTable');
    let parentName = data.parentCatalog === null ? "None" : data.parentCatalog.name;
    mainTable.innerHTML += '\
        <tr>\
            <td>'+data.name+'</td>\
            <td>'+data.description +'</td>\
            <td>'+parentName+'</td>\
        </tr>\
    ';
}
