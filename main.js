
var $ = el => document.querySelector(el)
var $$ = el => document.querySelectorAll(el)



class Tabla{
    constructor(title){
        this.title = title
    }

}


class TablaCualitativa extends Tabla{

    constructor(title){
        super(title)
        this.v = {}
    }
    
    saveData(val){
        if(this.v[val] == null){
            this.v[val] = 1
        } else{
            this.v[val] = this.v[val] + 1
        }
    }

    show(){
        let header = `<tr>
                        <th>x</th>
                        <th>f</th>
                        <th>F</th>
                        <th>fr</th>
                        <th>Fr</th>
                    </tr>`
        for(var i in this.v){
            console.log(this.v[i])
        }
    }

}

var tabla
tabla = new TablaCualitativa("Prueba")

function save(){
    let val = $("#valor")
    if(val.value == ""){
        alert("Ingrese un valor porfavor")
    } else{
        tabla.saveData(val.value)
    }
    console.log(tabla)
}

function ola(){
    tabla.show()
}
a = $(".save")
a.addEventListener("click", save)

e = $(".ola")
e.addEventListener("click", ola)