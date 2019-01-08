/**
Descripcion: Codigo controlador para la pagina grupos de vales
Autor      : Mauricio Hernandez León
Fecha      : 04/01/2010
*/

/**
*Al iniciar la pagina carga los eventos a los controles del formulario
*/
$(document).ready(function(){ 	
	
	$("#todos").on('click', function() {
		$('input[name=claves]').prop('checked', this.checked);
	 });
	 
	$("#btnGrabar").on('click', function() {
		guardarValesGrupos();
	 });
	
	$('#grupo').on('change',function(event){
		pintarTablaDetalles();
	});	
	
		
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
			  text: 'Cargando grupos..... ' ,
			  showConfirmButton: false,
			  onOpen: function () {
				swal.showLoading()
			    setTimeout(function () {
			    	controladorGruposTipoReqRemoto.getGrupoTipoReq(grupo, {
			            callback:function(items) { 		
			                jQuery.each(items,function(i) {
			                	pintaTabla( "detallesTabla", i+1 ,this.DESCRIPCION,getHTML(this.ID_GRUPO_TIPO_REQ),this.ID_TIPOREQUISICION);
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
 }

  function pintaTabla( table, consecutivo,descripcion, idclaveGrupo,idTipoReq){
	
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );
	var selected="";
	if (idclaveGrupo!="")
	    selected="checked";
    var htmlCheck = "<input type='checkbox' name='claves' id='claves' value='"+idTipoReq+"' "+selected+" >";
	row.appendChild( Td("",izquierda,"",htmlCheck) );
	row.appendChild( Td(descripcion,"","","") );
	tabla.appendChild( row );
 }
 
 
  function guardarValesGrupos(){
	 var checkVales = [];
     $('input[name=claves]:checked').each(function() {checkVales.push($(this).val());	 });
	 if($('#grupo').val()==0){swal('','El grupo seleccionado no es valido','warning'); return false;}
	 
	 swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea guardar?',
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  allowOutsideClick: false,
		  preConfirm: function() {
			  swal({title:'Guardando el grupo',showConfirmButton: false});
			  return new Promise(function(resolve, reject) {
				  swal.showLoading()	
				  setTimeout(function() {
					  controladorGruposTipoReqRemoto.guardarTipoReqGrupo(checkVales,grupo=$('#grupo').val(),{
						  callback:function(items) {
							  setTimeout(function () {
								  limpiar();
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
				 swal({text:'Grupo guardado con éxito!',type: 'info',timer:500,showConfirmButton: false});	
			  } else if (result.dismiss === swal.DismissReason.cancel) {
				
			  }
		});
}