$(document).ready(function(){
	var mensaje= "";
	var options = { 
        beforeSubmit:  showRequest,  
        success:       showResponse, 
        url:       '_subirArchivoNominaDeductivas.action',
        type:      'post', 
        dataType:  'json'
    }; 
		
	$('#frm').submit(function(){
		console.log('Pasa aqui al submit 2');
		$(this).ajaxSubmit(options);
		return false;
	});

	$('#cmdload').click(function (event){ValidaDatos();});
	$('#cmdVaciar').click(function (event){borrarDatos();});
	$('#cmdupload').click(function (event){guardarLayout();});
	$('#cmdCrearFacturaOP').click(function (event){crearFacturasOrdenPago();});
	$('#ui-datepicker-div').hide();

	$('#cmdexportar').on('click', function(event){
		event.preventDefault(); //prevent default action 
		GeneraExcel();
		
	});
	
});

function jsRemoveWindowLoad() {
    // eliminamos el div que bloquea pantalla
    $("#WindowLoad").remove();
    console.log('Pasa removiendoWindowLoad');
}
 
function jsShowWindowLoad(mensaje) {
	
    //eliminamos si existe un div ya bloqueando
    jsRemoveWindowLoad();
 
    //si no enviamos mensaje se pondra este por defecto "Procesando la información/*&amp;lt;br&amp;gt*/;Espere por favor";
    if (mensaje === undefined) mensaje = "Procesando la información; Espere por favor";
 
    //centrar imagen gif
    height = 20;//El div del titulo, para que se vea mas arriba (H)
    var ancho = 0;
    var alto = 0;
 
    //obtenemos el ancho y alto de la ventana de nuestro navegador, compatible con todos los navegadores
    if (window.innerWidth == undefined) ancho = window.screen.width;
    else ancho = window.innerWidth;
    if (window.innerHeight == undefined) alto = window.screen.height;
    else alto = window.innerHeight;
 
    //operación necesaria para centrar el div que muestra el mensaje
    var heightdivsito = alto/2 - parseInt(height)/2;//Se utiliza en el margen superior, para centrar
 
   //imagen que aparece mientras nuestro div es mostrado y da apariencia de cargando
    imgCentro = "<div style='text-align:center;height:" + alto + "px;'><div  style='color:#000;margin-top:" + heightdivsito + "px; font-size:20px;font-weight:bold'>" + mensaje + "</div><img  src='../../imagenes/spinner_2.gif'></div>";
    
        //creamos el div que bloquea grande------------------------------------------
        div = document.createElement("div");
        div.id = "WindowLoad"
        div.style.width = ancho + "px";
        div.style.height = alto + "px";
        $("body").append(div);
 
        //creamos un input text para que el foco se plasme en este y el usuario no pueda escribir en nada de atras <img src="../../imagenes/icon_user.gif" width="16" height="16" />
        input = document.createElement("input");
        input.id = "focusInput";
        input.type = "text"
 
        //asignamos el div que bloquea
        $(".cargando").append(input);
        
        //asignamos el foco y ocultamos el input text
        $("#focusInput").focus();
        $("#focusInput").hide();
 
        //centramos el div del texto
        $("#WindowLoad").html(imgCentro);
        
 
}
function GeneraExcel(){
	
	/*
	var post_url = $(this).prop("action"); //get form action url
	var form_data = new FormData(this); //Creates new FormData object
	
	$.ajax({
        url : post_url,
        type: "POST",
        data : form_data,
		contentType: false,
		cache: false,
		processData:false
    }).done(function(response){ //
        //$("#server-results").html(response);
    	console.log('demo: ' +response);
    });*/
	jsShowWindowLoad();
	$('#frmExcel').submit();
	jsRemoveWindowLoad();
}

function showRequest(formData, jqForm, options) { 
	console.log('Esto contiene el mensaje y paso por showRequest' +formData,jqForm,options);
    return true; 
} 
 
function showResponse(data)  { 
	if(data.mensaje){
 		swal({title:'Archivo guardado con éxito',
 			 allowOutsideClick: false,
 			 timer:1000,
 			 onOpen: function (){
 				 swal.showLoading();
 				 setTimeout(function () {				  
 				 }, 2000)
 			 }
 			 }).then(function (result) {
 				if (result.dismiss === 'timer'){
 					$('#archivo').prop('value','');
 					var recarga=1;
 					var s = "?&recarga="+recarga;
 					document.location = s;
 					
 				}
 			 });
 	}
	else{
		swal({title:"No se ha podido cargar el archivo, es probable que el formato de archivo sea incorrecto (Archivos de Excel 2000-2003 o anteriores) o los libros no contienen los nombres correctos, intentelo de nuevo", type:"error"});
	}
} 

 function ValidaDatos(){
	
	var recarga=1;
	var s;
	swal({title:'Cargando información',
		 allowOutsideClick: false,
		 timer:3000,
		 onOpen: function (){
			 swal.showLoading();
		 }
	}).then(function (result) {
		if (result.dismiss === 'timer'){
			var s = "?&recarga="+recarga;
			document.location = s;
		}
	});
	
	/*$('#frm').submit(function(event){
		
		var s = "?&recarga="+recarga;
		var firstname = $('#firstname').val();
		var lastname = $('#lastname').val();    
		var url='/sam/facturas/lst_CargarNomina.action';
		var data = 'recarga' + encodeURIComponent(recarga)	+ '&amp;firstname=' + encodeURIComponent(firstname) + '&amp;lastname=' + encodeURIComponent(lastname);
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
					 	setTimeout(function() {
		        			resolve();
		        			console.log('demo de la clase: '+items);
		        			
		      			}, 2000);	
					    
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						swal(errorString, 'error');
					}
				});
		     
		    });
		  },
		}).then(function (result) {
			console.log('Demo del result: ' +result.value);
			if (result.value) {
		        	swal({title:'Documentos creados con exito!!',showConfirmButton: false,timer:1000,type:"success"});
		        }else
		        	swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
		  
		})
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

function guardarLayout(){
	if($('#fileNomina').val()==''||$('#fileNomina').val()==''){
		swal({title:'Es necesario seleccionar el archivo del layout',type:'error',timer:'2500',showConfirmButton: false});
		return false;
	}
	swal({title:'Subiendo archivo al servidor',
		 allowOutsideClick: false,
		 onOpen: function (){
			 swal.showLoading();
			 setTimeout(function () {
			      //swal.close()
				 $('#frm').submit();
			    }, 2000)
			 }
		 }).then(function (result) {
			 console.log(result);
			 console.log(result.value);
		 });
	console.log('Paso por guardar layout 1');
}

