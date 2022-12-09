// window.onload = createLine;
// window.onbeforeunload = themecheck;
document.addEventListener("DOMContentLoaded", function(event) { 
    click2();
    document.getElementById("lang_check").addEventListener('change', changeURLLanguage);
    window.addEventListener("load", (event) => {
    var hash = window.location.hash;
    if (hash == "#en") {
        document.getElementById("lang_check").checked = true;
        for (let key in langArr) {
            let elment = document.querySelector('.lng-' + key).innerHTML = langArr[key]['en'];
        }
        createLine;
    }
    else {
        createLine
    }
    themecheck();
    })
});

window.onresize = createLine;

const allLang = ['en', "ru"];

function getTopCoords(elem) { // кроме IE8- 
    // получаем Y top координату верх. элемента и записываем в box
    var box = elem.getBoundingClientRect();
    return {
        // возвращаем функцией Y координату начала элемента по отношению к документу 
        // + scroll как раз прибавляет вертикальный скролл
        top: box.top + scrollY,
    };
}

function getBottomCoords(elem) { // кроме IE8-
    // получаем Y bottom координату нижн. элемента и записываем в box
    var box = elem.getBoundingClientRect();
    return {
        bottom: box.bottom + scrollY
    };
}

function createLine(html) {
    // получаем предыдущими функциями координаты будущего начала и конца линии
    
    var prevLines = document.getElementById("f_line");
    var prevLines2= document.getElementById("f_line2");
    try {
        prevLines.parentNode.removeChild(prevLines)
        prevLines2.parentNode.removeChild(prevLines2)
    } catch (error) {
    } 
    
    let start = getTopCoords(border_top);
    let end = getBottomCoords(border_end);
    let start_line = getTopCoords(body);
    let end_line = getBottomCoords(body);
    // создаем див и пихаем в переменную
    const line = document.createElement('div');
    const line2 = document.createElement('div');
    line.setAttribute('id', 'f_line')
    line2.setAttribute('id', 'f_line2')
    // задаем немного свойств
    if (localStorage.getItem('theme') == 'dark') {
        line.style.cssText = "position:absolute; background-color: #cdaa11 !important; width: 0.1em; left: -2%; right:0;";
        line2.style.cssText = "position:absolute; background-color: #ffffff !important; width: 0.2em; left: 4%;";
    }
    else {
        line.style.cssText = "position:absolute; background-color: #4f524f; width: 0.1em; left: -2%; right:0;";
        line2.style.cssText = "position:absolute; background-color: #4aa24a; width: 0.2em; left: 4%;";
    }
    // координаты записываем в виде свойств CSS
    // line.style.top = start.top + "px";
    // line.style.bottom = end.top + "px";
    line.style.minHeight = end.bottom - start.top + "px";
    // console.log('Линия 1 готова')
    line2.style.minHeight = end_line.bottom - start_line.top + "px";
    // console.log('Линия 2 готова')
    // записываем новую разметку в наш DOM
    const currentDiv = document.getElementById("insert");
    var parentDiv = currentDiv.parentNode;
    parentDiv.insertBefore(line, currentDiv);
    const currentMainDiv = document.getElementById("insert_line2");
    var parentMainDiv = currentMainDiv.parentNode;
    parentMainDiv.insertBefore(line2, currentMainDiv);
    console.log("hey")
    return line, line2;
    
}

// darkmode

function themecheck() {
    if (localStorage.getItem('theme') == 'dark') {
        setDarkMode();

        if (document.getElementById('check').checked) {
            localStorage.setItem('check', true)
        }
    }
}

function setDarkMode() {
    const body_id = document.getElementById("body");
    const line1_id = document.getElementById("f_line")
    const line2_id = document.getElementById("f_line2")
    const list1 = document.getElementById("list-home-list")
    const list3 = document.getElementById("list-settings-list")
    let isDark = body_id.classList.toggle('darkmode');
    let link1 = document.getElementById('link1')
    let link2 = document.getElementById('link2')
    let link3 = document.getElementById('link3')
    line1_id.classList.toggle('line-darkmode');
    line2_id.classList.toggle('line2-darkmode');
    list1.classList.toggle('my-list');
    list3.classList.toggle('my-list');
    link1.classList.toggle('linkk-dark')
    link2.classList.toggle('linkk-dark')
    link3.classList.toggle('linkk-dark')
    

    if (isDark) {
        setDarkMode.checked = true;
        localStorage.setItem('theme', 'dark')
        document.getElementById('check').setAttribute('checked', 'checked')
    }
    else {
        setDarkMode.checked = true
        localStorage.removeItem('theme', 'dark')
    }
}

function click2() {
    document.getElementById('list-settings-list').addEventListener('click', createLine)
    document.getElementById('list-home-list').addEventListener('click', createLine)
}


// document.getElementById("lang_check").addEventListener('change', changeURLLanguage);

const lang_check = document.getElementById("lang_check")
//перенаправить на URL с нужным языком
function changeURLLanguage() {
    const ischecked = document.getElementById("lang_check").checked
    if (ischecked == true) {
        location.href = window.location.pathname + "#en"
        location.reload()
    }
    else {
        location.href = window.location.pathname
    }
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    // console.log(hash)
    if (!allLang.includes(hash) && location.href.substr(7) != window.location.pathname) {
            location.href = window.location.pathname + "#ru";
            location.reload();
    }

}

changeLanguage();