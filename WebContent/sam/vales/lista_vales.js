$(document).ready(function() {
	//$('.tiptip a.button, .tiptip button').tipTip();
  //var imagen="../../imagenes/cal.gif";	
  var formatFecha="dd/mm/yy";	
  //$("#fechaInicial").datepicker({showOn: 'button', buttonImage:imagen , buttonImageOnly: true,dateFormat: formatFecha});  
  //$("#fechaFinal").datepicker({showOn: 'button', buttonImage: imagen, buttonImageOnly: true,dateFormat: formatFecha});    
  $('#ui-datepicker-div').hide();
  
//-----------Filtrado por fechas .............
  $('#fechaInicial').datetimepicker({
		format: 'DD/MM/YYYY',
		defaultDate: new Date()
	});
  $('#fechaFinal').datetimepicker({
		format: 'DD/MM/YYYY',
		defaultDate: new Date()
	});
  
  $("#fechaInicial").on("dp.change", function (e) {
	    $('#fechaFinal').data("DateTimePicker").minDate(e.date);
	});
	$("#fechaFinal").on("dp.change", function (e) {
	    $('#fechaInicial').data("DateTimePicker").maxDate(e.date);
	});
//-----------Filtrado por fechas .............
	
//Checkbox para seleccionar toda la lista.... Abraham Gonzalez 12/07/2016
  $("input[name=todos]").change(function(){
  	$('input[type=chkvales]').each( function() {			
  		if($("input[name=todos]:checked").length == 1){
  			this.checked = true;
  		} else {
  			this.checked = false;
  		}
  	});
  });

  $('#todos').click( function (event){ $('input[name=chkvales]').attr('checked', this.checked); });
  
  /*INICIALIZACION DE BOTONES CAPTURA DE OP*/
	$('#cmdeliminar2').on('click', function(){
		cancelarVale();
	});
	$('#cmdaperturar').on('click', function(){
		AperturarVale();
		
	});
	
	$('#cmdrechazar').on('click', function(){
		rechazarVale();
	});
	
	
	$('#cmdaplicar').on('click', function(){
		aplicarVale();
	});
	
	$('#btnBuscar').on('click', function(){
		getVale();
	});
	$('#cmdpdf').on('click', function(){
		getListadoVales();
	});
	
	
});

function getVale(){
	 var checkStatus = [];
     $('input[name=status]:checked').each(function() {checkStatus.push($(this).val());});	 
	 var error="";
	 var titulo ="Error de validacion";
	 if (checkStatus.length==0 )   error="Debe de seleccionar un Estatus de Vales <br>";
	 if ($('#fechaInicial').attr('value')=="" && $('#fechaFinal').attr('value')!="" || $('#fechaInicial').attr('value')!="" && $('#fechaFinal').attr('value')=="")  error+="El rango de fechas no es valido<br>";
	if (error=="")
		$("#forma").submit();
	else
	  jAlert(error,titulo);
}

function AperturarVale(){
	var checkClaves = [];
     $('input[name=chkvales]:checked').each(function() { checkClaves.push($(this).val());});	
	 if (checkClaves.length>0){
		jConfirm('¿Confirma que desea aparturar los vales seleccionados?','Confirmar', function(r){
			if(r){
					 controladorListadoValesRemoto.aperturarVales(checkClaves, {
						callback:function(items) { 		
						  CloseDelay('Vales aperturados con exito', 2000, function(){
							  	$('#forma').submit();
						});
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');          
					 }
				    });
			}
	   },async=false );
	 } 
	else 
	    jAlert('Es necesario que seleccione por lo menos un pedidos del listado', 'Advertencia');
}

function editarVale(clave){
	$('#forma').attr('target',"");
	$('#forma').attr('method',"GET");
	$('#forma').attr('action',"cap_vale.action");
	$('#cve_val').attr('value',clave);
	$('#forma').submit();
}

function getReporteVale(clave) {
$('#cve_val').attr('value',clave);
$('#forma').attr('action',"../reportes/formato_vale.action");
$('#forma').attr('target',"impresion");
$('#forma').submit();
$('#forma').attr('target',"");
$('#forma').attr('action',"lista_vales.action");
}

function getReporteValeAnexo(clave) {
	controladorListadoValesRemoto.getArchivoAnexoVale(clave, {
				callback:function(items) {
					   var html = '<table class="listas" border="0" align="center" cellpadding="1" cellspacing="2" width="405" >'+
									'  <tr id="x1" onmouseover="color_over(\'x1\')" onmouseout="color_out(\'x1\')"> '+
									'	<td width="33" height="27" align="center" style="cursor:pointer" onclick="getReporteVale('+clave+')"> '+
									'	  <img src="../../imagenes/pdf.gif"/></td>' +
									'	<td width="362" height="27" align="left" style="cursor:pointer" onclick="getReporteVale('+clave+')">&nbsp;Reporte PDF Normal de Vale</td> '+
									'  </tr> '
									+
									(items!=null && items != "" ? 
									'  <tr id="x2" onmouseover="color_over(\'x2\')" onmouseout="color_out(\'x2\')" onclick=""> '+
									'	  <td height="27" align="center"  style="cursor:pointer" onclick="getReporteValeAnexoFile('+clave+')"><img src="../../imagenes/pdf.gif" /></td> '+
									'	  <td height="27" align="left" style="cursor:pointer">&nbsp;<a href="../vales/archivos/'+items+'" target="blank_"><strong>'+items+'</strong></a></td> '
										:'') 
									+
									'	</tr> ';
								html+='</table>';
						swal(html,'Opciones Reporte de Vales', '','Cerrar',1);
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
					swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
				}
	}); 
}

function getTabla(items){
	var tabla ="<table width='80%' border='0' align='center' cellpadding='0' cellspacing='0' class='formulario'>";
	   tabla +="<tr><td colspan='2' class='TituloFormulario' >Resultado del Proceso</td></tr>"				   
	jQuery.each(items,function(i) {
			tabla +="<tr><td>"+this.DATO+"</td><td>"+this.ESTADO+"</td></tr>"				   
        }); 	
	return tabla +="</table>";
}

function cancelarVale(){
	var checkVales = [];
	$('input[name=chkvales]:checked').each(function() {checkVales.push($(this).val());	 });
	if (checkVales.length > 0 ) {	 
		jConfirm('Al Cancelar un Vale no podra volver a recuperarlo ¿Confirma que desea realizar esta acción?','Confirmar', function(r){
		if(r){
			    controladorListadoValesRemoto.cancelarVale(checkVales, {
				callback:function(items) {
				   CloseDelay('Vales cancelados con exito', 2000,function(){ $('#forma').submit(); });
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
				jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
				}
				}); 
		}
		});
	} else 
		jAlert("Es necesario seleccionar por lo menos un elemento del listad", "Advertencia");
 }


function rechazarVale(){
	var checkVales = [];
	 $('input[name=chkvales]:checked').each(function() {checkVales.push($(this).val());});	
	 if (checkVales.length > 0 ) {
	jConfirm('¿Confirma que desea Rechazar los vales seleccionados y devolverlos a las respectivas Unidades Administrativas?','Rechazar Vale', function(r){
		if(r){
		   ShowDelay('Rechazando Vales','');
		   controladorListadoValesRemoto.rechazarVale(checkVales, {
			callback:function(items) {
			   CloseDelay('Vales Rechazados satisfactoriamente', 2000, function(){ $('#forma').submit(); });
			} 					   				
			,
				errorHandler:function(errorString, exception) { 
				jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
				}
			}); 
		 
		}
			});
	} else 
			jAlert("Es necesario seleccionar por lo menos un elemento del listado", "Advertencia");
 }
  
 function aplicarVale(){
	 
	  var checkVales = [];
	  $('input[name=chkvales]:checked').each(function() {checkVales.push($(this).val());});
	 if (checkVales.length > 0 ) { 
		 
		 swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea Ejercer el Vale para su pago?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, Ejercer!',
			  cancelButtonText: 'No, abortar!'
			}).then((result) => {
			  if (result.value  ) {
				  controladorListadoValesRemoto.aplicarVale(checkVales, {
						callback:function(items) {
							
							swal({
								  title: 'Aplicando',
								  //text: 'Pedido guardado con éxito!',
								  type: 'success',
								  timer: 4000,
								  onOpen: () => {
								    swal.showLoading()
								  }
								}).then((result) => {
								  if ( result.dismiss === swal.DismissReason.timer  ) {
									  swal("Vale aplicado con éxito!");
									  $('#forma').submit();
								   
								  }
								})
						   //CloseDelay('El proceso se realizo satisfactoriamente', 2000,function(){ $('#forma').submit(); });
						} ,
						errorHandler:function(errorString, exception) { 
							jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
							}
							}); 	
			  // For more information about handling dismissals please visit
			  // https://sweetalert2.github.io/#handling-dismissals
			  } else if (result.dismiss === swal.DismissReason.cancel) {
			    swal('Cancelado','El vale no se ejercio','error')
			  }
			})
		
	 } else 
				swal('',"Es necesario seleccionar por lo menos un elemento del listado", "warning");
 }
 
 function desAplicarVale(){
	var checkVales = [];
	$('input[name=chkvales]:checked').each(function() {checkVales.push($(this).val());	 });	
	 if (checkVales.length > 0 ) { 
	jConfirm('¿Confirma que desea desejerecer el Vale?','Confirmar', function(r){
		if(r){
			   controladorListadoValesRemoto.desAplicarVale(checkVales, {
				callback:function(items) {
				   CloseDelay('Vales desaplicados con éxito', 2000,function(){ $('#forma').submit(); });
				} 					   				
				,
				errorHandler:function(errorString, exception){ 
					jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
				}
			});  
		}
	});
	} 
	else 
		jAlert("Es necesario seleccionar por lo menos un elemento del listad", "Advertencia");
 }
 
function getListadoVales()   {
	$('#forma').attr('target',"impresionlistado");
	$('#forma').attr('action',"../reportes/rpt_listado_vales.action");
	$('#forma').submit();
	$('#forma').attr('target',"");
	$('#forma').attr('action',"lista_vales.action");
}