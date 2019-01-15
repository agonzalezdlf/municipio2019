var centro =   "text-align:center";
var derecha =  "text-align:right";
var izquierda = "text-align:left";

var row_color = "";

var resultData=["Mumbai","Delhi","Chennai","Goa"]
var myselect = $('<select>');


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
	
	alert('Entro a cambiar la fecha del periodo');
	var smodulo = "";
	if(modulo=='req') smodulo = "Requisiciones";
	if(modulo=='ped') smodulo = "Pedidos";
	if(modulo=='op') smodulo ="Ordenes de Pago";
	if(modulo=='val') smodulo ="Vales";
	/*investigar el periodo y fecha actual del documento*/
	if(modulo=='req'){
		
		controladorListadoRequisicionesRemoto.getFechaPeriodoRequisicion(cve_doc, {
				callback:function(items) {
							swal({
								  title: 'Cambio de fecha de OS / OT',
								  input: 'text',
								  inputPlaceholder: 'Capture la fecha en formato DD/MM/YYYY',
								  html:'<div class="form-group">Fecha actual: ' + items.FECHA +'</div></br>'+
								  '<div class="form-group">'+
						          '<label for="grupo" class="col-md-2 control-label">Periodo:</label>'+
							          '<div class="col-md-5">'+
							            '<select name ="cboperiodo" id="cboperiodo" class="form-control" style="width:200px">'+
							                   '<option value="1" '+((items.PERIODO==1) ? 'Selected':'')+'>( 01 ) Enero</option>'+
							                   '<option value="2" '+((items.PERIODO==2) ? 'Selected':'')+'>( 02 ) Febrero</option>'+
							                   '<option value="3" '+((items.PERIODO==3) ? 'Selected':'')+'>( 03 ) Marzo</option>'+
							                   '<option value="4" '+((items.PERIODO==4) ? 'Selected':'')+'>( 04 ) Abril</option>'+
							                   '<option value="5" '+((items.PERIODO==5) ? 'Selected':'')+'>( 05 ) Mayo</option>'+
							                   '<option value="6" '+((items.PERIODO==6) ? 'Selected':'')+'>( 06 ) Junio</option>'+
							                   '<option value="7" '+((items.PERIODO==7) ? 'Selected':'')+'>( 07 ) Julio</option>'+
							                   '<option value="8" '+((items.PERIODO==8) ? 'Selected':'')+'>( 08 ) Agosto</option>'+
							                   '<option value="9" '+((items.PERIODO==9) ? 'Selected':'')+'>( 09 ) Septiembre</option>'+
							                   '<option value="10" '+((items.PERIODO==10) ? 'Selected':'')+'>( 10 ) Octubre</option>'+
							                   '<option value="11" '+((items.PERIODO==11) ? 'Selected':'')+'>( 11 ) Noviembre</option>'+
							                   '<option value="12" '+((items.PERIODO==12) ? 'Selected':'')+'>( 12 ) Diciembre</option>'+
							                   '</select">'+
							          '</div>'+
						          '</div> ',// +
			                      //'<input id="swal-input2" class="swal2-input swal2-inputerror" Placeholder="Cambio de fecha dd/mm/aaaa">',
								  showCancelButton: true,
								  inputValidator: function(value) {
								    return new Promise(function(resolve, reject) {
								      if (value) {
								        resolve();
								      } else {
								        reject('Introduzca una fecha valida!');
								      }
								    });
								  }
								}).then(function(text) {
								   var periodo = $('#cboperiodo').val();
								   var fecha= text;
								   //+date.format("DD/MM/YYYY")
								   if (text) {
									  swal({
					                     
					                      text: "¿Confirma que desea cambiar la fecha del documento?",
					                      type: 'warning',
					                      width: 220,
					                      showCancelButton: true,
					                      confirmButtonText: 'Sí, confirmar!',
					                      cancelButtonText: 'No, cancelar!',
					                      confirmButtonClass: 'btn btn-success',
					                      cancelButtonClass: 'btn btn-danger',
					                     
					                    }).then(function (r) {
					                      swal('Cambio!','Tu documento fue actualizado con éxito!','success')
					                      /*clase para guardar*/
					                       if(r){
						                          _closeDelay();
						                          ShowDelay('Cambiando fecha de ingreso...','');
						                          controladorListadoRequisicionesRemoto.cambiarFechaPeriodo(cve_doc, fecha, periodo, {
						                            callback:function(items) {  
						                              if(items)
						                                CloseDelay('Fecha y periodo cambiados con éxito', 3000, setTimeout('getListaReq()',1000));
						                              else 
						                                swal(items, 'Error');
						                            }                     
						                           ,
						                           errorHandler:function(errorString, exception) { 
						                            swal(errorString, 'Error');          
						                           }
						                          }); 
					                        }/*guardar cirre*/
					                      
					                    }, function (dismiss) {
											
											  if (dismiss === 'cancel') {
											    swal({										    		
											    	  type: 'info',
													  text: 'El proceso no fue ejecutado',
													  width: 200,
												     })
											  }
											})
											
								  		
								  }//Cierra el if
				                   
								  
								})//cierra result
						
					},
					 errorHandler:function(errorString, exception) { 
						swal(errorString, 'Error');          
					 }
		});
	}
	
}

function _cambiarFechaPeriodoVal(cve_doc){
	var periodo = $('#cboperiodo').val();
	var fecha = $('#txtfechaactual').attr('value');
	
	jConfirm('Â¿Confirma que desea aplicar los cambios para la fecha y periodo del Vale?','Confirmar', function(r){
		if(r){
			controladorListadoValesRemoto.cambiarFechaPeriodo(cve_doc, fecha, periodo, {
						callback:function(items) { 	
							if(items)
								CloseDelay('Fecha y periodo cambiados con Ã©xito', 3000, setTimeout('getVale()',1000));
							else 
								jError(items, 'Error');
						} 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');          
					 }
		});	
		}
	});
}

function _cambiarFechaPeriodoOp(cve_doc){
	var periodo = $('#cboperiodo').val();
	var fecha = $('#txtfechaactual').attr('value');
	
	jConfirm('¿Confirma que desea aplicar los cambios para la fecha y periodo de la Orden de Pago?','Confirmar', function(r){
		if(r){
			controladorOrdenPagoRemoto.cambiarFechaPeriodo(cve_doc, fecha, periodo, {
						callback:function(items) { 	
							if(items)
								CloseDelay('Fecha y periodo cambiados con Ã©xito', 3000, setTimeout('getOrden()',1000));
							else 
								jError(items, 'Error');
						} 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');          
					 }
		});	
		}
	});
}

function _cambiarFechaPeriodoPedido(cve_doc){
	var fecha = $('#txtfechaactual').attr('value');

	jConfirm('¿Confirma que desea aplicar los cambios para la fecha del Pedido?','Confirmar', function(r){
		if(r){
			controladorPedidos.cambiarFechaPeriodo(cve_doc, fecha, {
						callback:function(items) { 	
							if(items)
								CloseDelay('Fecha cambiada con éxito', 3000, setTimeout('getPedidos()',1000));
							else 
								jError(items, 'Error');
						} 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');          
					 }
		});	
		}
	});
}

/* -------------------------------------  Clase para el cambio del beneficiario ------------------------------------------------*/
function cambiarBeneficiario(cve_doc, modulo){
	var beneficiario="";
	var clave="";
	if(modulo=='req'){
			controladorListadoRequisicionesRemoto.getBeneficiario(cve_doc,{
				callback:function(items) { 
						ShowDelay('Cargando padron de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";	
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<table width="400" border="0" cellspacing="0" cellpadding="0" alingn="center">'+
							 '<tr>'+
							 '<td height="20"><strong>Requisición:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20">'+items.NUM_REQ+'</td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><strong>Beneficiario:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></td>'+
							 '</tr>'+
							 '<tr>' +
							 '</tr>'+
							 '<td height="20">&nbsp;</td>'+
							 '<tr>'+
							 '<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
							 '</tr>'+
							 '</table>';
							//_closeDelay();
							swal(html,'Cambio de beneficiario', '','',0);
							$('#cmdaplicar').click(function(event){_cambiarBeneficiarioRequisicion(cve_doc);})
							getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
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
						ShowDelay('Cargando padrón de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";	
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<table width="400" border="0" cellspacing="0" cellpadding="0" alingn="center">'+
							 '<tr>'+
							 '<td height="20"><strong>Num. Pedido:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20">'+items.NUM_PED+'</td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><strong>Beneficiario:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></td>'+
							 '</tr>'+
							 '<tr>' +
							 '</tr>'+
							 '<td height="20">&nbsp;</td>'+
							 '<tr>'+
							 '<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
							 '</tr>'+
							 '</table>';
							//_closeDelay();
							jWindow(html,'Cambio de beneficiario', '','',0);
							$('#cmdaplicar').click(function(event){_cambiarBeneficiarioPedidos(cve_doc);})
							getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
				}
				,
					errorHandler:function(errorString, exception) { 
					swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
					}       	
			});
	}
	
	if(modulo=='op'){
			controladorOrdenPagoRemoto.getBeneficiario(cve_doc,{
				callback:function(items) { 
						ShowDelay('Cargando padrón de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";	
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<table width="400" border="0" cellspacing="0" cellpadding="0" alingn="center">'+
						 	 '<tr>'+
							 '<td height="20"><strong>Num. Orden Pago:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20">'+items.NUM_OP+'</td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><strong>Beneficiario:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></td>'+
							 '</tr>'+
							 '<tr>' +
							 '</tr>'+
							 '<td height="20">&nbsp;</td>'+
							 '<tr>'+
							 '<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
							 '</tr>'+
							 '</table>';
							//_closeDelay();
							jWindow(html,'Cambio de beneficiario', '','',0);
							$('#cmdaplicar').click(function(event){_cambiarBeneficiarioOrdenPago(cve_doc);})
							getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
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
						ShowDelay('Cargando padrÃ³n de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<table width="400" border="0" cellspacing="0" cellpadding="0" alingn="center">'+
							 '<tr>'+
							 '<td height="20"><strong>Num. Vale:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20">'+items.NUM_VALE+'</td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><strong>Beneficiario:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></td>'+
							 '</tr>'+
							 '<tr>' +
							 '</tr>'+
							 '<td height="20">&nbsp;</td>'+
							 '<tr>'+
							 '<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
							 '</tr>'+
							 '</table>';
							_closeDelay();
							jWindow(html,'Cambio de beneficiario', '','',0);
							$('#cmdaplicar').click(function(event){_cambiarBeneficiarioVale(cve_doc);})
							getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
				}
				,
					errorHandler:function(errorString, exception) { 
					swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
					}       	
			});
	}
}

function _cambiarBeneficiarioVale(cve_doc){
	var cve_benefi = $('#CVE_BENE').attr('value');
	if(cve_benefi==''){swal('Es necesario especificar el nuevo beneficiario para continuar','Alerta'); return false;}	
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

function _cambiarBeneficiarioOrdenPago(cve_doc){
	var cve_benefi = $('#CVE_BENE').val();
	if(cve_benefi==''){swal('Es necesario especificar el nuevo beneficiario para continuar','Alerta'); return false;}	
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
		});
}

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

/* -------------------------------------  Clase para el cambio del beneficiario ------------------------------------------------*/
function cambiarBeneficiario(cve_doc, modulo){
	var beneficiario="";
	var clave="";
	if(modulo=='req'){
			controladorListadoRequisicionesRemoto.getBeneficiario(cve_doc,{
				callback:function(items) { 
						ShowDelay('Cargando padron de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";	
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<table width="400" border="0" cellspacing="0" cellpadding="0" alingn="center">'+
							 '<tr>'+
							 '<td height="20"><strong>Requisición:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20">'+items.NUM_REQ+'</td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><strong>Beneficiario:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></td>'+
							 '</tr>'+
							 '<tr>' +
							 '</tr>'+
							 '<td height="20">&nbsp;</td>'+
							 '<tr>'+
							 '<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
							 '</tr>'+
							 '</table>';
							//_closeDelay();
							swal(html,'Cambio de beneficiario', '','',0);
							$('#cmdaplicar').click(function(event){_cambiarBeneficiarioRequisicion(cve_doc);})
							getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
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
						ShowDelay('Cargando padrón de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";	
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<table width="400" border="0" cellspacing="0" cellpadding="0" alingn="center">'+
							 '<tr>'+
							 '<td height="20"><strong>Num. Pedido:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20">'+items.NUM_PED+'</td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><strong>Beneficiario:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></td>'+
							 '</tr>'+
							 '<tr>' +
							 '</tr>'+
							 '<td height="20">&nbsp;</td>'+
							 '<tr>'+
							 '<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
							 '</tr>'+
							 '</table>';
							//_closeDelay();
							jWindow(html,'Cambio de beneficiario', '','',0);
							$('#cmdaplicar').click(function(event){_cambiarBeneficiarioPedidos(cve_doc);})
							getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
				}
				,
					errorHandler:function(errorString, exception) { 
					swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
					}       	
			});
	}
	
	if(modulo=='op'){
			controladorOrdenPagoRemoto.getBeneficiario(cve_doc,{
				callback:function(items) { 
						ShowDelay('Cargando padrón de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";	
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<table width="400" border="0" cellspacing="0" cellpadding="0" alingn="center">'+
						 	 '<tr>'+
							 '<td height="20"><strong>Num. Orden Pago:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20">'+items.NUM_OP+'</td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><strong>Beneficiario:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></td>'+
							 '</tr>'+
							 '<tr>' +
							 '</tr>'+
							 '<td height="20">&nbsp;</td>'+
							 '<tr>'+
							 '<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
							 '</tr>'+
							 '</table>';
							//_closeDelay();
							jWindow(html,'Cambio de beneficiario', '','',0);
							$('#cmdaplicar').click(function(event){_cambiarBeneficiarioOrdenPago(cve_doc);})
							getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
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
						ShowDelay('Cargando padrÃ³n de beneficiarios...','');
						if(items==null){
							beneficiario = ""; clave= "";
						}
						else{
							beneficiario = getHTML(items.BENEFICIARIO); clave= getHTML(items.CLV_BENEFI);	
						}
						html ='<table width="400" border="0" cellspacing="0" cellpadding="0" alingn="center">'+
							 '<tr>'+
							 '<td height="20"><strong>Num. Vale:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20">'+items.NUM_VALE+'</td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><strong>Beneficiario:</strong></td>'+
							 '</tr>'+
							 '<tr>'+
							 '<td height="20"><input type="text" id="txtbeneficiario" value="'+beneficiario+'" style="width:400px"/><input type="hidden" id="CVE_BENE" value="'+clave+'"/></td>'+
							 '</tr>'+
							 '<tr>' +
							 '</tr>'+
							 '<td height="20">&nbsp;</td>'+
							 '<tr>'+
							 '<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
							 '</tr>'+
							 '</table>';
							_closeDelay();
							jWindow(html,'Cambio de beneficiario', '','',0);
							$('#cmdaplicar').click(function(event){_cambiarBeneficiarioVale(cve_doc);})
							getBeneficiarios('txtbeneficiario','CVE_BENE',''); 
				}
				,
					errorHandler:function(errorString, exception) { 
					swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
					}       	
			});
	}
}

function _cambiarBeneficiarioVale(cve_doc){
	var cve_benefi = $('#CVE_BENE').attr('value');
	if(cve_benefi==''){swal('Es necesario especificar el nuevo beneficiario para continuar','Alerta'); return false;}	
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

function _cambiarBeneficiarioOrdenPago(cve_doc){
	var cve_benefi = $('#CVE_BENE').val();
	if(cve_benefi==''){swal('Es necesario especificar el nuevo beneficiario para continuar','Alerta'); return false;}	
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
		});
}

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


/********************************** Funcion que muestra los documentos segun su tipo para la captura de factura *************************/
/************************************** Contratos, Pedidos y OS u OT ********************************************************************/
function muestraTiposDocumento(){
		
	alert('Esta es la dependencia: ' +$('#cbUnidad').val());
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
			  animation: false
			})
	}
}

/********************************** Termina función que muestra los documentos segun su tipo para la captura de factura *************************/
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
	/*
	jWindow('<iframe width="700" height="350" id="ventadaBitacora" frameborder="0" src="../../sam/consultas/muestraBitacora.action?cve_doc='+cve_doc+'&tipo_doc='+tipo+'"></iframe>','Bitacora de Movimientos', '','Cerrar',1);
	*/
	swal({
	    title: 'Bitacora de Movimientos: ',
	    width: 700,
	    html:
	    	'<iframe width="700" height="350" id="ventadaBitacora" frameborder="0" src="../../sam/consultas/muestraBitacora.action?cve_doc='+cve_doc+'&tipo_doc='+tipo+'"></iframe>', 
	   })
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