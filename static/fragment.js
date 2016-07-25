/**
 **/
window.onload = function() {
    gethash();
    document.getElementById("add").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            add();
        }
    });
}

function gethash() {
    var query = window.location.hash.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] !== '') {
            if (pair[0] == 'html') {
                document.getElementById("2").value = b64DecodeUnicode(pair[1]); //TODO: add warning if base64 decode did not work
            } else {
                name = pair[0];
                value = pair[1];
                var x = document.createElement("input");
                x.setAttribute("type", "text");
                x.setAttribute("name", name);
                x.setAttribute("value", decodeURI(value));
                x.setAttribute("class", "form-control 2");
                document.getElementById("form-group").innerHTML += '<div class="frm"> <div class="form-group"> <label for="name" class="col-lg-4">' + encodeURI(name) + ':</label> <div class="col-lg-8" id="a">';
                document.getElementById("a").id = name;
                lal = document.getElementById(name);
                lal.appendChild(x);
                document.getElementById("form-group").innerHTML += '</div></div></div>';
            }
        }
    }
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function add() {

    if (document.getElementById("add").value !== "") {
        name = document.getElementById("add").value.split(':')[0];
        value = document.getElementById("add").value.slice(name.length+1);
        var x = document.createElement("input");
        x.setAttribute("type", "text");
        x.setAttribute("name", name);
        x.setAttribute("value", value);
        x.setAttribute("class", "form-control 2");
        document.getElementById("form-group").innerHTML += '<div class="frm"> <div class="form-group"> <label for="name" class="col-lg-4">' + encodeURI(name) + ':</label> <div class="col-lg-8" id="a">';
        document.getElementById("a").id = name;
        lal = document.getElementById(name);
        lal.appendChild(x);
        document.getElementById("form-group").innerHTML += '</div></div></div>';
        document.getElementById("add").value = "";
    }
}

document.getElementById("1337").addEventListener("submit", bas64stuff);
function bas64stuff() {
    l = document.getElementsByClassName("form-control 2").length
    location.hash = "";
    for (i = 0; i < l; i++) {
        location.hash += '&' + encodeURIComponent(document.getElementsByClassName("form-control 2")[i].name) + '=' + encodeURI(document.getElementsByClassName("form-control 2")[i].value)
    }
    html = document.getElementById("2").value
    location.hash += '&html=' + window.btoa(unescape(encodeURIComponent(html)));
    document.getElementById("2").value = b64EncodeUnicode(document.getElementById("2").value);
}
