$(document).ready(function() {  
	
	$('#txtfecha').datetimepicker({
		format: 'DD/MM/YYYY'		
	});
		 
	$('#btnBuscar').on('click',function(event){
		
		buscarOpMes();
	});
	
	$('#cmdvalidar').on('click',function(event){
		validarOP();
	});
	
	$('#cmdback').on('click',function(event){
		DevolverOP();
	});
		
	$('#txtfechanueva2').datetimepicker({
		format: 'DD/MM/YYYY'
	});
	
	$('#cbmomento').on('change',function(event){
		
		buscarOpMes();
	});
	
	if ($('#cbmomento').val()==1){
		$('#Recibe').css("display","block");
	}
	if ($('#cbmomento').val()==2){
		$('#Devuelve').css("display","block");
	}	
	
});


function DevolverOP(){
	
	var now = new Date();
	var checkClaves = [];
	var fecha = $('#txtfechanueva2').val();
	var motivo=null;
	
	$('input[id=chkOP]:checked').each(function() { checkClaves.push($(this).val());});
	
	if (checkClaves.length>0){
		 
		if(fecha=='') {swal('','La fecha de validacion para la Orden de Pago no es válida', 'warning'); return false;}
				
		swal({
			title: 'Multiple inputs',
			//html: '$(".swal2-confirm").prop("disabled",true)',
			input: 'textarea',
			showCancelButton: true,
			/*onOpen: function (){
			      
			},*/
				 	
			    inputValidator: function (result) {
			    swal.disableConfirmButton();
					return new Promise(function (resolve, reject) {
			    
			                if (result === '') { 
			                			                   
			                    resolve('Debe escribir un motivo para la devolución');
			                    
			                }else{
			                	
			                    reject('Debe estar aca');
			                    setTimeout(function() {
			                    			
			                    	  			controladorListadoOrdenRecibidas.toback(checkClaves, fecha, result, {
			                					callback:function(items) { 
			                						buscarOpMes();
			                				  
			                				 } 					   				
			                				,
			                				errorHandler:function(errorString, exception) { 
			                					
			                					swal('Oops...',errorString,'error');
			                				}
			                			},async=false );
			                	  		}, 2000);			                     
			                }
			            })
			  }

			 });

	 }
	 else 
	    swal('','Es necesario que seleccione por lo menos una Orden de Pago para realizar esta acción','warning');
}


//Metodo para ejercer las ordenes de pago 
function validarOP()
{
	var now = new Date();
	var checkClaves = [];
	var fecha = $('#txtfechanueva2').val();
	//recuperar las claves a ejercer
     $('input[id=chkOP]:checked').each(function() { checkClaves.push($(this).val());});	
	 if (checkClaves.length>0){
		 
		 if(fecha=='') {swal('','La fecha de validacion para la Orden de Pago no es válida', 'warning'); return false;}
		 
		 swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea recibir la Orden de Pago?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, gaurdar!',
			  cancelButtonText: 'No, abortar!',
			  cancelButtonColor: '#d33',
			  showLoaderOnConfirm: true,
			  preConfirm: function(email) {
				    return new Promise(function(resolve, reject) {
				      setTimeout(function() {
				          resolve();
				          controladorListadoOrdenRecibidas.fechaValidacionOrdenPago(checkClaves, fecha,{
				    			callback:function(items) { 
				    				swal({
										  title: 'OP recibida(s) con éxito',
										  onOpen: function () {setTimeout(function () {
											  swal.close(),
											  buscarOpMes();
											  }, 700)}
										})
				  				}
				  				,
				  				errorHandler:function(errorString, exception) { 
				  					swal('Fallo la operacion:<br>Error::'+errorString+'-message::'+exception.message+'-JavaClass::'+exception.javaClassName+'.<br><strong>Consulte a su administrador</strong>');   
				  					return false;
				  				}
				  			});  
				        }, 2000);//cierra el  setTimeout de la nueva promesa
				    });
				  },
				  allowOutsideClick: false
				
			})
	 }
	 else 
	    swal('','Es necesario que seleccione por lo menos una Orden de Pago para realizar esta acción','warning');
}


//funcion para bu{-}scar ordenes de pago segun criterio del mes
function buscarOpMes(){
	
	
	var s = "?&mes="+$('#cbomes').val() + '&momento='+$('#cbmomento').val()+ '&txtsearchop='+$('#txtsearchop').val();
	document.location = s;
}

function getReporteOP(clave) {
	$('#cve_op').attr('value',clave);
	$('#forma').attr('action',"../reportes/formato_orden_pago.action");
	$('#forma').attr('target',"impresion");
	$('#forma').submit();
}

function mostrarOpcionPDF(clave){

	swal({
		  title: 'Opciones de Reporte</br> Orden de Pago  '+clave ,
		  confirmButtonText:'Cerrar',
		  html:
			  '<table class="table table-striped table-hover" align="center" width="405" >'+
				'  <tr class="info"> '+
				'	<td width="33" height="27" align="center" style="cursor:pointer" onclick="getReporteOP('+clave+')"> '+
				'	  <img src="../../imagenes/pdf.gif"/></td>' +
				'	<td width="362" height="27" align="left" style="cursor:pointer" onclick="getReporteOP('+clave+')">&nbsp;Reporte Normal Orden de Pago</td> '+
				'  </tr> '+
				
				'  <tr class="success"> '+
				'	  <td height="27" align="center"  style="cursor:pointer" onclick="getAnexosListaOP('+clave+')"><img src="../../imagenes/report.png" /></td> '+
				'	  <td height="27" align="left" style="cursor:pointer" onclick="getAnexosListaOP('+clave+')">&nbsp;Listar Anexos de Orden de Pago</td> '+
				'	</tr> ' +
				'</table>', 
		  showCloseButton: true,
		  showCancelButton: true,
		  focusConfirm: false,
		  
		})
	
}

function getAnexosListaOP(clave){
	//jWindow('<iframe width="750" height="350" name="ventanaArchivosOP" id="ventanaArchivosOP" frameborder="0" src="../../sam/consultas/muestra_anexosOP.action?cve_op='+cve_op+'"></iframe>','Listado de Anexos de OP: '+cve_op, '','Cerrar',1);
	swal({
		  title: 'ventanaArchivosOP',
		  text: 'Listado de Anexos de OP: '+clave,
		  confirmButtonText:'Cerrar',
		  html:
			  '<iframe width="750" height="350" name="ventanaArchivosOP" id="ventanaArchivosOP" frameborder="0" src="../../sam/consultas/muestra_anexosOP.action?cve_op='+clave+'"></iframe>',
		  width: 800,
		  padding: 10,
		  animation: false
		})
}

//****************************************************** funcion para mostrar la bitacora dependiendo el doc. **************************************************//
function bitacoraDocumento(cve_doc, tipo){	//Cambios para 24/08/2017
	
	swal({
	    title: 'Bitacora de Movimientos: ',
	    confirmButtonText:  'Cerrar',
	    width: 700,
	    html:
	    	'<iframe width="700" height="350" id="ventadaBitacora" frameborder="0" src="../../sam/consultas/muestraBitacora.action?cve_doc='+cve_doc+'&tipo_doc='+tipo+'"></iframe>', 
	   })
}