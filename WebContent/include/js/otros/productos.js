/*Metodo para mostrar el listado de productos*/

function __listadoProductos(producto, partida){
	swal({
		  title: 'Catálogo de Productos',
		  text: 'Muestra el catálogo de productos',
		  html:
			  '<iframe width="600" height="400" frameborder="0" src="../../sam/consultas/muestra_productos.action?producto='+producto+'&partida='+partida+'"></iframe>',
		  width: 800,
		  confirmButtonText: 'Cerrar',
		  padding: 10,
		  animation: false
		})
	//jWindow('<iframe width="600" height="400" frameborder="0" src="../../sam/consultas/muestra_productos.action?producto='+producto+'&partida='+partida+'"></iframe>','Catalogo de Productos', '','Cerrar ',1);
}

/*Devuelve el presupuesto de la pantalla hija*/

function __regresaProducto(producto, ID_ARTICULO , GRUPO, SUBGRUPO, CLAVE, PRECIO, UNIDMEDIDA, CLV_UNIDAD ){
	$('#txtproducto').attr('value',producto); 
	$('#txtprecioestimado').attr('value',PRECIO); 
	$('#txtunidadmedida').attr('value',UNIDMEDIDA);
	$('#ID_ARTICULO').attr('value',ID_ARTICULO); 
	$('#txtprecioestimado').focus();
//	$('#GRUPO').attr('value',GRUPO); 
//	$('#SUBGRUPO').attr('value',SUBGRUPO);
	$('#CLAVE').attr('value',CLAVE);
	$('#CVE_UNIDAD_MEDIDA').attr('value',CLV_UNIDAD);
	$(".swal2-container.swal2-shown").remove();//Cierra la ventana modal.
	
}
