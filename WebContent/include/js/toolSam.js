var centro =   "text-align:center";
var derecha =  "text-align:right";
var izquierda = "text-align:left";

var row_color = "";

var resultData=["Mumbai","Delhi","Chennai","Goa"]
var myselect = $('<select>');

function mostrarOpcionPDF(cve_op){//Muestra la opcion de reportes desde el listado de ordenes de pago...
	
	swal({
		  title: 'Opciones de Reporte OP #'+cve_op,
		  type:  'question',
		  width: 350,
		  confirmButtonText: 'Cerrar',
		  html:
			  '<table class="table table-striped table-hover" border="0" align="center" cellpadding="1" cellspacing="2" width="405" >'+
				'  <tr> '+
				'	<td width="33" height="27" align="center" style="cursor:pointer" onclick="getReporteOP('+cve_op+')"> '+
				'	  <img src="../../imagenes/pdf.gif"/></td>' +
				'	<td width="362" height="27" align="left" style="cursor:pointer" onclick="getReporteOP('+cve_op+')">&nbsp;Reporte Normal</td> '+
				'  </tr> '+
				
				'  <tr> '+
				'	  <td height="27" align="center"  style="cursor:pointer" onclick="getAnexosListaOP('+cve_op+')"><img src="../../imagenes/report.png" /></td> '+
				'	  <td height="27" align="left" style="cursor:pointer" onclick="getAnexosListaOP('+cve_op+')">&nbsp;Listar Anexos</td> '+
				'	</tr> '+
				'</table>', 
		});
		$('#swal2-title').css({'font-size':'20px'});
		
}

function muestraVales(){
	
	
	
	var clv_benefi = $('#xClaveBen').selectpicker('val');
	var tipo_gto = $('#tipoGasto').selectpicker('val');
	var tipo_doc  = $('#cbotipo').val();
	var idDependencia = $('#cbodependencia').selectpicker('val');
	
	if(typeof(clv_benefi)=='undefined') clv_benefi =0;
	if(typeof(tipo_gto)=='undefined') tipo_gto =0;
	if(typeof(tipo_doc)=='undefined') tipo_doc =0;
	if(typeof(idDependencia)=='undefined') idDependencia =0;
	
	
	if($('#txtvale').val()=='') $('#CVE_VALE').val(0);
	
	swal({
		  title: 'Listado de Vales disponibles',
		  html:
			  '<iframe width="750" height="350" name="ventanaVales" id="ventanaVales" frameborder="0" src="../../sam/consultas/muestra_vales.action?idVale='+$('#CVE_VALE').val()+'&idDependencia='+idDependencia+'&tipo_gto='+tipo_gto+'&clv_benefi='+clv_benefi+'&tipo_doc='+tipo_doc+'"></iframe>',
		  width: 800,
		  padding: 10,
		  animation: false
		});
}

function muestraContratos(){
	
	
	var tipo_gto = $('#tipoGasto').selectpicker('val');//tipoGasto
	
	if (tipo_gto ===''){swal('',"Debe seleccionar un tipo de gasto",'question');return false;};
	var idDependencia = $('#cbUnidad').val();
	var num_contrato = $('#txtnumcontrato').val();
	
	
	if(typeof tipo_gto=='undefined') tipo_gto ="";
	if(typeof idDependencia=='undefined') idDependencia = null;
			
	swal({
		  title: 'Listado de Contratos Disponibles',
		  html:
			  '<iframe width="800" height="400" name="CONTRATO" id="CONTRATO" frameborder="0" src="../../sam/consultas/muestra_contratos.action?idDependencia='+idDependencia+'&tipo_gto='+tipo_gto+'&num_contrato='+num_contrato+'"></iframe>',
		  width: 800,
		  padding: 10,
		  animation: false
	});
	
}
//Funcion que llega desde la vinculacion de una factura al documento a enlazar...........
function muestraTiposDocumento(){
	
	alert('muestraTiposDocumento ==> Dependencia: ' +$('#cbUnidad').val());
	var idDependencia= $('#cbUnidad').val();
	
	alert('Tipo documento: '+ $('#cbotipodocumento').selectpicker('val'));
	//var idDependencia = $('#cbodependencia').val();
	if($('#cbotipodocumento').val()==4)//O.S. y O.T.
	{
		
		if(idDependencia==0||idDependencia=="") {swal('Es necesario seleccionar la Unidad Administrativa para listar las Ordenes de Servicio y Trabajo'); return false;}
			//jWindow('<iframe width="650" height="400" name="consultaPedido" id="consultaPedido" frameborder="0" src="../consultas/muestra_OT_OS_facturas.action?idDependencia='+idDependencia+'"></iframe>','Listado de O.S. y O.T.', '','Cerrar ',1);
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
		//jWindow('<iframe width="750" height="350" name="ventanaVales" id="ventanaVales" frameborder="0" src="../../sam/consultas/muestra_vales.action?idVale='+$('#CVE_DOC').attr('value')+'&idDependencia='+idDependencia+'&tipo_gto='+tipo_gto+'&clv_benefi='+clv_benefi+'&tipo_doc='+tipo_doc+'"></iframe>','Listado de Vales disponibles', '','Cerrar',1);
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


/*********************************** funcion para el cambio de grupo de firmas 29/08/2017 ************************************************************/
function cambiarGrupoFirmas(cve_doc, modulo){
	swal({
		  title: 'Cambiar grupo de firmas',
		  text: 'Seleccione el nuevo grupo de firma',
		  html:
			  '<iframe width="800" height="350" name="grupoFirmas" id="grupoFirmas" frameborder="0" src="../../sam/utilerias/cambiarFirmas.action?modulo='+modulo+'&cve_doc='+cve_doc+'"></iframe>',
		  width: 800,
		  padding: 10,
		  animation: false
		})
	
}


/*funcion para editar los documentos*/
function abrirDocumento(){
	
	swal({
		  title: 'El modulo no se encuentra desarrollado y no esta disponible por el momento!',
		  text: 'Por modificaciones de lineamientos de la CONAC.',
		  type: 'info',
		  showConfirmButton: false,
		  timer: 3000,
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
					html = '<table width="500" class="table" border="0" cellspacing="0" cellpadding="0">'+
						  '<tr>'+
						  '	<td width="474"><span style="font-size:12px"><I><strong>Nota:</strong> Los documentos seleccionados se van a transferir a otro usario, esto puede hacer que deje de visualizarlos en los listados que le corresponden.</span></I></td>'+
						  ' </tr>'+
						  '<tr>'+
								'<td height="20"><strong>'+((chkReq.length==1) ? 'Número de Requisición':'Grupo de Requisiciones:')+'</strong></td>'+
						 '</tr>'+
						 '<tr>'+
								'<td height="20">'+((chkNumReq.length==0) ? 'CVE_REQ: '+cve_doc:chkNumReq)+'</td>'+
						 '</tr>'+
						  ' <tr>'+
						  '<td><strong>Seleccione un usuario de destino:</strong></td>'+
						  '</tr>'+
						  '<tr>'+
							'<td>'+
							'<select id="cbousuarios" style="width:400px">'+items+
						'	</select>'+
						'	</td>'+
						 ' </tr>'+
						  '<tr>'+
							'<td>&nbsp;</td>'+
						'  </tr>'+
						 ' <tr>'+
						'	<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="cancel" id="cancel" onclick="$.alerts._hide();" style="width:100px"/></td>'+
						'  </tr>'+
						'</table>';
						swal('Mover documento a otro usuario',html,'Mover documento a otro usuario');
						$('#cmdaplicar').click(function(event){_cambiarUsuarioRequisicion(chkReq,cve_doc);})
						
				}
				
			}
			,
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
					html = '<table width="500" border="0" cellspacing="0" cellpadding="0">'+
						  '<tr>'+
						  '	<td width="474"><span style="font-size:12px"><I><strong>Nota:</strong> Los documentos seleccionados se van a transferir a otro usario, esto puede hacer que deje de visualizarlos en los listados que le corresponden.</span></I></td>'+
						  ' </tr>'+
						  '<tr>'+
								'<td height="20"><strong>'+((chkPed.length==1) ? 'NÃºmero de Pedido':'Grupo de Pedidos:')+'</strong></td>'+
						 '</tr>'+
						 '<tr>'+
								'<td height="20">'+((chkNumPed.length==0) ? 'CVE_PED: '+cve_doc:chkNumPed)+'</td>'+
						 '</tr>'+
						  ' <tr>'+
						  '<td><strong>Seleccione un usuario de destino:</strong></td>'+
						  '</tr>'+
						  '<tr>'+
							'<td>'+
							'<select id="cbousuarios" style="width:500px">'+items+
						'	</select>'+
						'	</td>'+
						 ' </tr>'+
						  '<tr>'+
							'<td>&nbsp;</td>'+
						'  </tr>'+
						 ' <tr>'+
						'	<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
						'  </tr>'+
						'</table>';
						jWindow(html,'Mover documento a otro usuario', '','',0);
						$('#cmdaplicar').click(function(event){_cambiarUsuarioPedidos(chkPed,cve_doc);})
						
				}
				
			}
			,
				errorHandler:function(errorString, exception) { 
				jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
				}       	
		});
	}
	
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
					html = '<table width="500" border="0" cellspacing="0" cellpadding="0">'+
						  '<tr>'+
						  '	<td width="474"><span style="font-size:12px"><I><strong>Nota:</strong> Los documentos seleccionados se van a transferir a otro usario, esto puede hacer que deje de visualizarlos en los listados que le corresponden.</span></I></td>'+
						  ' </tr>'+
						  '<tr>'+
								'<td height="20"><strong>'+((chkOp.length==1) ? 'Orden de Pago':'Grupo de Orden(es) de Pago:')+'</strong></td>'+
						 '</tr>'+
						 '<tr>'+
								'<td height="20">'+((chkNumOp.length==0) ? 'CVE_OP: '+cve_doc:chkNumOp)+'</td>'+
						 '</tr>'+
						  ' <tr>'+
						  '<td><strong>Seleccione un usuario de destino:</strong></td>'+
						  '</tr>'+
						  '<tr>'+
							'<td>'+
							'<select id="cbousuarios" style="width:500px">'+items+
						'	</select>'+
						'	</td>'+
						 ' </tr>'+
						  '<tr>'+
							'<td>&nbsp;</td>'+
						'  </tr>'+
						 ' <tr>'+
						'	<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
						'  </tr>'+
						'</table>';
						swal(html,'Mover documento a otro usuario', '','',0);
						$('#cmdaplicar').click(function(event){_cambiarUsuarioOrdenPago(chkOp,cve_doc);})

				}
				
			}
			,
				errorHandler:function(errorString, exception) { 
				swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
				}       	
		});
	}
	
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
					html = '<table width="500" border="0" cellspacing="0" cellpadding="0">'+
						  '<tr>'+
						  '	<td width="474"><span style="font-size:12px"><I><strong>Nota:</strong> Los documentos seleccionados se van a transferir a otro usario, esto puede hacer que deje de visualizarlos en los listados que le corresponden.</span></I></td>'+
						  ' </tr>'+
						  '<tr>'+
								'<td height="20"><strong>'+((chkVal.length==1) ? 'Número de Vale':'Grupo de Vales:')+'</strong></td>'+
						 '</tr>'+
						 '<tr>'+
								'<td height="20">'+((chkNumVal.length==0) ? 'CVE_VALE: '+cve_doc:chkNumVal)+'</td>'+
						 '</tr>'+
						  ' <tr>'+
						  '<td><strong>Seleccione un usuario de destino:</strong></td>'+
						  '</tr>'+
						  '<tr>'+
							'<td>'+
							'<select id="cbousuarios" style="width:500px">'+items+
						'	</select>'+
						'	</td>'+
						 ' </tr>'+
						  '<tr>'+
							'<td>&nbsp;</td>'+
						'  </tr>'+
						 ' <tr>'+
						'	<td align="center"><input type="button" class="botones" value="Aplicar cambios"   id="cmdaplicar" style="width:100px"/> <input type="button" class="botones" value="Cancelar" id="cmdcancelar" onclick="$.alerts._hide();" style="width:100px"/></td>'+
						'  </tr>'+
						'</table>';
						jWindow(html,'Mover documento a otro usuario', '','',0);
						$('#cmdaplicar').click(function(event){_cambiarUsuarioVales(chkVal,cve_doc);})

				}
				
			}
			,
				errorHandler:function(errorString, exception) { 
				jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
				}       	
		});
	}
	
}

function _cambiarUsuarioVales(chkVal, cve_doc){
	var cve_pers_dest = $('#cbousuarios').val();
	if(cve_pers_dest==0){jAlert('Es necesario seleccionar un usuario para realizar esta operaciÃ³n', 'Advertencia'); return false;}
	jConfirm('¿Confirma que desea mover los Vales seleccionados al usuario especificado?', 'Confirmar', function(r){
			if(r){		
				ShowDelay('Moviendo documentos...', '');
				controladorListadoValesRemoto.moverVales(chkVal, cve_pers_dest,{
						callback:function(items) {
							if(items!=null){
								CloseDelay('Se han movido los documentos con exito', 3000, function(){
										setTimeout('getVale()', 1000);
									});
							}
							else
								jError('La operacion ha fallado al mover los documentos a otro usuario', 'Error inesperado');
						},
						errorHandler:function(errorString, exception) { 
						jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
					}   
				});
			}
		});
}

function _cambiarUsuarioPedidos(chkPed, cve_doc){
	var cve_pers_dest = $('#cbousuarios').val();
	if(cve_pers_dest==0){jAlert('Es necesario seleccionar un usuario para realizar esta operació³n', 'Advertencia'); return false;}
	jConfirm('¿Confirma que desea mover los Pedidos seleccionados al usuario especificado?', 'Confirmar', function(r){
			if(r){		
				ShowDelay('Moviendo documentos...', '');
				controladorPedidos.moverPedidos(chkPed, cve_pers_dest,{
						callback:function(items) {
							if(items!=null){
								CloseDelay('Se han movido los documentos con exito', 3000, function(){
										setTimeout('getPedidos()', 1000);
									});
							}
							else
								jError('La operacion ha fallado al mover los documentos a otro usuario', 'Error inesperado');
						},
						errorHandler:function(errorString, exception) { 
						jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
					}   
				});
			}
		});
	
	
}

function _cambiarUsuarioRequisicion(chkReq, cve_doc){
	var cve_pers_dest = $('#cbousuarios').val();
	var inputOptions = $('#cbousuarios').val();
	if(cve_pers_dest==0){swal('Es necesario seleccionar un usuario para realizar esta operación', 'Advertencia'); return false;}
		
	/*Empieza*/
	swal({
		  title: '¿Esta seguro?',
		  text: "Los cambios no se podran revertir!",
		  timer: 3000,
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sí, modificar',
		  cancelButtonText: 'No, cancelar!',
		  confirmButtonClass: 'btn btn-success',
		  cancelButtonClass: 'btn btn-danger',
		  buttonsStyling: false
		}).then(function (r) {
			if(r){		
				
				
				controladorListadoRequisicionesRemoto.moverRequisiciones(chkReq, cve_pers_dest,{
						callback:function(items) {
							if(items!=null) {
								/*swal('Se han movido los documentos con exito', 3000, function(){
										setTimeout('getListaReq()', 1000);
									});*/
								
								swal.showLoading()
								getListaReq()
							}
							else
								swal('La operacion ha fallado al mover los documentos a otro usuario', 'Error inesperado');
						},
						errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
			}   
				});
			}
		  swal('Modificado','Se actualizo el usuario correctamente.','success')
		}, function (dismiss) {
		  // dismiss can be 'cancel', 'overlay',
		  // 'close', and 'timer'
		  if (dismiss === 'cancel') {
		    swal(
		      'Cancelled',
		      'Your imaginary file is safe :)',
		      'error'
		    )
		  }
		})
	/*Termina*/
}

function _cambiarUsuarioOrdenPago(chkOp, cve_doc){
	var cve_pers_dest = $('#cbousuarios').val();
	if(cve_pers_dest==0){swal('','Es necesario seleccionar un usuario para realizar esta operación', 'Advertencia'); return false;}
	
	 swal({
				  title: 'Es seguro?',
				  text: '¿Confirma que desea cerrar el pedido?',
				  type: 'warning',
				  showCancelButton: true,
				  confirmButtonText: 'Sí, gaurdar!',
				  cancelButtonText: 'No, abortar!',
				  timer: 4000,
				  showLoaderOnConfirm: true,
				  preConfirm: function(email) {
					    return new Promise(function(resolve, reject) {
					      setTimeout(function() {
					        if (email === 'taken@example.com') {
					          reject('This email is already taken.');
					        } else {
					          resolve();
					          controladorOrdenPagoRemoto.moverOrdenesPago(chkOp, cve_pers_dest, {
									callback:function(items) {
										
										if(items!=null) {
											
											setTimeout(function(){
											    swal("Se han movido los documentos con exito!");
											    setTimeout('getOrden()', 1000);
											  }, 2000);
										}
										else
											swal('','La operacion ha fallado al mover los documentos a otro usuario', 'error');
									} 					   				
									,
									errorHandler:function(errorString, exception) { 
										swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
									}
								});  
					        }
					      }, 2000);
					    });
					  },
					  allowOutsideClick: false
					
				}).then((result) => {
					  
				  if (result.value  ) {
					
								
				  
				  } else if (result.dismiss === swal.DismissReason.cancel) {
					  		swal('Cancelado','Proceso cancelado','error')
				  }
				});
			 
					
		 
		  
			
	
	
	jConfirm('¿Confirma que desea mover las Ordenes de Pago seleccionadas al usuario especificado?', 'Confirmar', function(r){
			if(r){		
				ShowDelay('Moviendo documentos...', '');
				controladorOrdenPagoRemoto.moverOrdenesPago(chkOp, cve_pers_dest,{
						callback:function(items) {
							if(items!=null) {
								CloseDelay('Se han movido los documentos con exito', 3000, function(){
										setTimeout('getOrden()', 1000);
									});
							}
							else
								jError('La operacion ha fallado al mover los documentos a otro usuario', 'Error inesperado');
						},
						errorHandler:function(errorString, exception) { 
						jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");   
			}   
				});
			}
		});//termina jconfirm
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

function ajustesImportes(cve_doc, modulo, num_doc)
{
	if(modulo=='ped')
		ajustesImportes_Pedido(cve_doc, modulo, num_doc);
	if(modulo=='con')
		ajustesImportes_Contrato(cve_doc, modulo, num_doc);
	if(modulo=='fac')
		ajustesImportes_Factura(cve_doc, modulo, num_doc);
}

function ajustesImportes_Pedido(cve_doc, modulo, num_doc)
{
	var proyectos = [];
	var partidas = [];
	var html = '';
		controladorPedidos.getMovimientosAjustadosPedidos(cve_doc, {
						callback:function(items) {
							html+= '<div id="divMovCaptura" style="display:none; position:absolute; top:15px; padding-bottom:10px">'
								+'<h1>Ajuste de Importe en Pedidos</h1>'
								+'<table width="400">'
									+'<tr><td><input id="ID_SAM_MOD_COMP" type="hidden" value="0"> <input id="CVE_PEDIDO" type="hidden" value="'+cve_doc+'"></td></tr>'
									+'<tr><th height="20">Proyecto:</th><td><select id="cboProyecto" style="width:200px;"></select></td></tr>'
									+'<tr><th height="20">Partidas:</th><td><select id="cboPartidas" style="width:200px;"></select></td></tr>'
									+'<tr><th height="20">Fecha:</th><td><input type="text" id="txtfechaactual" value="" style="width:197px"></td></tr>'
									+'<tr><th height="20">Importe:</th><td><input id="txtimporteMov" type="text" value="" maxlength="10" style="width:197px;" onkeypress="return keyNumbero(event);"></td></tr>'
									+'<tr><th height="20"></th></tr>'
									+'<tr><th height="20"></th><td><input type="button" style="width:100px" class="botones" value="Guardar" id="cmdGuardarAjuste">&nbsp;<input type="button" style="width:100px" class="botones" value="Cancelar" id="cmdCancelarAjuste"></td></tr>'
								+'</table>'
								+'</div>';
							html+= '<div id="divMovListado"><div style="padding-bottom:5px"><input id="cmdAgregarAjuste" style="width:200px;" type="button" value="Agregar Ajuste de Importe"></div><table class="listas" width="400"><tr><th height="20">PROYECTO</th><th>PARTIDA</th><th>FECHA</th><th>IMPORTE</th><th>Opc.</th></tr>';
							jQuery.each(items,function(i) {
								html += '<td align="center">'+this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']' +'</td><td align="center">'+this.CLV_PARTID+'</td><td>'+this.FECHA_MOVTO+'</td><td align="right">'+formatNumber(this.IMPORTE,'$')+'</td><td align="center"><img  src="../../imagenes/page_white_edit.png" width="16" height="16" style="cursor:pointer" OnClick="editarConceptoAjuste('+cve_doc+',\''+modulo+'\',\''+num_doc+'\','+this.id_sam_mod_comp+','+this.ID_PROYECTO+',\''+this.CLV_PARTID+'\',\''+this.FECHA_MOVTO+'\',\''+this.IMPORTE+'\')" > <img id="Remover" src="../../imagenes/cross.png" width="16" height="16" style="cursor:pointer" OnClick="eliminarConceptoAjuste('+cve_doc+',\''+modulo+'\',\''+num_doc+'\','+this.id_sam_mod_comp+')"></td></tr>'; 
								if(proyectos.indexOf(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']')==-1)
									proyectos.push(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']');
								if(partidas.indexOf(this.CLV_PARTID)==-1)
									partidas.push(this.CLV_PARTID);
							});
							html+='</table></div>';
							jWindow(html,'Ajuste de Importe en Factura: '+num_doc, '','Cerrar',1);
							
							//Si no hay proyectos buscar en los conceptos
							if(proyectos.length==0)
							{
								controladorPedidos.getProyectoPartidaPedido(cve_doc, {
									callback:function(items) {
											if(proyectos.indexOf(items.ID_PROYECTO+ ' ['+items.N_PROGRAMA+']')==-1)
												proyectos.push(items.ID_PROYECTO+ ' ['+items.N_PROGRAMA+']');
											if(partidas.indexOf(items.CLV_PARTID)==-1)
												partidas.push(items.CLV_PARTID);

									} 					   				
								,
								errorHandler:function(errorString, exception) { 
										jError(errorString, 'Error');          
									}
								});
							}
							
							$('#cmdGuardarAjuste').click(function(event){
								if($('#txtimporteMov').val()=='')
								{
									alert('Es necesario escribir el importe');
									return false;
								}
								else
									guardarMovimientoAjustePedido(cve_doc, modulo, num_doc);
							});
							$('#cmdCancelarAjuste').click(function(event){
								$('#divMovListado').show();
								$('#divMovCaptura').hide();
								ajustesImportes(cve_doc, modulo, num_doc);
							});
							$('#cmdAgregarAjuste').click(function(event){
								var d = new Date();
								var curr_date = d.getDate();
								var curr_month = d.getMonth()+1;
								var curr_year = d.getFullYear();
								$('#divMovListado').hide();
								$('#divMovCaptura').show();
								$('#popup_message_window').css('height','250px');
								$('#txtfechaactual').attr('value', curr_date+'/'+(parseInt(curr_month) < 10? '0'+curr_month : curr_month)+'/'+curr_year);
								$.each( proyectos, function( index, value ){
									$('#cboProyecto').append('<option value='+value+'>'+value+'</option>');
								});
									$.each( partidas, function( index, value ){
										$('#cboPartidas').append('<option value='+value+'>'+value+'</option>');
								});
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
						jError(errorString, 'Error');          
					 }
		});
}


function ajustesImportes_Factura(cve_doc, modulo, num_doc)
{
	var proyectos = [];
	var partidas = [];
	var html = '';
		controladorListadoFacturasRemoto.getMovimientosAjustadosFactura(cve_doc, {
						callback:function(items) {
							html+= '<div id="divMovCaptura" style="display:none; position:absolute; top:15px; padding-bottom:10px">'
								+'<h1>Ajuste de Importe en Factura</h1>'
								+'<table width="400">'
									+'<tr><td><input id="ID_SAM_MOD_COMP" type="hidden" value="0"> <input id="CVE_FACTURA" type="hidden" value="'+cve_doc+'"></td></tr>'
									+'<tr><th height="20">Proyecto:</th><td><select id="cboProyecto" style="width:200px;"></select></td></tr>'
									+'<tr><th height="20">Partidas:</th><td><select id="cboPartidas" style="width:200px;"></select></td></tr>'
									+'<tr><th height="20">Fecha:</th><td><input type="text" id="txtfechaactual" value="" style="width:197px"></td></tr>'
									+'<tr><th height="20">Importe:</th><td><input id="txtimporteMov" type="text" value="" maxlength="10" style="width:197px;" onkeypress="return keyNumbero(event);"></td></tr>'
									+'<tr><th height="20"></th></tr>'
									+'<tr><th height="20"></th><td><input type="button" style="width:100px" class="botones" value="Guardar" id="cmdGuardarAjuste">&nbsp;<input type="button" style="width:100px" class="botones" value="Cancelar" id="cmdCancelarAjuste"></td></tr>'
								+'</table>'
								+'</div>';
							html+= '<div id="divMovListado"><div style="padding-bottom:5px"><input id="cmdAgregarAjuste" style="width:200px;" type="button" value="Agregar Ajuste de Importe"></div><table class="listas" width="400"><tr><th height="20">PROYECTO</th><th>PARTIDA</th><th>FECHA</th><th>IMPORTE</th><th>Opc.</th></tr>';
							jQuery.each(items,function(i) {
								html += '<td align="center">'+this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']' +'</td><td align="center">'+this.CLV_PARTID+'</td><td>'+this.FECHA_MOVTO+'</td><td align="right">'+formatNumber(this.IMPORTE,'$')+'</td><td align="center"><img  src="../../imagenes/page_white_edit.png" width="16" height="16" style="cursor:pointer" OnClick="editarConceptoAjuste('+cve_doc+',\''+modulo+'\',\''+num_doc+'\','+this.id_sam_mod_comp+','+this.ID_PROYECTO+',\''+this.CLV_PARTID+'\',\''+this.FECHA_MOVTO+'\',\''+this.IMPORTE+'\')" > <img id="Remover" src="../../imagenes/cross.png" width="16" height="16" style="cursor:pointer" OnClick="eliminarConceptoAjuste('+cve_doc+',\''+modulo+'\',\''+num_doc+'\','+this.id_sam_mod_comp+')"></td></tr>'; 
								if(proyectos.indexOf(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']')==-1)
									proyectos.push(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']');
								if(partidas.indexOf(this.CLV_PARTID)==-1)
									partidas.push(this.CLV_PARTID);
							});
							html+='</table></div>';
							jWindow(html,'Ajuste de Importe en Factura: '+num_doc, '','Cerrar',1);
							
							//Si no hay proyectos buscar en los conceptos
							if(proyectos.length==0)
							{
								controladorListadoFacturasRemoto.getConceptosFactura(cve_doc, {
									callback:function(items) {
										jQuery.each(items,function(i) {
											if(proyectos.indexOf(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']')==-1)
												proyectos.push(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']');
											if(partidas.indexOf(this.CLV_PARTID)==-1)
												partidas.push(this.CLV_PARTID);
											
										});
									} 					   				
								,
								errorHandler:function(errorString, exception) { 
										jError(errorString, 'Error');          
									}
								});
							}
							
							$('#cmdGuardarAjuste').click(function(event){
								if($('#txtimporteMov').val()=='')
								{
									alert('Es necesario escribir el importe');
									return false;
								}
								else
									guardarMovimientoAjusteFactura(cve_doc, modulo, num_doc);
							});
							$('#cmdCancelarAjuste').click(function(event){
								$('#divMovListado').show();
								$('#divMovCaptura').hide();
								ajustesImportes(cve_doc, modulo, num_doc);
							});
							$('#cmdAgregarAjuste').click(function(event){
								var d = new Date();
								var curr_date = d.getDate();
								var curr_month = d.getMonth()+1;
								var curr_year = d.getFullYear();
								$('#divMovListado').hide();
								$('#divMovCaptura').show();
								$('#popup_message_window').css('height','250px');
								$('#txtfechaactual').attr('value', curr_date+'/'+(parseInt(curr_month) < 10? '0'+curr_month : curr_month)+'/'+curr_year);
								$.each( proyectos, function( index, value ){
									$('#cboProyecto').append('<option value='+value+'>'+value+'</option>');
								});
									$.each( partidas, function( index, value ){
										$('#cboPartidas').append('<option value='+value+'>'+value+'</option>');
								});
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
						jError(errorString, 'Error');          
					 }
		});
}


function ajustesImportes_Contrato(cve_doc, modulo, num_doc)
{
	var proyectos = [];
	var partidas = [];
	var html = '';
		controladorListadoContratosRemoto.getMovimientosAjustadosContrato(cve_doc, {
						callback:function(items) {
							html+= '<div id="divMovCaptura" style="display:none; position:absolute; top:15px; padding-bottom:10px">'
								+'<h1>Ajuste de Importe en Contrato</h1>'
								+'<table width="400">'
									+'<tr><td><input id="ID_SAM_MOD_COMP" type="hidden" value="0"> <input id="CVE_CONTRATO" type="hidden" value="'+cve_doc+'"></td></tr>'
									+'<tr><th height="20">Proyecto:</th><td><select id="cboProyecto" style="width:200px;"></select></td></tr>'
									+'<tr><th height="20">Partidas:</th><td><select id="cboPartidas" style="width:200px;"></select></td></tr>'
									+'<tr><th height="20">Fecha:</th><td><input type="text" id="txtfechaactual" value="" style="width:197px"></td></tr>'
									+'<tr><th height="20">Importe:</th><td><input id="txtimporteMov" type="text" value="" maxlength="10" style="width:197px;" onkeypress="return keyNumbero(event);"></td></tr>'
									+'<tr><th height="20"></th></tr>'
									+'<tr><th height="20"></th><td><input type="button" style="width:100px" class="botones" value="Guardar" id="cmdGuardarAjusteContrato">&nbsp;<input type="button" style="width:100px" class="botones" value="Cancelar" id="cmdCancelarAjusteContrato"></td></tr>'
								+'</table>'
								+'</div>';
							html+= '<div id="divMovListado"><div style="padding-bottom:5px"><input id="cmdAgregarAjusteContrato" style="width:200px;" type="button" value="Agregar Ajuste de Importe"></div><table class="listas" width="400"><tr><th height="20">PROYECTO</th><th>PARTIDA</th><th>FECHA</th><th>IMPORTE</th><th>Opc.</th></tr>';
							jQuery.each(items,function(i) {
								html += '<td align="center">'+this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']' +'</td><td align="center">'+this.CLV_PARTID+'</td><td>'+this.FECHA_MOVTO+'</td><td align="right">'+formatNumber(this.IMPORTE,'$')+'</td><td align="center"><img  src="../../imagenes/page_white_edit.png" width="16" height="16" style="cursor:pointer" OnClick="editarConceptoAjuste('+cve_doc+',\''+modulo+'\',\''+num_doc+'\','+this.id_sam_mod_comp+','+this.ID_PROYECTO+',\''+this.CLV_PARTID+'\',\''+this.FECHA_MOVTO+'\',\''+this.IMPORTE+'\')" > <img id="Remover" src="../../imagenes/cross.png" width="16" height="16" style="cursor:pointer" OnClick="eliminarConceptoAjuste('+cve_doc+',\''+modulo+'\',\''+num_doc+'\','+this.id_sam_mod_comp+')"></td></tr>'; 
								if(proyectos.indexOf(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']')==-1)
									proyectos.push(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']');
								if(partidas.indexOf(this.CLV_PARTID)==-1)
									partidas.push(this.CLV_PARTID);
							});
							html+='</table></div>';
							jWindow(html,'Ajuste de Importe en Contrato: '+num_doc, '','Cerrar',1);
							
							//Si no hay proyectos buscar en los conceptos
							if(proyectos.length==0)
							{
								controladorListadoContratosRemoto.getConceptosContrato(cve_doc, {
									callback:function(items) {
										jQuery.each(items,function(i) {
											if(proyectos.indexOf(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']')==-1)
												proyectos.push(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']');
											if(partidas.indexOf(this.CLV_PARTID)==-1)
												partidas.push(this.CLV_PARTID);
											
										});
									} 					   				
								,
								errorHandler:function(errorString, exception) { 
										jError(errorString, 'Error');          
									}
								});
							}
							
							$('#cmdGuardarAjusteContrato').click(function(event){
								if($('#txtimporteMov').val()=='')
								{
									alert('Es necesario escribir el importe');
									return false;
								}
								else
									guardarMovimientoAjusteContrato(cve_doc, modulo, num_doc);
							});
							$('#cmdCancelarAjusteContrato').click(function(event){
								$('#divMovListado').show();
								$('#divMovCaptura').hide();
								ajustesImportes(cve_doc, modulo, num_doc);
							});
							$('#cmdAgregarAjusteContrato').click(function(event){
								var d = new Date();
								var curr_date = d.getDate();
								var curr_month = d.getMonth()+1;
								var curr_year = d.getFullYear();
								$('#divMovListado').hide();
								$('#divMovCaptura').show();
								$('#popup_message_window').css('height','250px');
								$('#txtfechaactual').attr('value', curr_date+'/'+(parseInt(curr_month) < 10? '0'+curr_month : curr_month)+'/'+curr_year);
								$.each( proyectos, function( index, value ){
									$('#cboProyecto').append('<option value='+value+'>'+value+'</option>');
								});
									$.each( partidas, function( index, value ){
										$('#cboPartidas').append('<option value='+value+'>'+value+'</option>');
								});
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
						jError(errorString, 'Error');          
					 }
		});
}



function editarConceptoAjuste(cve_doc, modulo, num_doc, idDetalle, idProyecto, clv_partid, fecha, importe)
{
	$('#divMovCaptura').show();
	$('#divMovListado').hide();
	$('#popup_message_window').css('height','250px');
	$('#ID_SAM_MOD_COMP').attr('value', idDetalle);
	$('#cboProyecto').val(idProyecto);
	$('#cboPartidas').val(clv_partid);
	$('#txtfechaactual').attr('value', fecha);
	$('#txtimporteMov').attr('value', importe);
	
}

function eliminarConceptoAjuste(cve_doc, modulo, num_doc, idConcepto)
{
	if(modulo=='ped')
	{
		controladorPedidos.eliminarConceptoAjustePedido(idConcepto, {
					callback:function(items) {
						ajustesImportes(cve_doc, modulo, num_doc);	
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
					jError(errorString, 'Error');          
				}
			});
	}
	if(modulo=='fac')
	{
		controladorListadoFacturasRemoto.eliminarConceptoAjusteFactura(idConcepto, {
					callback:function(items) {
						ajustesImportes(cve_doc, modulo, num_doc);	
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
					jError(errorString, 'Error');          
				}
			});
	}
	if(modulo=='con')
	{
			ControladorContratosRemoto.eliminarConceptoAjusteContrato(idConcepto, {
					callback:function(items) {
						ajustesImportes(cve_doc, modulo, num_doc);	
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
					jError(errorString, 'Error');          
				}
			});
	}
}

function guardarMovimientoAjustePedido(cve_doc, modulo, num_doc)
{
	controladorPedidos.guardarAjustePedidoPeredo($('#ID_SAM_MOD_COMP').attr('value'), cve_doc, $('#cboProyecto').attr('value'),$('#cboPartidas').attr('value'), $('#txtfechaactual').attr('value'), $('#txtimporteMov').attr('value'),{
	  callback:function(items) {
				ajustesImportes(cve_doc, modulo, num_doc);
		} 					   				
		,
		errorHandler:function(errorString, exception) { 
			jError(errorString, 'Error');     
		}
	});
}


function guardarMovimientoAjusteFactura(cve_doc, modulo, num_doc)
{
	controladorListadoFacturasRemoto.guardarAjusteFacturaPeredo($('#ID_SAM_MOD_COMP').attr('value'), cve_doc, $('#cboProyecto').attr('value'),$('#cboPartidas').attr('value'), $('#txtfechaactual').attr('value'), $('#txtimporteMov').attr('value'),{
	  callback:function(items) {
				ajustesImportes(cve_doc, modulo, num_doc);
		} 					   				
		,
		errorHandler:function(errorString, exception) { 
			jError(errorString, 'Error');     
		}
	});
}

function guardarMovimientoAjusteContrato(cve_doc, modulo, num_doc)
{
	ControladorContratosRemoto.guardarAjusteContratoPeredo($('#ID_SAM_MOD_COMP').attr('value'), $('#CVE_CONTRATO').attr('value'), $('#cboProyecto').attr('value'),$('#cboPartidas').attr('value'), $('#txtfechaactual').attr('value'), $('#txtimporteMov').attr('value'),{
	  callback:function(items) {
				ajustesImportes(cve_doc, modulo, num_doc);
		} 					   				
		,
		errorHandler:function(errorString, exception) { 
			jError(errorString, 'Error');     
		}
	});
}

function reduccionAmpliacion(cve_doc, modulo, num_doc)
{
	var proyectos = [];
	var partidas = [];
	var html = '';
	if(modulo=='con')
	{
		controladorListadoContratosRemoto.getConceptosContrato(cve_doc, {
						callback:function(items) {
							html+= '<div id="divMovCaptura" style="display:none; position:absolute; top:15px; padding-bottom:10px">'
								+'<h1>Capturar movimientos de contrato</h1>'
								+'<table>'
									+'<tr><td><input id="ID_DETALLE" type="hidden" value="0"> <input id="CVE_CONTRATO" type="hidden" value="'+cve_doc+'"></td></tr>'
									+'<tr><th height="20">Tipo de Movimiento:</th><td><select id="cboMovimiento" style="width:200px;"><option value="COMPROMISO">COMPROMISO</option></select></td></tr>'
									+'<tr><th height="20">Proyecto:</th><td><select id="cboProyecto" style="width:200px;"></select></td></tr>'
									+'<tr><th height="20">Partidas:</th><td><select id="cboPartidas" style="width:200px;"></select></td></tr>'
									+'<tr><th height="20">Periodo:</th><td><select id="cboPeriodo" style="width:200px;"><option value="1">ENERO</option><option value="2">FEBRERO</option><option value="3">MARZO</option><option value="4">ABRIL</option><option value="5">MAYO</option><option value="6">JUNIO</option><option value="7">JULIO</option><option value="8">AGOSTO</option><option value="9">SEPTIEMBRE</option><option value="10">OCTUBRE</option><option value="11">NOVIEMBRE</option><option value="12">DICIEMBRE</option></select></td></tr>'
									+'<tr><th height="20">Importe:</th><td><input id="txtimporteMovCon" type="text" value="" maxlength="10" style="width:197px;" onkeypress="return keyNumbero(event);"></td></tr>'
									+'<tr><th height="20"></th></tr>'
									+'<tr><th height="20"></th><td><input type="button" style="width:100px" class="botones" value="Guardar" id="cmdGuardarMovCon">&nbsp;<input type="button" style="width:100px" class="botones" value="Cancelar" id="cmdCancelarMovCon"></td></tr>'
								+'</table>'
								+'</div>';
							html+= '<div id="divMovListado"><div style="padding-bottom:5px"><input id="cmdAgregarMovCon" style="width:160px;" type="button" value="Agregar Movimiento"></div><table class="listas" width="450"><tr><th height="20">PERIODO</th><th>PROYECTO</th><th>PARTIDA</th><th>MOVIMIENTO</th><th>IMPORTE</th><th>Opc.</th></tr>';
							jQuery.each(items,function(i) {
								html += '<tr><td height="20" align="center">'+this.DESC_PERIODO+'</td><td align="center">'+this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']' +'</td><td align="center">'+this.CLV_PARTID+'</td><td>'+this.TIPO_MOV+'</td><td align="right">'+formatNumber(this.IMPORTE,'$')+'</td><td align="center"><img  src="../../imagenes/page_white_edit.png" width="16" height="16" style="cursor:pointer" OnClick="editarConceptoMovCon('+cve_doc+',\''+modulo+'\',\''+num_doc+'\','+this.ID_DETALLE_COMPROMISO+','+this.ID_PROYECTO+',\''+this.CLV_PARTID+'\','+this.PERIODO+',\''+this.TIPO_MOV+'\',\''+this.IMPORTE+'\')" > <img id="Remover" src="../../imagenes/cross.png" width="16" height="16" style="cursor:pointer" OnClick="eliminarConcepto('+cve_doc+',\''+modulo+'\',\''+num_doc+'\','+this.ID_DETALLE_COMPROMISO+')"></td></tr>'; 
								if(proyectos.indexOf(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']')==-1)
									proyectos.push(this.ID_PROYECTO+ ' ['+this.N_PROGRAMA+']');
								if(partidas.indexOf(this.CLV_PARTID)==-1)
									partidas.push(this.CLV_PARTID);
							});
							html+='</table></div>';
							jWindow(html,'Reducción y Ampliación de Contrato: '+num_doc, '','Cerrar',1);
							
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
						jError(errorString, 'Error');          
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
	ControladorContratosRemoto.guardarConceptoMovPeredo($('#ID_DETALLE').attr('value'), $('#CVE_CONTRATO').attr('value'), $('#cboProyecto').attr('value'),$('#cboPartidas').attr('value'), $('#cboPeriodo').attr('value'), $('#txtimporteMovCon').attr('value'),{
	  callback:function(items) {
				reduccionAmpliacion(cve_doc, modulo, num_doc);
		} 					   				
		,
		errorHandler:function(errorString, exception) { 
			swal(errorString, 'Error');     
		}
	});
}



/********************* Muestra el frame en la pagina lst_presupuesto ************************/
/********************* funcion para mostrar los documetos comprometidos y precomprometidos ************************/
function mostrarConsultaCompromiso(idproyecto, proyecto, partida, periodo, consulta){
	if(proyecto==""||partida==""||consulta==""){
		
		swal('Programa y partida no validos', 'Consulta de documentos Comprometidos y Pre-comprometidos','info'); return false;
		
	}
	
	swal({
		  title: 'Detalles presupuestales',
		  html:
			  '<iframe width="800" height="350" id="ventadaCompromisos" frameborder="0" src="../../sam/consultas/muestra_compromisos.action?idproyecto='+idproyecto+'&proyecto='+proyecto+'&partida='+partida+"&periodo="+periodo+'&consulta='+consulta+'"></iframe>',
		  width: 800,
		  padding: 15,
		  showCancelButton: false,
		  showCloseButton: true,
		  confirmButtonText: 'Cerrar'
   })
}




//------------------------- Reacciona a la tecla scape para cerrar los dialogos emergentes ---------------------------------------------
$(document).keyup(function (event) { 
	if(event.keyCode==27) $.alerts._hide();
	//swal.closeModal(esc);
	  swal.close();
});

/*funcion para cambiar el color en la entrada a la fila de una tabla*/
function color_over(f){
	row_color = $('#'+f).css("background-color");
	$('#'+f).css("background-color", '#FFCC66');
}

function color_out(f){
	$('#'+f).css("background-color", row_color);
	row_color = "";
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
/**funcion para agregar una fila a una tabla en especifico*/
function appendNewRow(table, param){
	var tabla = document.getElementById(table).tBodies[0];
 	var row   = document.createElement("TR");  
	 
	var i=0;
	while(i<=(param.length)-1){
		row.appendChild(param[i]); 
		i++;
	}
	tabla.appendChild(row);
	return tabla;
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
/*****/
function quitRow( table ){
	var tabla = document.getElementById(table).tBodies[0];
	var nRows = tabla.rows.length;
	while( tabla.rows.length > 0 ){
		index_table = tabla.rows.length - 1;
		tabla.deleteRow( index_table );
	}
}

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

/*Lo llama en la requisicion*/
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

function rellenaCeros(cad, lng){
	var pattern = "00000000000000000000";
	var result = "";
	 if ( cad=="") return cad; 
	 else 
	 	result = (pattern.substring(0, lng - cad.length) + cad);
	 return result;
}

//--------------------Revisando por Abraham 23/08/2017----------------------------------
// SE MUESTRA AL GUARDAR UN CONTRATO................
function ShowDelay(titulo, mensaje){
	// $("#dialog").remove();
	/*
	if(typeof(mensaje)=='undefined'||mensaje=='') mensaje = 'Espere un momento porfavor...';
	if(titulo=='undefined'||titulo=='') titulo = 'Procesando';
	swal({
		  title: titulo,
		  text: mensaje,
		  html: '<a href="#" onclick="swal.closeModal(); return false;"></a>',
		  timer: 1000,
		  showConfirmButton: false,
		  onOpen: function () {
				swal.showLoading()
			  }
		});*/
	
	//06-02-18
	/*swal({
		  title: titulo,
		  text: mensaje,
		  html: '<a href="#" onclick="swal.closeModal(); return false;"></a>',
		  timer: 5000,
		  showConfirmButton: false
		});*/
	/*swal({
	title: titulo ,
	text: mensaje,
	//type: 'info',
	  html:
		  '<div class="loaderBox">' +
		  	'<div class="loadAnim">'+
          		'<div class="loadeAnim1"></div>'+
          		'<div class="loadeAnim2"></div>'+
          		'<div class="loadeAnim3"></div>'+
          		'</div>'+
	  	  '</div>',
	  	showConfirmButton:false
			  
	})*/
}

function CloseAlert(titulo,mensaje,seg,tipo){
	
	if(typeof(seg)=='undefined'||seg==0||isNaN(seg)) seg = 3000;
	
	swal({
	       title: titulo,
	       text: mensaje,
	       type: tipo,
	       timer: seg,
	       width: 400,
	       showLoaderOnConfirm: false,
	     }).then(
	    		 swal.showLoading()
	       )
}

function FinDelay(mensaje,seg,fn){
	
	if(typeof(seg)=='undefined'||seg==0||isNaN(seg)) seg = 3000;
	
	setTimeout(function() {
        swal({title: "Felicidades!",text: mensaje, type: "success",confirmButtonText: "Ok",showConfirmButton:false,width:300,}, 
        		function(){}, seg)
    });
}

function CloseDelay(mensaje, seg, fn){

	try{
		//if(isNaN(seg)) fn = seg; 
		//if(typeof(seg)=='undefined'||seg==0||isNaN(seg)) seg = 3000;
		
		/*setTimeout(function(r){
			swal.close(),
		    swal(mensaje);
			showLoaderOnConfirm: false;
		  }, seg);*/
		swal({
			  title: '',
			  text: mensaje,
			  html: '<a href="#" onclick="swal.closeModal(); return false;"></a>',
			  timer: seg,
			  showConfirmButton: false
			})
		_closeDelay();
		
		
	}catch(err){
		err=null;
	}
}

function executeX(fn){
		fn();
	}

function _closeDelay(){
	 swal.close();
	$(".swal2-container.swal2-shown").remove();//Cierra la ventana modal.
	$(".swal2-container.swal2-fade.swal2-shown").remove();//Cierra la ventana modal.
	
	
}
/*
function _closeDialog(){
	$("#dialog").dialog('close');
}
*/

//funcion para ejecutar una funcion al pulsar enter
function keyEnter(fn){
	if (window.event.keyCode==13) {
	 	fn();
	}else{
	 	return false;
	}

}


/*
 //Funcón que crea las notificaciones
   function notify(msg,speed,fadeSpeed,type){

       //Borra cualquier mensaje existente
       $('.notify').remove();

       //Si el temporizador para hacer desaparecer el mensaje estÃ¡
       //activo, lo desactivamos.
       if (typeof fade != "undefined"){
           clearTimeout(fade);
       }

       //Creamos la notificaciÃ³n con la clase (type) y el texto (msg)
       $('body').append('<div class="notify '+type+'" style="display:none;position:fixed;left:10"><p>'+msg+'</p></div>');

       //Calculamos la altura de la notificación.
       notifyHeight = $('.notify').outerHeight();

       //Creamos la animación en la notificación con la velocidad
       //que pasamos por el parametro speed
       $('.notify').css('top',-notifyHeight).animate({top:10,opacity:'toggle'},speed);
	   
	   _closeDelay();

       //Creamos el temporizador para hacer desaparecer la notificaciÃ³n
       //con el tiempo almacenado en el parametro fadeSpeed
       fade = setTimeout(function(){

           $('.notify').animate({top:notifyHeight+10,opacity:'toggle'}, speed);
		   

       }, fadeSpeed);

   }*/