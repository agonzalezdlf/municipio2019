$(document).ready(function(){
	var options = { 
        beforeSubmit:  showRequest,  
        success:       showResponse, 
        url:       '_subirArchivoNominaDeductivas.action',
        type:      'post', 
        dataType:  'json'
    }; 
	
	$('#frm').submit(function(){
		$(this).ajaxSubmit(options);
		return false;
	});
	$('#cmdVaciar').click(function (event){borrarDatos();});
	$('#cmdcargar').click(function (event){guardarNomina();});
	$('#cmdCrearFacturaOP').click(function (event){crearFacturasOrdenPago();});
	$('#ui-datepicker-div').hide();
	$('#tabuladores').tabs();
	
});

function crearFacturasOrdenPago(){
	
	swal({
		  title: 'Confirma que desea crear las Facturas y Orden de Pago',
		  text: 'Crear Factura y OP',
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  allowOutsideClick: false,
		  preConfirm: function() {
		    return new Promise(function(resolve, reject) {
		    	// here should be AJAX request
		      setTimeout(function() {
		        resolve();
		      }, 2000);
		    });
		  },
		}).then(function (result) {
			if (result.value) {
		        	swal({title:'Proceso cocluido con exito!!',showConfirmButton: false,timer:1000,type:"success"});
		        }else
		        	swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
		  
		})
	/*
	jConfirm('¿Confirma que desea crear las Facturas y Orden de Pago?','Crear Factura y OP', function(r){
			 if(r){
				 	ShowDelay('Creando documento(s)','');
					controladorCargarNominaDeductivasRemoto.crearFacturaOrdenPago({
					callback:function(items) { 	
					    CloseDelay("Documentos creados con exito");
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');
					}
				});
			}
		});*/
}

function borrarDatos(){
	controladorCargarNominaDeductivasRemoto.borrarDatosNomina({
	callback:function(items) { 	 
			document.location = 'lst_CargarNomina.action';	  
		} 					   				
		,
		errorHandler:function(errorString, exception) { 
			jError(errorString, 'Error'); 
		}
	}); 
}

function guardarNomina(){
	if($('#archivo').attr('value')==''||$('#archivo').attr('value')==''){jError('Es necesario seleccionar el archivo de Nomina y deductivas para continuar','Error'); return false;}
	ShowDelay("Subiendo archivo al servidor");
	$('#frm').submit();
}

function showRequest(formData, jqForm, options) { 
    return true; 
} 
 

function showResponse(data)  { 
 	if(data.mensaje){
		CloseDelay("Archivo guardado con éxito demo", 2000, function(){document.location = 'lst_CargarNomina.action';});
		//mostrarDetallesArchivos();
		$('#archivo').attr('value','');
	}
	else{
		_closeDelay();
		jError("No se ha podido cargar el archivo, es probable que el formato de archivo sea incorrecto (Archivos de Excel 2000-2003 o anteriores) o los libros no contienen los nombres correctos, intentelo de nuevo", "Error");
	}
} 
