//Para el acceso al DOM...
let nom_div = param => document.getElementById(param);
//Para validar el email...
let ValidaEmail = email =>
{
    let emailReg = /^([\da-zA-Z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return emailReg.test(email);
};

//http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
let guid = () =>
{
    function _p8(s)
    {
        let p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
};

module.exports = {
                    nom_div,
                    ValidaEmail,
                    guid
                };
