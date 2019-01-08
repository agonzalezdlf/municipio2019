/**
Descripcion: Codigo controlador para la pagina grupos de FACTURAS
Autor      : Mauricio Hernandez León
Fecha      : 04/01/2010
Vista: configuracion_grupos_tipo_fac.jsp
*/

$(document).ready(function(){ 	
	
	$('#btnGrabar').on('click', function(){
		guardarValesGrupos();
	});
	
	$('#grupo').on('change', function(){
		pintarTablaDetalles();
	});
	
	

	
$('#todos').click( function (event){ $('input[name=claves]').prop('checked', this.checked); });													
});						
						

function limpiar(){
		quitRow("detallesTabla");
		$('#grupo').val('');
}

 function pintarTablaDetalles() {
	
	quitRow("detallesTabla");
	var grupo=$('#grupo').val();	
	if (grupo!=""  ) {
	swal({
		  title: 'Cargando',
		  timer: 2000,
		  onOpen: () => {
		    swal.showLoading()
		  }
		}).then((result) => {
		  if (result.dismiss === swal.DismissReason.timer) {
			  controladorGruposTipoFacRemoto.getGrupoTipoFac(grupo, {
			        callback:function(items) {
			        	 jQuery.each(items,function(i) {
			  		    	pintaTabla( "detallesTabla", i+1 ,this.DESCRIPCION,getHTML(this.ID_GRUPO_TIPO_FAC),this.ID_TIPOFACTURA);
			         	}); 					   	
			 			//swal("Good job!", "Grupo guardado con éxito!", "success");
			 			swal({title: 'Grupo cargado con éxito!',text: '', type: 'success',position: 'top-end',timer: 1500,showConfirmButton: false}).then(function() {false; });

					}	
					,errorHandler:function(errorString, exception) { 
						swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'warning');
					}
				});	
		   
		  }
		})
	}
 }

  function pintaTabla( table, consecutivo,descripcion, idclaveGrupo,idTipoFac){
	
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );
	var selected="";
	if (idclaveGrupo!="")
	    selected="checked";
    var htmlCheck = "<input type='checkbox' name='claves' id='claves' value='"+idTipoFac+"' "+selected+" >";
	row.appendChild( Td("",izquierda,"",htmlCheck) );
	row.appendChild( Td(descripcion,"","","") );
	tabla.appendChild( row );
 }
 
 
function guardarValesGrupos(){
	
	 var checkVales = [];
     var grupo=$('#grupo').val();
     $('input[name=claves]:checked').each(function() {checkVales.push($(this).val());});
	 if(grupo==0){swal('','El grupo seleccionado no es valido','warning'); return false;}
	 
	 swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea cerrar el pedido?',
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, gaurdar!',
		  cancelButtonText: 'No, abortar!',
		  timer: 4000,
		  showLoaderOnConfirm: true,
		  preConfirm: function() {
			    return new Promise(function(resolve) {
			      setTimeout(function() {
			    	  resolve();
			    	  controladorGruposTipoFacRemoto.guardarTipoFacGrupo(checkVales,grupo,{
							callback:function(items) {
								
								setTimeout(function(){
								    //swal("Información guardada con éxito!");
								    swal({
								    	  position: 'top-end',
								    	  type: 'success',
								    	  title: 'Información guardada con éxito!',
								    	  showConfirmButton: false,
								    	  timer: 1500
								    	})
								    limpiar();
								  }, 2000);
							} 					   				
							,
							errorHandler:function(errorString, exception) { 
								swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
							}
						});  
			        
			      }, 2000);//TERMINA setTimeout
			    });//TERMINA LA PROMISE
			  },
			  allowOutsideClick: false
			
		}).then((resolve) => {
			  
		  if (resolve.value  ) {
			
						
		  
		  } else if (result.dismiss === swal.DismissReason.cancel) {
			  		swal('Cancelado','Proceso cancelado','error')
		  }
		});
}