var centro =   "text-align:center";
var derecha =  "text-align:right";
var izquierda = "text-align:left";
var periodoOSOT="";
var fechaOSOT=""; 
var row_color = "";
var resultData=["Mumbai","Delhi","Chennai","Goa"]
var myselect = $('<select>');
$(document).ready(function() {
	
$('.selectpicker').selectpicker();
	
});

/***********************************funcion que sirve para mostrar el submenu de opciones********************************************************/
function subOpAdm(modulo, cve_doc, cve_pers){
		
	var titulo = "";
	if(modulo=='req') titulo = 'Requisiciones';
	if(modulo=='ped') titulo = 'Pedidos'
	if(modulo=='op') titulo = 'Ordenes de Pago';
	if(modulo=='val') titulo = 'Vales';
	if(modulo=='con') titulo = 'Contrato';
	swal({
	    title: 'Submenu de opciones módulo: '+ titulo,
	    width: 450,
	    confirmButtonText: 'Cerrar',
	    html:
	       	'<iframe width="430" height="270" name="subMenuAdmon" id="subMenuAdmon" frameborder="0" src="../../sam/utilerias/sumenuAdmon.action?modulo='+modulo+'&cve_doc='+cve_doc+'&cve_pers='+cve_pers+'"></iframe>', 
	   })
}


/************************************** Funcion para el cambio de fecha y periodo ******************************************************************/
/**************************************Submenu de opciones módulo Requisiciones ********************************************************************/
function cambiarFechaPeriodo(cve_doc, modulo){
		
	
	var smodulo = "";
	if(modulo=='req') smodulo = "Requisiciones";
	if(modulo=='ped') smodulo = "Pedidos";
	if(modulo=='op') smodulo ="Ordenes de Pago";
	if(modulo=='val') smodulo ="Vales";
	
	
	
	/*investigar el periodo y fecha actual del documento*/
	if(modulo=='req'){
		alert('Entro a cambiar fecha y periodo segun el modulo: ' +smodulo +'  No.: ' +(cve_doc));
		controladorListadoRequisicionesRemoto.getFechaPeriodoRequisicion(cve_doc, {
			callback:function(items) {
				var html ='<div class="row">Fecha actual: ' + items.FECHA +'</div></br>'+ 
			    '<label for="fecha_relacion" class="control-label">Fecha:</label>' +
			    '<div class="row">' +
			   	'<div class="col-sm-6">'+
	    		'<input type="text" id="dato_fecha" placeholder="Formato DD/MM/AAAA" name="dato_fecha" class="form-control" style="width:170px" />	 ' +
	    		'</div>' +
	    		'</div>' +
	    		'</div>' +
	    		'<div class="row>'+
			    '<div class="form-group">' +
			    '<label for="grupo" class="control-label">Periodo:</label>' +
			    '<div class="form-group">' +
			    		'<select name ="cboperiodo" id="cboperiodo" class="form-control" style="width:200px">' +
			    			'<option value="1" '+((items.PERIODO==1) ? 'Selected':'')+'>( 01 ) Enero</option>' +
			    			'<option value="2" '+((items.PERIODO==2) ? 'Selected':'')+'>( 02 ) Febrero</option>' +
			    			'<option value="3" '+((items.PERIODO==3) ? 'Selected':'')+'>( 03 ) Marzo</option>' +
			    			'<option value="4" '+((items.PERIODO==4) ? 'Selected':'')+'>( 04 ) Abril</option>' +
			    			'<option value="5" '+((items.PERIODO==5) ? 'Selected':'')+'>( 05 ) Mayo</option>' +
			    			'<option value="6" '+((items.PERIODO==6) ? 'Selected':'')+'>( 06 ) Junio</option>' +
			    			'<option value="7" '+((items.PERIODO==7) ? 'Selected':'')+'>( 07 ) Julio</option>' +
			    			'<option value="8" '+((items.PERIODO==8) ? 'Selected':'')+'>( 08 ) Agosto</option>' +
			    			'<option value="9" '+((items.PERIODO==9) ? 'Selected':'')+'>( 09 ) Septiembre</option>' +
			    			'<option value="10" '+((items.PERIODO==10) ? 'Selected':'')+'>( 10 ) Octubre</option>' +
			    			'<option value="11" '+((items.PERIODO==11) ? 'Selected':'')+'>( 11 ) Noviembre</option>' +
			    			'<option value="12" '+((items.PERIODO==12) ? 'Selected':'')+'>( 12 ) Diciembre</option>' +
			    		'</select">' +
			    	'</div>' +
			    	'</div>' +
			    '</div>';
				swal({
					  title: 'Cambio de fecha '+smodulo,
					  inputPlaceholder: 'dd/mm/aaaa',
					  html: html,
					  customClass: 'swal2-overflow',
					  width: 400,
					  showCancelButton: true,
					  showLoaderOnConfirm: true,
					  confirmButtonText: 'Cambiar',
					  cancelButtonText: 'Cancelar',
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
						 	var periodo = $('#cboperiodo').val();
						 	var fecha_new= $('#dato_fecha').val(); 
							if (result.value) {
								
								swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
								
					        }else
					        	
					        	_cambiarFechaPeriodoRequisicion(cve_doc);
					        
								
					        	
					 })
				  
	 },
	 	errorHandler:function(errorString, exception) { 
	 		swal({text:errorString,type:'error'});          
	 }
	});//Termina getFechaPeriodoRequisicion
	}//Termina si es requisicion...
	if(modulo=='ped'){
		
		controladorPedidos.getFechaPeriodoPedido(cve_doc, {
						callback:function(items) { 		
							var html = '<table width="350" border="0" cellspacing="0" cellpadding="0">' +
							'<tr>'+
								'<td height="30">Número Pedido:</td>'+
								'<td><strong>'+items.NUM_PED+'</strong></td>'+
							  '</tr>'+
							  '<tr>'+
								'<td height="30">Fecha actual dd/mm/aaaa:</td>'+
								'<td><input type="text" id="txtfechaactual" class="form-control" value="'+items.FECHA_PED+'" style="width:140px" /></td>'+
							  '</tr>'+
							  
							'</table>';
							swal({
								  title: '',
								  text: 'Modificar fecha del pedido',
								  html: html,
								  width: 400,
								  inputPlaceholder: 'dd/mm/aaaa',
								  showCancelButton: true,
								  showLoaderOnConfirm: true,
								  confirmButtonText: 'Cambiar',
								  cancelButtonText: 'Cancelar',
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
										_cambiarFechaPeriodoPedido(cve_doc);									
									}else
								       	swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
								  
								})
							/*
							$('#txtfechaactual').keypress(function(event){if (event.keyCode == '13'){$('#cmdaplicar').click();}});*/	
							
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal('',errorString, 'error');          
					 }
		});
	}
	if(modulo=='val'){
		controladorListadoValesRemoto.getFechaPeriodoVale(cve_doc, {
						callback:function(items) { 		
							var html = '<table width="350" border="0" cellspacing="0" cellpadding="0">' +
							  '<tr>'+
								'<td height="30">Numero Vale:</td>'+
								'<td><strong>'+items.NUM_VALE+'</strong></td>'+
							  '</tr>'+
							  '<tr>'+
								'<td height="30" width="150">Periodo actual: </td>'+
								'<td width="200"><select name ="cboperiodo" id="cboperiodo" style="width:140px">'+
									'<option value="1" '+((items.MES==1) ? 'Selected':'')+'>(01) Enero</option>'+
									'<option value="2" '+((items.MES==2) ? 'Selected':'')+'>(02) Febrero</option>'+
									'<option value="3" '+((items.MES==3) ? 'Selected':'')+'>(03) Marzo</option>'+
									'<option value="4" '+((items.MES==4) ? 'Selected':'')+'>(04) Abril</option>'+
									'<option value="5" '+((items.MES==5) ? 'Selected':'')+'>(05) Mayo</option>'+
									'<option value="6" '+((items.MES==6) ? 'Selected':'')+'>(06) Junio</option>'+
									'<option value="7" '+((items.MES==7) ? 'Selected':'')+'>(07) Julio</option>'+
									'<option value="8" '+((items.MES==8) ? 'Selected':'')+'>(08) Agosto</option>'+
									'<option value="9" '+((items.MES==9) ? 'Selected':'')+'>(09) Septiembre</option>'+
									'<option value="10" '+((items.MES==10) ? 'Selected':'')+'>(10) Octubre</option>'+
									'<option value="11" '+((items.MES==11) ? 'Selected':'')+'>(11) Noviembre</option>'+
									'<option value="12" '+((items.MES==12) ? 'Selected':'')+'>(12) Diciembre</option>'+
								'</select></td>'+
							  '</tr>'+
							  '<tr>'+
								'<td height="30">Fecha actual dd/mm/aaaa:</td>'+
								'<td><input type="text" id="txtfechaactual" value="'+items.FECHA+'" style="width:140px" /></td>'+
							  '</tr>'+
							
							'</table>';
							swal({
								  title: '',
								  text: 'Modificar fecha del Vale',
								  html: html,
								  width: 400,
								  inputPlaceholder: 'dd/mm/aaaa',
								  showCancelButton: true,
								  showLoaderOnConfirm: true,
								  confirmButtonText: 'Cambiar',
								  cancelButtonText: 'Cancelar',
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
										
										_cambiarFechaPeriodoVal(cve_doc);									
									}else
										
								       	swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
								  
								})
						
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal('',errorString, 'error');          
					 }
		});
	}//Termina el cambio de fecha y periodo del Mod. de Vales
	if(modulo=='op'){
		controladorOrdenPagoRemoto.getFechaPeriodoOp(cve_doc, {
						callback:function(items) { 		
							var html = '<table width="350" border="0" cellspacing="0" cellpadding="0">' +
							  '<tr>'+
								'<td height="30">Número Orden de Pago:</td>'+
								'<td><strong>'+items.NUM_OP+'</strong></td>'+
							  '</tr>'+
							  '<tr>'+
								'<td height="30" width="150">Periodo actual: </td>'+
								'<td width="200"><select name ="cboperiodo" id="cboperiodo" style="width:140px">'+
									'<option value="1" '+((items.PERIODO==1) ? 'Selected':'')+'>(01) Enero</option>'+
									'<option value="2" '+((items.PERIODO==2) ? 'Selected':'')+'>(02) Febrero</option>'+
									'<option value="3" '+((items.PERIODO==3) ? 'Selected':'')+'>(03) Marzo</option>'+
									'<option value="4" '+((items.PERIODO==4) ? 'Selected':'')+'>(04) Abril</option>'+
									'<option value="5" '+((items.PERIODO==5) ? 'Selected':'')+'>(05) Mayo</option>'+
									'<option value="6" '+((items.PERIODO==6) ? 'Selected':'')+'>(06) Junio</option>'+
									'<option value="7" '+((items.PERIODO==7) ? 'Selected':'')+'>(07) Julio</option>'+
									'<option value="8" '+((items.PERIODO==8) ? 'Selected':'')+'>(08) Agosto</option>'+
									'<option value="9" '+((items.PERIODO==9) ? 'Selected':'')+'>(09) Septiembre</option>'+
									'<option value="10" '+((items.PERIODO==10) ? 'Selected':'')+'>(10) Octubre</option>'+
									'<option value="11" '+((items.PERIODO==11) ? 'Selected':'')+'>(11) Noviembre</option>'+
									'<option value="12" '+((items.PERIODO==12) ? 'Selected':'')+'>(12) Diciembre</option>'+
								'</select></td>'+
							  '</tr>'+
							  '<tr>'+
								'<td height="30">Fecha actual dd/mm/aaaa:</td>'+
								'<td><input type="text" id="txtfechaactual" value="'+items.FECHA+'" style="width:140px" /></td>'+
							  '</tr>'+
							  
							'</table>';
							swal({
								  title: '',
								  text: 'Modificar fecha de Orden de Pago',
								  html: html,
								  width: 400,
								  inputPlaceholder: 'dd/mm/aaaa',
								  showCancelButton: true,
								  showLoaderOnConfirm: true,
								  confirmButtonText: 'Cambiar',
								  cancelButtonText: 'Cancelar',
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
										swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
												
									}else
										_cambiarFechaPeriodoOp(cve_doc);
										
								       	
								  
								})
					 },
					 errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');          
					 }
		});
	}
}//Termina el cambio de Periodo y fecha

//Cambia la fecha en Pedidos
function _cambiarFechaPeriodoPedido(cve_doc){
	
	var fecha = $('#txtfechaactual').val();
	
	swal({
		  title: 'Cambio de fecha',
		  text: 'Fecha nueva: '+ fecha ,
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
				controladorPedidos.cambiarFechaPeriodo(cve_doc, fecha, {
					callback:function(items) { 	
						if(items)
							//CloseDelay('Fecha cambiada con éxito', 3000, setTimeout('getPedidos()',1000));
							setTimeout('getPedidos()',1000);
						else 
							swal('',items, 'error');
					} 					   				
				 ,
				 errorHandler:function(errorString, exception) { 
					 swal('',errorString, 'error');          
				 }
				});	
		        	swal({title:'Proceso cocluido con exito!!',showConfirmButton: false,timer:1000,type:"success"});
		        }else
		        	swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
		  
		})
}
//Cambia la fecha en Vales

//Cambia la fecha en Requisiciones
function _cambiarFechaPeriodoRequisicion(cve_doc){
	var periodo = $('#cboperiodo').val();
	var fecha = $('#dato_fecha').val();
	
	swal({
		  title: 'Cambio de fecha',
		  text: 'Fecha nueva: '+ fecha ,
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
				
					swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
				
		        }else
		        	controladorListadoRequisicionesRemoto.cambiarFechaPeriodo(cve_doc, fecha, periodo, {
						callback:function(items) { 	
							if(items)
								setTimeout('getListaReq()',1000);
							else 
								swal('',items, 'error');
						} 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal('',errorString, 'error');          
					 }
					});	
			        	swal({title:'Fecha y periodo cambiados con éxito!!',showConfirmButton: false,timer:1000,type:"success"});
		  
		})
}

//Cambia la fecha en Vales y periodo
function _cambiarFechaPeriodoVal(cve_doc){
	var periodo = $('#cboperiodo').val();
	var fecha = $('#txtfechaactual').val();
	
	swal({
		  title: 'Cambio de fecha',
		  text: 'Fecha nueva: '+ fecha ,
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
				controladorListadoValesRemoto.cambiarFechaPeriodo(cve_doc, fecha, periodo, {
					callback:function(items) { 	
						if(items)
							//CloseDelay('Fecha y periodo cambiados con éxito', 3000, );
							setTimeout('getVale()',1000)
						else 
							swal('',items, 'error');
					} 					   				
				 ,
				 errorHandler:function(errorString, exception) { 
					swal('',errorString, 'error');          
				 }
				});	
		        	swal({title:'Fecha y periodo cambiados con éxito!!',showConfirmButton: false,timer:1000,type:"success"});
		        }else
		        	swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
		  
		})
}
//Cambia la fecha en Ordenes de Pago y periodo
function _cambiarFechaPeriodoOp(cve_doc){
	var periodo = $('#cboperiodo').val();
	var fecha = $('#txtfechaactual').val();
	
	swal({
		  title: 'Cambio de fecha',
		  text: 'Fecha nueva: '+ fecha ,
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
				controladorOrdenPagoRemoto.cambiarFechaPeriodo(cve_doc, fecha, periodo, {
					callback:function(items) { 	
						if(items)
							setTimeout('getOrden()',1000);
						else 
							swal('',items, 'error');
					} 					   				
				 ,
				 errorHandler:function(errorString, exception) { 
					swal('',errorString, 'error');          
				 }
				});	
		        	swal({title:'Fecha y periodo cambiados con éxito!!',showConfirmButton: false,timer:1000,type:"success"});
		        }else
		        	swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
		  
		})
}

/************************************************ function para cambiar el usuario de un documento *********************************************************************************/
function cambiarUsuarioDocumento(cve_doc, modulo, cve_pers){
	
	var smodulo = "";
	if(modulo=='req') smodulo = "Requisiciones";
	if(modulo=='ped') smodulo = "Pedidos";
	if(modulo=='op') smodulo = "Ordenes de Pago";
	if(modulo=='val') smodulo = "Vales";
	
	if(modulo=='req'){
		var chkReq = [];
		var chkNumReq = [];
		$('input[name=chkrequisiciones]:checked').each(function(){chkReq.push($(this).val()); chkNumReq.push($(this).attr('alt')); });
		
		if(chkReq.length<=0) {
			$('input[name=chkrequisiciones]').each(function(){if($(this).val()==cve_doc) {chkNumReq.push($(this).attr('alt')); return false;} });
			chkReq.push(cve_doc); 
		}
		
		controladorListadoRequisicionesRemoto.getListUsuarios(cve_pers,{
			callback:function(items) { 
				if(items!=null) {
					html ='<div><span style="font-size:12px"><I><strong>Nota:</strong> Los documentos seleccionados se van a transferir a otro usario, esto puede hacer que deje de visualizarlos en los listados que le corresponden.</span></I></div>'+
					      '<div><strong>'+((chkReq.length==1) ? 'Número de Requisición':'Grupo de Requisiciones:')+'</strong></div>'+
			 	          '<div>'+((chkNumReq.length==0) ? 'CVE_REQ: '+cve_doc:chkNumReq)+'</div>'+
					      '<div><strong>Seleccione un usuario de destino:</strong></div>'+
					      '<div><select id="cbousuarios" class="form-control input-sm" style="width:300px">'+items+'</select></div>';
									
					swal({title:'<h2>Mover documento a otro usuario</h2>',html:html,allowOutsideClick:false,showCancelButton: true,confirmButtonText: 'Cambiar'}).catch(swal.noop);
					$('.swal2-confirm').click(function(event){_cambiarUsuarioRequisicion(chkReq,cve_doc);})
						
				}
				
			},
			errorHandler:function(errorString, exception) { 
				swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
			}       	
		});

	}/*Cierra el modulo para requisiciones*/
	
	if(modulo=='ped'){
		var chkPed = [];
		var chkNumPed = [];
		$('input[name=chkpedidos]:checked').each(function(){chkPed.push($(this).val()); chkNumPed.push($(this).attr('alt')); });
		
		if(chkPed.length<=0) {
			$('input[name=chkpedidos]').each(function(){if($(this).val()==cve_doc) {chkNumPed.push($(this).attr('alt')); return false;} });
			chkPed.push(cve_doc); 
		}
		
		controladorPedidos.getListUsuarios(cve_pers,{
			callback:function(items) { 
				if(items!=null) {
					html ='<div><span style="font-size:12px"><I><strong>Nota:</strong> Los documentos seleccionados se van a transferir a otro usario, esto puede hacer que deje de visualizarlos en los listados que le corresponden.</span></I></div>'+
					      '<div><strong>'+((chkPed.length==1) ? 'Número de Pedido':'Grupo de Pedidos:')+'</strong></div>'+
				 	      '<div>'+((chkNumPed.length==0) ? 'CVE_PED: '+cve_doc:chkNumPed)+'</div>'+
					      '<div><strong>Seleccione un usuario de destino:</strong></div>'+
					      '<div><select id="cbousuarios" class="form-control input-sm" style="width:300px">'+items+'</select></div>';
					
				    swal({title:'<h2>Mover documento a otro usuario</h2>',html:html,allowOutsideClick:false,showCancelButton: true,confirmButtonText: 'Cambiar'}).catch(swal.noop);
					$('.swal2-confirm').click(function(event){_cambiarUsuarioPedidos(chkPed,cve_doc);})
				}
				
			},
			errorHandler:function(errorString, exception) { 
				swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');   
			}       	
		});
	}
	//Cambio de usuarios en Modulo de Ordenes de Pago
	if(modulo=='op'){
		var chkOp = [];
		var chkNumOp = [];
		$('input[name=chkordenes]:checked').each(function(){chkOp.push($(this).val()); chkNumOp.push($(this).attr('alt')); });
		
		if(chkOp.length<=0) {
			$('input[name=chkordenes]').each(function(){if($(this).val()==cve_doc) {chkNumOp.push($(this).attr('alt')); return false;} });
			chkOp.push(cve_doc); 
		}
		
		controladorOrdenPagoRemoto.getListUsuarios(cve_pers,{
			callback:function(items) { 
				if(items!=null) {
					html ='<div><span style="font-size:12px"><I><strong>Nota:</strong> Los documentos seleccionados se van a transferir a otro usario, esto puede hacer que deje de visualizarlos en los listados que le corresponden.</span></I></div>'+
					 	  '<div><strong>'+((chkOp.length==1) ? 'Orden de Pago':'Grupo de Orden(es) de Pago:')+'</strong></div>'+
					 	  '<div>'+((chkNumOp.length==0) ? 'CVE_OP: '+cve_doc:chkNumOp)+'</div>'+
					 	 '<div><strong>Seleccione un usuario de destino:</strong></div>'+
						  '<div><select id="cbousuarios" class="form-control input-sm" style="width:300px">'+items+'</select></div>';
						
					swal({
						  title:'<h2>Mover documento a otro usuario</h2>',
						  html:html,
						  allowOutsideClick:false,
						  showCancelButton: true,
						  confirmButtonText: 'Cambiar'
						}).catch(swal.noop);
					$('.swal2-confirm').click(function(event){_cambiarUsuarioOrdenPago(chkOp,cve_doc);})
				}/*if (result.dismiss === 'cancel') {
					alert('Cancelo el proceso');
				}*/
				
			},
			errorHandler:function(errorString, exception) { 
				swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');   
			}       	
		});
	}
	//Cambio de usuarios en Modulo de Vales
	if(modulo=='val'){
		var chkVal = [];
		var chkNumVal = [];
		$('input[name=claves]:checked').each(function(){chkVal.push($(this).val()); chkNumVal.push($(this).attr('alt')); });
		
		if(chkVal.length<=0) {
			$('input[name=claves]').each(function(){if($(this).val()==cve_doc) {chkNumVal.push($(this).attr('alt')); return false;} });
			chkVal.push(cve_doc); 
		}
		
		controladorListadoValesRemoto.getListUsuarios(cve_pers,{
			callback:function(items) { 
				if(items!=null) {
					html ='<div><span style="font-size:12px"><I><strong>Nota:</strong> Los documentos seleccionados se van a transferir a otro usario, esto puede hacer que deje de visualizarlos en los listados que le corresponden.</span></I></div>'+
						  '<div><strong>'+((chkVal.length==1) ? 'Número de Vale':'Grupo de Vales:')+'</strong></div>'+
						  '<div>'+((chkNumVal.length==0) ? ' Vale: '+cve_doc:chkNumVal)+'</div>'+
						  '<div><strong>Seleccione un usuario de destino:</strong></div>'+
						  '<div><select id="cbousuarios" class="form-control" style="width:460px">'+items+'</select></div>';
						
						swal({title:'<h2>Mover documento a otro usuario</h2>',html:html,allowOutsideClick:false,showCancelButton: true,confirmButtonText: 'Cambiar'});
						$('.swal2-confirm').click(function(event){_cambiarUsuarioVales(chkVal,cve_doc);})
				}
				
			},
			errorHandler:function(errorString, exception) { 
				swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');   
			}       	
		});
	}
	
}

//Cambia el usuario de Requisiciones
function _cambiarUsuarioRequisicion(chkReq, cve_doc){
	
	var cve_pers_dest = $('#cbousuarios').val();
	var inputOptions = $('#cbousuarios').val();
	if(cve_pers_dest==0){swal('Es necesario seleccionar un usuario para realizar esta operación', 'Advertencia'); return false;}
		
	swal({
		  title: 'Cambio de usuario',
		  text: $("#cbousuarios option:selected").text(), //$("#cbousuarios option:selected").text();
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  confirmButtonText: 'Aceptar',
		  cancelButtonText: 'Cancelar',
		  allowOutsideClick: false,
		  preConfirm: function() {
		    return new Promise(function(resolve, reject) {
		    	// here should be AJAX request
		      setTimeout(function() {
		    	  controladorListadoRequisicionesRemoto.moverRequisiciones(chkReq, cve_pers_dest,{
						callback:function(items) {
							if(items!=null) {
								setTimeout(function(){
								    swal("Se han movido los documentos con exito!");
								    setTimeout('getListaReq()', 1500);
								},2000);
							}
							else
								swal('Error inesperado','La operacion ha fallado al mover los documentos a otro usuario', 'error');
						},
						errorHandler:function(errorString, exception) { 
							swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
						}   
		        	});	
		        resolve();
		      }, 2000);
		    });
		  },
		})
}
//Cambia el usuario de Vales
function _cambiarUsuarioVales(chkVal, cve_doc){
	var cve_pers_dest = $('#cbousuarios').val();
	
	if(cve_pers_dest==0){swal('','Es necesario seleccionar un usuario para realizar esta operación', 'warning'); return false;}
	swal({
		  title: 'Cambio de usuario',
		  text: $("#cbousuarios option:selected").text(),
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  confirmButtonText: 'Aceptar',
		  cancelButtonText: 'Cancelar',
		  allowOutsideClick: false,
		  preConfirm: function() {
		    return new Promise(function(resolve, reject) {
		    	// here should be AJAX request
		      setTimeout(function() {
		    	  controladorListadoValesRemoto.moverVales(chkVal, cve_pers_dest,{
						callback:function(items) {
							if(items!=null){
								setTimeout(function(){
								    swal("Se han movido los documentos con exito!");
								    setTimeout('getVale()', 1500);
								},2000);
							}
							else
								swal('Error inesperado','La operacion ha fallado al mover los documentos a otro usuario', 'error');
						},
						errorHandler:function(errorString, exception) { 
						swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'');   
					}   
		    	  });
		        resolve();
		      }, 2000);
		    });
		  },
		})
}

//Cambia el usuario de Pedidos
function _cambiarUsuarioPedidos(chkPed, cve_doc){
	var cve_pers_dest = $('#cbousuarios').val();
	if(cve_pers_dest==0){swal('','Es necesario seleccionar un usuario para realizar esta operació³n', 'warning'); return false;}
	
	swal({
		  title: 'Cambio de usuario',
		  text: $("#cbousuarios option:selected").text(),
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  confirmButtonText: 'Aceptar',
		  cancelButtonText: 'Cancelar',
		  allowOutsideClick: false,
		  preConfirm: function() {
		    return new Promise(function(resolve, reject) {
		    	// here should be AJAX request
		      setTimeout(function() {
		    		controladorPedidos.moverPedidos(chkPed, cve_pers_dest,{
						callback:function(items) {
							if(items!=null){
								setTimeout(function(){
								    swal("Se han movido los documentos con exito!");
								    setTimeout('getPedidos()', 1500);
								},2000);
							}
							else
								swal('Error inesperado','La operacion ha fallado al mover los documentos a otro usuario', 'error');
						},
						errorHandler:function(errorString, exception) { 
						swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'warning');   
					}   
				});
		        resolve();
		      }, 2000);
		    });
		  },
		})
}


//Cambia el usuario de Orden de Pago
function _cambiarUsuarioOrdenPago(chkOp, cve_doc){
	var cve_pers_dest = $('#cbousuarios').val();
	if(cve_pers_dest==0){swal('','Es necesario seleccionar un usuario para realizar esta operación', 'Advertencia'); return false;}
	
	swal({
		  title: 'Cambio de usuario',
		  text: $("#cbousuarios option:selected").text(),
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  confirmButtonText: 'Confirmar',
		  cancelButtonText: 'Cancelar',
		  allowOutsideClick: false,
		  preConfirm: function() {
		    return new Promise(function(resolve, reject) {
		    	// here should be AJAX request
		      setTimeout(function() {
		    	  controladorOrdenPagoRemoto.moverOrdenesPago(chkOp, cve_pers_dest, {
						callback:function(items) {
							
							if(items!=null) {
								setTimeout(function(){
								    swal("Se han movido los documentos con exito!");
								    setTimeout('getOrden()', 1500);
								},2000);
							}
							else
								swal('','La operacion ha fallado al mover los documentos a otro usuario', 'error');
						} 					   				
						,
						errorHandler:function(errorString, exception) { 
							swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
						}
					});
		        resolve();
		      }, 2000);
		    });
		  },
		})
}

/* -------------------------------------  Clase para el cambio del beneficiario ------------------------------------------------*/
/* -----------------------------------------------------------------------------------------------------------------------------*/
function cambiarBeneficiario(cve_doc, modulo){
	var smodulo = "";
	if(modulo=='req') smodulo = "Requisiciones";
	if(modulo=='ped') smodulo = "Pedidos";
	if(modulo=='op') smodulo = "Ordenes de Pago";
	if(modulo=='val') smodulo = "Vales";
	
	var beneficiario="";
	var clave="";
	
	if(modulo=='req'){
			controladorListadoRequisicionesRemoto.getBeneficiario(cve_doc,{
				callback:function(items) { 
						//ShowDelay('Cargando padron de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";	
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<div><span style="font-size:12px"><I><strong>Requisición:</strong></I></div>'+
						  	  '<div><strong>'+items.NUM_REQ+'</strong></div>'+
						  	  '<div><strong>Beneficiario:</strong></div>'+
						  	  "<select name='cbogrupos' id='cbogrupos' class='form-control' style='width:450px'>"+texto+"</select>" +
						  	  "<input type='hidden' id='grupo' name='grupo' value=''>" +
						      '<div><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></div>';
							  				
							//_closeDelay();
						swal({title:'<h2>Cambio de beneficiario</h2>',html:html,allowOutsideClick:false,showCancelButton: true,confirmButtonText: 'Cambiar'}).catch(swal.noop);
						$('.swal2-confirm').click(function(event){_cambiarBeneficiarioRequisicion(chkReq,cve_doc);}) 	
						
							//getBeneficiarios('txtbeneficiario','CVE_BENE','');
				}
				,
					errorHandler:function(errorString, exception) { 
					swal('No se ha podido leer el beneficiario del documento, esta opcion no es valida para las requisiciones - '+errorString,'Error');   
					}       	
			});
	}
	
	if(modulo=='ped'){
			controladorPedidos.getBeneficiario(cve_doc,{
				callback:function(items) { 
						//ShowDelay('Cargando padrón de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";	
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<div><span style="font-size:12px"><I><strong>Requisición:</strong></I></div>'+
					  	      '<div><strong>'+items.NUM_PED+'</strong></div>'+
					  	      '<div><strong>Beneficiario:</strong></div>'+
					          '<div><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></div>';
						swal({title:'<h2>Cambio de beneficiario</h2>',html:html,allowOutsideClick:false,showCancelButton: true,confirmButtonText: 'Cambiar'}).catch(swal.noop);
						$('.swal2-confirm').click(function(event){_cambiarBeneficiarioPedidos(cve_doc);}) 	
						//getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
				}
				,
					errorHandler:function(errorString, exception) { 
					swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
					}       	
			});
	}
	//beneficiarios
	if(modulo=='op'){
			controladorOrdenPagoRemoto.getBeneficiario(cve_doc,{
				callback:function(items) { 
						console.log(items);
						//ShowDelay('Cargando padrón de beneficiarios...','');
						/*if(items==null){
							beneficiario = ""; clave= "";	
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}*/
						html ='<div><span style="font-size:12px"><I><strong>'+smodulo+':</strong></I></div>'+
				  	          '<div><strong>'+cve_doc+'</strong></div>'+
				  	          '<div><strong>Beneficiario:</strong></div>'+
				              '<div><select id="cbobeneficiario" class="selectpicker form-control input-sm m-b" data-live-search="true" data-size="2" style="width:300px">'+items+'</select></div>';
							  '<div><strong>Beneficiario:</strong></div>';			
						swal({
							  title:'Cambio de beneficiario',
							  html:html,allowOutsideClick:false,
							  customClass: 'swal2-overflow',
							  showCancelButton: true,
							  confirmButtonText: 'Cambiar',
							  onOpen: function() {
								  $('.selectpicker').selectpicker();
							  },
						  }).catch(swal.noop);
						$('.swal2-confirm').click(function(event){_cambiarBeneficiarioOrdenPago(cve_doc);}) 
							//getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
				}
				,
					errorHandler:function(errorString, exception) { 
					swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
					}       	
			});
	}
	
	if(modulo=='val'){
			controladorListadoValesRemoto.getBeneficiarioVale(cve_doc,{
				callback:function(items) { 
						ShowDelay('Cargando padrón de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<div><span style="font-size:12px"><I><strong>Requisición:</strong></I></div>'+
			  	              '<div><strong>'+items.NUM_VALE+'</strong></div>'+
			  	              '<div><strong>Beneficiario:</strong></div>'+
			                  '<div><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></div>';
							  //_closeDelay();
						swal({title:'<h2>Cambio de beneficiario</h2>',html:html,allowOutsideClick:false,showCancelButton: true,confirmButtonText: 'Cambiar'}).catch(swal.noop);
						$('.swal2-confirm').click(function(event){_cambiarBeneficiarioVale(cve_doc);}) 	
							//getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
				}
				,
					errorHandler:function(errorString, exception) { 
					swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
					}       	
			});
	}
}
//Cambio de beneficiario en Vales
function _cambiarBeneficiarioVale(cve_doc){
	var cve_benefi = $('#CVE_BENE').attr('value');
	if(cve_benefi==''){swal('Es necesario especificar el nuevo beneficiario para continuar','info'); return false;}	
	jConfirm('¿Confirma que desea cambiar el beneficiario del documento actual?','Confirmar', function(r){
			if(r){		
				ShowDelay('Cambiando beneficiario...', '');
				controladorListadoValesRemoto.cambiarBeneficiario(cve_doc, cve_benefi,{
						callback:function(items) {
							if(items!=null){
								CloseDelay('Se ha cambiado el beneficiario con exito', 3000, function(){
										setTimeout('getVale()', 1000);
									});
							}
							
						},
						errorHandler:function(errorString, exception) { 
						swal(errorString, 'Error');   
					}   
				});
			}
		});
}
//Cambio de beneficiario en las Ordenes de Pago
function _cambiarBeneficiarioOrdenPago(cve_doc){
	var cve_benefi = $('#cbobeneficiario').val();
	if(cve_benefi==''){swal('Es necesario especificar el nuevo beneficiario para continuar','Alerta'); return false;}	
	 console.log('El beneficiario que eligio es: ' +cve_benefi);
	 swal({
		  title: '¿Confirma que desea cambiar el beneficiario del documento actual?',
		  text: 'Cambiando beneficiario',
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  allowOutsideClick: false,
		  preConfirm: function() {
			 return new Promise(function(resolve, reject) {
				 controladorOrdenPagoRemoto.cambiarBeneficiario(cve_doc, cve_benefi,{
						callback:function(items) {
							if(items!=null){
								swal({title:'Se ha cambiado el beneficiario con exito', timer:1000,showConfirmButton: false,type:'success'});
								setTimeout('getOrden()', 1000);
							}
							
						},
						errorHandler:function(errorString, exception) { 
						swal(errorString, 'error');   
					}   
				});
		     });
		  },
	}).then(function (result) {
			console.log('Demo del result: ' +result.value);
			if (result.value) {
				swal({title:'Informacion cargada con exito!!',showConfirmButton: false,timer:1000,type:"success"});
		    }else
		        swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
	}) 
	
	/*
	jConfirm('¿Confirma que desea cambiar el beneficiario del documento actual?','Confirmar', function(r){
			if(r){		
				ShowDelay('Cambiando beneficiario...', '');
				controladorOrdenPagoRemoto.cambiarBeneficiario(cve_doc, cve_benefi,{
						callback:function(items) {
							if(items!=null){
								CloseDelay('Se ha cambiado el beneficiario con exito', 3000, function(){
										setTimeout('getOrden()', 1000);
									});
							}
							
						},
						errorHandler:function(errorString, exception) { 
						swal(errorString, 'Error');   
					}   
				});
			}
		});*/
}
//Cambio de beneficiario en las Pedidos
function _cambiarBeneficiarioPedidos(cve_doc){
	var cve_benefi = $('#CVE_BENE').attr('value');
	if(cve_benefi==''){swal('Es necesario especificar el nuevo beneficiario para continuar','Alerta'); return false;}	
	jConfirm('¿Confirma que desea cambiar el beneficiario del documento actual?','Confirmar', function(r){
			if(r){		
				ShowDelay('Cambiando beneficiario...', '');
				controladorPedidos.cambiarBeneficiario(cve_doc, cve_benefi,{
						callback:function(items) {
							if(items!=null){
								CloseDelay('Se ha cambiado el beneficiario con exito', 3000, function(){
										setTimeout('getPedidos()', 1000);
									});
							}
							
						},
						errorHandler:function(errorString, exception) { 
						swal(errorString, 'Error');   
					}   
				});
			}
		});
}
//Cambio de beneficiario en las Requisiciones
function _cambiarBeneficiarioRequisicion(cve_doc){
	var cve_benefi = $('#CVE_BENE').val();
	if(cve_benefi==''){swal('Es necesario especificar el nuevo beneficiario para continuar','Alerta'); return false;}	
	jConfirm('¿Confirma que desea cambiar el beneficiario del documento actual?','Confirmar', function(r){
			if(r){		
				ShowDelay('Cambiando beneficiario...', '');
				controladorListadoRequisicionesRemoto.cambiarBeneficiario(cve_doc, cve_benefi,{
						callback:function(items) {
							if(items!=null){
								CloseDelay('Se ha cambiado el beneficiario con exito', 3000, function(){
										setTimeout('getListaReq()', 1000);
									});
							}
							
						},
						errorHandler:function(errorString, exception) { 
						swal(errorString, 'Error');   
					}   
				});
			}
		});
	 
}


/*********************************** funcion para el cambio de grupo de firmas 29/08/2017 ************************************************************/
/*****************************************************************************************************************************************************/
function cambiarGrupoFirmas(cve_doc, modulo){
	swal({
		  title: 'Cambiar grupo de firmas',
		  text: 'Seleccione el nuevo grupo de firma',
		  html:
			  '<iframe width="800" height="350" name="grupoFirmas" id="grupoFirmas" frameborder="0" src="../../sam/utilerias/cambiarFirmas.action?modulo='+modulo+'&cve_doc='+cve_doc+'"></iframe>',
		  width: 800,
		  padding: 10,
		  confirmButtonText:'Cerrar',
		  animation: false
		})
	
}

/*************************** Funcion que muestra el documento a enlazar al devengado en la para la captura de factura *************************/
/******************************************** Contratos, Pedidos y OS u OT ********************************************************************/
function muestraTiposDocumento(){
		
	//alert('Esta es la dependencia: ' +$('#cbUnidad').val());
	var idDependencia= $('#cbUnidad').val();
	
	//var idDependencia = $('#cbodependencia').val();
	if($('#cbotipodocumento').val()==4)//O.S. y O.T.
	{
		if(idDependencia==0||idDependencia=="") {swal('Es necesario seleccionar la Unidad Administrativa para listar las Ordenes de Servicio y Trabajo'); return false;}
			
		swal({
			  title: 'Listado de O.S. y O.T.',
			  text: 'Seleccione O.S. u O.T. que desea devengar',
			  html:
				  '<iframe width="650" height="400" name="consultaPedido" id="consultaPedido" frameborder="0" src="../consultas/muestra_OT_OS_facturas.action?idDependencia='+idDependencia+'"></iframe>',
			  width: 800,
			  padding: 10,
			  confirmButtonText:'Cerrar',
			  animation: false
			})
	}
	if($('#cbotipodocumento').val()==3)//PEDIDO
	{
		if(idDependencia==0||idDependencia=="") {swal('Es necesario seleccionar la Unidad Administrativa para listar los Pedidos'); return false;}
			
			swal({
				  title: 'Listado de Pedidos con Entradas de Almacen',
				  text: 'Seleccione el PEDIDO que desea devengar',
				  html:
					  '<iframe width="650" height="400" name="consultaPedido" id="consultaPedido" frameborder="0" src="../consultas/muestra_pedidos_facturas.action?idDependencia='+idDependencia+'"></iframe>',
				  width: 800,
				  padding: 10,
				  confirmButtonText:'Cerrar',
				  animation: false
				})
			
	}
	
	if($('#cbotipodocumento').val()==23)//VALE
	{
		if(idDependencia==0||idDependencia=="") {swal('Es necesario seleccionar la Unidad Administrativa para listar los Pedidos'); return false;}
		
		var clv_benefi;
		var tipo_gto;
		var tipo_doc;
		
		if(typeof(clv_benefi)=='undefined') clv_benefi =0;
		if(typeof(tipo_gto)=='undefined') tipo_gto =0;
		if(typeof(tipo_doc)=='undefined') tipo_doc =1; //SOLO VALES ANTICIPO OBRAS (AO)
		if(typeof(idDependencia)=='undefined') idDependencia =0;
		
		if($('#CVE_DOC').attr('value')=='') $('#CVE_DOC').attr('value', 0);
		
		swal({
			  title: 'Listado de Vales disponibles',
			  text: 'Seleccione el VALE que desea devengar',
			  html:
				  '<iframe width="750" height="350" name="ventanaVales" id="ventanaVales" frameborder="0" src="../../sam/consultas/muestra_vales.action?idVale='+$('#CVE_DOC').attr('value')+'&idDependencia='+idDependencia+'&tipo_gto='+tipo_gto+'&clv_benefi='+clv_benefi+'&tipo_doc='+tipo_doc+'"></iframe>',
			  width: 800,
			  padding: 10,
			  confirmButtonText:'Cerrar',
			  animation: false
			})
		

	}
	
	if($('#cbotipodocumento').val()==6)//CONTRATO
	{
		if(idDependencia==0||idDependencia=="") {swal('Es necesario seleccionar la Unidad Administrativa para listar los contratos'); return false;}
		
		var num_docto = $('#txtdocumento').val();
		
		if(typeof(num_docto)=='undefined') clv_benefi =0;
		if(typeof(idDependencia)=='undefined') idDependencia =0;
		
		if($('#CVE_DOC').val()=='') $('#CVE_DOC').val(0);
					
		swal({
			  title: 'Listado Contratos',
			  text: 'Seleccione el contrato que desea devengar',
			  html:
				  '<iframe width="750" height="350" name="ventanaVales" id="ventanaVales" frameborder="0" src="../../sam/consultas/muestra_contratos.action?cve_contrato='+$('#CVE_DOC').val()+'&idDependencia='+idDependencia+'&num_contrato='+num_docto+'"></iframe>',
			  width: 800,
			  padding: 10,
			  confirmButtonText:'Cerrar',
			  animation: false
			})
	}
}
/************************************************************************************************************************************************/
/********************************** Termina función que muestra los documentos segun su tipo para la captura de factura *************************/


/********************************** Funcion que muestra el documento a enlazar a los contratos en la captura de contratos *************************/
/************************************** Pedidos, Vales y OS u OT Actulizacion 16-04-19 ************************************************************/
function muestraDocumento(){
	$('#doctol').show();
	var clv_benefi = $('#xBeneficiario').selectpicker('val');
	if(clv_benefi=='') $('#CLV_BENEFI').selectpicker('val','');
	
	var num_req = $('#txtdocumento').val();
	var idDependencia = $('#cbUnidad').val();
	var id_recurso = $('#tipoGasto').selectpicker('val');
	
	if(idDependencia==0||idDependencia=="") {swal('','Es necesario seleccionar la Unidad Administrativa para listar los documentos','warning'); return false;}
	if($('#cbotipocontrato').val()==0){swal('','Es necesario seleccionar el tipo de contrato','warning'); return false;}

	/*Retorna si vale cero*/
	if(cbotipocontrato=='0') return false;
	
	//Contrato desde un Pedido	
	if ($('#cbotipocontrato').val()==7){
		$('#doctol').show();
		$('#div_benaficiarioFijo').hide();
		swal({
				  title: 'Listado de Pedidos',
				  text: 'Seleccione pedido a contratar',
				  html:
					  '<iframe width="650" height="400" name="consultaPedido" id="consultaPedido" frameborder="0" src="../../sam/consultas/muestra_pedidos_contratos.action?idDependencia='+idDependencia+'"></iframe>',
				  width: 800,
				  padding: 10,
				  animation: false,
				  confirmButtonText: 'Cerrar'
			})
	}
	//Contrato desde un vale
	if ($('#cbotipocontrato').val()==13){
		$('#doctol').show();
		$('#div_benaficiarioFijo').hide();
		swal({
			  title: 'Listado de Vales',
			  text: 'Seleccione vale a comprobar',
			  html:
				  '<iframe width="750" height="350" name="ventanaVales" id="ventanaVales" frameborder="0" src="../../sam/consultas/muestraVales_tipo_contratos.action?idVale='+$('#CVE_DOC').val()+'&idDependencia='+idDependencia+'"></iframe>',
			  width: 800,
			  padding: 10,
			  animation: false,
			  confirmButtonText: 'Cerrar'
			})
		
	}																																											//id_vale,num_vale,clv_benefi, comprobado,por_comprobar
	//Contrato desde una OS u OT		
	if ($('#cbotipocontrato').val()==3){
		
		$('#doctol').show();
		$('#div_benaficiarioFijo').hide();
		swal({
			  title: 'Listado de O.S. y O.T.',
			  text: 'Seleccione OS u OT a contratar',
			  html:
				  '<iframe width="800" height="400" name="DocumentoContrato" id="DocumentoContrato" frameborder="0" src="../../sam/consultas/muestra_os_contratos.action?num_req='+num_req+'&idDependencia='+idDependencia+'&id_recurso='+id_recurso+'"></iframe>',
			  width: 800,
			  padding: 10,
			  animation: false,
			  confirmButtonText: 'Cerrar'
			})
			
	}
}
/************************************************************************************************************************************************/
/************************************ Termina Funcion que muestra el documento a enlazar a los contratos ****************************************/



/*********************************************************************************************************************************************/
/******************************************* Modulo para la reduccion de contratos ***********************************************************/
function reduccionAmpliacion(cve_doc, modulo, num_doc)
{
	var proyectos = [];
	var partidas = [];
	var html = '';
	
	if(modulo=='con')
	{
		controladorListadoContratosRemoto.getConceptosContrato(cve_doc, {
						callback:function(items) {
							console.log('Daots de items: ' + items[0]+" demo "+items[1]+" demo2 "+items[3]);
							html+= '<div></div>'
								+'<div id="divMovCaptura" style="display:none; width: 650px; padding: 20px; background: rgb(255, 255, 255); position:relative; top:15px; padding-bottom:10px">'
								+'<h1>Capturar movimientos de contrato</h1>'
								+'<table>'
									+'<tr><td><input id="ID_DETALLE" type="hidden" value="0"> <input id="CVE_CONTRATO" type="hidden" value="'+cve_doc+'"></td></tr>'
									+'<tr><th height="20"><label for="inputsm" style="font-size: 13pt;">Tipo de Movimiento:</label></th><td><select class="form-control input-sm" id="cboMovimiento" style="width:220px;"><option value="COMPROMISO">COMPROMISO</option></select></td></tr>'
									+'<tr><th height="20">Proyecto:</th><td><select id="cboProyecto" class="form-control input-sm" style="width:220px;"></select></td></tr>'
									+'<tr><th height="20">Partidas:</th><td><select id="cboPartidas" class="form-control input-sm" style="width:220px;"></select></td></tr>'
									+'<tr><th height="20">Periodo:</th><td><select id="cboPeriodo" class="form-control input-sm" style="width:220px;"><option value="1">ENERO</option><option value="2">FEBRERO</option><option value="3">MARZO</option><option value="4">ABRIL</option><option value="5">MAYO</option><option value="6">JUNIO</option><option value="7">JULIO</option><option value="8">AGOSTO</option><option value="9">SEPTIEMBRE</option><option value="10">OCTUBRE</option><option value="11">NOVIEMBRE</option><option value="12">DICIEMBRE</option></select></td></tr>'
									+'<tr><th height="20">Importe:</th><td><input id="txtimporteMovCon" type="text" class="form-control input-sm" value="" maxlength="10" style="width:220px;" onkeypress="return keyNumbero(event);"></td></tr>'
									+'<tr><th height="20"></th></tr>'
									+'<tr><th height="20"></th><td><input type="button" style="width:100px" class="btn btn-success sm" value="Guardar" id="cmdGuardarMovCon">&nbsp;<input type="button" style="width:100px" class="btn btn-sm btn-danger sm" value="Cancelar" id="cmdCancelarMovCon"></td></tr>'
								+'</table>'
								+'</div>';
							html+= '<div id="divMovListado"><div style="padding-bottom:5px"><input id="cmdAgregarMovCon" style="width:160px;" type="button" class="btn btn-primary sm"  value="Agregar Movimiento"></div>'
								html+= '<table class="listasDetalles table table-hover table-condensed" style="font-size:13px;" width="650"><tr><thead><th height="20">PERIODO</th><th>PROYECTO</th><th>PARTIDA</th><th>MOVIMIENTO</th><th>IMPORTE</th><th>Opc.</th></thead></tr>';
							jQuery.each(items,function(i) {
								html += '<tr><td height="20" align="center">'+this.DESC_PERIODO+'</td><td align="center">'+this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']' +'</td><td align="center">'+this.CLV_PARTID+'</td><td>'+this.TIPO_MOV+'</td><td align="right">'+formatNumber(this.IMPORTE,'$')+'</td><td align="center"><img  src="../../imagenes/page_white_edit.png" width="16" height="16" style="cursor:pointer" OnClick="editarConceptoMovCon('+cve_doc+',\''+modulo+'\',\''+num_doc+'\','+this.ID_DETALLE_COMPROMISO+','+this.ID_PROYECTO+',\''+this.CLV_PARTID+'\','+this.PERIODO+',\''+this.TIPO_MOV+'\',\''+this.IMPORTE+'\')" > <img id="Remover" src="../../imagenes/cross.png" width="16" height="16" style="cursor:pointer" OnClick="eliminarConcepto('+cve_doc+',\''+modulo+'\',\''+num_doc+'\','+this.ID_DETALLE_COMPROMISO+')"></td></tr>'; 
								if(proyectos.indexOf(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']')==-1)
									proyectos.push(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']');
								if(partidas.indexOf(this.CLV_PARTID)==-1)
									partidas.push(this.CLV_PARTID);
							});
							html+='</table></div>';
							
							
							swal({title:'<h2>Reducción y Ampliación de Contrato </br>'+num_doc +'</h2>',html:html,allowOutsideClick:false,confirmButtonText: 'Cerrar',width:650}).catch(swal.noop);
							
							//jWindow(html,'Reducción y Ampliación de Contrato: '+num_doc, '','Cerrar',1);
							
							$('#cmdGuardarMovCon').click(function(event){
								if($('#txtimporteMovCon').val()=='')
								{
									alert('Es necesario escribir el importe');
									return false;
								}
								else
									guardarMovimientoContrato(cve_doc, modulo, num_doc);
							});
							$('#cmdCancelarMovCon').click(function(event){
								$('#divMovListado').show();
								$('#divMovCaptura').hide();
								reduccionAmpliacion(cve_doc, modulo, num_doc);
							});
							$('#cmdAgregarMovCon').click(function(event){
								//onclick="changeVisibility()"
								
								$('.swal2-buttonswrapper').hide();
								$('.swal2-title').hide();
								$('#divMovListado').hide();
								$('#divMovCaptura').show();
								$('#cboProyecto').attr('disable', false);
								$('#cboPartidas').attr('disable', false);
								$('#popup_message_window').css('height','300px');
							});
							
							$.each( proyectos, function( index, value ){
									$('#cboProyecto').append('<option value='+value+'>'+value+'</option>');
							});
							$.each( partidas, function( index, value ){
									$('#cboPartidas').append('<option value='+value+'>'+value+'</option>');
							});
						} 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal(errorString, 'error');          
					 }
		});
		
	}
}

function editarConceptoMovCon(cve_doc, modulo, num_doc, idDetalle, idProyecto, clv_partid, periodo, tipo_mov, importe)
{
	$('#divMovCaptura').show();
	$('#divMovListado').hide();
	$('#popup_message_window').css('height','300px');
	$('#ID_DETALLE').attr('value', idDetalle);
	$('#cboMovimiento').val(tipo_mov);
	$('#cboPeriodo').val(periodo);
	$('#cboProyecto').val(idProyecto);
	$('#cboPartidas').val(clv_partid);
	$('#txtimporteMovCon').attr('value', importe);
	$('#cboProyecto').attr('disabled', true);
	$('#cboPartidas').attr('disabled', true);
}

function eliminarConcepto(cve_doc, modulo, num_doc, idConcepto)
{
	var arrCon = [];
	arrCon.push(idConcepto);
			ControladorContratosRemoto.eliminarConceptosMovPeredo(cve_doc, arrCon, {
				callback:function(items) {
					reduccionAmpliacion(cve_doc, modulo, num_doc);	
			} 					   				
			,
			errorHandler:function(errorString, exception) { 
				swal(errorString, 'Error');          
			}
	});
}

function guardarMovimientoContrato(cve_doc, modulo, num_doc)
{
	ControladorContratosRemoto.guardarConceptoMovPeredo($('#ID_DETALLE').val(), $('#CVE_CONTRATO').val(), $('#cboProyecto').val(),$('#cboPartidas').val(), $('#cboPeriodo').val(), $('#txtimporteMovCon').val(),{
	  callback:function(items) {
				reduccionAmpliacion(cve_doc, modulo, num_doc);
		} 					   				
		,
		errorHandler:function(errorString, exception) { 
			swal('',errorString, 'error');     
		}
	});
}


/******************************************* Modulo para la reduccion de contratos ***********************************************************/

/*funcion para editar los documentos*/
function abrirDocumento(){
	
	swal({
		  title: 'El modulo ya no se encuentra disponible',
		  text: 'Por mandato de lineamientos de la Ley de Contabilidad Gubernamental del CONAC.',
		  type: 'info',
		  showConfirmButton: false,
		  timer: 4500,
		  confirmButtonText:'Cerrar'
		}).then(
		  function () {},
		  // handling the promise rejection
		  function (dismiss) {
		    if (dismiss === 'timer') {
		      console.log('Cierra a las 3 segundos')
		    }
		  }
		)
}
/*Termina funcion para editar los documentos*/
function removerVale(){
	$('#CVE_VALE').val('0');
	$('#txtvale').val('');
	$('#img_quitar_vale').attr('src', '../../imagenes/cross2.png');
}

/*funcion para remover los elementos de un contrato*/
function removerContrato(){
	$('#CVE_CONTRATO').val('0');
	$('#txtnumcontrato').val('');
	$('#CCLV_PARBIT').val('');
	$('#CPROYECTO').val('');
	$('#CCLV_PARTID').val('');
	$('#CCLV_BENEFI').val('');
	//$('#img_quitar_contrato').attr('src', '../../imagenes/cross2.png');
	contrato = false;
}


//****************************************************** funcion para mostrar la bitacora dependiendo el doc. **************************************************//
function bitacoraDocumento(cve_doc, tipo){	//Cambios para 24/08/2017
	
	swal({
	    title: 'Bitacora de Movimientos: ',
	    width: 700,
	    confirmButtonText:'Cerrar',
	    html:
	    	'<iframe width="700" height="350" id="ventadaBitacora" frameborder="0" src="../../sam/consultas/muestraBitacora.action?cve_doc='+cve_doc+'&tipo_doc='+tipo+'"></iframe>', 
	   })
}
/*Funcnion para llenar con ceros*/
function rellenaCeros(cad, lng){
	var pattern = "00000000000000000000";
	var result = "";
	 if ( cad=="") return cad; 
	 else 
	 	result = (pattern.substring(0, lng - cad.length) + cad);
	 return result;
}

/*Funcnion para limpiar las tablas html*/
function quitRow( table ){
	var tabla = document.getElementById(table).tBodies[0];
	var nRows = tabla.rows.length;
	while( tabla.rows.length > 0 ){
		index_table = tabla.rows.length - 1;
		tabla.deleteRow( index_table );
	}
}
/**/

function getHTML( param ){
	if( param != null ){
		if( param == "null")
			return "";
		else
			return param;
	}else{
		return "";
	}
}


/*Funcion para construir una celda en especifico*/
function Td(texto, estilo, obj, html, colspan ){
		var cell = document.createElement( "TD" );
			cell.style.height='20px';
		if(typeof(colspan)!='undefined') 
			cell.colSpan= colspan;
		if( typeof(estilo) != 'undefined' && estilo != "" )
			cell.style.cssText = estilo;
		if( typeof(html) != 'undefined' && html != "" )
			cell.innerHTML = html;
		else if( typeof(obj) != 'undefined' && obj != "" )
			cell.appendChild( obj );
		else
			cell.appendChild( document.createTextNode( texto ) );
		return cell;
		
}
/**/
function LTrim( value ) {	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");	
}

function RTrim( value ) {	
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");	
}

function trim( value ) {	
	return LTrim(RTrim(value));	
}

function upperCase(object) {
  object.value=trim(object.value.toUpperCase());	
}

function keyNumbero( event ){
	var key = ( window.event )? event.keyCode:event.which;
	if( ( key > 47 && key < 58 ) || key == 45 || key == 46 || key == 8 )
		return true;
	else
		return false;
}

function redondeo( valor ) {
	var resultado = Math.round(valor * 100) / 100;
	return resultado;
}

function round(value, exp) {
	  if (typeof exp === 'undefined' || +exp === 0)
	    return Math.round(value);

	  value = +value;
	  exp  = +exp;

	  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
	    return NaN;
	/**************/
	  // Shift
	  value = value.toString().split('e');
	  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

	  // Shift back
	  value = value.toString().split('e');
	  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
	}
function formatNumber(num,prefix){
	   num= redondeo( num );
	   prefix = prefix || '';
	   num += '';
	   var splitStr = num.split('.');
	   var splitLeft = splitStr[0];
	   var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '';
	   var regx = /(\d+)(\d{3})/;
	   while (regx.test(splitLeft)) {
	      splitLeft = splitLeft.replace(regx, ' $1' + ',' + '$2');
	   }
	    if( splitRight.length == 0 )
		   		splitRight = ".00";
		 else if( splitRight.length == 2 )
		   		splitRight += "0";
	   return prefix + splitLeft + splitRight;
	}
//funcion para ejecutar una funcion al pulsar enter
function keyEnter(fn){
	if (window.event.keyCode==13) {
	 	fn();
	}else{
	 	return false;
	}
}

/*funcion para cambiar el color en la entrada a la fila de una tabla*/
function color_over(f){
	row_color = $('#'+f).css("background-color");
	$('#'+f).css("background-color", '#FFCC66');
}

function color_out(f){
	$('#'+f).css("background-color", row_color);
	row_color = "";
}