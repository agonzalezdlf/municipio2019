<%@ page contentType="text/html;charset=UTF-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; text/css ;charset=UTF-8"/>

<link type="text/css" rel="stylesheet" href="../../include/css/estilosam.css" />
<link type="text/css" rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" />
<link type="text/css" rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" />
<link type="text/css" rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.css" />
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js" ></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7/js/bootstrap-3.3.7.min.js" ></script>

<!-- 
<script type="text/javascript" src="../../include/js/toolSam.js"></script>
<script type="text/javascript" src="../../include/js/jquery.maxlength.js"></script>
<script type="text/javascript" src="../../include/js/jquery.bestupper.min.js"></script>
<script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>
<script type="text/javascript" src="../../include/js/componentes/componentes.js"></script>
<link rel="stylesheet" href="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.css" type="text/css" />
<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
<link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs.css" type="text/css" media="print, projection, screen"/>
 -->
 <script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>
<script type="text/javascript" src="../../dwr/interface/controladorCambioEstatusPeriodosRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"></script>


<!-- Additional IE/Win specific style sheet (Conditional Comments) -->
<!--[if lte IE 7]>
<link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs-ie.css" type="text/css" media="projection, screen">
<![endif]-->
<style type="text/css"> 
	@import url("../../include/css/calendar/calendar-win2k-cold-1.css"); 
</style>
<script>

$(document).ready(function(){
	
	$('#btnDemo3').click(function(){
		$.ajax({
			type:"GET",
			url: "/sam/sam/utilerias/cambio_estatus_periodo/submit.action",
			data:{name: "Jhon", locatio: "Boston"},//parametros
			success: function(data){
		    	alert(data);
		    	console.log(data);
		    //response from controller
		    },
	        error: function(e){
	            alert('Error: ' + e);
	            }
		    
			})
	});
	
	
	$('#btnDemo2').click(function(){
		var texto = $('#txtnombre').val;
		console.log('Entro a la clase madeAjaxCall');
		$.ajax({
			type : "GET",
		    url : "${pageContext.request.contextPath}/check",
		    crossDomain: true,
		    data : texto,//{ "id" : $(articleCount) },
		    success: function(data){
		    	alert(data);
		    	console.log(data);
		    //response from controller
		    },
	        error: function(e){
	            alert('Error: ' + e);
	            }
		    
		});
		console.log('Entro a la clase al AJAX');
	});
	
	$('#btnDemo1').click(function(){
		alert('Dio clic al boton demo2');
		$.ajax({
			type:'GET',
			url:"/sam/utilerias/cambio_estatus_periodo/demo",
			success:function(result){
				$('#result1').html(result);
			}
			
		})
	});
	
})

function madeAjaxCall(){
	
}
function  cambiarEstatus(tipo,idmes,estado){
	var status = "";
	if(estado=="ACTIVO")
		status= "cerrar";
	else 	
		status = "abrir"
	var meses = new Array("Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
	
	swal({
		  //title: 'Al cerrar el periodo se aplicara el cierre interno y no se podran realizar nuevas operaciones sobre este hasta volver a reaperturarlo</br> ¿Confirma que desea <strong>'+status+'</strong> el periodo de '+meses[idmes-1]+'?',
		  text: 'Al cerrar el periodo se aplicara el cierre interno y no se podran realizar nuevas operaciones sobre este hasta volver a reaperturarlo ¿Confirma que desea <strong>'+status+'</strong> el periodo de '+meses[idmes-1]+'?',
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  preConfirm: function(result) {
			    return new Promise(function(resolve, reject) {
		    	swal({
	  				title: status =='cerrar' ? 'Cerrando el periodo: ' +meses[idmes-1]:'Abriendo el periodo: '+meses[idmes-1],
	  				type: 'success',
	  				showConfirmButton: false,
	  				timer: 4000,
	  					onOpen: () => {
	    					swal.showLoading()
	  					}
					})
		    	  	setTimeout(function() { 
		      		
		      		resolve();  
		      		
		      	}, 2000);
		    });
		 },
	}).then(function(result) {
		
	   if (result.value) {
		   swal({title:'Paso 3', text:'Periodo y cierre aplicados con exito', type:'success', timer:1500});
		   console.log('Periodo y cierre aplicados con exito !! '+ estado);
		   controladorCambioEstatusPeriodosRemoto.cerrarPeriodo(idmes,estado, {
				callback:function(items) { 
						if(items==""){
							cerrando(idmes,estado,tipo);
							madeAjaxCall();
							console.log(idmes,estado,tipo);
							/*
					  		swal('Periodo y cierre aplicados con exito', function(idmes,estado,tipo){
								$('#idMes').val(idmes);
								$('#estatus').val(estado);
								$('#tipoEstatus').val(tipo);
								$('#acciones').val("guardar");
								$('#acciones').action = "cambio_estatus_periodo.action";
								$('#forma').submit();
						  });*/
						}
						else 
							swal(items, 'Error');
			  
				},		
			 	errorHandler:function(errorString, exception) { 
					swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
		 		}
			
			});
		   
	   } else if (result.dismiss === swal.DismissReason.cancel) {
			swal({title:'Cancelado', text:'El pedido no se guardo', type:'error', timer:1500});
	   }
	})
		
		
	function cerrando(idmes,estado,tipo){
		$('#idMes').prop("value",idmes);
		console.log('Id mes' +$('#idMes').val());
		
		$('#estatus').prop("value",estado);
		console.log('estatus' +$('#estatus').val());
		
		$('#tipoEstatus').prop("value",tipo);
		console.log('tipoEstatus' +$('#tipoEstatus').val());
		
		$('#acciones').prop("value","guardar");
		console.log('acciones' +$('#acciones').val());
		
		$('#acciones').action = "cambio_estatus_periodo.action";
		$('#forma').submit();
	}
	/*jConfirm('Al cerrar el periodo se aplicara el cierre interno y no se podran realizar nuevas operaciones sobre este hasta volver a reaperturarlo ¿Confirma que desea <strong>'+status+'</strong> el periodo de '+meses[idmes-1]+'?','Confirmar', function(r){
				if(r){
						ShowDelay((status =='cerrar' ? 'Cerrando el periodo: ' +meses[idmes-1]:'Abriendo el periodo: '+meses[idmes-1] ), '');
						controladorCambioEstatusPeriodosRemoto.cerrarPeriodo(idmes,estado, {
							callback:function(items) { 
									if(items==""){
								  		CloseDelay('Periodo y cierre aplicados con exito', function(idmes,estado,tipo){
											$('#idMes').attr("value",idmes);
											$('#estatus').attr("value",estado);
											$('#tipoEstatus').attr("value",tipo);
											$('#acciones').attr("value","guardar");
											$('#acciones').action = "cambio_estatus_periodo.action";
											$('#forma').submit();
									  });
									}
									else 
										jError(items, 'Error');
						  
							},		
						 	errorHandler:function(errorString, exception) { 
								jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 		}
						
						});	
				}
		});*/
}

function cambiarEstatusEvaluacion(idmes, estado){
	var status = "";
	if(estado=="ACTIVO")
		status= "cerrar";
	else 	
		status = "abrir"
		
	var meses = new Array("Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
	
	swal({
		  title: 'Ajax request example',
		  text: 'Submit to run ajax request',
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  preConfirm: function() {
		    return new Promise(function(resolve, reject) {
		    	// here should be AJAX request
		      setTimeout(function() {
		        resolve();
		      }, 2000);
		    });
		  },
		}).then(function() {
		  swal('Ajax request finished!');
		})
		
	/*jConfirm('¿Confirma que desea <strong>'+status+'</strong> el periodo de evaluacion de proyectos del mes de '+meses[idmes-1]+'?','Confirmar', function(r){
				if(r){
						controladorCambioEstatusPeriodosRemoto.cerrarEval(idmes,estado, {
							callback:function(items) { 
									if(items==""){
								  		CloseDelay('Periodo de evaluacion de proyectos cerrado con exito', function(idmes, estado){
											$('#idMes').attr("value",idmes);
											$('#estatus').attr("value",estado);
											$('#acciones').attr("value","guardar");
											$('#acciones').action = "cambio_estatus_periodo.action";
											$('#forma').submit();
									  });
									}
									else 
										jError(items, 'Error');
						  
							},		
						 	errorHandler:function(errorString, exception) { 
								jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 		}
						
						});
						
				}
		});*/
}
</script>
<title>Cambiar estatus mes</title>
</head>
<body>
<br />
<form action="${pageContext.request.contextPath}/sam/utilerias/cambio_estatus_periodo/json/search">
	<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUPERPRIVILEGIO_CERRAR_PERIODO_PRESUPUESTAL">
              <input type="text" name="nombrePeriodo"/>
			  <input type="submit" value="test jason">
    </sec:authorize>
	
</form>
<form id="forma" name="forma" method="post">
  <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>	
  <input type="hidden" name="idMes" id="idMes"  />
  <input type="hidden" name="acciones" id="acciones"   />
  <input type="hidden" name="estatus" id="estatus"  />
  <input type="hidden" name="tipoEstatus" id="tipoEstatus"  />
<table width="85%" align="center"><tr><td><h1>Administración - Cambio de Estatus de Periodos</h1></td></tr></table>
<table  border="0" align="center" cellpadding="0" cellspacing="0" class="formulario" width="85%" >
  <tr >
    <td  >
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="listas"  id="tablaSistema"  >
      <thead>
        <tr id="tr">
          <th width="15%" height="20" align="center">Periodo</th>
          <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUPERPRIVILEGIO_CERRAR_PERIODO_PRESUPUESTAL">
              <th width="16%" align="center">Estatus</th>
              <th width="17%" align="center">Periodos</th>
              <th width="14%" align="center">Total del mes</th>
          </sec:authorize>
          
          <th width="13%" align="center">Estatus evaluación</th>          
          <th width="20%" align="center">Evaluación</th>
        </tr>
      </thead>
    <tbody> 
        <c:forEach items="${meses}" var="item" varStatus="status" >
          <tr>
            <td><c:out value="${item.DESCRIPCION}"/></td>
            <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUPERPRIVILEGIO_CERRAR_PERIODO_PRESUPUESTAL">
                <td align="center"><c:out value="${item.ESTATUS}"/></td>            
                <td align="center"><c:if test="${ item.MES >= mesactivo-1   }">            
                <input type="button" value='<c:out value="${item.ACCION}"/>' id="cmdcambiarpassword2" name="cmdcambiarpassword2" class="botones" onclick='cambiarEstatus( "DOC", <c:out value="${item.ID_MES}"/>, "<c:out value="${item.ESTATUS}"/>" )' /> </c:if></td>
                <td align="center">$0.00</td>
            </sec:authorize>
            <td align="center"><c:out value="${item.ESTATUSEVA}"/></td>
            <td align="center"><input type="button" value='<c:out value="${item.ACCIONEVA}"/>' id="cmdcambiarpassword3" name="cmdcambiarpassword3" class="botones" onclick='cambiarEstatusEvaluacion(<c:out value="${item.ID_MES}"/>, "<c:out value="${item.ESTATUSEVA}"/>" )' /></td>
          </tr> 
        </c:forEach>
      </tbody> 
    </table>
    </td>
  </tr>
</table>
<fieldset>
	<legend>Demo 1</legend>
	<input type="button" value="Demo 1" id="btnDemo1"/>
	<br/>
	<span id="result1"></span>
</fieldset>
<fieldset>
	<legend>Demo 2</legend>
	Nombre <input type="text" id="txtnombre"/>
	<input type="button" value="demo 2" id="btnDemo2"/>
	<br/>
	<span id="result2"></span>
</fieldset>
<fieldset>
	<legend>Demo 3</legend>
	Nombre <input type="text" id="txtnombre"/>
	<input type="button" value="demo 3" id="btnDemo3"/>
	<br/>
	<span id="result2"></span>
</fieldset>
  </form>
</body>
</html>