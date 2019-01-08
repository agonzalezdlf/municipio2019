/**
*Configuracion de los distintos grupos: firma, proyecto, partida, requisciones, orden de pago, contrato, factura
**/

$(document).ready(function() {
	
	$('#btnGrabar').on('click', function(){
		guardar();
	});
	

	$('#btnlimpiar').on('click', function(){
		limpiar();
	});
	
	$('#tipo').on('change', function(){
		pintarTablaDetalles();
		// alert( this.value );
	});
	
	$('#imgdelete').on('click', function(){
		eliminar();
	});
	
	$('#estatus2').on('click', function(){
		pintarTablaDetalles();
	});
	
});

function limpiar(){
	
	 $('#descripcion').val('');
	 $('#estatus').prop('checked',true);			 
	 $('#clave').val('');
}

function guardar(){	
	
	var clave=$('#clave').val();
	var tipo =$('#tipo').val();
	var tipoFact=$('#descripcion').val();
	var error="";
	var titulo ='Informacion no válida';
	if ( $('#descripcion').val()=="")  error += 'Descripción</br>';	
	if ( $('#tipo').val()=="")  error += 'Tipo</br>';	
	
	 if (error==""){
		 var estatus='ACTIVO';
			if (!$('#estatus').prop('checked'))	
			   estatus='INACTIVO';	
			
		 swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea cerrar el pedido?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, gaurdar!',
			  cancelButtonText: 'No, abortar!',
			  timer: 4000,
			  allowOutsideClick: false,
			  showLoaderOnConfirm: true,
			  preConfirm: function() {
				    return new Promise(function(resolve) {
				      setTimeout(function() {
				    	  resolve();
				    	  controladorGruposRemoto.guardarGrupo(clave,tipoFact,estatus,$('#tipo').val(),{
				 			 callback:function(items) {				 
				 	  			 //CloseDelay("Grupo guardado con éxito", 2000, function(){pintarTablaDetalles();});
				 				pintarTablaDetalles()
				  		     }	
				 								,errorHandler:function(errorString, exception) { 
				 								   swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');    
				 								}
				 			});	 
				        
				      }, 2000);//TERMINA setTimeout
				    });//TERMINA LA PROMISE
				  },
				  allowOutsideClick: false
				
			}).then((result) => {
				  
			  if (result.value  ) {
				
							
			  
			  } else if (result.dismiss === swal.DismissReason.cancel) {
				  		swal('Cancelado','Proceso cancelado','error')
			  }
			});
		 
				
	 }else 
		 swal(error,titulo, 'warning');
}


function pintarTablaDetalles() {
	quitRow("detallesTabla");
	var estatus='ACTIVO';
	if (!$('#estatus2').val('checked'))	
	   estatus='INACTIVO';	
	   swal({
		  text: 'Cargando grupos..... ' ,
		  showConfirmButton: false,
		  onOpen: function () {
			swal.showLoading()
		    setTimeout(function () {
		    	controladorGruposRemoto.getGruposEstatus(estatus,$('#tipo').val(), {
		            callback:function(items) { 		
		                jQuery.each(items,function(i) {
		                	pintaTabla( "detallesTabla", i+1 ,this.ID_GRUPO_CONFIG,this.GRUPO_CONFIG,this.ESTATUS,this.TIPO);
		     		    }); 	
		            },
		            	errorHandler:function(errorString, exception) { 
		            		swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");      
		            }
		        });
		      swal.close()
		    }, 2000)
		  }
		})
}
 
  function pintaTabla( table, consecutivo,id,descripcion,estatus,tipo){
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );
    var htmlCheck = "<input type='checkbox' name='claves' id='claves' value='"+id+"' >";
    var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick=\"editar("+id+",'"+descripcion+"','"+estatus+"','"+tipo+"')\" >"; 		
	row.appendChild( Td("",centro,"",htmlCheck) );
	row.appendChild( Td(descripcion,"","","") );	  
	row.appendChild( Td(tipo,centro,"","") );	  
	row.appendChild( Td(estatus,centro,"","") );
    row.appendChild( Td("",centro,"",htmlEdit) );	
	tabla.appendChild( row );
 }


  function editar(id,descripcion,estatus,tipo) {
		 $('#descripcion').val(descripcion);
		 if (estatus=='ACTIVO')
		   $('#estatus').prop('checked',true);			 
		 else
		   $('#estatus').prop('checked',false);
		 $('#clave').val(id);
		 $('#tipo').val(tipo);
}

function eliminar(){
	 
	var checkRetenciones = [];
    $('input[name=claves]:checked').each(function() {checkRetenciones.push($(this).val());	 });	 
	if (checkRetenciones.length > 0 ) {
		
		swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea borrar el grupo?',
			  type: 'info',
			  showCancelButton: true,
			  showLoaderOnConfirm: true,
			  allowOutsideClick: false,
			  preConfirm: function() {
				  swal({title:'Eliminando el grupo',showConfirmButton: false});
				  return new Promise(function(resolve, reject) {
					  swal.showLoading()	
					  setTimeout(function() {
						  controladorGruposRemoto.eliminarGrupo(checkRetenciones, {
							  callback:function(items) {
								  setTimeout(function () {
									  pintarTablaDetalles();
								  }, 2000)
							  },
							errorHandler:function(errorString, exception) { 
								swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');    
							}
						});
						resolve();
			        	swal.close() 
					  }, 2000);
			    });
			 },
			 }).then((result) => {
				 if (result.value  ) {
					 swal({text:'Grupo eliminado con éxito!',type: 'info',timer:500,showConfirmButton: false});	
				  } else if (result.dismiss === swal.DismissReason.cancel) {
					
				  }
			});
		} else 
			    swal('','Es necesario que seleccione un elemento de la lista','error');
}


 