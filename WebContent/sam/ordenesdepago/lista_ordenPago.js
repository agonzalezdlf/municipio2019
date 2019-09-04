$(document).ready(function() {
  var motivo;	
  var imagen="../../imagenes/cal.gif";	
  var formatFecha="dd/mm/yy";	

  $('#ui-datepicker-div').hide();
  /*Inicializacion de botones*/

  $('#cmdcancelarm').on('click', function(){
		cancelacionMultiple();
	});
  $('#cmdaperturar').on('click', function(){
		aperturarOrden();
	});
  $('#btnBuscar').on('click', function(){
	  getOrden();
	});
  $('#cmdpdf').on('click', function(){
	  getListadoOrdenPago();
	});
   
//Checkbox para seleccionar toda la lista.... 
  $("input[name=todos]").change(function(){
  	$('input[type=chkordenes]').each( function() {			
  		if($("input[name=todos]:checked").length == 1){
  			this.checked = true;
  		} else {
  			this.checked = false;
  		}
  	});
  });
  //Para seleccionar todos los checkbox Abraham Gonzalez 12/07/2016
  $('#todos').click( function (event){ $('input[name=chkordenes]').prop('checked', this.checked); });
  
//-----------Revision del filtrado por fechas en el listado de requisiciones.............
	
	
	$('#fechaInicial').datetimepicker({
		format: 'DD/MM/YYYY'
		
	});
		
	$('#fechaFinal').datetimepicker({
		format: 'DD/MM/YYYY',
	    useCurrent: false //Important! See issue #1075
	});
	$("#fechaInicial").on("dp.change", function (e) {
	    $('#fechaFinal').data("DateTimePicker").minDate(e.date);
	});
	$("#fechaFinal").on("dp.change", function (e) {
	    $('#fechaFinal').data("DateTimePicker").maxDate(e.date);
	});

	$('.selectpicker').selectpicker();
//Demo se actualizo...
});


function mostrarCargarArchivosOrdenPago(cve_op, num_op){
	//jWindow('',', '','Cerrar',1);
	swal({
		  title: 'Anexos de Orden de pago',
		  text: 'Archivos de Orden de Pago: '+num_op,
		  html:
			  '<iframe width="750" height="350" name="ventanaArchivosOP" id="ventanaArchivosOP" frameborder="0" src="../../sam/ordenesdepago/muestra_anexosOPArchivos.action?cve_op='+cve_op+'"></iframe>',
		  width: 800,
		  padding: 10,
		  focusConfirm: true,
		  confirmButtonText: 'Cerrar'
		})
}

function mostrarOpcionPDF(cve_op){

	swal({
		  title: 'Opciones de Reporte<br> Orden de Pago',
		  html:
			  '<table class="listas" border="0" align="center" cellpadding="1" cellspacing="2" width="405" >'+
				'  <tr id="x1" onmouseover="color_over(\'x1\')" onmouseout="color_out(\'x1\')"> '+
				'	<td width="33" height="27" align="center" style="cursor:pointer" onclick="getReporteOP('+cve_op+')"> '+
				'	  <img src="../../imagenes/pdf.gif"/></td>' +
				'	<td width="362" height="27" align="left" style="cursor:pointer" onclick="getReporteOP('+cve_op+')">&nbsp;Reporte Normal Orden de Pago</td> '+
				'  </tr> '+
				
				'  <tr id="x2" onmouseover="color_over(\'x2\')" onmouseout="color_out(\'x2\')" onclick=""> '+
				'	  <td height="27" align="center"  style="cursor:pointer" onclick="getAnexosListaOP('+cve_op+')"><img src="../../imagenes/report.png" /></td> '+
				'	  <td height="27" align="left" style="cursor:pointer" onclick="getAnexosListaOP('+cve_op+')">&nbsp;Listar Anexos de Orden de Pago</td> '+
				'	</tr> ' +
				'</table>', 
		  //showCloseButton: true,
		  focusConfirm: false,
		  confirmButtonText: 'Cerrar'
		})
	
}

function getAnexosListaOP(cve_op){
	swal({
		  title: 'Lista de Anexos de OP: '+cve_op,
		  html:
			  '<iframe width="750" height="350" name="ventanaArchivosOP" id="ventanaArchivosOP" frameborder="0" src="../../sam/consultas/muestra_anexosOP.action?cve_op='+cve_op+'"></iframe>',
		  width: 800,
		  padding: 10,
		  focusConfirm: true,
		  confirmButtonText: 'Cerrar'
	})
}

function getListadoOrdenPago(){
	var checkStatus = [];
     $('input[name=status]:checked').each(function() {checkStatus.push($(this).val());});	 
	 if (checkStatus.length==0 )   {swal({title: 'Es necesario seleccionar al menos un status', timer:2500, type:'error', showConfirmButton:false}); return false;}
	 
	$('#forma').attr('target',"impresionlistado");
	$('#forma').attr('action',"../reportes/rpt_listado_op.action");
	$('#forma').submit();
	$('#forma').attr('target',"");
	$('#forma').attr('action',"lista_ordenPago.action");

}

function getOrden(){
	
	var checkStatus = [];
    $('input[name=status]:checked').each(function() {checkStatus.push($(this).val());});	
   
    if (checkStatus.length==0 )   {
    	swal({title: 'Es necesario seleccionar al menos un status', timer:2500, type:'error', showConfirmButton:false}); 
		return false;
	}
	swal({
		title: 'Buscando Ordenes de Pago',
		timer: 3000,
		allowOutsideClick: false,
		onOpen: function () {
			swal.showLoading()
		}
	}).then(function (result) {
		if (result.dismiss === 'timer'){
			var s = 'lista_ordenPago.action?idUnidad='+$('#cbodependencia').prop('value')+"&fechaInicial="+$('#fechaInicial').prop('value')+"&fechaFinal="+$('#fechaFinal').prop('value')+"&status="+checkStatus+"&tipo_gto="+$('#cbotipogasto').val();
			$("#forma").submit()
		}
	});
}
/*--------------------------------- Manda a cargar la op desde el listado de op -------------------------------------*/
function editarOP(cve_op){
	
	swal({
		title: 'Cargando Orden de Pago',
		text: 'La Orden de pago para editar es: ' +cve_op,
		timer: 3000,
		width: 350,
		allowOutsideClick: false,
		onOpen: function () {
			swal.showLoading()
		}
	}).then(function (result) {
		if (result.dismiss === 'timer'){
			document.location = 'orden_pago.action?cve_op='+ cve_op + '&accion=edit';
		}
	});
}

function getReporteOP(clave) {
	//_closeDelay();
	$('#cve_op').val(clave);
	$('#forma').prop('action',"../reportes/formato_orden_pago.action");
	$('#forma').prop('target',"impresion");
	$('#forma').submit();
	$('#forma').prop('target',"");
	$('#forma').prop('action',"lista_ordenPago.action");
}

function aperturarOrden(){
	 var checkClaves = [];
    $('input[name=chkordenes]:checked').each(function() { checkClaves.push($(this).val());});	
   
    if (checkClaves.length>0){
    	swal({
  		  title: 'Esta seguro?',
  		  text: '¿Confirma que desea aparturar la(s) orden(es) de pago(s) seleccionada(s)?',
  		  type: 'info',
  		  showCancelButton: true,
  		  confirmButtonText: "Aperturar",
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
  		}).then(function(result) {
            if (result.value) {
            	controladorOrdenPagoRemoto.aperturarOrdenes(checkClaves, {
		  			callback:function(items) {	
		  				setTimeout(function() {
			            	getOrden();
			                swal({title:'Proceso cocluido con exito!!',showConfirmButton: false,timer:2000,type:"success"});
			            }, 2000);
		  				
		  			},
		  			errorHandler:function(errorString, exception) { 
		  				swal('Oops...',errorString,'error');	
		  			}
		  		},async=false ); 
            	//swal({title:'Proceso cocluido con exito!!',showConfirmButton: false,timer:2000,type:"success"});
            } else if (result.dismiss === 'cancel') {
            	swal({title:'Proceso abortado con exito!!',showConfirmButton: false,timer:2000,type:"info"});
            }
  		})
  		
     } else 
    	 swal({title:'Es necesario que seleccione por lo menos una Orden de Pago para realizar esta acción',showConfirmButton: false,timer:2500,type:"info"});
 }

/*------------------------------ Cancelacion de ordenes de pago ----------------------------------------------------------------------------------------------------*/
function cancelarOrden(idOrden){
	
	var checkClaves = [];
	checkClaves.push(idOrden);
	if (idOrden!=0){
		
		swal({
			title: '¿Confirma que desea cancelar la(s) ordenes de pago seleccionada(s)?',
			input: 'textarea',
			showCancelButton: true,
			allowOutsideClick: false,
			inputValidator: function (result) {
				swal.disableConfirmButton();
				return new Promise(function (resolve, reject) {
					if (result === '') { 
						resolve('Como requisito deberá escribir el motivo para que proceda la cancelacíon');
			        }else{
			            reject('Debe estar aca: '+result);
			            setTimeout(function() {
			            	cancelarops(result,checkClaves);
			            	getOrden();
			                swal({title:'Proceso cocluido con exito!!',showConfirmButton: false,timer:2000,type:"success"});
			            }, 2000);
			        }
			    })
			  }
		}).then(function() {
			  //delete item
		}, function(dismiss) {
		  if (dismiss === 'cancel' || dismiss === 'close') {
		    // ignore
		  } 
		});		
	}
}

function cancelarops(motivo,checkClaves){
	
	controladorOrdenPagoRemoto.cancelarOrden(checkClaves, motivo, {
		callback:function(items) { 
			//getOrden();
		},
		errorHandler:function(errorString, exception) { 
			swal('Oops...',errorString,'error');
		}
	},async=false );
}

function cancelacionMultiple(){
	
	var checkClaves = [];
	$('input[name=chkordenes]:checked').each(function() { checkClaves.push($(this).val());});	

	if (checkClaves.length>0){

		swal({
			title: '¿Confirma que desea cancelar la(s) ordenes de pago seleccionada(s)?',
			input: 'textarea',
			showCancelButton: true,
			allowOutsideClick: false,
			inputValidator: function (result) {
				swal.disableConfirmButton();
				return new Promise(function (resolve, reject) {
					if (result === '') { 
						resolve('Como requisito deberá escribir el motivo para que proceda la cancelacíon');
			        }else{
			            reject('Debe estar aca: '+result);
			            setTimeout(function() {
			            	cancelarops(result,checkClaves);
			            	getOrden();
			                swal({title:'Proceso cocluido con exito!!',showConfirmButton: false,timer:2000,type:"success"});
			            }, 2000);
			        }
			    })
			  }
		}).then(function() {
			  //delete item
		}, function(dismiss) {
		  if (dismiss === 'cancel' || dismiss === 'close') {
		    // ignore
		  } 
		});	
			
	}//cierre del if principal
	else
		//swal('Es necesario que seleccione por lo menos una Orden de Pago para realizar esta acción','warning');
		swal({title:'Es necesario que seleccione por lo menos una Orden de Pago para realizar esta acción',showConfirmButton: false,timer:2500,type:"info"});
}
