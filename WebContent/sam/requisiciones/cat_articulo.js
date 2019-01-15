$(document).ready(function() { 
	//getUnidad_Medidas('txtunidadmedida','CVE_UNIDAD_MEDIDA');	
	 $('#btnGuardar').on('click', function(){
		  guardarDatos();
	  });
	  $('#btnLimpiar').on('click', function(){
		  limpiarForma();
	  });
	  
	  $('#btnGuardar2').on('click', function(){
		  llenarTabla();
	  });
	  
	  $('.selectpicker').selectpicker();
});

function limpiarForma(){  
  $('#estatus').attr('checked',true);
  $( '#id' ).val("");
  $('#descripcion' ).val("");
  $('#txtunidadmedida' ).val("");
  $('#precio' ).val("");
  $('#CVE_UNIDAD_MEDIDA' ).val("");  
  $('#beneficiario' ).text('');
  $('#inventariable' ).attr('checked',false);
  $('#consumible' ).attr('checked',false);
  $('#xBeneficiario').selectpicker('val',0);
  $('#txtprestadorservicio').val('');
 
 
} 

function modificarDato(id) {
	//ShowDelay('Cargando artículo para editar información','');	 
	controladorArticulosRemoto.getArticulo(id,  {
        callback:function(items) { 						
		$( '#id' ).val(items.ID_CAT_ARTICULO);
//		$( '#partida' ).attr('value',items.GRUPO);
		
		$('#xBeneficiario').selectpicker('val',items.ULT_BENEFI);
		
		$('#cbounimed').selectpicker('val',items.CLV_UNIMED);
		
		if(items.ULT_BENEFI!=null)
			$('#CVE_BENEFI').val(items.ULT_BENEFI);
		else
			$('#CVE_BENEFI').attr('value',0);
			
		if(items.NCOMERCIA!=null)
			$('#txtprestadorservicio').val(items.NCOMERCIA);		
		else 
			$('#txtprestadorservicio').val('');
			
		$('#descripcion').val(items.DESCRIPCION);
		$('#precio').val(getHTML(items.ULT_PRECIO));		
		$('#txtunidadmedida').val(getHTML(items.UNIDMEDIDA));		
		if (items.INVENT!='')
		  $('#inventariable').attr('checked',true);			 
		else
		  $('#inventariable').attr('checked',false);			 		
		if (items.CONSUM!='')
		  $('#consumible').attr('checked',true);			 
		else
		  $('#consumible').attr('checked',false);			 
		
		 if (items.ESTATUS=='ACTIVO')
		   $('#estatus').attr('checked',true);			 
		 else
		   $('#estatus').attr('checked',false);	
		   	
		   //_closeDelay();
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
            swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');    
        }
    }); 	     	  
 }


function guardarDatos() {	  
	if ($("#descripcion").val()==""){swal('','La Descripcion del artículo no es válida', 'warning'); return false;}
	if ($('#cbounimed').selectpicker('val')=="") {swal('','La Unidad de Medida no es válida','warning'); return false;}
	if ($("#precio").val()=="") {swal('','El Precio del artículo no es válido', 'warning'); return false;}
	
	/*buscar si ya esta usandose en otros documentos*/
	if($('#id').val()!=''&&$('#id').val()!='0'){
		controladorArticulosRemoto.getExistenciaDocumentos($('#id').val(), {
				callback:function(items){
					if(items) {
						alert('El artículo ó producto actual ya se encuentra relacionado a una Orde de Trabajo/Orden de Servicio si desea realizar algun cambio en la descripción afectara la relación existente, no se recomienda realizar esta acción, en su lugar puede crear un nuevo artículo');
						guardar();
					}
					else
						guardar();
					
				}
			});
	}
	else{
						guardar();
					}


 }
 
 function guardar(){
	 
	//$( "SELECTOR" ).is( ":checked" ) 
	 jConfirm('¿Confirma que desea guardar la información del artículo?','Confirmar', function(r){
		if(r){
			var inventariable=0;
			var consumible=0;
			var estatus='ACTIVO';
			if (!$('#estatus').attr('checked'))	
			   estatus='INACTIVO';	
			if ($('#inventariable').attr('checked'))	
			   inventariable=1;	
			if ($('#consumible').attr('checked'))	
			   consumible=1;	   
			var unimed=$('#cbounimed').selectpicker('val');
			var cve_art=$('#id').val();
			var descr=$("#descripcion").val();
			var benefi=$('#xBeneficiario').selectpicker('val');
			var precio=$("#precio").val();
			
			ShowDelay('Guardando articulo','');
			controladorArticulosRemoto.guardarArticulo(cve_art,unimed,descr,benefi,precio,inventariable,consumible,estatus,{
				callback:function(items) {
					CloseDelay("Artículo guardado satisfactoriamente",2000, function(){
							$('#alfabetico').val();
							$('#descripcion').val();
							limpiarForma(); 		
							llenarTabla();
					});	
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
				   jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
				}
			}); 
		}
	}); 
 }
 
 function eliminarDato() {	 
	  var checados= [];
     $('input[name=idArticulos]:checked').each(function() {checados.push($(this).val());	 });	 
	if(checados.length>0){
		jConfirm('¿Confirma que desea eliminar los artículos seleccionados?','Confirmar', function(r){
			if(r){
				ShowDelay('Eliminando artículos','');		
				controladorArticulosRemoto.eliminarArticulo(checados,  {
					callback:function(items) { 		
						CloseDelay("Articulo(s) eliminado(s) con éxito", 2000, function(){
								llenarTabla();
								limpiarForma()
						});	
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
					}
				});	
			}
		});
	} else {
		  jAlert("Seleccione almenos un elemento de la lista para eliminarlo", "Advertencia");
	}	     	  
 }

 function llenarTabla() {	 
	quitRow("tablaArticulos");
	if ($("#alfabetico").val()!='')  {
	ShowDelay('Cargando la lista de artículos','');
	controladorArticulosRemoto.getArticulosTodos($("#alfabetico").val(),  {
        callback:function(items) { 		
         for (var i=0; i<items.length; i++ )  {			
			var reg = items[i];
			var id = reg.ID_CAT_ARTICULO;
			var descripcion=  reg.DESCRIPCION;
	  		var txtunidadmedida=  getHTML( reg.UNIDMEDIDA);
  			var precio=  getHTML(reg.ULT_PRECIO);  
			var estatus = reg.ESTATUS;
			var beneficiario = getHTML( reg.NCOMERCIA);			
		    pintaTabla("tablaArticulos", i+1 ,id,descripcion,txtunidadmedida,precio,estatus,beneficiario );			
        }
		_closeDelay();
		
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
            jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
        }
    }); 
	}	
	else 
	      jAlert("No se puede realizar esta operación si no se ha especificado ninguna búsqueda", "Advertencia");
 }

//pinta en pantalla el resultado obtenido 
 function pintaTabla( table, consecutivo,id,descripcion,txtunidadmedida,precio,estatus,beneficiario ){
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row = document.createElement( "TR" );		 	
	var html = "<input type='checkbox' name='idArticulos' id='idArticulos' value='"+id+"'>";
    var html2 = "<img style='cursor: pointer;' src=\"../../imagenes/page_white_edit.png\" class=\"imagen_cursor\" alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick='modificarDato("+id+")' >";
    row.appendChild( Td("", centro,"", html )); 	
 	row.appendChild( Td( descripcion,"", "","" ) );
 	row.appendChild( Td( beneficiario,"", "","" ) );
 	row.appendChild( Td( txtunidadmedida,centro, "","" ) );
 	row.appendChild( Td( '$ '+formatNumber(precio),centro, "","" ) );
	row.appendChild( Td( estatus,centro, "","" ) );
    row.appendChild( Td("", centro,"", html2 )); 	
 	tabla.appendChild( row );
 }


