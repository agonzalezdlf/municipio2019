$(document).ready(function() {
	
   
  $('#cmdaperturar').click(function(event){aperturarContrato();}); 
  $('#cmdcancelar').click(function(event){cancelarContrato();});
  $('#cmdbuscar').click(function(event){getContratos();})
  $('[id=Cancelarcontra]').click(function(event){cancelarContrato();});
  
  // Filtrado de fechas por componente 
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
  // Termina Filtrado de fechas por componente
  
  $('#cbostatus').multipleSelect({
	placeholder: 'Seleccione un status'
  });
  
});

function getContratos(){
	 var checkStatus = [];
	 $('#cbostatus').multipleSelect('getSelects')
    $('input[name=status]:checked').each(function() {checkStatus.push($(this).val());});	
	 if (cbostatus.length==0 )  {swal('','Debe de seleccionar un estatus de Facturas', 'info'); return false;}
	 $('#cbostatus').multipleSelect('getSelects');
	 //if (checkStatus.length==0 )   {swal('','Es necesario seleccionar por lo menos un status de Contrato', 'warning'); return false;}
	 var s = 'lista_contratos.action?idUnidad='+$('#cbodependencia').val()+"&fechaInicial="+$('#fechaInicial').val()+"&fechaFinal="+$('#fechaFinal').val()+"&status="+checkStatus+"&tipo_gto="+$('#cbotipogasto').val()+"&txtproyecto="+$('#txtproyecto').val();
	$("#forma").submit();

}

function mostrarOpcionCONPDF(anexo, cve_con){
	var html = '<table class="table" border="0" align="center" cellpadding="1" cellspacing="2" width="405" >'+
				'  <tr> '+
				'	<td width="33" height="27" align="center" style="cursor:pointer" onclick="getReporteCON('+cve_con+')"> '+
				'	  <img src="../../imagenes/pdf.gif"/></td>' +
				'	<td width="362" height="27" align="left" style="cursor:pointer" onclick="getReporteCON('+cve_con+')">&nbsp;Reporte Normal de Contrato</td> '+
				'  </tr> '+
				(anexo!="" ?
					html+'<tr> '+
					'	  <td height="27" align="center"  style="cursor:pointer"><a href="archivos/'+anexo+'" target="_blank"><img src="../../imagenes/pdf.gif" /></a></td> '+
					'	  <td height="27" align="left" style="cursor:pointer">&nbsp;<a href="archivos/'+anexo+'" target="_blank">Anexos de Contrato</a></td> '+
					'	</tr> '
					:
					''
				);
			html+='</table>';
			
	swal({html:html,title:'Opciones de Reporte Contratos', width: 500});
}

function getAnexosListaCON(anexo)
{
	window.open(anexo, "windowsCONAnexo");
}

function editarCON(cve_contrato){
	
	swal({
		title:'Abriendo contrato ',
	   	showConfirmButton: false,
	   	onOpen: function () {
	   		swal.showLoading()
	   	    setTimeout(function () {
	   	    	document.location = "cap_contratos.action?cve_contrato="+cve_contrato;
	   	    	swal.hideLoading()
	   	    }, 5000)
	    }
	}).catch(swal.noop);
}

function getReporteCON(clave) {
	$('#cve_contrato').attr('value',clave);
	$('#forma').attr('action',"../reportes/rpt_contrato.action");
	$('#forma').attr('target',"impresion");
	$('#forma').submit();
	$('#forma').attr('target',"");
	$('#forma').attr('action',"");
	}
	
function aperturarContrato(){
	
	swal('','Por actualizacion del sistema, con los lineamientos de la <strong>CONAC</strong> esta opcion queda inválida','info')
	
    
}


function cancelarContrato(){
	 var checkClaves = [];
    $('input[name=chkcontratos]:checked').each(function() { checkClaves.push($(this).val());});	
	 if (checkClaves.length>0){
		 
		 swal({
			  title: 'Cancelación',
			  text: 'Confirma que desea cancelar?',
			  type: 'info',
			  showCancelButton: true,
			  showLoaderOnConfirm: true,
			  allowOutsideClick: false,
			  preConfirm: function() {
			    return new Promise(function(resolve, reject) {
			    	//ShowDelay('Cancelando contrato','');
					 controladorListadoContratosRemoto.cancelarContrato(checkClaves, {
						callback:function(items) { 	
							getContratos();
							  /*CloseDelay('Contrato cancelado con exito', 2000, function(){
									getContratos();
								});*/
						   
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal('',errorString, 'error');          
					 }
				    });
			      setTimeout(function() {
			        resolve();
			      }, 2000);
			    });
			  },
			}).then(function (result) {
				if (result.value) {
			        	swal({title:'Contrato cancelado con exito!!',showConfirmButton: false,timer:1000,type:"success"});
			        }else
			        	swal({title:'Abortado!!!',text:'Proceso abortado, no se realizó ningun cambio',showConfirmButton: false,timer:1000,type:"info"});
			  
			})
	} 
	else 
	    swal('','Es necesario que seleccionar por lo menos un Contrato del listado', 'warning');

}
