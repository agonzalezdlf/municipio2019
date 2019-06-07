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

	$('#cmdCargar').click(function (event){cargarDatos();});
	$('#cmdVaciar').click(function (event){borrarDatos();});
	$('#cmdcargar').click(function (event){guardarNomina();});
	$('#cmdCrearFacturaOP').click(function (event){crearFacturasOrdenPago();});
	$('#ui-datepicker-div').hide();

	$('#cmdexportar').on('click', function(){
		
		GeneraExcel();
	});
	
});

function GeneraExcel()
{
	
	$('#frmExcel').submit();
}

function showRequest(formData, jqForm, options) { 
    return true; 
} 
 
function showResponse(data)  { 
	swal('Esto contiene el mensaje' +data.mensaje);
 	if(data.mensaje){
		swal({
			  title: 'Archivo guardado con éxito demo',
			  onOpen: function () {

			    swal.showLoading('Cerrando la orden de pago')
			    	document.location = 'lst_CargarNomina.action';
			    setTimeout(function () {
			      swal.close()
			    }, 2000)
			  }
			})
		$('#archivo').prop('value','');
	}
	else{
		//_closeDelay();
		swal("No se ha podido cargar el archivo, es probable que el formato de archivo sea incorrecto (Archivos de Excel 2000-2003 o anteriores) o los libros no contienen los nombres correctos, intentelo de nuevo", "error");
	}
} 


 function cargarDatos(){
	 var recarga=1;
	 console.log('Entro a llamar el cargarDatos');
	 $.ajax({ 
		 		url: '/peticionAsincrona',
			    type: 'GET',
			    dataType: 'json', 
			    contentType: 'json',
			    data:{"recarga" : recarga},
			    success: function(respuesta) {
			        alert("peticion correcta")
			    }
			});
	 /*$('#frm').submit(function(event){
		 		
	        	var s = "?&recarga="+recarga;
	            var firstname = $('#firstname').val();
	            var lastname = $('#lastname').val();    
	            var url='/sam/facturas/lst_CargarNomina';
	            var data = 'recarga'
                 	+ encodeURIComponent(recarga)
                 	+ '&amp;firstname='
	                    + encodeURIComponent(firstname)
	                    + '&amp;lastname='
	                    + encodeURIComponent(lastname);
	            console.log('Entro a llamar el submit'+data );
	           $.ajax({
	                url : url,//$("#frm").attr("action"),
	                data : data,
	                type : "GET",
	 
	                success : function(response) {
	                    alert( response );
	                },
	                error : function(xhr, status, error) {
	                    alert(xhr.responseText);
	                }
	            });
	            return false;
	        }
	);*/
		 
	
	swal({
		  title: 'Cargando la información',
		  onOpen: function () {
			  var s = "?&recarga="+recarga;
		      document.location = s;   
		      swal.showLoading();
			  setTimeout(function () {
			      swal.close()
			  }, 2000)
		  }
	 })
	 /*
	 swal({
		  title: 'Cargar información',
		  //text: 'Submit to run ajax request',
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  onOpen: function (){
			 
          },
		  preConfirm: function() {
		    return new Promise(function(resolve, reject) {
		    	 var s = "?&recarga="+recarga;
		    	 document.location = s;
		      setTimeout(function() {
		        resolve();
		      }, 2000);
		    });
		  },
		}).then((result) => {
			
			if (!result.value ) {
				alert('resuklt: '+ !result.value);
				swal({
				    title: 'Datos cargados con éxito!',
				    timer: 2000,
				    showCancelButton: false,
				    showConfirmButton: false
				}).catch(swal.noop);
			}
			
			
		});*/
	
 }
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
		    	controladorCargarNominaDeductivasRemoto.crearFacturaOrdenPago({
					callback:function(items) { 	
					    CloseDelay("Documentos creados con exito");
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');
					}
				});
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
	if($('#fileNomina').val()==''||$('#fileNomina').val()==''){
		swal('Es necesario seleccionar el archivo de Nomina y deductivas para continuar','Error'); return false;
	}
	ShowDelay("Subiendo archivo al servidor");
	$('#frm').submit();
}

