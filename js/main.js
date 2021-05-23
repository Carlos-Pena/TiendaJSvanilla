document.addEventListener('DOMContentLoaded', () => {

    const clickEventos = () => {

        document.addEventListener('click', async e => {
            const listaProductos = document.getElementById('lista-productos');
            let className = e.target.className;
            console.log(className)
            let selectedItem = e.target.innerText;


            if (className.includes('nav-link') && e.target.id !="menu-button") {
                listaProductos.innerHTML = "";
                console.log('estas en categorias del nav-bar')

                const consulta = await fetch("http://localhost:3000/productos/" + selectedItem);
                const resultado = await consulta.json();


                Object.values(resultado.body).forEach(item => {
                    listaProductos.innerHTML += `
                    <div class="col">
                    <div class="card">
                        <img src="http://localhost:3000/imagenes/${item.imagen}" class="card-img-top" style="
                        height: 100px; width:100px" alt="...">
                        <div class="card-body">
                            <h5 class="card-title" style="height:100px;"><a style="color:black !important; font-size:15px !important">${item.nombre}</a></h5>
                            <hr>
                            <a href="#" class="btn btn-primary">${item.precio}</a>
                            <a href="#" class="btn btn-primary">Añadir</a>
                        </div>
                    </div>
                </div>
                    `;
                })

            }
            else if (className.includes('dropdown-item')) {
                console.log('estas en los items del nav-bar')
            }
        })
    }

    const cargarMenu = () => {

        const computadoraOptions = document.getElementById('computadora-items')
        const videojuegosOptions = document.getElementById('videojuegos-items')

        fetch("http://localhost:3000/productos/categorias")
            .then(data => data.json())
            .then(data => {
                Object.values(data.body).forEach(item => {
                    if (item.idcategoria === 1) { //id: computadoras
                        computadoraOptions.innerHTML += `<a class="dropdown-item" href="#">${item.nombre}</a>`
                    }
                    else if (item.idcategoria === 2) { //id:2 videojuegos
                        videojuegosOptions.innerHTML += `<a class="dropdown-item" href="#">${item.nombre}</a>`
                    }
                })
            })
            .catch(err => console.error(err))

    }

    cargarMenu();
    clickEventos();

    //************** NAV BAR ANIMACION ***************/

    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 768px)").matches) {
            $dropdown.hover(
                function () {
                    console.log("sobre button")
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    //************************ FIN NAV BAR*****************************//

})