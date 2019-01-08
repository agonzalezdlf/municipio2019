/**
*Descripcion: Codigo controlador para la pagina Usuarios.jsp
*Autor      : Mauricio Hernandez
*Fecha      : 10/11/2009
*/

/**
*Al iniciar la pagina carga los eventos a los controles del formulario
*/
$(document).ready(function() {  
		
	$('#btnguardar').on('click', function(){
		guardar();
		});
	$('#btnBuscar').on('click', function(){
		buscar();
		});
	$('#btnlimpiar').on('click', function(){
		limpiar();
		});
	
	/*$('#cmdcerrar').on('click', function(){
		window.parent.swal.close();
	 });*/
	
	if(($('#idPersona').val()!=''||$('#idPersona').val()!='0')&&($('#accion').val()=='edit')){
		console.log('accion: ' +($('#accion').val()=='edit')+'    '+ '    cve_pers: ' + $('#idPersona').val());
		editar($('#idPersona').val());  
	  }
	
});


var area="";

function editar(cve_pers) {
	//value="<c:out value='${persona.APE_PAT}'/>"
	//value="<c:out value='${persona.APE_MAT}'/>"
	//value="<c:out value='${persona.CURP}'/>"*/
	//value="<c:out value='${persona.RFC}'/>" 
	//value="<c:out value='${persona.FECHA_ALTA}'/>"
	//value="<c:out value='${persona.LOGIN}'/>"
	//value="<c:out value='${persona.PASSWD}'/>"
	 controladorUsuariosRemoto.getUsuariosPorEjemplo(cve_pers, {
	        callback:function(items) { 		
	        	 $('#nombre').val(items.NOMBRE);	        	
	        	 $('#apaterno').val(items.APE_PAT);
	        	 $('#amaterno').val(items.APE_MAT);
	        	 $('#curp').val(items.CURP);
	        	 $('#rfc').val(items.RFC);
	        	 $('#fecha_alta').val(items.FECHA_ALTA);
	        	 $('#usuario').val(items.LOGIN);
	        	 $('#pass1').val(items.PASSWD);
	        	 $('#pass2').val(items.PASSWD);
	        	 alert('Estatus del usuario es: ' +items.ACTIVO);
	        	 if (items.ACTIVO=='S')
	 				$('#estatus').prop('checked',true);
	        	 //if ($('#estatus').is(':checked'))  estatus='S';	
	        } 					   				
	        ,
	        errorHandler:function(errorString, exception) { 
	           swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');      
	        }
	    });
}




 function editar3(cve_pers) {
	 swal({
		  title: 'Abriendo Orden de Pago...',
		  text: 'La Orden de pago para editar es: ' +cve_op,
		  timer: 2000,
		  onOpen: function () {
		    swal.showLoading()
		  }
		}).then(
		  function () {},
		  // handling the promise rejection
		  function (dismiss) {
		    if (dismiss === 'timer') {
		      console.log(cve_op)
		      document.location = 'personas_usuarios.action?cve_pers='+ cve_pers + '&accion=edit';
		    }
		  }
		)	 
 } 
 
 
 function guardar(){		
	 
	 	var idpers = $('#idPersona').val();
	 	alert('Esta es la persona que se va a ingresar o actualizar: ' +idpers);	 	
	    var error="";
		var titulo ='Informacion no valida';
		if ($('#nombre').val()=="")  {swal({title:'Nombre no válido',type:'warning'}); return false;}	
		if ($('#apaterno').val()=="") {swal({title:'Apellido paterno no válido', type:'warning'}); return false;}
		if ($('#amaterno').val()=="") {swal({title:'Apellido materno no válido', type:'warning'}); return false;}	
		if ($('#profesion').val()=="") {swal({title:'La profesion del usuario no es válida',type:'warning'}); return false;}
		if ($('#unidad').val()=="")  {swal({title:'Unidad administrativa no válida',type:'warning'}); return false;}	
		if ($('#usuario').val()=="" && $('#pass1').val()=="" && $('#clave').val()=="")  {swal({title:'El password no es válido', type:'warning'}); return false;}
		if ($('#usuario').val()!="" && $('#pass1').val()!=$('#pass2').val())  {swal({title:'Los password no coinciden',type:'warning'}); return false;}
			
		var estatus='N';
		// $("#aceptar").is(':checked');
		if ($('#estatus').is(':checked'))	
		   estatus='S';	
		
		swal({
			  title: 'Confirma que desea guardar la información del usuarios',
			  text: 'Guardando usuario',
			  type: 'info',
			  showCancelButton: true,
			  showLoaderOnConfirm: true,
			  allowOutsideClick: false,
			  preConfirm: function() {
			    return new Promise(function(resolve, reject) {
			    	//swal('Guardando usuario');
					controladorUsuariosRemoto.guardarUsuario(idpers,$('#nombre').val(),$('#apaterno').val(),$('#amaterno').val(),
							 $('#curp').val(),$('#rfc').val(),$('#profesion').val(),0,
							 $('#unidad').val(),$('#usuario').val(),$('#pass1').val(),
							 estatus,0,0,{
							 callback:function(items) {	
								  setTimeout(function() {
									  swal('Guardando usuario'),
								        resolve();
								      }, 2000);
								 //CloseDelay("Información guardada con éxito",function(){limpiar(); });
								//ShowDelay('Recuperando infornmación','');
									
								//_closeDelay();		 
							 
							 },errorHandler:function(errorString, exception) { 
							   swal('Opss',"Fallo la operación:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');    
							 }
							});	
			    });
			  },
			}).then(function (result) {
				if (result.value) {
			        	swal({title:'Información guardada con éxito!!',showConfirmButton: false,timer:1000,type:"success"});
			        	limpiar();
			        	window.setTimeout('location.reload()', 100);
			        }else
			        	swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio', showConfirmButton: false,timer:1300,type:"info"});
			  
			})
		
		/*
		jConfirm('¿Confirma que desea guardar la información del usuarios?', 'Confirmar', function(r){
			if(r){
					ShowDelay('Guardando usuario','');
					controladorUsuariosRemoto.guardarUsuario($('#clave').attr('value'),$('#nombre').attr('value'),$('#apaterno').attr('value'),$('#amaterno').attr('value'),
							 $('#curp').attr('value'),$('#rfc').attr('value'),$('#profesion').attr('value'),0,
							 $('#unidad').attr('value'),$('#usuario').attr('value'),$('#pass1').attr('value'),
							 estatus,{
							 callback:function(items) {			  			  
								 CloseDelay("Información guardada con éxito",function(){
									limpiar(); 
								});
								ShowDelay('Recuperando infornmación','');
								//getPersonas('nombre','clave');	
								_closeDelay();		 
							 
							 }	
												,errorHandler:function(errorString, exception) { 
												   jError("Fallo la operación:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
												}
							});		
			}
		});*/
	}

 function limpiar(){	
		 $('#clave').val('');
		 $('#nombre').val('');
		 $('#apaterno').val('');
		 $('#amaterno').val('');
		 $('#curp').val('');
		 $('#rfc').val('');
		 $('#profesion').val('');
		 $('#area').val('');
		 $('#unidad').val('');
		 $('#usuario').val('');
		 $('#pass1').val('');
		 $('#pass2').val('');
		 $('#estatus').attr('checked',false);
		 $('#idUsuario').val('');
		 $('#idTrabajador').val('');
}
