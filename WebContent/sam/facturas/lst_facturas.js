
$(document).ready(function() {
  var imagen="../../imagenes/cal.gif";	
  var formatFecha="dd/mm/yy";	
  
  $('#btnBuscar').on('click', function(){
	  iniciarBusqueda();
	});
  
  $('#cmdcancelar').on('click', function(){
	  cancelarFacturas();
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

	

//Checkbox para seleccionar toda la lista.... 
  $("input[name=todos]").change(function(){
  	$('input[type=chkfacturas]').each( function() {			
  		if($("input[name=todos]:checked").length == 1){
  			this.checked = true;
  		} else {
  			this.checked = false;
  		}
  	});
  });
  //Para seleccionar todos los checkbox Abraham Gonzalez 12/07/2016
  $('#todos').click( function (event){ $('input[name=chkfacturas]').attr('checked', this.checked); });
  
  $('#cbostatus').multipleSelect({
	  	placeholder: 'Seleccione un status'
  });
  
  
  //$('#cbostatus').multipleSelect('setSelects',item.STATUS);
 
});

//$select.multipleSelect('setSelects', [1, 3])
//alert('Selected values: ' + $select.multipleSelect('getSelects'))
//alert('Selected texts: ' + $select.multipleSelect('getSelects', 'text'))

function iniciarBusqueda(){
	
	var checkStatus = [];
	var cont=0;
	
	alert('Selected values: ' + $('#cbostatus').multipleSelect('getSelects'));
	alert('Selected texts: ' + $('#cbostatus').multipleSelect('getSelects', 'text'));
	if ($('#selectItemcbostatus').is(':checked') ) {
	    console.log("Checkbox seleccionado");
	}
	//data-name="selectItemcbostatus"
	
	$('input[data-name=selectItemcbostatus]:checked').each(function() {checkStatus.push($(this).val());});
	
    //$('input[name=status]:checked').each(function() {checkStatus.push($(this).val());});
    
    if (checkStatus.length==0 )  {swal('','Debe de seleccionar un estatus de Facturas', 'info'); return false;}
    //alert('Valor del array: ' +checkStatus);
    $('#cbostatus').multipleSelect('getSelects')
    
    $('#frmreporte').attr('target',"");
	$('#frmreporte').attr('action',"lst_facturas.action");
	$("#frmreporte").submit();
}

    
function mostrarReemplazarArchivosFactura(cve_factura, num_fac){
	jWindow("",'Archivos de factura: '+num_fac, '','Cerrar',1);
}

function getAnexosListaFactura(cve_factura){
	ShowDelay('Cargando Anexos escaneados de la factura','');
	 controladorListadoFacturasRemoto.getListaAnexosArchivosFactura(cve_factura, {
				callback:function(items) { 
					_closeDelay();		
					var html = '<table width="100%" border="0"  align="center" cellpadding="0" cellspacing="0" class="listas" id="listasDocumentos">'+
								'	<thead>'+
								'	  <tr >'+
								'		<th width="10%"  align="center" height="20">Tipo</th>'+
								'		<th width="10%" align="center">Número</th>'+
								'		<th width="55%"  align="center">Nota</th>'+
								'		<th width="20%"  align="center">Archivo</th>'+
								'		<th width="5%"  align="center">Opc.</th>'+
								'	</tr>'+
								'	  </thead>'+
								'	<tbody>'+
								'	  </tbody>'+
								'	</table>';
					jWindow(html,'Anexos de Orden de Pago: '+cve_op, '','Cerrar',1);
					jQuery.each(items,function(i) {
						appendNewRow("listasDocumentos", [Td('', centro , '', this.DESCR),
								 Td('', centro , '', this.NUMERO),
								 Td('', izquierda , '', this.NOTAS),
								 Td('', izquierda , '', "<strong><a href='"+this.FILEPATH+this.FILENAME+"' target='_blank'>"+getHTML(this.FILENAME)+"</a></strong>"),
								 Td('', centro , '', (this.FILENAME==null) ? "":"<a href='"+this.FILEPATH+this.FILENAME+"' target='_blank'><img src='../../imagenes/application_view_tile.png'></a>")
								 
						]);
						
				});
				
			 } 					   				
			 ,
			 errorHandler:function(errorString, exception) { 
				jError(errorString, 'Error');          
			 }
	});
}

/*CANCELACION DE FACTURAS SWEET ALERT 2*/
function cancelarFacturas(){
	
	var checkClaves = [];
	
	$('input[name=chkfacturas]:checked').each(function() {checkClaves.push($(this).val());});	
  	
	if (checkClaves.length>0){
		 swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea cancelar la factura?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, cancelar!',
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
				          controladorListadoFacturasRemoto.cancelarFacturas(checkClaves, {
								callback:function(items) {
									
									setTimeout(function(){
									    swal("Facturas  cancelada con exito!");
									    iniciarBusqueda();
									  }, 2000);
								} 					   				
								,
								errorHandler:function(errorString, exception) { 
									//swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');
									swal('',errorString,'error');
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
		 
				
	 }else 
	    swal('','Es necesario que seleccione por lo menos una factura del listado', 'warning');
		
}





/*CANCELACION DE FACTURAS POR ICONO SWEET ALERT 2*/
function cancelarFactura(id){
	
	var checkClaves = [];
	checkClaves.push(id);
	  	
	if (checkClaves.length>0){
		 swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea cancelar la factura?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, cancelar!',
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
				          controladorListadoFacturasRemoto.cancelarFacturas(checkClaves, {
								callback:function(items) {
									
									setTimeout(function(){
									    swal("Facturas  cancelada con exito!");
									    iniciarBusqueda();
									  }, 2000);
								} 					   				
								,
								errorHandler:function(errorString, exception) { 
									//swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');
									swal('',errorString,'error');
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
		 
				
	 }else 
	    swal('','Es necesario que seleccione por lo menos una factura del listado', 'warning');
		
}

function editarFactura(cve_factura)
{
	document.location = "captura_factura.action?CVE_FACTURA="+cve_factura;
}


function getReporteEntrada(id_entrada) {
	$('#ID_ENTRADA').attr('value', id_entrada);
	$('#frmreporte').attr("target","impresion");
	$('#frmreporte').submit();
    $('#frmreporte').attr("target","");

}

function getReportePedido(cve_ped)
{
	$('#clavePedido').attr('value',cve_ped);
	$('#frmreporte').attr('target',"impresion_pedido");
	$('#frmreporte').attr("action", "../../sam/reportes/rpt_pedido.action");
	$('#frmreporte').submit();
	$('#frmreporte').attr('target',"");
	$('#frmreporte').attr('action',"../reportes/entradas.action");
}