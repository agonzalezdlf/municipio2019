
$(document).ready(function(){ 
	
	$('#todos').click( function (event){ $('input[name=claves]').prop('checked', this.checked); });			
	
	$('#btnGrabar').click( function() {
			guardarProyectosGrupos();
	});
	$('#cboasignar').click( function() {
			asignarGrupoProyecto();
	});
	
	
});						
						

function limpiar(){
		quitRow("detallesTabla");
		$('#grupo').val('');
}

function asignarGrupoProyecto(){
	var idgrupo = $('#grupo').val();
	var html = "";
	
	controladorGruposPartidasRemoto.getGruposProyectos(idgrupo,{
		 callback:function(items) {
			 var texto = items;
			 texto = texto.replace('"',"");
			 swal({
				  title: '¿Confirma que desea gardar?',
				  type: 'info',
				  html:"<select name='cbogrupos' id='cbogrupos' class='form-control' style='width:450px'>"+texto+"</select>",
				  showCancelButton: true,
				  width : 500,
				  showLoaderOnConfirm: true,
				  allowOutsideClick: false,
				  preConfirm: function() {
					  swal({title:'Guardando listado de partidas del grupo',showConfirmButton: false});
					  return new Promise(function(resolve, reject) {
						  swal.showLoading()	
						  setTimeout(function() {
							  guardarGrupoProyecto();
							resolve();
				        	swal.close() 
						  }, 2000);
				    });
				 },
				 }).then((result) => {
					 if (result.value  ) {
						 swal({text:'Información guardada con éxito!',type: 'success',timer:800,showConfirmButton: false});
						 
					  } else if (result.dismiss === swal.DismissReason.cancel) {
						
					  }
				});
		 },
     	errorHandler:function(errorString, exception) { 
    		swal('',".<br><strong>Es probable que el grupo de partidas este vacío, asigne almenos una partida en el listado y vuelva a intentar esta operación.</strong><br>"+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName,'error');    
     	}
	});
	
}


function guardarGrupoProyecto(){
	
	var idGrupoProyecto = $('#cbogrupos').val();
	var idGrupoPartida = $('#grupo').val();
	if(idGrupoProyecto==0) {swal('Oops','El Grupo de Proyecto que desea asignar no es válido','error'); return false;}
	//ShowDelay('Guardando Grupo de Proyectos','');
	swal({text:'Guardando Grupo de Proyectos!',type: 'sucess',timer:800,showConfirmButton: false});
	controladorGruposPartidasRemoto.guardarGrupoProyectoEnPartidas(idGrupoProyecto, idGrupoPartida,{
        callback:function(items){
			if(items) {
				//CloseDelay('Grupo de Proyectos guardado con éxito',300); }
				swal({text:'Grupo de Proyectos guardado con éxito!',type: 'sucess',timer:300,showConfirmButton: false});
				}
		},
			errorHandler:function(errorString, exception) { 
				swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');    
			}
    }); 	
}
	


 function pintarTablaDetalles() {
	
	quitRow("detallesTabla");
	var grupo=$('#grupo').val();	
	var capitulo=$('#capitulo').val();
	if (grupo!="" && capitulo !="" ) {
		
		  swal({
			  	
			  text: 'Cargando listado de partidas..... ' ,
			  showConfirmButton: false,
			  onOpen: function () {
				swal.showLoading()
			    setTimeout(function () {
			    	controladorGruposPartidasRemoto.getGrupoPartidas(grupo, capitulo, {
			            callback:function(items) { 		
			                jQuery.each(items,function(i) {
			     		    pintaTabla( "detallesTabla", i+1 ,this.CLV_PARTID,this.PARTIDA,getHTML(this.ID_PARTIDAS_GRUPO));
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

  function pintaTabla( table, consecutivo,idcapitulo,partida, idcapituloGrupo){
	
	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );
	var selected="";
	if (idcapituloGrupo!="")
	    selected="checked";
    var htmlCheck = "<input type='checkbox' name='claves' id='claves' value='"+idcapitulo+"' "+selected+" >";
	row.appendChild( Td("",centro,"",htmlCheck) );
	row.appendChild( Td(idcapitulo,centro,"","") );	  
	row.appendChild( Td(partida,"","","") );
	tabla.appendChild( row );
 }
  
  
  function guardarProyectosGrupos(){
	 
	 var checkProyectos = [];
	 var idgrupo = $('#grupo').val();
     $('input[name=claves]:checked').each(function() {checkProyectos.push($(this).val());	 });
     swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea gardar?',
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  allowOutsideClick: false,
		  preConfirm: function() {
			  swal({title:'Guardando listado de partidas del grupo',showConfirmButton: false});
			  return new Promise(function(resolve, reject) {
				  swal.showLoading()	
				  setTimeout(function() {
					  controladorGruposPartidasRemoto.guardarPartidaGrupo(checkProyectos,idgrupo,$('#capitulo').val(),{
						  callback:function(items) {
							  setTimeout(function () {
								  $('#grupo').val(idgrupo);
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
				 swal({text:'Información guardada con éxito!',type: 'info',timer:800,showConfirmButton: false});
				 limpiar();
			  } else if (result.dismiss === swal.DismissReason.cancel) {
				
			  }
		});
     /*
		 ShowDelay('Guardando listado de partidas del grupo','');
	     controladorGruposPartidasRemoto.guardarPartidaGrupo(checkProyectos,idgrupo,$('#capitulo').val(),{
	     callback:function(items){
				limpiar();
			    CloseDelay("Información guardada con éxito");
				$('#grupo').val(idgrupo);
				pintarTablaDetalles();
	        } 					   				
	        ,
	        errorHandler:function(errorString, exception) { 
			swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');    
	        }
	    }); */
	 }
  