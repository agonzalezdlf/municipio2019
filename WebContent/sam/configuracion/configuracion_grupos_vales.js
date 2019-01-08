/**
Descripcion: Codigo controlador para la pagina grupos de vales
Autor      : Mauricio Hernandez León
Fecha      : 04/01/2010
*/

/**
*Al iniciar la pagina carga los eventos a los controles del formulario
*/
$(document).ready(function(){
	
	//$('#todos').click( function (event){ $('input[name=claves]').attr('checked', this.checked); });		
	
	$("#todos").on('click', function() {
		$('input[name=claves]').prop('checked', this.checked);
	 });
	
	$("#btnGrabar").on('click', function() {
		guardarValesGrupos();
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
		  	  text: 'Cargando tipos de vales..... ' ,
			  showConfirmButton: false,
			  onOpen: function () {
				swal.showLoading()
			    setTimeout(function () {
			    	controladorGruposValesRemoto.getGrupoVales(grupo, {
			            callback:function(items) { 		
			            	jQuery.each(items,function(i) {
			    	 		    pintaTabla( "detallesTabla", i+1 ,this.CLAVE_VALE,this.TIPO_VALE,getHTML(this.ID_GRUPO_VALE),this.ID_TIPO_VALE);
			            }); 		
			    					   									
			            } 					   				
			            ,
			            errorHandler:function(errorString, exception) { 
			               swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');      
			            }
			        });
			      swal.close()
			    }, 2000)
			  }
			})
	}

 }

  function pintaTabla( table, consecutivo,clave,descripcion, idclaveGrupo,idTipoVale){
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );
	var selected="";
	if (idclaveGrupo!="")
	   selected="checked";
    var htmlCheck = "<input type='checkbox' name='claves' id='claves' value='"+idTipoVale+"' "+selected+" >";
	row.appendChild( Td("",centro,"",htmlCheck) );
	row.appendChild( Td(clave,centro,"","") );	  
	row.appendChild( Td(descripcion,"","","") );
	tabla.appendChild( row );
 }
 
 
  function guardarValesGrupos(){
	  
	  var checkVales = [];
	  $('input[name=claves]:checked').each(function() {checkVales.push($(this).val());	 });
	  if($('#grupo').val()==0) {swal('','El grupo seleccionado no es valido','warning');return false;}
	  
	  swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea guardar?',
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  allowOutsideClick: false,
		  preConfirm: function() {
			  swal({title:'Guardando tipos de vales',showConfirmButton: false});
			  return new Promise(function(resolve, reject) {
				  swal.showLoading()	
				  setTimeout(function() {
					  controladorGruposValesRemoto.guardarValeGrupo(checkVales,grupo=$('#grupo').val(),{
					        callback:function(items) {
								limpiar();
							    
					        } 					   				
					        ,
					        errorHandler:function(errorString, exception) { 
							swal('Error',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');    
					        }
					    });
					resolve();
		        	swal.close() 
				  }, 2000);
		    });
		 },
		 }).then((result) => {
			 if (result.value  ) {
				 swal({text:'Información guardada con éxito!',type: 'info',timer:500,showConfirmButton: false});	
			  } else if (result.dismiss === swal.DismissReason.cancel) {
				
			  }
		});
	 
 }