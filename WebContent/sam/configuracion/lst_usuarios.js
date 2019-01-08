/**
*Descripcion: Codigo controlador para la pagina Usuarios.jsp
*Autor      : Mauricio Hernandez
*Fecha      : 10/11/2009
*/

/**
*Al iniciar la pagina carga los eventos a los controles del formulario
*/
$(document).ready(function() {  
		
	$("#txtPersona").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
	    $("#TbPersona tr").filter(function() {
	      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    });
	  });
	
	$('#cmdnewuser').click(function (event){modificarDatos(0)});
	
	/*
	 //Checkbox para seleccionar toda la lista.... 
	  $("input[name=todos]").change(function(){
	  	$('input[type=chkpers]').each( function() {			
	  		if($("input[name=todos]:checked").length == 1){
	  			this.checked = true;
	  		} else {
	  			this.checked = false;
	  		}
	  	});
	  });
	  //Para seleccionar todos los checkbox Abraham Gonzalez 12/07/2016
	  $('#todos').click( function (event){ $('input[name=chkpers]').prop('checked', this.checked); });
	 */
});


function nuevoBeneficiario(){
	$('#nuevo_beneficiario').click(function(){
		
	});
}

/*--------------------------------- Manda a cargar la op desde el listado de op -------------------------------------*/
/*function modificarDatos(cve_pers){
	var titulo = (cve_pers==0) ? "Nueva persona": "Editar persona";
	
	swal({
		  title: '',
		  text: '',
		  html:
			  '<iframe width="770" height="550" name="BENEFI" id="BENEFI" frameborder="0" src="../../sam/configuracion/personas_usuarios.action?cve_pers='+cve_pers+'"></iframe>',
		  width: 770,
		  padding: 10,
		  animation: false,
		  confirmButtonText: 'Cerrar',
		  showConfirmButton: false
		})

}*/

function modificarDatos(cve_pers){
		
	//document.location = 'orden_pago.action?cve_op='+ cve_op + '&accion=edit';
	//if (status==-1)document.location = "orden_pago.action?cve_op="+cve_op+"&accion=edit";
	//if(status==0||status==4||status==6) getConsultaOrdenPago(cve_op);
	swal({
		  title: 'Abriendo usuario...',
		  text: 'El usuario para editar es: ' +cve_pers,
		  timer: 2000,
		  onOpen: function () {
		    swal.showLoading()
		  }
		}).then(
		  function () {},
		  // handling the promise rejection
		  function (dismiss) {
		    if (dismiss === 'timer') {
		        document.location = 'personas_usuarios.action?cve_pers='+ cve_pers + '&accion=edit';
		    }
		  }
		)
}


