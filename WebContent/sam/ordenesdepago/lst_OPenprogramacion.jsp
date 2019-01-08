<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<title>Listado de Ordenes de Pago en Programación</title>


<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>


<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>
<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>
<script type='text/javascript' src="../../dwr/interface/controladorListadoOrdenRecibidas.js"></script>
<script type='text/javascript' src="../../dwr/engine.js"></script>
<script type="text/javascript" src="lst_OPenprogramacion.js?x=<%=System.currentTimeMillis()%>"> </script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>


<style type="text/css">

<!--
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
-->
</style></head>
<body class="Fondo" >
<form  action="../reportes/requisicion.action" method="POST" id="forma" name="forma">
<input type="hidden" name="ejercicio" id="ejercicio" value="<c:out value='${ejercicio}'/>">
<input type="hidden" name="cve_op" id="cve_op">
<h1 class="h1-encabezado">&nbsp;Ordenes de Pago - Listado de Ordenes de Pago recibidas o devueltas en Programación</h1>
<div class="well">

	 <div class="row">
		 <div class="form-group">
		 	<label class="control-label col-sm-2" for="cbomes">Mes</label>
			    <div class="col-sm-2">
					 <select name="cbomes" id="cbomes" class="form-control sm" style="margin-bottom: 8px;">
			          <option value="1" <c:if test='${mes==1}'>selected</c:if>>Enero</option>
			          <option value="2" <c:if test='${mes==2}'>selected</c:if>>Febrero</option>
			          <option value="3" <c:if test='${mes==3}'>selected</c:if>>Marzo</option>
			          <option value="4" <c:if test='${mes==4}'>selected</c:if>>Abril</option>
			          <option value="5" <c:if test='${mes==5}'>selected</c:if>>Mayo</option>
			          <option value="6" <c:if test='${mes==6}'>selected</c:if>>Junio</option>
			          <option value="7" <c:if test='${mes==7}'>selected</c:if>>Julio</option>
			          <option value="8" <c:if test='${mes==8}'>selected</c:if>>Agosto</option>
			          <option value="9" <c:if test='${mes==9}'>selected</c:if>>Septiembre</option>
			          <option value="10" <c:if test='${mes==10}'>selected</c:if>>Octubre</option>
			          <option value="11" <c:if test='${mes==11}'>selected</c:if>>Noviembre</option>
			          <option value="12" <c:if test='${mes==12}'>selected</c:if>>Diciembre</option>
			        </select>
				</div>
				<label class="control-label col-sm-2" for="txtfecha">*Fecha de recepción:</label>
				<div class="col-sm-2">
					<div class="form-group">
                <div class='input-group date' id='txtfecha'>
                   <input type="text" id="txtfechanueva2"  name="txtfechanueva2" class="form-control"/>
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>
					
					
				</div>
			</div>
	 </div>
	 <div class="row">
		 <div class="form-group">
		 		<label class="control-label col-sm-2" for="cbmomento">Momento OP:</label>
				<div class="form-group col-sm-2">
					<select name="cbmomento" id="cbmomento" class="form-control sm" style="margin-top:5px;">
						<option value="0">[Seleccione]</option>
						<option value="1" <c:if test='${momento==1}'>selected</c:if>>Por recibir</option>
			          	<option value="2" <c:if test='${momento==2}'>selected</c:if>>Por devolver</option>
					</select>
				</div>
				<label class="control-label col-sm-2">Orden de Pago</label>
			    <div class="col-sm-2">
					 <input type="text" id="txtsearchop"  name="txtsearchop" class="form-control sm" maxlength="10" style="margin-top:5px;" />
				</div>
				<div class="col-sm-offset-1 col-sm-2">
						 <input  name="btnBuscar" type="button" class="btn btn-buscar" id="btnBuscar" value="Buscar" style="margin-top: 5px;width: 150px;">
				</div>
		 	</div>
		 	
	 </div>
	 
	 <div class="form-group col-sm-3">&nbsp;</div>
	
</div>

<div class="alert alert-warning">
  <h4 style="text-align: center;"><strong>Nota!</strong>&nbsp;&nbsp;&nbsp;Las Ordenes de Pago marcadas con (RP) estan en revision en la Dir. Programación/S. Politica Presupuestal.</br>Las Ordenes de Pago marcadas con (RPF) estan en revision en la Dir. Finanzas</h4>
  
</div>
<br />
<table width="95%" class="table table-striped table-hover" align="center" id="listaRequisiciones" cellpadding="0" cellspacing="0">
 <thead>
  <tr>
    <th width="2%" height="17">Momento</th>
    <th width="2%">N°</th>
    <th width="6%">Número</th>
    <th width="7%">Fecha</th>
    <th width="8%">Fecha recepción</th>
    <th width="28%">Beneficiario</th>
    <th width="33%">Concepto</th>
    <th width="9%">Importe</th>
    <th width="6%">Opciones</th>
  </tr>
   </thead>   
<tbody>  
<c:set var="cont" value="${0}" /> 
<c:forEach items="${lst_OPenprogramacion}" var="item" varStatus="status"> 
<c:set var="cont" value="${cont+1}" /> 
  <tr>
    <tr>
    <td align="center"><c:if test="${item.RECEPCION_PROG!=NULL && item.RECEPCION_FIN==NULL}">RP&nbsp;&nbsp;<input type="checkbox" id="chkOP" name="chkOP" value="<c:out value='${item.CVE_OP}'/>"/></c:if><c:if test="${item.RECEPCION_PROG!=NULL && item.RECEPCION_FIN!=NULL}">RPF</c:if><c:if test="${item.RECEPCION_PROG==NULL&& item.RECEPCION_FIN==NULL}"><input type="checkbox" id="chkOP" name="chkOP" value="<c:out value='${item.CVE_OP}'/>"/></c:if></td>
    <td align="center"><c:out value='${cont}'/></td>
    <td align="center"><c:out value='${item.NUM_OP}'/></td>
    <td align="center"><c:out value='${item.FECHA}'/></td>
     <td align="center"><c:out value='${item.RECEPCION_PROG}'/></td>
    <td align="left"><c:out value='${item.NCOMERCIA}'/></td>
    <td><c:out value='${item.NOTA}'/></td>
    <td align="right"><fmt:formatNumber value="${item.IMPORTE}"  pattern="#,###,###,##0.00" /> </td>
    <td align="center">
    <img style="cursor:pointer" src="../../imagenes/pdf.gif" alt="Ver Documento" border="0" width="14" height="16" onClick="mostrarOpcionPDF(<c:out value='${item.CVE_OP}'/>)">
    <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_BITACORA_EN_ORDENES_DE_PAGO">
        	&nbsp;<img style="cursor:pointer" src="../../imagenes/report_user.png" border="0" width="16" height="16" title="Ver bitacora de Orden de Pago" onClick="bitacoraDocumento(<c:out value='${item.CVE_OP}'/>, 'OP')">     
    </sec:authorize>
    <c:if test='${item.STATUS==0||item.F_REC_PROG!=NULL}'> <img style="cursor:pointer" src="../../imagenes/accept.png" title="Reactivar" border="0" width="16" height="16" onclick="DevolverOP(<c:out value='${item.CVE_OP}'/>)" /></c:if>
    </td>
  </tr>
  </c:forEach>
  <tr>
     <td colspan="9" align="left"></td>
  </tr>
  <tr>
       <td colspan="8" height="25" style="background-color:#FFF" align="left"><strong>Total de registros encontrados: <c:out value='${cont}'/></strong></td>
   </tr> 
  </tbody>  
</table>
<div class="row">
		 <div class="form-group">
		 	<div class="col-sm-1" id="Recibe" style="display:none;">
					 <input  name="cmdvalidar" type="button" class="btn btn-buscar" id="cmdvalidar" value="Recibir OP" style="width:100px;margin-top: 10px;">
			</div>
			<div class="col-sm-1" id="Devuelve" style="display:none;">
					 <input  name="cmdback" type="button" class="btn btn-buscar" id="cmdback" value="Devolver OP" style="width:100px;margin-top: 10px;">
			</div>
			
		 </div>
</div>
</form>
</body>
</html>
