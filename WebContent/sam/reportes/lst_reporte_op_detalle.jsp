<%@page import="java.util.Date"%>
<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Reporte de Orden de Pago con detalle</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/jquery.form.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css" />
<link rel="stylesheet" href="../../include/css/style-tabs.css" type="text/css" />
<link rel="stylesheet" href="../../include/css/boostrap-select/dist/css/bootstrap-select.css" type="text/css">
<script type="text/javascript" src="../../include/css/boostrap-select/dist/js/bootstrap-select.js"></script> 
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>
<link rel="stylesheet" href="../../include/css/sweetalert2.css" type="text/css">
<script type="text/javascript" src="lst_reportetransferencia.js?x=<%=System.currentTimeMillis()%>"></script>
<link rel="stylesheet" href="../../include/js/multiselect/multiple-select.css" type="text/css">
<script type="text/javascript" src="../../include/js/multiselect/multiple-select.js"></script>

<script type="text/javascript">
$(document).ready(function(){
	
	$("#cmdBuscar").click(function(){
        
        var clavunidad=$('#cbUnidad').selectpicker('val');
        var clavegasto=$('#cbotipogasto').val();
        //console.log("ready2" +" UNIDAD: " +clavunidad + " RECURSO: " +clavegasto);
        $.ajax({
            statusCode: {
                500: function() {
                    alert("error");
                }
            },
            url: '/sam/reportes/lst_reporte_op_detalle.action',
            type: "POST",
            data: {
                "cbUnidad": clavunidad,
                "cbotipogasto": clavegasto,
            },
            error: function(t){
                console.log("Error: ", t);
            },
            success: function(data){
                $("#stage").text("Thank You");
                console.log('Entro al aJAx: ',data);
            }
        });
        console.log("finish");
    });
	
	$('.selectpicker').selectpicker();
	
	$('#cmdBuscar').on('click', function(){
		Buscar();
	});
	
	$('#cmdexportar').on('click', function(){
		//Calcular();
		GeneraExcel();
	});
	$('#cbostatus').multipleSelect({
	  	placeholder: 'Seleccione un status'
  	});
  
	function Buscar()
	{
		//$('#forma').submit();
	}

	function GeneraExcel()
	{
		var clavunidad=$('#cbUnidad').selectpicker('val');
		$('#ridunidad').prop('value', clavunidad);
				
		var clavegasto=$('#cbotipogasto').val();
		$('#ridrecurso').prop('value', clavegasto);
				
		var clavecapitulo = $('#cbocapitulo').selectpicker('val');
		$('#rcapitulo').prop('value', clavecapitulo);
				
		var mesejercido = $('#cbomes').selectpicker('val');
		$('#rmes').prop('value', mesejercido);
				
		var status = $('#cbostatus').val();
		$('#rstatus').prop('value', status);
				
		/*
		var clavproyecto=$('#txtproyecto').val();
		$('#rproyecto').prop('value', clavproyecto);
		console.log('Tipo de gasto es: ' +$('#rproyecto').val()+' Tipo de recurso: '+ clavproyecto);
		
		var clavpartida=$('#txtpartida').val();
		$('#rpartida').prop('value', clavpartida);
		console.log('Tipo de gasto es: ' +$('#rpartida').val()+' Tipo de recurso: '+ clavpartida);*/
		
		$('#frmExcel').submit();
	}
});
</script>
<style type="text/css">
a:link {
	text-decoration: none;
}

a:visited {
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

a:active {
	text-decoration: none;
}

.ui-widget-content {
	border: none;
}
</style>
</head>
<body>
<form name="forma" id="forma" class="form-horizontal" method="post" style="margin:10px;">
	<div class="row col-md-offset-2">
          <h1 class="h1-encabezado"> Reportes - Relación de Ordenes de Pago por partidas</h1>
    </div> 
    <div class="well">
    
    	<div class="form-group"><!-- Unidad -->
	      <label class="control-label col-sm-2" for="dependencia">Unidad:</label>
	      <div class="col-sm-6">
	       		<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
	      			<c:out value="${nombreUnidad}"/><input type="hidden" name="cbUnidad" id="cbUnidad" value='<c:out value="${idUnidad}"/>' />
	      		</sec:authorize>
	       		<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
	       			<select name="cbUnidad" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cbUnidad">
	       				<option value="0" <c:if test='${item.ID==0}'> selected </c:if>>[Todas las Unidades Administrativas]</option>
	            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
	              			<option value="<c:out value="${item.ID}"/>" 
	              			<c:if test="${item.ID==idUnidad}"> selected </c:if> >
	             			<c:out value="${item.DEPENDENCIA}"/></option>
	           			</c:forEach>
	          		</select>
	        	</sec:authorize>
       		</div>
       		<div class="col-sm-4">
       			<input type="button" name="cmdBuscar" id="cmdBuscar" value="Buscar" class="btn btn-primary" style="width:150px;">
       		</div>
		</div>
		<div class="form-group"><!-- Tipo de gasto -->
	      <label class="control-label col-sm-2" for="cbotipogasto">Tipo de gasto:</label>
	      <div class="col-sm-6">          
	        <select name="cbotipogasto" id="cbotipogasto " class="form-control input-sm m-b" title="Seleccione Recurso" data-live-search="true">
	      		<option value="0"> [Todos los tipos de gastos]
	        		<c:forEach items="${tipodeGasto}" var="item" varStatus="status">
	        			<option value='<c:out value="${item.ID}"/>'<c:if test='${item.ID==idtipogasto}'> selected </c:if>><c:out value='${item.RECURSO}'/></option>
	        		</c:forEach>
	      	</select>
	      	<input type="hidden" name="cbotipogasto" id="cbotipogasto" value='<c:out value="${idtipogasto}"/>' />
	      </div>
	      <div class="col-sm-4">
       			<input type="button" name="cmdexportar" id="cmdexportar" value="Exporar a excel" data-toggle="tooltip" title="Exportar a excel" class="btn btn-sucess" style="width:150px;">
       	  </div>
	    </div>
	    <div class="form-group"><!-- CAPITULO -->
          <label for="grupo" class="col-md-2 control-label">Capitulo:</label>
          <div class="col-md-6">
   			<select name="cbocapitulo" class="form-control input-sm"  id="cbocapitulo">
				<option value="0"> [Todos los capitulos]</option>
			    	<c:forEach items="${capitulos}" var="item" varStatus="status">
			        <option value='<c:out value="${item.CLV_CAPITU}"/>' 
			          <c:if test='${item.CLV_CAPITU==idcapitulo}'> selected </c:if>>
			          <c:out value='${item.CLV_CAPITU}'/>
			          -
			          <c:out value='${item.CAPITULO}'/>
			     	</option>
			      </c:forEach>
    		</select>
    		<input type="hidden" name="cbocapitulo" id="cbocapitulo" value='<c:out value="${idcapitulo}"/>' />
          </div>
         
      	</div> <!-- CAPITULO -->
	 	<div class="form-group">
	      <label class="control-label col-sm-2">Estatus:</label>
		  <div class="col-sm-3">
				<select id="cbostatus" name="cbostatus" style="width:200px;" multiple="multiple">
          		 	<option value="0" <c:if test = "${fn:contains(cbostatus, '0')}"> selected </c:if>>Cerrado</option>
  					<option value="-1" <c:if test = "${fn:contains(cbostatus, '-1')}"> selected </c:if>>Edición</option>
  					<option value="6" <c:if test = "${fn:contains(cbostatus, '6')}"> selected </c:if>>Ejercido</option>
  					<option value="6" <c:if test = "${fn:contains(cbostatus, '6')}"> selected </c:if>>Pagado</option>
  				</select>
      	 		
	      </div>
	      
		  <label class="control-label col-sm-1">Mes ejercido:</label>
		  <div class="col-sm-2">
			<select name="cbomes" id="cbomes" class="selectpicker form-control input-sm m-b" title="Seleccione" data-live-search="true">
				<option value="0"> [Seleccione el mes]</option>
				<option value="1" <c:if test="${1==mes_OP}"> selected </c:if>>ENERO</option>
				<option value="2" <c:if test="${2==mes_OP}"> selected </c:if>>FEBRERO</option>
				<option value="3" <c:if test="${3==mes_OP}"> selected </c:if>>MARZO</option>
				<option value="4" <c:if test="${4==mes_OP}"> selected </c:if>>ABRIL</option>
				<option value="5" <c:if test="${5==mes_OP}"> selected </c:if>>MAYO</option>
				<option value="6" <c:if test="${6==mes_OP}"> selected </c:if>>JUNIO</option>
				<option value="7" <c:if test="${7==mes_OP}"> selected </c:if>>JULIO</option>
				<option value="8" <c:if test="${8==mes_OP}"> selected </c:if>>AGOSTO</option>
				<option value="9" <c:if test="${9==mes_OP}"> selected </c:if>>SEPTIEMBRE</option>
				<option value="10" <c:if test="${10==mes_OP}"> selected </c:if>>OCTUBRE</option>
				<option value="11" <c:if test="${11==mes_OP}"> selected </c:if>>NOVIEMBRE</option>
				<option value="12" <c:if test="${12==mes_OP}"> selected </c:if>>DICIEMBRE</option>
		  </select>
		  <input type="hidden" name="cbomes" id="cbomes" value='<c:out value="${mes_OP}"/>' />
		  </div>
		</div> 
    </div>
    
    <c:set var="cont" value="0" />
	<c:set var="CLAVE_RECURSO" value="0" />
	<c:set var="id_proyecto" value="0" />
	<c:set var="CLAVE_OP" value="" />
    <c:forEach items="${listadomovimientos}"  var="item" varStatus="status"> 

			<c:if test="${item.ID_RECURSO != CLAVE_RECURSO}">				
				<table width="95%" class="table table-hover table-sm" align="center" id="listaMomentos" cellpadding="0" cellspacing="0">
					<thead class="thead-inverse">
							<tr>
								<th colspan="666" style="text-align:left;">
										<c:out value='${item.ID_RECURSO}'/> <c:out value='${item.RECURSO}'/>
								</th>
							</tr>
							<tr>
								<th width="5%" style="background-color:#777676">NUM_OP</th>
								<th width="30%" style="background-color:#777676">NOTA</th>
								<th width="5%" style="background-color:#777676">ID_PROYECTO</th>
								<th width="25%" style="background-color:#777676">PROYECTO</th>
								<th width="25%" style="background-color:#777676">CLV_PARTID - PARTIDA</th>
								<th width="5%" style="background-color:#777676">MONTO</th>
							</tr>
					</thead>
					<c:set var="CLAVE_OP" value="" />
					
			</c:if>

				<tr>
					<c:if test="${item.NUM_OP != CLAVE_OP}">
						<!-- SE CONSTRUYE LA CABECERA DE LA ORDEN DE PAGO-->
						<tr>
							<td align="center" colspan="1" style="border-right:none; background-color: #d2dce0"><strong><c:out value='${item.NUM_OP}'/></strong></td>
							<td style="border-right:none;text-align:left;background-color: #d2dce0"><strong><div data-tipoadec="<c:out value='${item.TIPO}'/>"><c:out value='${item.NOTA}'/></div></strong></td>
						
						</tr>
						<c:set var="cont" value="${cont + 1}" />
					</c:if>

					<c:if test="${item.ID_PROYECTO != id_proyecto}">
						<!-- SE CONSTRUYE LA CABECERA DEL PROYECTO-->
						<tr>
							<td style="border-right:none"></td>
							<td style="border-right:none"></td>
							<td style="border-right:none;text-align: center;"><strong>(<c:if test="${item.K_PROYECTO_T != null}"><c:out value='${item.K_PROYECTO_T}'/></c:if><c:if test="${item.K_PROYECTO_T == null}"><c:out value='${item.ID_PROYECTO}'/></c:if>) <c:out value='${item.PROYECTO}'/></strong></td>	
							<td colspan="5" style="border-right:none;text-align: left;"><strong><c:out value='${item.DECRIPCION}'/></strong></td>
						</tr>
					</c:if>
						
					<!-- SE CONSTRUYE EL DETALLE-->
					<td align="center" style="border-right:none"></td>
					<td align="center" style="border-right:none"></td>
					<td align="center" style="border-right:none"></td>
					<td align="center" style="border-right:none"><c:out value='${item.DEPENDENCIA}'/></td>
					<td align="left" style="border-right:none"><c:out value='${item.CLV_PARTID}'/> - <c:out value='${item.PARTIDA}'/></td>
					<td align="left" style="border-right:none"><fmt:formatNumber value="${item.MONTO}"  pattern="#,###,###,##0.00" /></td>		
				</tr>
				<c:set var="id_proyecto" value="${item.ID_PROYECTO}" />
				<c:set var="CLAVE_RECURSO" value="${item.ID_RECURSO}" />
				<c:set var="CLAVE_OP" value="${item.NUM_OP}" />
				
				
    </c:forEach>
	</table>    	
     <div class="alert alert-info">
	<strong>Total de registros encontrados: <c:out value='${cont}'/></strong>
</div>
	
</form>
<form name="frmExcel" id="frmExcel" action="lst_reporteexcelOPDetalle.action" method="post">
	
	<input type="hidden" value=" " name="ridunidad" id="ridunidad">
	<input type="hidden" value=" " name="ridrecurso" id="ridrecurso">
	<input type="hidden" value=" " name="rproyecto" id="rproyecto">
	<input type="hidden" value=" " name="rpartida" id="rpartida">
	<input type="hidden" value=" " name="rcapitulo" id="rcapitulo">
	<input type="hidden" value=" " name="rstatus" id="rstatus">
	<input type="hidden" value=" " name="rmes" id="rmes">
</form>
</body>
</html>