/**
Descripcion: Codigo controlador para la pagina grupos proyectos
Autor      : Mauricio Hernandez León
Fecha      : 04/01/2010
*/

/**
*Al iniciar la pagina carga los eventos a los controles del formulario
*/
$(document).ready(function(){ 						  
	$("input[name=todos]").change(function(){
		$('input[type=checkbox]').each( function() {			
			if($("input[name=todos]:checked").length == 1){
				this.checked = true;
			} else {
				this.checked = false;
			}
		});
	});
	
	$('#todos').click( function (event){ $('input[name=claves]').attr('checked', this.checked); });													
});						


function limpiar(){
		quitRow("detallesTabla");
		$('#grupo').val('');
}

 function pintarTablaDetalles() {
	 quitRow("detallesTabla");
	var grupo=$('#grupo').val();	
	var unidad=$('#unidad').val();
	if (grupo!="" && unidad !="" ) {
	ShowDelay('Cargando lista de proyectos','');
	controladorGruposProyectosRemoto.getGrupoProyectos(grupo, unidad, {
        callback:function(items) {
				jQuery.each(items,function(i) {
					pintaTabla( "detallesTabla", i+1 ,this.ID_PROYECTO, this.N_PROGRAMA, this.K_PROYECTO_T, this.DECRIPCION, this.DEPENDENCIA,getHTML(this.ID_PROYECTO_GRUPO));
				}); 					   			
				_closeDelay();				
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
           jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");      
        }
    }); }

 }

  function pintaTabla( table, consecutivo,id_proyecto, proyecto, k_proyecto_t, descripcion, unidad_adm, idProyecto){
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );
	var selected="";
	if (idProyecto!="")
	    selected="checked";
    var htmlCheck = "<input type='checkbox' name='claves' id='claves' value='"+id_proyecto+"' "+selected+" >";
	row.appendChild( Td("",centro,"",htmlCheck) );
	row.appendChild( Td("("+id_proyecto+")["+k_proyecto_t+"] "+proyecto,centro,"","") );	  
	row.appendChild( Td(descripcion,izquierda,"","") );
	row.appendChild( Td(unidad_adm,izquierda,"","") );
	tabla.appendChild( row );
 }
 
 
  function guardarProyectosGrupos(){
	  var checkProyectos = [];
	  var grupo=$('#grupo').val();
	  var unidad=$('#unidad').val();
     $('input[name=claves]:checked').each(function() {checkProyectos.push($(this).val());	 });
	 //ShowDelay('Guardando proyectos del grupo','');
	 swal({title:'Guardando proyectos del grupo',timer:300,showConfirmButton: false});
	 swal.showLoading();	
     controladorGruposProyectosRemoto.guardarProyectoGrupo(checkProyectos,grupo,unidad,{
        callback:function(items) {
        	
		   //CloseDelay("Proyectos asignados con éxito",300, function(r){limpiar();});
		   swal({title:'Proyectos asignados con éxito',timer:300});
		   limpiar();
		   swal.close() 
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
		swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
        }
    }); 
	 }