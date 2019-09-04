var checkClavesOP = [];
var nota ='';	
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
	$('#cmdfinanzas').on('click',function(event){
		EnvioFinanzas();
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
		
	$('#cmdGuardarRF').on('click',function(event){
		guardar_recibidas();
	});
	

	
});


function EnvioFinanzas(){
	
	var html = '';
	
	  swal({
		  title: 'Estas seguro, escribe el número de relación de envió?',
		  html: html,
		  input: 'text',
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, Esta relación!',
		  cancelButtonText: 'No, cancel!',
	  }).then(function () {
		  var folio = $('.swal2-input').val();
		  		  
		  controladorListadoOrdenRecibidas.getConceptosRelaciones(folio, {
      		 callback:function(items) { 
      			     			 
      			html+= '<div><p style="font-size:15px;font-family: inherit;font-weight: 800;">Número de la relación: '+ folio +'<p/></div><div style="padding-bottom:5px"></div>'
      			html+= '<table id="tbdetalle" class="listasDetalles table table-hover table-condensed" style="font-size:13px;" width="650">'+
      				   '<tr> ' +
	      			       '<thead>'+
	      				   		'<th style="text-align: center;height:5%;"><input type="checkbox" name="chkordenes" id="chkordenes"></th>'+
	      				   		'<th style="text-align: left;height:10%;">RELACION</th>'+
	      				   		'<th style="text-align: center;height:10%;">CVE_OP</th>'+
	      				   		'<th style="text-align: center;height:15%;">FECHA</th>'+
	      				   		'<th style="text-align: center;height:20%;">NOTAS</th>'+
	      				   	'</thead>'+
      				   	'</tr>';
      			
				
      			jQuery.each(items,function(i) {
					html += '<tr>'+
								'<td style="text-align: center;">'+
								'<input type="checkbox" id="chkOPE" name="chkOPE" onClick="habilitarConcepto(this.checked, '+this.CVE_OP+', true)" value="<c:out value="'+this.CVE_OP+'"/>'+
								//'<input alt="<c:out value="'+${this.CVE_OP}+'"/>" type="checkbox" onClick="habilitarConcepto(this.checked, '+this.FOLIO[i]+')" class="checkdemo" name="chckOP" id="chckOP" value="<c:out value="'+[i]+'"></td>'+
								'<td style="height:10;align:center">'+this.FOLIO+'</td>'+
								'<td height="10" align="center">'+this.CVE_OP+'</td>'+
								'<td style="height:15;align:center">'+this.FECHA+'</td>'+
								'<td style="height:20;align:center"><input id="txtNota" name="txtNota" type="text" class="form-control input-sm" value="" style="width:100px;"></td>'+
								//'<td>nota=$("#txtNota").val();</td'
							'</tr>'; 
				 });
      			
      		    html+= '<div id="divMovListado"></div>'+
      		    	   	'<div style="padding-bottom:5px">'+
      		    			'<input onClick="RecibidasFin(checkClavesOP,nota)" id="cmdGuardarRF" name="cmdGuardarRF" style="width:160px;" type="button" class="btn btn-primary sm"  value="Guardar Movimientos">'+
      		    		'</div>';
      		 
      		    		
      		    	swal({
      		    		
      		    		width: 650,
      		    		html : html,
      		    		//input:checkbox,
      		    		confirmButtonText: 'Cerrar!',
      		    	})
      			
          	 },
          	 errorHandler:function(errorString, exception) { 
          		 swal('Oops...',errorString,'error');
          	 }
           },async=false );
		  
		}, function (dismiss) {
		  // dismiss can be 'cancel', 'overlay', 'close', and 'timer'
		  if (dismiss === 'cancel') {
			  console.log('Cancelo');
		    swal(
		      'Cancelled',
		      'Your imaginary file is safe :)',
		      'error'
		    )
		  }
		})

}
function habilitarConcepto(checked,id, bol){
	nota=$('#txtNota').val();
	checkClavesOP.push(id);//Contiene las ordenes de pago que se entregaron
	console.log('habilitarConcepto - Los datos son: ' +checkClavesOP);
	
} 

function RecibidasFin(checkClavesOP,nota){
	
	console.log('RecibidasFin - La clave de la op es #: ' +checkClavesOP);
	
	if (checkClavesOP.length>0){
		 
		swal({
      		title: 'Confirma que recibieron la(s) op(s)!! ',
      		html:'<div class="row">OPS '+ checkClavesOP +' </div></br>'+ 
		    '<label for="fecha_relacion" class="control-label">Fecha de recibida por finanzas:</label>' +
		    '<div class="row">' +
		   	'<div class="col-sm-6">'+ 
    			'<div class="input-group date" id="fechas" style="width:150px" value=""> ' +
    				'<input type="text" id="fecha_eje" name="fecha_eje" class="form-control datos" value="" />	 ' +
    				'<span class="input-group-addon"> ' +
    					'<span class="glyphicon-calendar glyphicon"></span> ' +
    				'</span> ' +
    			'</div>' +
    		'</div>' +
    		'</div>', 
      		allowOutsideClick: false,
      		allowEscapeKey: false, 
      		showConfirmButton: true,
      		customClass: 'swal2-overflow',
      		showCancelButton: true,
      		confirmButtonText:'Recibidas',
      		onOpen:()=> {
        		swal.showLoading();
        		setTimeout(() => { 
        			swal.hideLoading()
        			$('#fechas').datetimepicker({
    		    		format: 'DD/MM/YYYY',
    		    		defaultDate: new Date(),
    		    		widgetPositioning: {
    		    	        vertical: 'auto',
    		    	        horizontal: 'auto'
    		    	    }
    		     	});
        		
        		},5000);
        		
      			}
    	}).then((result) => {
    			fecha_nueva = $('#fecha_eje').val();
    			if (!result.dismiss) {
    				controladorListadoOrdenRecibidas.RecibidasFin(checkClavesOP, fecha_nueva, nota, {
	            		 callback:function(items) { 
	            			 //buscarOpMes();
	                	 },
	                	 errorHandler:function(errorString, exception) { 
	                		 swal('Oops...',errorString,'error');
	                	 }
	                 },async=false );
    				  
    				swal({
    					title:'Proceso cocluido con exito!!',
    					showConfirmButton: false,
    					type:"success",
    					timer:2500,
    						onOpen:()=> {swal.showLoading();//setTimeout(() => {swal.hideLoading()},5000);}
    				});
    			   				
    			}else if (result.dismiss === 'cancel') {
    				swal({title:'Proceso abortado con exito!!',showConfirmButton: false,timer:3000,type:"info"});
    			}
    	})
		
	 }
	 else 
	    swal('','Es necesario que seleccione por lo menos una Orden de Pago para realizar esta acción','warning');
}
function DevolverOP(){
	
	var now = new Date();
	var checkClaves = [];
	var fecha = $('#txtfechanueva2').val();
	var motivo=null;
	
	$('input[id=chkOP]:checked').each(function() { checkClaves.push($(this).val());});
	
	if (checkClaves.length>0){
		 
		if(fecha=='') {swal('','La fecha de validacion para la Orden de Pago no es válida', 'warning'); return false;}
				
		swal({
			title: '¿Esta seguro que desea devolver los documentos?',
			input: 'textarea',
			showCancelButton: true,
			allowOutsideClick: false,
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
			                	 },
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
			  allowOutsideClick: false,
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